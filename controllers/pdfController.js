// controllers/pdfController.js
const PDFDocument = require("pdfkit");
const fs = require("fs");
const { findStagiaireFromDatabase } = require("../models/pdfModel");

function generatePDFFromData(stagiaire) {
  const doc = new PDFDocument();
  const filename = `report_${stagiaire.firstName}__${stagiaire.lastName}_${Date.now()}.pdf`;

  doc.pipe(fs.createWriteStream(filename));

  const cef = stagiaire.CEF;
  doc.fontSize(18).text(cef, { align: "center" });
  doc.moveDown(0.5);
  doc.fontSize(16).text("OFPPT", { align: "left" });
  doc.moveDown(0.5);
  
  doc.fontSize(14).text(`Conformément au règlement intérieur en vigueur au sein des établissements de formation professionnelle, notamment le chapitre 5 relatif à l'assiduité et au comportement, une sanction a été infligée Premier avertissement pour le stagiaire/la stagiaire ${stagiaire.firstName} ${stagiaire.lastName} inscrit(e) en filière ${stagiaire.groupId} en raison de ses absences répétées et non justifiées, entraînant une déduction de trois points de son assiduité.`);
  doc.moveDown(0.5);
  // Get the current date
  const currentDate = new Date();
  // Format the date as a string without time according to the user's locale
  const formattedDate = currentDate.toLocaleDateString();

  // Display the formatted date on the right side
  doc.fontSize(14).text("le "+ formattedDate, { align: "right" });
  doc.fontSize(18).text("Signature de l'intéressé(e): ---------------", { align: "center" });

  doc.end();

  return filename;
}

async function generatePDF(stagiaireId) {
  try {
    const stagiaire = await findStagiaireFromDatabase(stagiaireId);
    if (!stagiaire) {
      throw new Error("Stagiaire not found");
    }

    const pdfFileName = generatePDFFromData(stagiaire);
    return pdfFileName;
  } catch (err) {
    throw new Error("Error generating PDF: " + err.message);
  }
}



module.exports = {
  generatePDF,
};
