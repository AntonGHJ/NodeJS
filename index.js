const yargs = require('yargs')
const {addNote, printNotes, removeNotes} = require('./notes.conroller')

yargs.command({
    command:'add',
    describe:'Add new note to list',
    builder:{
        title:{
            type:'string',
            describe: 'Note title',
            demandOption: true
        }
    },
    handler({title}){
        addNote(title)
    }
})
yargs.command({
    command:'list',
    describe:'Print all notes',
   async handler(){
        printNotes()
    }

})
yargs.command({
    command:'remove',
    describe:'Remove a note by id',
    builder:{
      id:{
        type:'string',
        describe: 'Note id',
        demandOption: true
      }
    },
    handler({id}){
      removeNotes(id)
    }
  })

yargs.parse()