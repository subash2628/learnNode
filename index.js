const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser");
const { v4 } = require('uuid');
const port = process.env.port || 5000
const production  = '';
const development = `http://localhost:${port}`;
const serverUrl = (process.env.NODE_ENV ? production : development);




var Tasks = [
    {
        "text":"Tesk Task 1",
        "day":"Sunday",
        "reminder":true,
        "id":"1"
    },
    {
        "text":"Test Task 2",
        "day":"Monday",
        "reminder":false,
        "id":"2"
    }
]

// app.use(cors({
//     origin: ["http://localhost:3000"]
// }));

app.use(bodyParser.json({}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))


// app.get('/', (req, res) => {
//   res.status(200).send('Hello World! page refreshed')
// })

app.get('/task/all',(req,res)=>{
    res.status(200).json(Tasks)
})

app.get('/task/:id',(req,res)=>{
    const id = req.params.id
    const task = Tasks.filter(task=>task.id===id)
    res.status(200).json(task[0])
})

app.put('/task/update/:id',(req,res)=>{
    const id = req.params.id
    const updateTask = req.body
   
    Tasks = Tasks.map(task=>
        task.id === id ? { ...updateTask, reminder: !task.reminder } : task
    )

    res.json({flag:true,message:"successfully updated task with id "+ id})
})

app.delete('/task/delete/:id',(req,res)=>{
    //write logic to delete 

    const id = req.params.id

    Tasks = Tasks.filter(task=>task.id !== id)

    res.json({flag:true,message:"successfully deleted task with id "+ id})

})

app.post('/task/add',(req,res)=>{
    
    //console.log(req.body)
    const task = { ...req.body,id:v4() }
    //console.log(task);

    Tasks.push(task)

    //if everthing okk , then give response
    res.json(task);
})


// app.listen(port, () => {
//     //console.log(v4())
//   console.log(`server started on port ${port}`)
// })