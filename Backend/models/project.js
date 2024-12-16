const db = require('../config/db');

const Project = {
    // Créer un projet
    create: (project, callback) => {
        const query = 'INSERT INTO projects (name, description) VALUES (?, ?)';
        const values = [project.name, project.description];
        db.query(query, values, callback);
    },

    // Obtenir tous les projets
    getAll: (callback) => {
        const query = 'SELECT * FROM projects';
        db.query(query, callback);
    },

    // Récupérer un projet par son ID
    getById: (projectId, callback) => {
        const query = 'SELECT * FROM projects WHERE id = ?';
        db.query(query, [projectId], callback);
    },

    // Mettre à jour un projet
    update: (projectId, updatedProject, callback) => {
        const query = 'UPDATE projects SET name = ?, description = ? WHERE id = ?';
        const values = [updatedProject.name, updatedProject.description, projectId];
        db.query(query, values, callback);
    },

    // Supprimer un projet
    delete: (projectId, callback) => {
        const query = 'DELETE FROM projects WHERE id = ?';
        db.query(query, [projectId], callback);
    }
};

module.exports = Project;
