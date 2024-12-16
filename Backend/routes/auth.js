const express = require('express'); // Utilisé pour définir des routes et gérer les requêtes HTTP
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const router = express.Router(); // Création d'une instance

// Route d'inscription 
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).send({ message: 'Erreur lors du hachage du mot de passe.' });

        const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
        db.query(query, [name, email, hashedPassword], (err, result) => {
            if (err) return res.status(500).send({ message: 'Erreur lors de l\'inscription.' });
            res.status(200).send({ message: 'Utilisateur enregistré avec succès.' });
        });
    });
});

// Route de connexion
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = `SELECT * FROM users WHERE email = ?`;
    db.query(query, [email], (err, results) => {
        if (err || results.length === 0) return res.status(404).send({ message: 'Utilisateur introuvable.' });

        const user = results[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) return res.status(401).send({ message: 'Mot de passe incorrect.' });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ token, user });
    });
});

module.exports = router;
