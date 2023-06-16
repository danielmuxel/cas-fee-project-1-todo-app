import express from "express";
import cors from 'cors';
import todoRoutes from "./todos/routes/todoRoutes.js";


const app = express();
app.use(cors()); // Enable CORS for all routes

const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware for JSON data
app.use("/api/todos", todoRoutes);

// add a route on / that says the server is up and running
app.get("/", (req, res) => {
  res.send("Server is up and running");
});

// eslint-disable-next-line no-console
app.listen(PORT, () =>
  console.log(`Server started on port http://localhost:${PORT}/`)
);
