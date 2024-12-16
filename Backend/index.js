const express = require('express');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const projectRoutes = require('./routes/projects');
const messageRoutes = require('./routes/messages');
const notificationRoutes = require('./routes/notifications');
const db = require('./config/db');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

// Créez une instance d'Express
const app = express();
app.use(cors());
app.use(express.json());

// Utiliser les routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/projects', projectRoutes);   // Ajoutez la gestion des projets
app.use('/messages', messageRoutes);   // Ajoutez la gestion des messages
app.use('/notifications', notificationRoutes);   // Ajoutez la gestion des notifications

// Créez un serveur HTTP avec Express
const server = http.createServer(app);

// Initialisez Socket.IO avec ce serveur
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

// Gérer la connexion et la communication en temps réel via Socket.IO
io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté.');

    // Lorsque l'utilisateur rejoint un projet 
    socket.on('joinProject', (projectId) => {
        socket.join(projectId);
        console.log(`Utilisateur a rejoint le projet: ${projectId}`);
    });

    // Envoyer un message dans un projet
    socket.on('sendMessage', (data) => {
        io.to(data.projectId).emit('newMessage', data);  // Émet le message à tous les utilisateurs du projet

        // Ajouter une notification pour les utilisateurs du projet
        db.query(`INSERT INTO notifications (user_id, project_id, content, is_read) VALUES (?, ?, ?, 0)`,
            [data.userId, data.projectId, `Nouveau message dans le projet ${data.projectId}`],
            (err, _result) => {
                if (err) console.error(err);
            }
        );
        console.log(`Message envoyé au projet: ${data.projectId}`);
    });

    // Lorsque l'utilisateur se déconnecte
    socket.on('disconnect', () => {
        console.log('Un utilisateur s\'est déconnecté.');
    });
});

// Lancer le serveur HTTP
app.listen(5000, () => {
    console.log('Serveur backend lancé sur http://localhost:5000');
  });