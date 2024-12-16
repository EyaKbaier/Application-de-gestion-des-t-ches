const db = require('../config/db');

const Task = {
    // Créer une nouvelle tache
    create: (task, callback) => {
        const query = 'INSERT INTO tasks (title, description, status, priority, user_id, project_id, due_date) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [task.title, task.description, task.status, task.priority, task.user_id, task.project_id, task.due_date];
        db.query(query, values, callback);
    },

    // Obtenir toutes les taches d'un projet
    getAll: (projectId, callback) => {
        const query = 'SELECT * FROM tasks WHERE project_id = ?';
        db.query(query, [projectId], callback);
    },

    // Mettre à jour une tache
    update: (taskId, updatedTask, callback) => {
        const query = 'UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, user_id = ?, due_date = ? WHERE id = ?';
        const values = [updatedTask.title, updatedTask.description, updatedTask.status, updatedTask.priority, updatedTask.user_id, updatedTask.due_date, taskId];
        db.query(query, values, callback);
    },

    // Supprimer une tache
    delete: (taskId, callback) => {
        const query = 'DELETE FROM tasks WHERE id = ?';
        db.query(query, [taskId], callback);
    }
};

module.exports = Task;
