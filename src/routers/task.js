const express = require('express')
const Task = require('../models/task')
const router = new express.Router()
router.post('/task',async(req,res)=>{
    const body = req.body
        const task = new Task(body)
    try{
        await task.save()
        res.status(201).json({
            Message:'User Created'
        })

    }
    catch(e){
        res.status(400).send(e)
        

    }

})
router.get('/',(req,res)=>{
    res.json({
        Message:'Welcome'
    })

})
router.get('/tasks',async(req,res)=>{
   const{page=1,limit=10} = req.query
   const title = req.body.title
   const completed = req.body.completed
   const desc = req.body.description
  

    try{
        const task = await Task.find()
        /* .limit(limit*1)
        .skip((page-1)*limit)
        .exec() */
        const count = await Task.countDocuments()
        res.send(task)
      
       /*  res.json({
           title:`${title}`,
           completed:`${completed}`,
           desc:`${desc}`
    
        }) */


        
      
        

    }
    catch(e){
        res.status(400).send(e)

    }

})
router.get('/task/:id',async(req,res)=>{
    const id = req.params.id
   
    try{
        const task =  await Task.findById(id)
        if(!task){
            res.status(404).send()
        }
        const complete  = req.body.completed
        //res.send(complete)


    }
    catch(e){
    res.status(400).send(e)
    }

})
router.patch('/task/:id',async(req,res)=>{
    try{
        const id = req.params.id
        const body = req.body
        const updateTask = await Task.findByIdAndUpdate(id,body,{new:true,runValidators:true})
        if(!updateTask){
            res.status(404).send()
        }
        res.send(updateTask)
        


    }
    catch(e){
       res.status(400).send(e)
    }

})
router.delete('/task/:id',async(req,res)=>{
    try{
        const id = req.params.id
        const removetask =  await Task.findByIdAndDelete(id)
        if(!removetask){
            res.status(404).send()
        }
        res.send(removetask)


    }
    catch(e){
        res.status(400).send(e)

    }

})
module.exports = router