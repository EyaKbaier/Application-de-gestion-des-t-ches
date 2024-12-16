const mysql = require('mysql2');
const dotenv = require('dotenv'); // Permet de garder les informations sensibles (comme les Id's de base de données) hors du code source

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        process.exit();
    }
    console.log('Connecté à la base de données MySQL.');
});

module.exports = db; // Permettant à d'autres fichiers du projet de l'importer et de l'utiliser pour interagir avec la base de données
