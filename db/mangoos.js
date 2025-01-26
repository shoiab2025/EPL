import mongoose from "mongoose"
import chalk from 'chalk'

const mongoDb = async() => {
    try {
        await mongoose.connect(process.env.MANGO_DB_URI)
        console.log(chalk.yellow("Connected to MongoDB"))
        
    } catch (error) {
        console.error("error connecting mongodb", error)
        console.table(error)
    }
}

export default mongoDb