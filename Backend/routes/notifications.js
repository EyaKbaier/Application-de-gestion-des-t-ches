const express = require('express');
const db = require('../config/db');
const authenticateToken = require('../securityJWT/securityJWT');

const router = express.Router();

// Récupérer les notifications d'un utilisateur
router.get('/', authenticateToken, (req, res) => {
    const userId = req.user.id;

    const query = `SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC`;
    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).send({ message: 'Erreur lors de la récupération des notifications.' });
        res.status(200).send(results);
    });
});

// Marquer une notification comme lue
router.put('/:id', authenticateToken, (req, res) => {
    const { id } = req.params;

    const query = `UPDATE notifications SET is_read = 1 WHERE id = ?`;
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).send({ message: 'Erreur lors de la mise à jour de la notification.' });
        res.status(200).send({ message: 'Notification mise à jour.' });
    });
});

module.exports = router;
