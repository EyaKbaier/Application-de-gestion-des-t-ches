const Project = require('../models/project');

// Créer un projet
exports.createProject = (req, res) => {
    const { name, description } = req.body;
    const newProject = { name, description };
    Project.create(newProject, (err, result) => {
        if (err) {
            return res.status(500).send('Erreur lors de la création du projet');
        }
        res.status(201).send('Projet créé avec succès');
    });
};

// Obtenir tous les projets
exports.getAllProjects = (req, res) => {
    Project.getAll((err, projects) => {
        if (err) {
            return res.status(500).send('Erreur lors de la récupération des projets');
        }
        res.json(projects);
    });
};

// Obtenir un projet par son ID
exports.getProjectById = (req, res) => {
    const projectId = req.params.projectId;
    Project.getById(projectId, (err, project) => {
        if (err || !project) {
            return res.status(500).send('Erreur ou projet non trouvé');
        }
        res.json(project);
    });
};

// Mettre à jour un projet
exports.updateProject = (req, res) => {
    const projectId = req.params.projectId; 
    const updatedProject = req.body; // Contient les nouvelles données pour le projet
    Project.update(projectId, updatedProject, (err, result) => {
        if (err) {
            return res.status(500).send('Erreur lors de la mise à jour du projet');
        }
        res.status(200).send('Projet mis à jour avec succès');
    });
};

// Supprimer un projet
exports.deleteProject = (req, res) => {
    const projectId = req.params.projectId;
    Project.delete(projectId, (err, result) => {
        if (err) {
            return res.status(500).send('Erreur lors de la suppression du projet');
        }
        res.status(200).send('Projet supprimé avec succès');
    });
};
