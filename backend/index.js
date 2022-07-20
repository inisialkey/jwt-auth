import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
// import Users from "./models/UserModel.js";
import router from "./routes/UserRoute.js";
dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log("Database Connected");
  //   cek apakah table users sudah ada? kalau belum, buat table tersebut dengan fungsi sequelize dibawah
  //   await Users.sync();
} catch (error) {
  console.log(error);
}

// agar app bisa diakses diluar domain
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// agar dapat memparsing cookie
app.use(cookieParser());
// agar dapat menerima data dalam format json
app.use(express.json());
// sebagai middleware
app.use(router);
// pastikan urutan app.use berurut dan benar karna bisa menyebabkan error

app.listen(5000, () => console.log("Server up and running"));
