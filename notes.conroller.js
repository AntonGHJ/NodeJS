const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')


const notesPath = path.join(__dirname, 'db.json')

async function addNote (title){
const notes = await getNotes()
const note = {
    title,
    id: Date.now().toString()
}
notes.push(note)
await fs.writeFile(notesPath, JSON.stringify(notes))
console.log(chalk.bgGreen('Note was added'));
};


async function getNotes(){
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes (){
    const notes = await getNotes()
    console.log(chalk.bgBlue('The list of notes:'));
    notes.forEach(note => {
        console.log(chalk.blue(`${note.id},${note.title}`));
    });
}
async function removeNotes (id){
    const notes = await getNotes()
    const filteredNotes = notes.filter(note => note.id !== id)
    await fs.writeFile(notesPath, JSON.stringify(filteredNotes))
    console.log(chalk.bgRed('Note was removed'));
}

async function updateNote (newData) {
    const notes = await getNotes()
    const index = notes.findIndex(note => note.id === newData.id)
    if (index >= 0) {
        notes[index] = { ...notes[index], ...newData }
        await fs.writeFile(notesPath, JSON.stringify(notes))
    }
}

module.exports = {
    addNote,
    printNotes,
    removeNotes,
    getNotes,
    updateNote
}