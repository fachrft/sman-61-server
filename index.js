const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require('./Config/Database.js')
const path = require('path')
const AdminRouter = require('./Router/AdminRoute.js')
const ArtikelRouter = require('./Router/ArtikelRoute.js')
const GalleryRouter = require('./Router/GalleryRoute.js')
const MajalahRouter = require('./Router/MajalahRoute.js')
const PojokKarya = require('./Router/PojokKaryaRoute.js');
dotenv.config();
const app = express();

// (async() => {
//     await db.sync()
// })()

app.use(
    cors({
        credentials: true,
        origin: "https://nasa-pers.vercel.app/",
    })
);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))


app.use(cookieParser());
app.use(express.json());
app.use(AdminRouter)
app.use(ArtikelRouter)
app.use(GalleryRouter)
app.use(MajalahRouter)
app.use(PojokKarya)

app.listen(process.env.PORT, () => {
    console.log("listening on port " + process.env.PORT);
});
