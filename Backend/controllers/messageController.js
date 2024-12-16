const Message = require('../models/message');

// Créer un message
exports.createMessage = (req, res) => {
    const { project_id, user_id, content } = req.body;
    const newMessage = { project_id, user_id, content };
    Message.create(newMessage, (err, result) => {
        if (err) {
            return res.status(500).send('Erreur lors de l\'envoi du message');
        }
        res.status(201).send('Message envoyé avec succès');
    });
};

// Obtenir tous les messages d'un projet
exports.getMessages = (req, res) => {
    const projectId = req.params.projectId;
    Message.getAll(projectId, (err, messages) => {
        if (err) {
            return res.status(500).send('Erreur lors de la récupération des messages');
        }
        res.json(messages);
    });
};
