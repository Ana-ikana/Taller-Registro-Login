const jwt = require('jsonwebtoken');

// Con este middleware se verificará la validez del JWT en las solicitudes
const autenticarToken = (req, res, next) => {
    // Se obtiene el token del HTTP header "Authorization"
    // Los tokens se envían en el formato "Bearer <TOKEN_JWT>"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // Verificar si existe el token
    if (token == null) {
        return res.status(401).json({
            error: 'Token de autenticación requerido'
        });
    }

    // Verificar el JWT
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

        // Si hay un error al verificar el token
        if (err) {
            console.error('JWT error de verificación:', err);
            return res.status(403).json({
                error: 'Token inválido o expirado'
            });
        }

        // Si el token es válido
        req.user = user;

        next();
    });
};

// EXPORTAR EL MIDDLEWARE
module.exports = autenticarToken;