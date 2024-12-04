import express from "express"
import { dbQuery, dbRun } from "../database.js"

const router = express.Router();

router.get("/", async (res, next) =>{
    try{
        const users = await dbQuery("SELECT * FROM users;")
        res.status(200).json(users)
    }catch(err)
    {
        next(err)
    }
})

router.get("/:id", async(req, res, next) =>{
    try{
        const [user] = await dbQuery("SELECT * FROM users WHERE id = ?;", [req.params.id])
        if(!user) return res.status(404).json({ message : "Gatya"})
        res.status(200).json(user)
    }catch(err)
    {
        next(err)
    }
})

router.post("/", async (req, res, next) => {
    try {
        const result = await dbRun("INSERT INTO users (firstName, lastName, email, education) VALUES (?, ?, ?, ?);", [req.body.firstName,req.body.lastName, req.body.email, req.body.education]);
        res.status(201).json({ id: result.lastID, ...req.body });
    } catch (err) {
        next(err);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const user = await dbQuery("SELECT * FROM users WHERE id = ?;", [req.params.id]);
        if (!user) return res.status(404).json({ message: "User not found : gatya" });

        await dbRun("UPDATE users SET firstName = ?,lastName = ?, email = ?, education = ? WHERE id = ?;", 
            [req.body.firstName, req.body.lastName || user.firstName, user.lastName, req.body.email || user.email, req.params.id]);
        res.status(200).json({ id: req.params.id, firstName: req.body.firstName, lastName: req.body.lastName || user.firstName,  email: req.body.email || user.email, });
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const user = await dbQuery("SELECT * FROM users WHERE id = ?;", [req.params.id]);
        if (!user) return res.status(404).json({ message: "Gatya" });

        await dbRun("DELETE FROM users WHERE id = ?;", [req.params.id]);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

export default router;