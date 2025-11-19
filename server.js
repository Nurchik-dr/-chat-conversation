import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 8000;

// Разрешаем доступ с вашего фронтенда
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

let messages = []; // Храним сообщения в памяти

// Получение сообщений
app.get("/messages", (req, res) => {
  res.json(messages);
});

// Отправка нового сообщения
app.post("/messages", (req, res) => {
  const { author, message } = req.body;
  if (!author || !message) return res.status(400).json({ error: "Empty fields" });

  const msg = { author, message, datetime: new Date().toISOString() };
  messages.push(msg);
  res.json(msg);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
