const db = require('../config/db');

const Message = {
    // Créer un message dans un projet
    create: (message, callback) => {
        const query = 'INSERT INTO messages (project_id, user_id, content) VALUES (?, ?, ?)';
        const values = [message.project_id, message.user_id, message.content];
        db.query(query, values, callback);
    },

    // Récupérer tous les messages d'un projet
    getAll: (projectId, callback) => {
        const query = 'SELECT * FROM messages WHERE project_id = ?';
        db.query(query, [projectId], callback);
    }
};

module.exports = Message;
