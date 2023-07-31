const AbsenceModel = require('../models/absenceModel');
const GroupModel = require('../models/groupModel');
const StagiaireModel = require('../models/stagaireModel');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const bidi = require('bidi');

const AbsenceController = {

  // async getAllAbsences(req, res, next) {
  //   try {
  //     const absences = await AbsenceModel.findAll();
  //     const groups = await GroupModel.findAll();
  
  //     // Fetch the stagiaire information for each absence
  //     for (const absence of absences) {
  //       const stagiaire = await StagiaireModel.findById(absence.stagiaire_id);
  //       absence.stagiaire = stagiaire;
  //     }
  
  //     const user = req.session.user || null;
  //     const stagiaires = await StagiaireModel.findAll(); // Fetch all stagiaires separately
  //     res.render('absences', { absences, activeRoute: 'absences', user, stagiaires, groups }); // Include "groups" here
  //   } catch (error) {
  //     console.error('Error retrieving absences:', error);
  //     next(error);
  //   }
  // },  
  
  
  // async getAllAbsences(req, res, next) {
  //   try {
  //     const absences = await AbsenceModel.findAll();
  //     const groups = await GroupModel.findAll();
  
  //     // Fetch the stagiaire information for each absence
  //     for (const absence of absences) {
  //       const stagiaire = await StagiaireModel.findById(absence.stagiaire_id);
  //       absence.stagiaire = stagiaire;
  //     }
  
  //     const user = req.session.user || null;
  //     const stagiaires = await StagiaireModel.findAll(); // Fetch all stagiaires separately
  
  //     // Get the selected date and period from the request query parameters
  //     const selectedDate = req.query.date;
  //     const selectedPeriod = req.query.period;
  
  //     // If both selectedDate and selectedPeriod are present, filter the absences based on date and period
  //     if (selectedDate && selectedPeriod) {
  //       const absencesByDateAndPeriod = absences.filter(
  //         (absence) => absence.date === selectedDate && absence.period === selectedPeriod
  //       );
  
  //       res.render('absences', {
  //         absences: absencesByDateAndPeriod,
  //         activeRoute: 'absences',
  //         user,
  //         stagiaires,
  //         groups,
  //       });
  //     } else {
  //       // If not, render the view with all absences
  //       res.render('absences', { absences, activeRoute: 'absences', user, stagiaires, groups });
  //     }
  //   } catch (error) {
  //     console.error('Error retrieving absences:', error);
  //     next(error);
  //   }
  // },  
  

  async getAllAbsences(req, res, next) {
    try {
      const absences = await AbsenceModel.findAll();
      const groups = await GroupModel.findAll();
  
      // Fetch the stagiaire information for each absence
      for (const absence of absences) {
        const stagiaire = await StagiaireModel.findById(absence.stagiaire_id);
        absence.stagiaire = stagiaire;
      }
  
      const user = req.session.user || null;
      const stagiaires = await StagiaireModel.findAll(); // Fetch all stagiaires separately
  
      // Get the selected date and period from the request query parameters
      const selectedDate = req.query.date;
      const selectedPeriod = req.query.period;
  
      // If both selectedDate and selectedPeriod are present, filter the absences based on date and period
      if (selectedDate && selectedPeriod) {
        const absencesByDateAndPeriod = absences.filter(
          (absence) => absence.date === selectedDate && absence.period === selectedPeriod
        );
  
        res.render('absences', {
          absences: absencesByDateAndPeriod,
          activeRoute: 'absences',
          user,
          stagiaires,
          groups,
        });
      } else {
        // If not, render the view with all absences
        res.render('absences', { absences, activeRoute: 'absences', user, stagiaires, groups });
      }
    } catch (error) {
      console.error('Error retrieving absences:', error);
      next(error);
    }
  },
  async downloadPDF(req, res, next) {
    try {
      const stagiaireId = req.params.stagiaireId;
  
      // Fetch stagiaire data based on the provided ID
      const stagiaire = await StagiaireModel.findById(stagiaireId);
  
      if (!stagiaire) {
        return res.status(404).send('Stagiaire not found');
      }
  
      // Create a PDF document
      const doc = new PDFDocument({ autoFirstPage: false });
  
      // Set appropriate headers for the response
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="PRMG_${stagiaireId}.pdf"`);
  
      // Pipe the PDF content to the response
      doc.pipe(res);
  
      // Set font for Arabic text (use the correct path to the Amiri-Regular.ttf font)
      const fontPath = path.join(__dirname, 'fonts', 'Amiri-Regular.ttf');
      doc.registerFont('amiri', fontPath);
  
      // Function to calculate RTL text width
      const getRtlTextWidth = (text, fontSize) => {
        return doc.widthOfString(text, { align: 'right', continued: true, width: 200, fontSize });
      };
  
      // Function to draw RTL text
      const drawRtlText = (text, x, y, fontSize) => {
        const textWidth = getRtlTextWidth(text, fontSize);
        doc.text(text, x - textWidth, y, { align: 'right', width: 100, continued: true, fontSize });
      };
  
      // Add content to the PDF
      doc.addPage({ size: 'A4', margin: 50 });
      doc.font('amiri');
  
      // Text paragraph with dynamic student information
      const dynamicText = `تطبيقا للقانون الداخلي المعمول به داخل مؤسسات التكوين المهني وخاصة الفصل الخامس المتعلق بالمواظبة والسلوك فقد تم توجيه عقوبة توبيخ للمتدرب(ة) ${stagiaire.firstName} ${stagiaire.lastName} المسجل بشعبة ${stagiaire.group} وذلك نظرا للغياب المتكرر والغير مبرر مع خصم خمس نقط من نقط المواظبة.`;
  
      // Determine if the dynamic text contains RTL characters
      const isRtl = /[\u0600-\u06FF\u0750-\u077F\u0590-\u05FF\uFE70-\uFEFF]/.test(dynamicText);
  
      // Add content to the PDF
      doc.fontSize(24).text('اسم المدرسة', { align: 'center' });
      doc.moveDown();
      doc.fontSize(18).text('معلومات الطالب', { align: 'center' });
  
      // Add student data
      doc.moveDown();
      doc.fontSize(14).text(`الرقم الشخصي: ${stagiaire.id}`);
      doc.fontSize(14).text(`الاسم الأول: ${stagiaire.firstName}`);
      doc.fontSize(14).text(`الاسم الأخير: ${stagiaire.lastName}`);
      if (isRtl) {
        drawRtlText(`الشعبة: ${stagiaire.group}`, doc.page.width - 100, doc.y, 14);
      } else {
        doc.fontSize(14).text(`الشعبة: ${stagiaire.group}`);
      }
  
      // Add dynamic text paragraph
      doc.moveDown(2);
      if (isRtl) {
        drawRtlText(dynamicText, doc.page.width - 200, doc.y, 14);
      } else {
        doc.fontSize(14).text(dynamicText);
      }
  
      // Add date and place for signature
      doc.moveDown();
      doc.fontSize(14).text('التاريخ:', { align: 'left' });
      doc.text('_________________________', doc.page.width - 200, doc.y, { align: 'right', continued: true });
      doc.moveDown();
      doc.fontSize(14).text('التوقيع:', { align: 'left' });
      doc.text('_________________________', doc.page.width - 200, doc.y, { align: 'right' });
  
      // Finalize the PDF and end the response
      doc.end();
    } catch (error) {
      console.error('Error generating PDF:', error);
      next(error);
    }
  },

  async getStagiaireById(req, res) {
    try {
      const stagiaireId = req.params.id;
      const stagiaire = await StagiaireModel.findById(stagiaireId);
      const groups = await GroupModel.findAll();
      const user = req.session.user || null;
  
      // Find the corresponding group for the stagiaire based on groupId
      // const groupName = groups.find(group => group.id === stagiaire.groupId)?.name || 'Unknown Group';
      
      // const dynamicText = `تطبيقا للقانون الداخلي المعمول به داخل مؤسسات التكوين المهني وخاصة الفصل الخامس المتعلق بالمواظبة والسلوك فقد تم توجيه عقوبة توبيخ للمتدرب(ة) ${stagiaire.firstName} ${stagiaire.lastName} المسجل بشعبة ${groupName} وذلك نظرا للغياب المتكرر والغير مبرر مع خصم خمس نقط من نقط المواظبة.`;
  
      if (stagiaire) {
        // res.render('new-absence', { stagiaire, groups, activeRoute: 'absences', user, dynamicText });
        res.render('new-absence', { stagiaire, groups, activeRoute: 'absences', user });
      } else {
        res.status(404).send('Stagiaire not found');
      }
    } catch (error) {
      console.error('An error occurred while fetching the stagiaire:', error);
      res.status(500).send('An error occurred while fetching the stagiaire');
    }
  },

  getAbsenceById(req, res, next) {
    const { id } = req.params;

    AbsenceModel.findById(id)
      .then(absence => {
        res.render('absence-update', { absence, activeRoute: 'absences' });
      })
      .catch(error => {
        console.error('Error retrieving absence by ID:', error);
        next(error);
      });
  },

  async createAbsence(req, res) {
    try {
      const { dateSelect, periodSelect, stagiaire_id } = req.body;
  
      // Make sure stagiaire_id is an array
      if (!Array.isArray(stagiaire_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid data format. Expected an array for "stagiaire_id".',
        });
      }
  
      // Make sure dateSelect is provided and not null or empty
      if (!dateSelect) {
        return res.status(400).json({
          success: false,
          message: 'Invalid data format. "dateSelect" cannot be null or empty.',
        });
      }
  
      // Create an array of absence data for each student
      const absenceDataArray = stagiaire_id.map((studentId) => {
        return {
          date: dateSelect,
          period: periodSelect,
          stagiaire_id: parseInt(studentId), // Parse the ID as an integer
        };
      });
  
      // Call the updated createAbsence function from the model and pass the absenceDataArray
      await AbsenceModel.createAbsence(absenceDataArray);
  
      // Send a response back to the client
      res.redirect('/absence');
    } catch (error) {
      console.error('Error inserting absences:', error);
      // Handle the error, e.g., send an error response back to the client
      res.status(500).json({
        success: false,
        message: 'Error inserting absences.',
      });
    }
  },  


  deleteAbsence(req, res, next) {
    const { id } = req.params;

    AbsenceModel.delete(id)
      .then((success) => {
        if (success) {
          console.log('Absence deleted successfully');
          res.redirect('/absences');
        } else {
          console.error('Absence not found or not deleted');
          next(new Error('Absence not found or not deleted'));
        }
      })
      .catch((error) => {
        console.error('Error deleting absence:', error);
        next(error);
      });
  },



async updateAbsence(req, res, next) {
  try {
    const { id } = req.params;
    const { session1_attendance, session2_attendance } = req.body;

    // Determine the updated attendance data based on the presence of session1_attendance or session2_attendance
    const updatedAttendance = session1_attendance !== undefined ? session1_attendance : session2_attendance;
    const sessionNumber = session1_attendance !== undefined ? 1 : 2;

    // Convert the string value to a boolean
    const isChecked = updatedAttendance === '1' ? true : false;

    // Assuming AbsenceModel.updateAbsence is a function to update the absence
    const success = await AbsenceModel.updateAbsence(id, sessionNumber, isChecked);

    if (success) {
      res.sendStatus(200); // Send a success response
    } else {
      res.sendStatus(404); // Send a not found response
    }
  } catch (error) {
    console.error('Error updating absence:', error);
    res.sendStatus(500); // Send an internal server error response
  }
},



 

};


module.exports = AbsenceController;
