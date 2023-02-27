
const chalk = require('chalk')
const express = require('express')
const path = require('path')
const { addNote, getNotes, removeNotes, updateNote } = require('./notes.conroller')

const port = 3002

const app = express()
app.set('view engine', 'ejs')
app.set('views', 'pages')
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.json())
app.use(
  express.urlencoded({
    extended:true
  })
)

app.get('/', async (req, res) => {
  res.render('index', {
    title: 'Express app',
    notes: await getNotes(),
    created: false
  })
})

app.post('/', async (req, res) => {
  const title = req.body.title;
  const notes = await getNotes();
  const existingNote = notes.find(note => note.title === title);
  if (existingNote) {
    res.render('index', {
      title: 'Express app',
      notes: notes,
      created: false
    })
  } else {
    await addNote(title);
    res.render('index', {
      title: 'Express app',
      notes: await getNotes(),
      created: true
    })
  }
})

app.delete('/:id', async (req, res) => {
 await removeNotes(req.params.id);
  res.render('index', {
    title: 'Express app',
    notes: await getNotes(),
    created: false
  })
})

app.put('/:id', async (req, res) => {
  await updateNote({ id: req.params.id, title: req.body.title })
  res.render('index', {
      title: 'Express App',
      notes: await getNotes(),
      created: false
  })
})

app.listen(port, () => {
  console.log(chalk.green(`Server start on port ${port}`));
  })

//Example server without Express

/*const server = http.createServer(async (request, response) => {
  if(request.method === 'GET') {
    const content = await fs.readFile(path.join(basePath, 'index.html'))
    
    response.writeHead(200, {
      'Content-Type' : 'text/html'
    })
    response.end(content)
  } else if (request.method === 'POST'){
    const body = []
    response.writeHead(200, {
      'Content-Type':'text-plain; charset = utf-8'
    })

    request.on('data', data => {
      body.push(Buffer.from(data))
    })

    request.on('end', () => {
      const title = body.toString().split('=')[1].replaceAll('+', ' ')
      addNote(title)
      response.end(`Title = ${title} `)
    })
   
  }
})

*/