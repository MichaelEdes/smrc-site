import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "smrc_schema",
});

app.get("/products", (req, res) => {
  const q = "SELECT * FROM products";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/device_repair", (req, res) => {
  const q = "SELECT * FROM DEVICE_REPAIR;";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/device_repair", (req, res) => {
  const {
    first_name,
    surname,
    email,
    device_type,
    device_make,
    device_model,
    problem,
    other_notes,
  } = req.body;

  const q =
    "INSERT INTO DEVICE_REPAIR (first_name, surname, email, device_type, device_make, device_model, problem, other_notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(
    q,
    [
      first_name,
      surname,
      email,
      device_type,
      device_make,
      device_model,
      problem,
      other_notes,
    ],
    (err, data) => {
      if (err) return res.json(err);
      return res.json("Repair reported successfully");
    }
  );
});

app.post("/orders", (req, res) => {
  const { userName, total, items } = req.body;

  const orderQuery =
    "INSERT INTO orders (order_date, total, user_name) VALUES (NOW(), ?, ?)";

  // Insert order into the orders table
  db.query(orderQuery, [total, userName], (err, data) => {
    if (err) return res.status(500).json(err);

    const orderID = data.insertId;

    // Insert order items into the order_items table
    const orderItemsQuery =
      "INSERT INTO order_items (order_id, product_id, product_name, quantity) VALUES ?";
    const orderItemsValues = items.map((item) => [
      orderID,
      item.id,
      item.name,
      item.quantity,
    ]);

    db.query(orderItemsQuery, [orderItemsValues], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Order submitted successfully");
    });
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
