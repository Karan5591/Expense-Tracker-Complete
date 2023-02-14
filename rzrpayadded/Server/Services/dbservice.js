const connection= require('./database')
const dotenv= require('dotenv')
const bcrypt=require('bcrypt');
let instance=null;
dotenv.config()


class dbService
{
    static getDbServiceInstance()
    {
        return instance ? instance :new dbService();
    }

    async registerUser(name, email, password)
    {

        try{
            let hashPass= await bcrypt.hash(password, 10);
            const response= await new Promise((resolve, reject)=>{

            const sql= "select email from userdata where email=?";
            connection.query(sql, [email], (err, data)=>{
            if(data.length>0)
                {
                    resolve("Email already Registered");
                }
                else{
                    
                const query= 'insert into userdata (name, email, password) values(?,?,?)';
                connection.query(query, [name, email, hashPass], (err, result)=>{
                    if(err)
                    {
                        reject(new Error(err.message))
                    }
                    
                    resolve("User Registered Successfully");
                })
            }
            })
        
        })
        return response;
    }
        catch(err){
            console.log(err);

        }
    }


    async getAllData(id)
    {
        try{
            const response=await new Promise((resolve, reject)=>{
                const query= "select * from expensedata where ID=?";
                connection.query(query,[id], (err, result)=>{
                    if(err)
                    {
                        reject (new Error(err.message));
                    }
                    resolve(result);
                })
            });
            return response;
        }
        catch(err)
        {
            console.log(err);
        }
    }


async insertNewData (id, amount, description, category)
{
    try
    {
        const insertId= await new Promise((resolve, reject)=>{
            const query= 'insert into expensedata (ID, amount, description, category) values (?,?,?,?)';
            connection.query(query, [id, amount, description, category], (err, result)=>{
                if(err)
                {
                    reject(new Error(err.message))
                }
                
                resolve(result.insertId);
            })

        });
        
       return {
        id: insertId,
        amount: amount,
        description: description,
        category: category
       };

    }
    catch(err)
    {
        console.log(err);
    }
}

async deleteRowById(id) {
    try {
        id = parseInt(id, 10); 
        const response = await new Promise((resolve, reject) => {
            const query = "DELETE FROM expensedata WHERE expenseID = ?";

            connection.query(query, [id] , (err, result) => {
                if (err) reject(new Error(err.message));
                resolve(result.affectedRows);
            })
        });

        return response === 1 ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async updateNameById(id, amount, description, category) {
    try {
        id = parseInt(id, 10); 
        const response = await new Promise((resolve, reject) => {
            const query = "UPDATE expensedata SET amount=?, description=?, category=?  WHERE expenseID = ?";
            console.log(id);
            connection.query(query, [amount, description, category, id] , (err, result) => {
                if (err) reject(new Error(err.message));
                resolve(result.affectedRows);
            })
        });

        return response === 1 ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}


}


module.exports=dbService;