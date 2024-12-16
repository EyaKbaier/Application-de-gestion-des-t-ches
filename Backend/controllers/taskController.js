const Task = require('../models/task');

// Créer une tâche
exports.createTask = (req, res) => {
    const { title, description, status, priority, user_id, project_id, due_date } = req.body;
    const newTask = { title, description, status, priority, user_id, project_id, due_date };
    Task.create(newTask, (err, _result) => {
        if (err) {
            return res.status(500).send('Erreur lors de la création de la tâche');
        }
        res.status(201).send('Tâche créée avec succès');
    });
};

// Obtenir toutes les tâches d'un projet
exports.getTasks = (req, res) => {
    const projectId = req.params.projectId;
    Task.getAll(projectId, (err, tasks) => {
        if (err) {
            return res.status(500).send('Erreur lors de la récupération des tâches');
        }
        res.json(tasks);
    });
};

// Mettre à jour une tâche
exports.updateTask = (req, res) => {
    const taskId = req.params.taskId;
    const updatedTask = req.body;
    Task.update(taskId, updatedTask, (err, _result) => {
        if (err) {
            return res.status(500).send('Erreur lors de la mise à jour de la tâche');
        }
        res.status(200).send('Tâche mise à jour avec succès');
    });
};

// Supprimer une tâche
exports.deleteTask = (req, res) => {
    const taskId = req.params.taskId;
    Task.delete(taskId, (err, _result) => {
        if (err) {
            return res.status(500).send('Erreur lors de la suppression de la tâche');
        }
        res.status(200).send('Tâche supprimée avec succès');
    });
};
