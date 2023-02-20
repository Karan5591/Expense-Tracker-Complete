const Sequelize= require("sequelize");

const sequelize= new Sequelize("myprojects", "root", "Password@4321",{
    dialect: "mysql",
    host:"localhost"
});

const User= sequelize.define('user',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true,
    },
    name:{
        type: Sequelize.STRING,
        
    },
    email:{
        type: Sequelize.STRING,
        
    },
    password:{
        type: Sequelize.STRING,
       
    },
    ispremium:{
        type: Sequelize.STRING,
       
    }
},
{
    freezeTableName: true
 
});

User.sync().then(()=>{
    console.log("Table and model sync");
}).catch ((err)=>{
    console.log()
})