const express = require("express");
const cors = require("cors");

const assignmentRoutes =
require("./routes/assignmentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Assignment Engine API Running");
});

app.use("/api", assignmentRoutes);

const PORT = 5000;
app.post("/test", (req, res) => {
  res.json({
    success: true,
    body: req.body
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});