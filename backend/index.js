import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/Db.js";
import bookRoutes from "./routes/bookRoute.js";
import orderRoutes from "./routes/orderRoute.js"
import userRoutes from "./routes/userRoute.js"
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
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});