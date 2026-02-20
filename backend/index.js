import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import "dotenv/config";

const PORT = process.env.DB_PORT;
const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get("/api/ingatlan", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT i.id, k.nev, i.leiras, i.hirdetesDatuma, i.tehermentes, i.ar, i.kepUrl FROM ingatlanok.ingatlanok i JOIN ingatlanok.kategoriak k ON i.kategoria = k.id",
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching data from database:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/ingatlan", async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Bad request, missing JSON body" });
  }

  const { kategoria, leiras, hirdetesDatuma, tehermentes, ar, kepUrl } =
    req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO ingatlanok.ingatlanok (kategoria, leiras, hirdetesDatuma, tehermentes, ar, kepUrl) VALUES (?, ?, ?, ?, ?, ?)",
      [kategoria, leiras, hirdetesDatuma, tehermentes, ar, kepUrl],
    );
    res.status(201).json({
      message: "Property created successfully",
      id: result.insertId,
      kategoria,
      leiras,
      hirdetesDatuma,
      tehermentes,
      ar,
      kepUrl,
    });
  } catch (err) {
    console.error("Error inserting data into database:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/api/ingatlan/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      "DELETE FROM ingatlanok.ingatlanok WHERE id = ?",
      [id],
    );

    if (result.effectedRows === 0) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (err) {
    console.error("Error deleting data from db", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/api/ingatlan`);
});
