import express from "express";
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
