// models/pdfModel.js
const db = require('../config/database');

function findStagiaireFromDatabase(stagiaireId) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT s.*, g.name FROM stagiaires AS s JOIN groups AS g ON s.groupId = g.id WHERE s.id = ?",
      [stagiaireId],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          const stagiaire = results[0];
          if (!stagiaire) {
            resolve(null); 
          } else {
            resolve({
              id: stagiaire.id,
              firstName: stagiaire.firstName,
              lastName: stagiaire.lastName,
              groupId: stagiaire.groupId,
              group: {
                groupId: stagiaire.groupId,
                groupName: stagiaire.name,
              },
            });
          }
        }
      }
    );
  });
}

function create(downloadInfo) {
  return new Promise((resolve, reject) => {
      const query = 'INSERT INTO pdf_downloads (stagiaire_id, pdf_type, download_date) VALUES (?, ?, ?)';
      db.query(query, [downloadInfo.stagiaire_id, downloadInfo.pdf_type, downloadInfo.download_date], (error, results) => {
          if (error) {
              reject(error);
          } else {
              resolve(results.insertId);
          }
      });
  });
}

function getAllByStagiaireId(stagiaireId) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM pdf_downloads WHERE stagiaire_id = ?';
    db.query(query, [stagiaireId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

}

module.exports = {
  findStagiaireFromDatabase,
  create,
  getAllByStagiaireId,
};
