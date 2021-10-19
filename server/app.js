require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const connectDB = require('./src/config/db');
const nocache = require('nocache');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(helmet());
app.use(morgan('dev'));
app.use(cors())
app.use(nocache());
app.use(express.static('uploads'));

app.use('/api',require('./src/routes/authRoutes'));
app.use('/api',require('./src/routes/userRoutes'));
app.use('/api',require('./src/routes/folderRoutes'));
app.use('/api',require('./src/routes/fileRoutes'));
app.use('/api',require('./src/routes/paymentRoute'));
app.use('/api',require('./src/routes/adminRoutes'));

connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
	console.log(`App listening to port ${PORT}`)
});