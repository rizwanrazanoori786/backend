const express = require("express");
const cors = require("cors");
const PDFDocument = require("pdfkit");

const app = express();
app.use(cors());
app.use(express.json());

// TEST ROUTE (browser check)
app.get("/", (req, res) => {
  res.send("API RUNNING - FREE PDF GENERATOR");
});

/*
========================
PDF GENERATOR API (FREE)
========================
POST /api/generate-pdf
JSON INPUT → PDF OUTPUT
*/
app.post("/api/generate-pdf", (req, res) => {
  const { title, text } = req.body;

  const doc = new PDFDocument({ size: "A4", margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=generated.pdf"
  );

  doc.pipe(res);

  doc.fontSize(18).text(title || "PDF Generator", {
    align: "center",
  });

  doc.moveDown();
  doc.fontSize(12).text(text || "No content provided");

  doc.end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on " + PORT);
});