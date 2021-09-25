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

router.get("/add/:login", async (req, res) => {
  try {
    let login = req.params.login;
    if (!login) throw Error("Please provide a login");

    login = login.replace(/[^A-Za-z0-9_]/g, "");
    if (login.length < 3)
      throw Error("Login must be at least 3 characters long");
    if (login.length > 16)
      throw Error("Login can't be longer than 16 characters");

    let addedAcc = await prisma.vime_accs.create({
      data: {
        login,
        level: Math.floor(Math.random() * 100 + 1),
      },
    });

    res.json({ error: false, addedAcc });
  } catch (e) {
    res.json({ error: true, message: JSON.stringify(e) });
  }
});

router.delete("/delete/:login", async (req, res) => {
  try {
    let login = req.params.login.replace(/[^A-Za-z0-9_]/g, "");
    const deletedAcc = await prisma.vime_accs.delete({
      where: { login },
    });
    if (!deletedAcc) throw Error("Acc doesn't exist");

    res.json({ error: false, deletedAcc });
  } catch (e) {
    res.status(403).json({ error: true, message: JSON.stringify(e) });
  }
});

export default router;
