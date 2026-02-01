const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API RUNNING - FREE RENDER");
});

app.post("/api/run", (req, res) => {
  res.json({
    success: true,
    message: "Free API working",
    data: req.body
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on " + PORT);
});
