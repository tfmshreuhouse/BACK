const express = require('express');
const app = express();
const cors = require('cors');
const whitelist = ['http://localhost:3001', 'https://auth-front.bookneat.com.mx'];
app.use(cors());
// app.use(cors({
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     }, // Cambia esto al origen correcto de tu aplicación
//     credentials: true, // Habilita el envío de cookies y otros datos de autenticación
// }));
app.use(express.json());
require('dotenv').config();

const authRoutes = require('./Routes/AuthRoutes');

const db = require('./models')
const { requireAuth } = require('./Middleware/authMiddleware');
const { middlewareValidateRequestFields } = require('./Middleware/globalMiddleware');
const fieldsRequireAuth = ['token'];

app.listen(process.env.LISTENPORT, () => {
    console.log('listening on port ' + process.env.LISTENPORT);
})

app.get('/', (req, res) => {
    db.sequelize.sync();
    res.send('Hello World!');
});

app.use('/auth', authRoutes);