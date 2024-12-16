const express = require('express');
const db = require('../config/db');
const authenticateToken = require('../securityJWT/securityJWT');

const router = express.Router();

// Récupérer tous les projets d'un utilisateur
router.get('/', authenticateToken, (req, res) => {
    const userId = req.user.id; // ID de l'utilisateur authentifié

    const query = `SELECT * FROM projects WHERE user_id = ?`;
    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).send({ message: 'Erreur lors de la récupération des projets.' });
        res.status(200).send(results);
    });
});

// Ajouter un nouveau projet
router.post('/', authenticateToken, (req, res) => {
    const { name, description } = req.body;
    const userId = req.user.id;
    const query = `INSERT INTO projects (name, description, user_id) VALUES (?, ?, ?)`;
    db.query(query, [name, description, userId], (err, result) => {
        if (err) return res.status(500).send({ message: 'Erreur lors de la création du projet.' });
        res.status(200).send({ message: 'Projet créé avec succès.' });
    });
});

// Modifier un projet
router.put('/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    const query = `UPDATE projects SET name = ?, description = ? WHERE id = ?`;
    db.query(query, [name, description, id], (err, result) => {
        if (err) return res.status(500).send({ message: 'Erreur lors de la mise à jour du projet.' });
        res.status(200).send({ message: 'Projet mis à jour avec succès.' });
    });
});

// Supprimer un projet
router.delete('/:id', authenticateToken, (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM projects WHERE id = ?`;
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).send({ message: 'Erreur lors de la suppression du projet.' });
        res.status(200).send({ message: 'Projet supprimé avec succès.' });
    });
});

module.exports = router;
