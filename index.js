const express = require("express");
const cors = require("cors");
const PDFDocument = require("pdfkit");
const { PassThrough } = require("stream");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API RUNNING - FREE PDF GENERATOR");
});

app.post("/api/generate-pdf", async (req, res) => {
  try {
    const { title, text } = req.body;

    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const stream = new PassThrough();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=generated.pdf");

    doc.pipe(stream);
    stream.pipe(res);

    // ===== PREMIUM STRUCTURE =====
    doc
      .fontSize(24)
      .text(title || "Premium PDF Document", { align: "center" });

    doc.moveDown(2);

    doc
      .fontSize(12)
      .text(text || "No content provided", {
        align: "left",
        lineGap: 8,
      });

    doc.moveDown(3);
    doc
      .fontSize(10)
      .fillColor("gray")
      .text("Generated via Free PDF API", { align: "center" });

    doc.end(); // 🔥 now safe
  } catch (err) {
    console.error(err);
    res.status(500).send("PDF generation failed");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server started on " + PORT));
