import express from "express";
import mangoDb from './db/mangoos.js'
import dotenv from "dotenv";
import chalk from 'chalk'
import morgan from "morgan";
import listEndpoints from "express-list-endpoints";
import cookieParser from 'cookie-parser'
import fs from 'fs';


import authRoutes from './routes/userRoutes.js'
import GroupRoutes from './routes/groupRoutes.js'
import materialRoutes from './routes/materialRoutes.js';
import quizTypeRoutes from './routes/quizTypeRoutes.js';
import testCategoryRoutes from './routes/testCategoryRoutes.js';
import testRoutes from './routes/testRoutes.js';
import achievementRoutes from "./routes/achievementRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log(`Created directory: ${uploadDir}`);
}

app.use(express.json());
app.use(cookieParser())
app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));

app.use('/api/v1/users', authRoutes)
app.use('/api/v1/group', GroupRoutes)
app.use('/api/v1/meterials', materialRoutes)
app.use('/api/v1/quiztypes', quizTypeRoutes);
app.use('/api/testcategories', testCategoryRoutes);
app.use("/api/v1/tests", testRoutes);
app.use('/api/v1/achievement', achievementRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'The URL is incorrect' });
  });

const endpoints = listEndpoints(app);
console.log(endpoints);
app.listen(PORT,() => {
    console.log(chalk.magenta(`http://localhost:${PORT}`))
    mangoDb()
  })
