const db = require('../config/db');

const User = {
    // Créer un utilisateur
    create: (user, callback) => {
        const query = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
        const values = [user.username, user.email, user.password, user.role];
        db.query(query, values, callback);
    },

    // Récupérer un utilisateur par son email
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], callback);
    },

    // Récupérer un utilisateur par son ID
    findById: (id, callback) => {
        const query = 'SELECT * FROM users WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = User;
