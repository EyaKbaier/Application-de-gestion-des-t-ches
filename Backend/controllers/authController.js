const User = require('../models/user');
const bcrypt = require('bcrypt'); // Bibliothèque pour le hachage et la comparaison sécurisés des mots de passe
const jwt = require('jsonwebtoken'); // Bibliothèque pour générer et vérifier des tokens JWT (JSON Web Token)

// Inscription ( route d'inscription )
exports.signup = (req, res) => {
    const { username, email, password, role } = req.body;
    const validRoles = ['user', 'admin']; 
    if (!validRoles.includes(role)) {
        return res.status(400).send('Rôle invalide');
    }
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send('Erreur lors du hachage du mot de passe');
        }
        const newUser = { username, email, password: hashedPassword, role };
        User.create(newUser, (err, _result) => {
            if (err) {
                return res.status(500).send('Erreur lors de l\'inscription');
            }
            res.status(201).send('Utilisateur créé avec succès');
        });
    });
};

// Connexion (Route de connexion)
exports.login = (req, res) => {
    const { email, password } = req.body;
    User.findByEmail(email, (err, users) => {
        if (err || users.length === 0) {
            return res.status(404).send('Utilisateur non trouvé');
        }
        bcrypt.compare(password, users[0].password, (err, isMatch) => {
            if (err || !isMatch) {
                return res.status(400).send('Mot de passe incorrect');
            }
            const token = jwt.sign({ userId: users[0].id }, 'votre_clé_secrète', { expiresIn: '1h' });
            res.json({ token });
        });
    });
};
