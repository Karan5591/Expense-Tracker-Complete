const sql= require('mysql2')
const dotenv= require('dotenv')
const bcrypt=require('bcrypt');


let instance=null;


dotenv.config()


const connection= sql.createConnection
({
   
    host: process.env. DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT

});

connection.connect((err)=>{
    if(err)
    {
        console.log(err.message);
    }
    console.log("Database Connected");
});

module.exports=connection;