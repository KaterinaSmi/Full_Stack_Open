const express = require('express');
const app = express();
const cors = require('cors');
//necessary json parser
app.use(express.json());
app.use(cors());

//with express we do not need to transform JSOn with stringify method:)
app.get('/', (req,res)=>{
    res.send('<h1>Hello there</h1>');
});

app.get('/about', (req,res)=>{
  res.send('<h1>This is section about</h1>');
});
app.get('/api/notes', (req,res)=>{
  res.json(notes);
});

//creating route for fetching a single resourse:
app.get('/api/notes/:id', (req,res)=>{
  const id = req.params.id;
  const note = notes.find(note=>note.id === id);
  if(note){
    res.json(note);
  } else{
    res.status(404).end('Not found')
  };
});

//deleting resources:
app.delete('/api/notes/:id', (req, res)=>{
  const id = req.params.id;
  notes = notes.filter(note=> note.id !== id);

  res.status(204).end();
})

const generatedId = () =>{
  const maxId = notes.length > 0
  ? Math.max(...notes.map(n=>Number(n.id)))
  :0
  return String(maxId +1);

};
//posting resource:
app.post('/api/notes',(req,res)=>{
  const body = req.body;

  if(!body.content){
    return res.status(400).json({
      error:  'content missing'
    });
  }
  const note ={
    content: body.content,
    important: Boolean(body.important) || false,
    id: generatedId(),
  }
  notes = notes.concat(note);
  res.json(note)
 
});


app.listen(3001, ()=>{
  console.log('the app is running on PORT 3001')
})


// const http = require('http');

let notes = [
    {
      id: "1",
      content: "HTML is easy",
      important: true
    },
    {
      id: "2",
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: "3",
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]
// const app = http.createServer((req,res)=>{
//     if(req.url === '/'){
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello world');
//     } else if (req.url ==='/json'){
//         res.writeHead(200, {'Content-Type': 'application/json'});
//     }
//     res.end(JSON.stringify(notes));
// });

// const PORT = 3001
// app.listen(PORT)
// console.log(`Server is running on port ${PORT}`)