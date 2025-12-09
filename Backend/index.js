const express = require('express');
const cors = require("cors");
require('dotenv').config();
const https = require("https")

const app = express();
const port = process.env.PORT;

// Izinkan semua origin (sementara untuk development)
app.use(cors());

const userRoutes = require('./routes/users');
const devRoutes = require('./routes/developers')
const gameRoutes = require('./routes/games')
const paymentRoutes = require('./routes/payments')
const libraryRoutes = require("./routes/libraries")
const cartRoutes = require("./routes/carts")
const reportRouters = require("./routes/report-letters")
const revenueRoutes = require("./routes/revenue_web")
const reviewRouters = require("./routes/review-players")
const ratingRouters = require("./routes/rating-players")
const blogRoutes = require("./routes/blogs");
const promoRoutes = require('./routes/promo');




app.use(express.json());

app.use('/user', userRoutes)
app.use('/dev', devRoutes)
app.use('/games', gameRoutes)
app.use('/payment', paymentRoutes)
app.use('/library', libraryRoutes)
app.use('/carts', cartRoutes)
app.use('/laporan-keuangan', reportRouters)
app.use('/revenues', revenueRoutes)
app.use("/review-players", reviewRouters)
app.use("/rating-players", ratingRouters)
app.use("/blogs", blogRoutes);
app.use('/promo', promoRoutes);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
