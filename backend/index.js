console.log("🟢 Backend iniciado correctamente");

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Crear base de datos SQLite
const db = new sqlite3.Database('./puc.db');

// Crear tabla si no existe
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS puc (
    codigo TEXT,
    nombre TEXT,
    categoria TEXT
  )`);

  // Insertar registros de ejemplo si no existen
  db.get("SELECT COUNT(*) as count FROM puc", (err, row) => {
    if (err) {
      return console.error("❌ Error consultando la base de datos:", err.message);
    }
    if (row.count === 0) {
      console.log("📥 Insertando datos de ejemplo...");
      const datos = [
        ['1001', 'Caja', 'Activo'],
        ['1005', 'Bancos', 'Activo'],
        ['1105', 'Clientes', 'Activo'],
        ['1305', 'Inventarios', 'Activo']
      ];
      const stmt = db.prepare("INSERT INTO puc (codigo, nombre, categoria) VALUES (?, ?, ?)");
      for (const row of datos) {
        stmt.run(row);
      }
      stmt.finalize(() => console.log("✅ Datos insertados correctamente."));
    } else {
      console.log("ℹ️ Ya existen datos en la base.");
    }
  });
});

// Ruta para consultar registros
app.get('/api/puc', (req, res) => {
  const { codigo, nombre, categoria } = req.query;
  let query = "SELECT * FROM puc WHERE 1=1";
  let params = [];

  if (codigo) {
    query += " AND codigo LIKE ?";
    params.push(`%${codigo}%`);
  }
  if (nombre) {
    query += " AND nombre LIKE ?";
    params.push(`%${nombre}%`);
  }
  if (categoria) {
    query += " AND categoria LIKE ?";
    params.push(`%${categoria}%`);
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});