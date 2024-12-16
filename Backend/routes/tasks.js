const express = require('express');
const db = require('../config/db');
const authenticateToken = require('../securityJWT/securityJWT');

const router = express.Router();

// Récupérer toutes les taches d'un projet
router.get('/:projectId', authenticateToken, (req, res) => {
    const { projectId } = req.params;

    const query = `SELECT * FROM tasks WHERE project_id = ?`;
    db.query(query, [projectId], (err, results) => {
        if (err) return res.status(500).send({ message: 'Erreur lors de la récupération des tâches.' });
        res.status(200).send(results);
    });
});

// Ajouter une nouvelle tâche
router.post('/', authenticateToken, (req, res) => {
    const { title, description, status, priority, project_id, assigned_to } = req.body;

    const query = `INSERT INTO tasks (title, description, status, priority, project_id, assigned_to) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(query, [title, description, status, priority, project_id, assigned_to], (err, result) => {
        if (err) return res.status(500).send({ message: 'Erreur lors de la création de la tâche.' });
        res.status(200).send({ message: 'Tâche créée avec succès.' });
    });
});

// Modifier une tâche
router.put('/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const { title, description, status, priority, assigned_to } = req.body;

    const query = `SELECT * FROM tasks WHERE id = ?`;
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).send({ message: 'Erreur lors de la récupération de la tâche.' });
        if (results.length === 0) return res.status(404).send({ message: 'Tâche introuvable.' });

        // Vérification si l'utilisateur est autorisé à modifier cette tâche
        const task = results[0];
        if (task.assigned_to !== req.user.id) return res.status(403).send({ message: 'Accès interdit à cette tâche.' });

        // Mise à jour de la tâche
        const updateQuery = `UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, assigned_to = ? WHERE id = ?`;
        db.query(updateQuery, [title, description, status, priority, assigned_to, id], (err, result) => {
            if (err) return res.status(500).send({ message: 'Erreur lors de la mise à jour de la tâche.' });
            res.status(200).send({ message: 'Tâche mise à jour avec succès.' });
        });
    });
});

// Supprimer une tâche
router.delete('/:id', authenticateToken, (req, res) => {
    const { id } = req.params;

    const query = `SELECT * FROM tasks WHERE id = ?`;
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).send({ message: 'Erreur lors de la récupération de la tâche.' });
        if (results.length === 0) return res.status(404).send({ message: 'Tâche introuvable.' });

        // Vérification si l'utilisateur est autorisé à supprimer cette tâche
        const task = results[0];
        if (task.assigned_to !== req.user.id) return res.status(403).send({ message: 'Accès interdit à cette tâche.' });

        const deleteQuery = `DELETE FROM tasks WHERE id = ?`;
        db.query(deleteQuery, [id], (err, result) => {
            if (err) return res.status(500).send({ message: 'Erreur lors de la suppression de la tâche.' });
            res.status(200).send({ message: 'Tâche supprimée avec succès.' });
        });
    });
});

module.exports = router;

