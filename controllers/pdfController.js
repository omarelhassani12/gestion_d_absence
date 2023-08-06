// controllers/pdfController.js
const PDFDocument = require("pdfkit");
const fontkit = require("fontkit");
const fs = require("fs");
const { findStagiaireFromDatabase } = require("../models/pdfModel");
const path = require("path");



function generatePDFFromData(stagiaire,warningMessage) {
  const doc = new PDFDocument();

  if (warningMessage === "Premier mise en garde") {
    title = "Premier mise en garde";
    note = "un seul point";
  } else if (warningMessage === "Deuxième mise en garde") {
    title = "Deuxième mise en garde";
    note = "deux points";
  } else if (warningMessage === "Premier avertissement") {
    title = "Premier avertissement";
    note = "trois points";
  } else if (warningMessage === "Deuxième avertissement") {
    title = "Deuxième avertissement";
    note = "quatre points";
  } else if (warningMessage === "Blame") {
    title = "Blame";
    note = "cinq points";
  }
  
  
  const filename = `${title}_${stagiaire.firstName}__${stagiaire.lastName}_${Date.now()}.pdf`;

  doc.pipe(fs.createWriteStream(filename));

  // Add the image to the top of the PDF
  const imagePath = path.join(__dirname, "images/ofppt.png");
  doc.image(imagePath, {
    fit: [500, 150], // Set the width asnd height of the image
    align: "center",
    valign: "top",
  });



  
  doc.moveDown(5);
  doc.fontSize(18).font('Helvetica-Bold').text(title, { align: "center"});
  doc.moveDown(1.5);
  doc.fontSize(12).text("Établissement : INSTITUT DE TECHNOLOGIE APPLIQUEE ROUTE AGOURAY MEKNES", { align: "left" });
//   doc.fontSize(12).text("Office de la Formation Professionnelle et de la Promotion de Travail", { align: "left" });
  doc.moveDown(2.5);
  
  doc.fontSize(12).text('Conformément au règlement intérieur en vigueur au sein des établissements de formation professionnelle, notamment le chapitre 5 relatif à l\'assiduité et au comportement, une sanction a été infligée : ', { continued: true })
  .font('Helvetica-Bold').text(title ,{ continued: true })
  .font('Helvetica').text(` pour le stagiaire/la stagiaire ` , { continued: true })
  .font('Helvetica-Bold').text(`${stagiaire.firstName} ${stagiaire.lastName}`, { continued: true })
  .font('Helvetica').text(` inscrit(e) en filière ` , { continued: true })
  .font('Helvetica-Bold').text(`${stagiaire.group.groupName}`, { continued: true })
  .font('Helvetica').text(` en raison de ses absences répétées et non justifiées, entraînant une déduction de `,{ continued: true })
  .font('Helvetica-Bold').text(note, { continued: true })
  .font('Helvetica').text(` de son assiduité.`);
 doc.moveDown(2.5);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();

  doc.fontSize(14).font('Helvetica-Bold').text("le "+formattedDate, { align: "right" , continued: true});  
  doc.moveDown(4.5);
  doc.fontSize(18).text("Signature de l'intéressé(e): ---------------", { align: "center" });

  doc.end();

  return filename;
}

async function generatePDF(stagiaireId,warningMessage) {
  try {
    const stagiaire = await findStagiaireFromDatabase(stagiaireId);
    if (!stagiaire) {
      throw new Error("Stagiaire not found");
    }

    const pdfFileName = generatePDFFromData(stagiaire,warningMessage);
    return pdfFileName;
  } catch (err) {
    throw new Error("Error generating PDF: " + err.message);
  }
}



module.exports = {
  generatePDF,
};
