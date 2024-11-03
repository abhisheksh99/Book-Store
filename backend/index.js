import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/Db.js";
import bookRoutes from "./routes/bookRoute.js";
import cors from "cors";

dotenv.config();

const app = express();
connectDb();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/api/books", bookRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});