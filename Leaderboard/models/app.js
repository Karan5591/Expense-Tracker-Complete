

const sequelize= require("../util/database")
const users= require("./users")
const expenses=require("./expenses")
const PremiumUser=require("./premiumUser")

// users.hasOne(PremiumUser);

 users.hasMany(expenses, {
    foreignKey: 'user_id',
   
});
expenses.belongsTo(users, {
    foreignKey: 'user_id',
    
    
})


// users.hasMany(expenses)
// expenses.belongsTo(users)

sequelize
.sync({force:true})
.then((result)=>{
    console.log(result);
})
.catch((err)=>{
    console.log(err);
})

