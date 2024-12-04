import sqlite3 from "sqlite3"

const db = new sqlite3.Database("./database.sqlite")

const initializeDB = async () =>{
    //await dbRun("DROP TABLE USERS")
    await dbRun("CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, email TEXT , education TEXT)")
    /*const users = [
        { firstName: "John Doe", lastName: "vrum vrum", email: "john.doe@example.com", education:"None" },
        { firstName: "John Doe", lastName: "vrum vrum", email: "john.doe@example.com", education:"None" },
        { firstName: "John Doe", lastName: "vrum vrum", email: "john.doe@example.com", education:"None" },
    ];

    for (const user of users) {
        await dbRun("INSERT INTO users (firstName, lastName, email, education) VALUES (?, ?, ?, ?)", [user.firstName, user.lastName,user.email, user.education]);
    }*/
};

function dbQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function dbRun(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
}

export { db, dbQuery, dbRun, initializeDB };