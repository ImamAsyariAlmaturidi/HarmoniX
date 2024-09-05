const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const app = express();
const dotenv = require('dotenv')
dotenv.config()
const port = 3000;
const router = require('./routers/router')
const cors = require('cors')
const cookieParser= require('cookie-parser')


app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use(router)

 app.listen(port, () => {
     console.log(`Listening at http://localhost:${port}`);
 });

module.exports = app
