const express = require('express');
const db = require('../config/db');
const authenticateToken = require('../securityJWT/securityJWT');

const router = express.Router();

// Récupérer les informations d'un utilisateur
router.get('/:id', authenticateToken, (req, res) => {
    const { id } = req.params;

    const query = `SELECT * FROM users WHERE id = ?`;
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).send({ message: 'Erreur lors de la récupération de l\'utilisateur.' });
        if (results.length === 0) return res.status(404).send({ message: 'Utilisateur introuvable.' });
        res.status(200).send(results[0]);
    });
});

// Mettre à jour les informations d'un utilisateur
router.put('/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    const query = `SELECT * FROM users WHERE id = ?`;
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).send({ message: 'Erreur lors de la récupération de l\'utilisateur.' });
        if (results.length === 0) return res.status(404).send({ message: 'Utilisateur introuvable.' });

        const updateQuery = `UPDATE users SET name = ?, email = ? WHERE id = ?`;
        db.query(updateQuery, [name, email, id], (err, result) => {
            if (err) return res.status(500).send({ message: 'Erreur lors de la mise à jour de l\'utilisateur.' });
            res.status(200).send({ message: 'Informations de l\'utilisateur mises à jour avec succès.' });
        });
    });
});

// Supprimer un utilisateur
router.delete('/:id', authenticateToken, (req, res) => {
    const { id } = req.params;

    const query = `SELECT * FROM users WHERE id = ?`;
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).send({ message: 'Erreur lors de la récupération de l\'utilisateur.' });
        if (results.length === 0) return res.status(404).send({ message: 'Utilisateur introuvable.' });

        const deleteQuery = `DELETE FROM users WHERE id = ?`;
        db.query(deleteQuery, [id], (err, result) => {
            if (err) return res.status(500).send({ message: 'Erreur lors de la suppression de l\'utilisateur.' });
            res.status(200).send({ message: 'Utilisateur supprimé avec succès.' });
        });
    });
});

module.exports = router;
