import express from 'express';
import path from 'path';
const app = express()
import multer from 'multer';
import {mergePdf} from './merge.js';
const upload = multer({ dest: 'uploads/' })
import { fileURLToPath } from 'url';

const port = 3000
const __dirname = path.dirname(fileURLToPath(import.meta.url));
//now please load my static html and css files for my express app, from my /dist directory
app.use('/static',express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "templates/index.html"))

    app.post('/merge', upload.array('pdfs', 2), async(req, res, next) => {
     await mergePdf(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path))
     res.redirect("http://localhost:3000/static/merged.pdf")
    })

})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})