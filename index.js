const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser");
//import { v4 as uuidv4 } from 'uuid';
const { v4 } = require('uuid');

const port = process.env.port || 5000



var Tasks = [
    {
        "text":"learn react",
        "day":"monday",
        "id":"1"
    },
    {
        "text":"learn react",
        "day":"monday",
        "id":"2"
    },
    {
        "text":"learn react tuesday",
        "day":"tuesday",
        "id":"3"
    }
]

app.use(cors({
    origin: ["http://localhost:3000"]
}));

app.use(bodyParser.json({}))
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).send('Hello World! page refreshed')
})

app.get('/task/all',(req,res)=>{
    res.status(200).json(Tasks)
})

app.delete('/task/delete/:id',(req,res)=>{
    //write logic to delete 
    console.log(req.params.id)

    const id = req.params.id

    Tasks = Tasks.filter(task=>task.id !== id)

    res.json({flag:true,message:"successfully deleted with id "+ id})

})

app.post('/task/add',(req,res)=>{
    
    
    const task = { ...req.body,id:v4() }
    //console.log(task);

    Tasks.push(task)

    //if everthing okk , then give response
    res.json(task);
})


app.listen(port, () => {
    //console.log(v4())
  console.log(`server started on port ${port}`)
})