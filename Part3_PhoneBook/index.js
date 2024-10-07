const express = require('express');
const app = express();
const morgan = require('morgan'); 
app.use(morgan('tiny'));
// necessary json parser
app.use(express.json());

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

// Define the route to get data
app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;

    const newPerson = persons.find(p=> p.id === id);

    if(newPerson){
        res.json(newPerson);
    }else {
        res.status(404).json({
            error: 'Non found'
        });
    };
});


app.get('/info',(req,res)=>{
    const people = persons.length;
    const currentDate = new Date();
    let message;
    if(people ===0){
        message = 'Phone book has no entries.';
    }else if (people ===1){
        message = '1 Person has been added.';
    }else{
        message = `${people} People have been added.`
    }
    res.send(
        `<p>${message}</p>
        <p>${currentDate}</p>`
    );
});

app.delete('/api/persons/:id',(req,res)=>{
    const id = req.params.id
    persons = persons.filter( p=> p.id !== id);


    res.status(204).end();
});



const generateId =()=>{
    const newId = Math.floor(Math.random ()* 100000).toString();

    return newId;
    
}
app.post('/api/persons',(req,res)=>{
    
    const body = req.body;

    if(!body.name || !body.number){
        return res.status(400).json({
            error: 'Missing name or number'
        });
    }
    const nameExists = persons.some(person => person.name === body.name)
    if (nameExists) {
        return res.status(400).json({
            error: 'Name must be unique'
        });
    };
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    };
    persons.push(person);
    res.status(201).json(person);
});

app.listen(3001, () => {
    console.log("App is running at port 3001");
});
