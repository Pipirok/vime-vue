import express from "express";
import accRoutes from "./routes/api/acc.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/acc", accRoutes);

app.get("*", (req, res) => {});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
