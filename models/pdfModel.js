// models/pdfModel.js
const db = require('../config/database');

// function findStagiaireFromDatabase(stagiaireId) {
//   return new Promise((resolve, reject) => {
//     db.query(
//       "SELECT * FROM stagiaires WHERE id = ?",
//       [stagiaireId],
//       (error, results) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(results[0]);
//         }
//       }
//     );
//   });
// }

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


module.exports = {
  findStagiaireFromDatabase,
};
