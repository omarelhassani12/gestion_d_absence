// routes/pdfRoutes.js
const fs = require("fs");
const express = require("express");
const pdfRoutes = express.Router();
const pdfController = require("../controllers/pdfController");

// Route to generate PDF for a specific stagiaire by ID

pdfRoutes.get("/pdf/:stagiaireId", async (req, res) => {
    try {
      const stagiaireId = parseInt(req.params.stagiaireId);
      const pdfFileName = await pdfController.generatePDF(stagiaireId);
  
      // Wait for the PDF to be generated
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Add a delay if needed
  
      // Trigger the download
      res.download(pdfFileName, (err) => {
        if (err) {
          res.status(500).send(`Error downloading PDF: ${err.message}`);
        } else {
          // Delete the file after download
          fs.unlink(pdfFileName, (unlinkErr) => {
            if (unlinkErr) {
              console.error("Error deleting PDF file:", unlinkErr);
            }
          });
        }
      });
    } catch (err) {
      res.status(500).send(`Error generating PDF: ${err.message}`);
    }
  });

module.exports = pdfRoutes;
