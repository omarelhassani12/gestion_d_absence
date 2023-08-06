// routes/pdfRoutes.js
const express = require("express");
const pdfRoutes = express.Router();
const pdfController = require("../controllers/pdfController");

// Route to generate PDF for a specific stagiaire by ID
pdfRoutes.get("/pdf/:stagiaireId", async (req, res) => {
  try {
    const stagiaireId = parseInt(req.params.stagiaireId);
    const pdfFileName = await pdfController.generatePDF(stagiaireId);
    res.redirect("/");
    // res.status(200).send(`PDF generated for Stagiaire ID ${stagiaireId}: ${pdfFileName}`);
  } catch (err) {
    res.status(500).send(`Error generating PDF: ${err.message}`);
  }
});

module.exports = pdfRoutes;
