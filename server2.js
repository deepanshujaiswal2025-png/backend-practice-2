import express from 'express';
import {Client} from 'pg';

const app = express();
const PORT = 4000;

app.use(express.json());

const con = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "ppsspp",
    database: "backend_database"
});

con.connect().then(() => {
    console.log("Database connected");
})

app.post('/', (req, res) => {
    const {name, age} = req.body;
    const insert_query = "INSERT INTO sample_table (name, age) VALUES ($1, $2)";
    con.query(insert_query, [name, age], (err, result) => {
        if(!err){
            console.log(result);
            res.send('POSTED DATA');
        }
    });
});

app.get('/', (req, res) => {
    const fetch_query = " SELECT * FROM sample_table"
    con.query(fetch_query, (err, result) => {
        if(!err){
            res.send(result.rows);
        }else{
            res.send(err);
        }
    });
})

app.listen(PORT, () => {
    console.log("Server is running");
})


