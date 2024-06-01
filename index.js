import express from 'express';
import Jimp from 'jimp';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.listen(3000, () => {
    console.log("Servidor escuchando en puerto 3000")
});

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/imagen-procesada', async (req, res) => {
    const {imgUrl} = req.body;
    try {
        const imagen = await Jimp.read(imgUrl);
        const nombreArchivo = `${uuidv4().split('-')[0]}.jpg`;
        const rutaArchivo = path.join(__dirname, 'public', 'img', nombreArchivo)

        await imagen
        .grayscale()
        .writeAsync(rutaArchivo);

        res.redirect(`/img/${nombreArchivo}`);

    } catch (error) {
        res.status(500).send('Error procesando la imagen.');
    }
});