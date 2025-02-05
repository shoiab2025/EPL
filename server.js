import express from "express";
import mangoDb from './db/mangoos.js'
import dotenv from "dotenv";
import chalk from 'chalk'
import morgan from "morgan";
import listEndpoints from "express-list-endpoints";
import cookieParser from 'cookie-parser'


import authRoutes from './routes/userRoutes.js'
import GroupRoutes from './routes/groupRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser())
app.use(morgan("dev"));

app.use('/api/v1/users', authRoutes)
app.use('/api/v1/group', GroupRoutes)

// app.get('*', (req, res) => {
//     res.status(404).json({error: 'The url is incorrect'})
// })

app.use((req, res) => {
    res.status(404).json({ error: 'The URL is incorrect' });
  });

// const endpoints = listEndpoints(app);
// console.log(endpoints);
app.listen(PORT,() => {
    console.log(chalk.magenta(`http://localhost:${PORT}`))
    mangoDb()
  })
