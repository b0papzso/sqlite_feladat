import express from "express"
import cors from "cors"
import { initializeDB } from "./database.js"
import userRouter from "./routes/users.js"


const app = express()

app.use(cors())
app.use(express.json)
app.use("/users", userRouter)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
});

const startServer = async () => {
    await initializeDB();
    app.listen(2000, () => console.log("Szerver  durrog kettőezren"));
};

startServer();