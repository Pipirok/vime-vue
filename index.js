import path from "path";
import express from "express";
import accRoutes from "./routes/api/acc.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/acc", accRoutes);

if ((process.env.NODE_ENV = "production")) {
  app.use(express.static(path.resolve("client", "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("client", "dist", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
