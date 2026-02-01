// ===============================
// IMPORTS
// ===============================
const express = require("express");
const cors = require("cors");
const PDFDocument = require("pdfkit");

// ===============================
// APP INIT
// ===============================
const app = express();
app.use(cors());
app.use(express.json());

// ===============================
// ROOT TEST ROUTE
// ===============================
app.get("/", (req, res) => {
  res.status(200).send("API RUNNING - FREE PDF GENERATOR");
});

// ===============================
// PDF GENERATOR API (FREE)
// POST /api/generate-pdf
// ===============================
app.post("/api/generate-pdf", (req, res) => {
  try {
    const { title, text } = req.body;

    // Create PDF
    const doc = new PDFDocument({
      size: "A4",
      margin: 50
    });

    // Set response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=generated.pdf"
    );

    // Pipe PDF to response
    doc.pipe(res);

    // ===== PDF CONTENT =====
    // Title
    doc
      .fontSize(18)
      .text(title || "PDF Generator", {
        align: "center"
      });

    doc.moveDown();

    // Body text
    doc
      .fontSize(12)
      .text(text || "No content provided", {
        align: "left"
      });

    // Footer
    doc.moveDown(2);
    doc
      .fontSize(10)
      .text(
        `Generated on: ${new Date().toLocaleString()}`,
        { align: "right" }
      );

    // End PDF
    doc.end();

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "PDF generation failed",
      error: error.message
    });
  }
});

// ===============================
// SERVER START
// ===============================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on " + PORT);
});