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
  } else if (warningMessage === "Exclusion") {
    title = "Exclusion";
  } else if (warningMessage === "Urgent") {
    title = "Urgent";
  }
  

  const filename = `${title}_${stagiaire.firstName}__${stagiaire.lastName}_${Date.now()}.pdf`;

  doc.pipe(fs.createWriteStream(filename));

  const imagePath = path.join(__dirname, "images/ofppt.png");
  doc.image(imagePath, {
    fit: [400, 120], 
    align: "center",
    valign: "top",
  });



    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const currentYear = currentDate.getFullYear();
    const nextYear = currentYear + 1;

  doc.moveDown(5);
  doc.fontSize(10).text("Établissement : INSTITUT DE TECHNOLOGIE APPLIQUEE ROUTE AGOURAY MEKNES", { align: "left" });
  doc.moveDown(1.5);
  doc.fontSize(18).font('Helvetica-Bold').text(title, { align: "center"});
  doc.moveDown(0.5);
  
  if (
    warningMessage === "Premier mise en garde" ||
    warningMessage === "Deuxième mise en garde" ||
    warningMessage === "Premier avertissement" ||
    warningMessage === "Deuxième avertissement" ||
    warningMessage === "Blame"
  ) {
  doc.fontSize(12).text('Conformément au règlement intérieur en vigueur au sein des établissements de formation professionnelle, notamment le chapitre 5 relatif à l\'assiduité et au comportement, une sanction a été infligée : ', { continued: true })
  .font('Helvetica-Bold').text(title ,{ continued: true })
  .font('Helvetica').text(` pour le stagiaire/la stagiaire ` , { continued: true })
  .font('Helvetica-Bold').text(`${stagiaire.firstName} ${stagiaire.lastName}`, { continued: true })
  .font('Helvetica').text(` inscrit(e) en filière ` , { continued: true })
  .font('Helvetica-Bold').text(`${stagiaire.group.groupName}`, { continued: true })
  .font('Helvetica').text(` en raison de ses absences répétées et non justifiées, entraînant une déduction de `,{ continued: true })
  .font('Helvetica-Bold').text(note, { continued: true })
  .font('Helvetica').text(` de son assiduité.`);
} else if(warningMessage === "Exclusion"){
    doc.fontSize(12).text(`Je soussigné(e) :  ${stagiaire.firstName} ${stagiaire.lastName}` );
    doc.fontSize(12).text(`Stagiaire de la filière : ${stagiaire.group.groupName}` );
    doc.fontSize(12).text(`Niveau de formation : --------------------------------------------`);
    doc.fontSize(12).text(`Année de formation : ${currentYear} / ${nextYear}`);
    doc.moveDown(1.5);
    doc.fontSize(16).font('Helvetica-Bold').text("atteste avoir :", { align: "center"});
    doc.moveDown(1.5);
    doc.fontSize(12).text(`1- Pris connaissance du règlement intérieur en vigueur dans les institutions de formation professionnelle annoncé par écrit et exposé lors des annonces.`);
    doc.fontSize(12).text(`2- Reçu une explication des dispositions de ce règlement par les responsables de l'établissement au début de l'année de formation.`);
    doc.fontSize(12).text(`3- Pris connaissance des conséquences des sanctions résultant de mon comportement, notamment la déduction de points de ma moyenne annuelle. `);
    doc.moveDown(1.5);
    doc.fontSize(16).font('Helvetica-Bold').text("et je m'engage à :", { align: "center"});
    doc.moveDown(1.5);
    doc.fontSize(12).text(`1- Ne pas répéter un tel comportement.`);
    doc.fontSize(12).text(`2- Respecter toutes les dispositions du règlement intérieur.`);
    doc.fontSize(12).text(`3- Accepter toutes les mesures prises à mon encontre conformément au règlement intérieur.`);  
} else if(warningMessage === "Urgent"){
    doc.moveDown(1.5);
    doc.fontSize(12).font('Helvetica-Bold').text("Meknés le "+formattedDate, { align: "right"}); 
    doc.moveDown(2.5);
    doc.fontSize(12).text(`Monsieur/Madame : --------------------------------------------` );
    doc.fontSize(12).text(`Numéro de la carte d'identité nationale :--------------------------------------------` );
    doc.fontSize(12).text(`Tuteur/Tutrice légal(e) de l'apprenant(e) : ${stagiaire.firstName} ${stagiaire.lastName}`);
    doc.fontSize(12).text(`Filière : ${stagiaire.group.groupName}`);
    doc.moveDown(1.5);
    doc.fontSize(12).font('Helvetica-Bold').text(`À l'attention de Monsieur/Madame :`, { align: "center"});
    doc.fontSize(12).font('Helvetica-Bold').text(`Directeur/Directrice de l'Institut de Technologie Appliquée Route Zakoura, Meknès.`, { align: "center"});
    doc.moveDown(1.5);
    doc.fontSize(12).text(`Objet : Demande de réintégration de mon fils/ma fille pour poursuivre ses études.`);
    doc.fontSize(12).text('Salutations distinguées et respectueuses.')
    .font('Helvetica').text(`Je m'adresse à vous, Monsieur/Madame, avec cette demande, en espérant que vous autorisiez mon fils/ma fille, l'apprenant(e) ` , { continued: true })
    .font('Helvetica-Bold').text(`${stagiaire.firstName} ${stagiaire.lastName}`, { continued: true })
    .font('Helvetica').text(`de la filière ` , { continued: true })
    .font('Helvetica-Bold').text(`${stagiaire.group.groupName}`, { continued: true })
    .font('Helvetica').text(` à retourner pour continuer ses études dans votre établissement. Ceci est dû à ses absences répétées et injustifiées, dont il/elle reconnaît la faute et exprime ses regrets les plus sincères.`)
    doc.moveDown(1.5);
    doc.fontSize(12).text(`Cordialement,`);
    doc.moveDown(2.5);
    doc.fontSize(14).text(`Signature du tuteur/tutrice légale : --------------------------------------------`);
}

   



if (
    warningMessage === "Premier mise en garde" ||
    warningMessage === "Deuxième mise en garde" ||
    warningMessage === "Premier avertissement" ||
    warningMessage === "Deuxième avertissement" ||
    warningMessage === "Blame" ||
    warningMessage === "Exclusion"
  ) {
  doc.moveDown(1.5);
  doc.fontSize(14).font('Helvetica-Bold').text("Meknés le "+formattedDate, { align: "right" , continued: true});  
  doc.moveDown(2.5);
  doc.fontSize(14).text("Signature du stagaire: ---------------", { align: "center" });
  }
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
