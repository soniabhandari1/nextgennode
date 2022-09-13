const e = require('express')
const express=require('express')
const connection=require('../connection')
const router=express.Router()
const auth=require('../services/authentication')
const checkRole=require('../services/checkRole')

router.post('/add',auth.authenticateToken,checkRole.checkRole,(req,res)=>{
    let category=req.body
    let query="insert into category(name) values(?)"
    connection.query(query,[category.name],(err,results)=>{
        if(!err){
          return res.status(200).json({message:'Category added successfully'})
        }
        else{
            return res.status(500).json(err)
        }
    })
    
})

router.get('/get',auth.authenticateToken,checkRole.checkRole,(req,res)=>{
    let query="select * from category order by name"
    connection.query(query,(err,results)=>
    {
        if(!err){
           res.status(200).json(results)
        }
        else{
            res.status(500).json(err)
        }
    }) 
})

router.patch('/update',auth.authenticateToken,checkRole.checkRole,(req,res)=>{
    let product = req.body;
    let query = "update category set name=? where id=?";
    connection.query(query, [product.name, product.id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "Category id does not found" });
            }
            return res.status(200).json({ message: "Category Updated Successfully" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})

module.exports=router