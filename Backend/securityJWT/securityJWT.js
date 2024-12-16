const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => { // Elle est utilisée pour protéger les routes qui nécessitent une authentification avant d'être accessibles
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send({ message: 'Token manquant' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send({ message: 'Token invalide ou expiré' });
        req.user = user; // Ajoute les infos de l'utilisateur dans la requête
        next();
    });
};

module.exports = authenticateToken;
