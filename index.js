import express from "express";

import accRoutes from "./routes/api/acc.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/acc", accRoutes);

app.get("*", (req, res) => {
  res.json({ name: "value" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
