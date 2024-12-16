const db = require('../config/db');

const Notification = {
    // Créer une notification
    create: (notification, callback) => {
        const query = 'INSERT INTO notifications (user_id, content) VALUES (?, ?)';
        const values = [notification.user_id, notification.content];
        db.query(query, values, callback);
    },

    // Récupérer toutes les notifications d'un utilisateur
    getAll: (userId, callback) => {
        const query = 'SELECT * FROM notifications WHERE user_id = ?';
        db.query(query, [userId], callback);
    },

    // Marquer une notification comme lue
    markAsRead: (notificationId, callback) => {
        const query = 'UPDATE notifications SET is_read = TRUE WHERE id = ?';
        db.query(query, [notificationId], callback);
    }
};

module.exports = Notification;
