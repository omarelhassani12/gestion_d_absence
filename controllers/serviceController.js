
const AbsenceModel = require('../models/absenceModel');
const OverviewAdminModel = require('../models/serviceModel');
const StagiaireModel = require('../models/stagaireModel');

const DashboardController = {
    async getDataForDashboard(req, res) {
        const user = req.session.user || null;

        try {

            console.log("the group id : " +user.groupId);
            GroupID = user.groupId;
            //for the formateur
            const totalStagiairesWithSameGroupId = await OverviewAdminModel.getStagiairesCountByGroupId(GroupID);
            const totalAbsencesWithSameGroupId = await OverviewAdminModel.getAbsencesCountByGroupId(GroupID)

            console.log("the group id : " +user.groupId)

            const totalStagiaires = await OverviewAdminModel.getStagiairesCount();
            const totalFormateurs = await OverviewAdminModel.getUsersCountWithRole();
            const totalAbsences = await OverviewAdminModel.getAbsencesCount();
            const totalJustifiedAbsences = await OverviewAdminModel.getJustifiedAbsencesCount();

            // Fetch total hours of absence for all stagiaires
            const totalHoursMap = await AbsenceModel.getTotalHoursOfAbsence();

            // Fetch all stagiaires
            const stagiaires = await StagiaireModel.findAll();
            
            // Loop through each stagiaire and add their total hours
            for (const stagiaire of stagiaires) {
                const totalHours = totalHoursMap.get(stagiaire.id);
                stagiaire.totalHours = totalHours || 0;
            }
            
            // Sort stagiaires by total absence hours in descending order
            stagiaires.sort((a, b) => b.totalHours - a.totalHours);
            
            // Get the top 5 stagiaires with the most absence hours
            const topStagiaires = stagiaires.slice(0, 5);

                      
        
            res.render('dashboard', {
                user,
                activeRoute: 'dashboard',
                totalStagiaires,
                totalFormateurs,
                totalAbsences,
                totalJustifiedAbsences,
                stagiaires : topStagiaires,
                //for formateur
                totalStagiairesWithSameGroupId,
                totalAbsencesWithSameGroupId,
            });
        } catch (error) {
            console.error('An error occurred while fetching overview data:', error);
            res.status(500).json({ error: 'An error occurred while fetching overview data' });
        }
    },
};

module.exports = DashboardController;
