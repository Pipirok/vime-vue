import express from "express";
import nfetch from "node-fetch";
import { prisma } from "../../lib/prisma.js";

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const accs = (await prisma.vime_accs.findMany()) || [];
    res.json({ error: false, accs });
  } catch (e) {
    res.status(500).json({ error: true, message: JSON.stringify(e) });
  }
});

router.get("/add/:login/:level", async (req, res) => {
  try {
    let login = req.params.login;
    let level = parseInt(req.params.level) || -1;
    if (!login) throw Error({ message: "Please provide a login" });

    login = login.replace(/[^A-Za-z0-9_]/g, "");
    if (login.length < 3)
      throw Error("Login must be at least 3 characters long");
    if (login.length > 16)
      throw Error("Login can't be longer than 16 characters");

    if (level < -1) level = -1;

    let addedAcc = await prisma.vime_accs.create({
      data: {
        login,
        level,
      },
    });

    res.json({ error: false, addedAcc });
  } catch (e) {
    res.status(400).json({ error: true, message: JSON.stringify(e) });
  }
});

router.get("/recache", async (req, res) => {
  try {
    let allAccs = await prisma.vime_accs.findMany();
    let fetchedAccs = [];

    // This was the only way I found to quickly do C-style division (i.e. without the decimal part)
    for (let i = 0; i <= parseInt(allAccs.length / 50); i++) {
      let joinedAccs = allAccs
        .slice(i * 50, (i + 1) * 50)
        .map((acc) => acc.login)
        .join(",");
      await nfetch(`http://api.vimeworld.ru/user/name/${joinedAccs}`)
        .then((data) => data.json())
        .then((responseFromVime) =>
          responseFromVime.forEach((acc) => {
            fetchedAccs.push({ login: acc.username, level: acc.level });
          })
        );
    }

    let fetchedAccsIndex = 0;
    let updatedAllAccs = [];

    allAccs.forEach((existingAcc, i) => {
      let fetchedAcc = fetchedAccs[fetchedAccsIndex] || { login: "" }; // Dummy value to prevent Out-of-bounds errors

      if (existingAcc.login.toLowerCase() === fetchedAcc.login.toLowerCase()) {
        updatedAllAccs.push({
          id: existingAcc.id,
          login: fetchedAcc.login,
          level: fetchedAcc.level,
        });
        fetchedAccsIndex++;
      } else {
        updatedAllAccs.push({
          id: existingAcc.id,
          login: existingAcc.login,
          level: existingAcc.level,
        });
      }
    });

    // Will update acounts and send them to the client only once they are updated
    for (let i = 0; i < updatedAllAccs.length; i++) {
      await prisma.vime_accs.update({
        where: { id: updatedAllAccs[i].id },
        data: updatedAllAccs[i],
      });
    }

    res.json({
      error: false,
      updatedAllAccs: updatedAllAccs.sort(
        (acc1, acc2) => acc2.level - acc1.level
      ),
    });
  } catch (e) {
    res.status(500).json({ error: true, message: JSON.stringify(e) });
  }
});

router.delete("/remove/:login", async (req, res) => {
  try {
    let login = req.params.login.replace(/[^A-Za-z0-9_]/g, "");
    const removedAcc = await prisma.vime_accs.delete({
      where: { login },
    });
    if (!removedAcc) throw Error("Acc doesn't exist");

    res.json({ error: false, removedAcc });
  } catch (e) {
    res.status(403).json({ error: true, message: JSON.stringify(e) });
  }
});

export default router;
