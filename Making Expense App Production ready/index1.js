const express= require('express');
const cors=require('cors')
const bodyParser= require('body-parser')
const routes= require('./routes/routes')
const path= require('path')
const cookieParser= require('cookie-parser')

const app=express();
app.use(cookieParser());



const users= require("./models/users")
const expenses=require("./models/expenses")


users.hasMany(expenses, {
    foreignKey: 'user_id',
   
});
expenses.belongsTo(users, {
    foreignKey: 'user_id'
})

app.use(cors());
//app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
//app.use(express.static(path.join(__dirname,"public")));

app.use("/", routes);

app.listen((3000), (req, res)=>{
    console.log("Server Started");
});