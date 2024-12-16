const express = require('express');
const db = require('../config/db');
const authenticateToken = require('../securityJWT/securityJWT');

const router = express.Router();

// Récupérer tous les messages d'un projet
router.get('/:projectId', authenticateToken, (req, res) => {
    const { projectId } = req.params;

    const query = `SELECT * FROM messages WHERE project_id = ? ORDER BY created_at ASC`;
    db.query(query, [projectId], (err, results) => {
        if (err) return res.status(500).send({ message: 'Erreur lors de la récupération des messages.' });
        res.status(200).send(results);
    });
});

// Envoyer un message
router.post('/', authenticateToken, (req, res) => {
    const { content, project_id } = req.body;
    const userId = req.user.id;

    const query = `INSERT INTO messages (content, project_id, user_id, created_at) VALUES (?, ?, ?, NOW())`;
    db.query(query, [content, project_id, userId], (err, result) => {
        if (err) return res.status(500).send({ message: 'Erreur lors de l\'envoi du message.' });
        res.status(200).send({ message: 'Message envoyé avec succès.' });
    });
});

module.exports = router;
