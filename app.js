const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
    describe: "Title of note",
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: "Body of note",
    demand: true,
    alias: 'b'
};

const argv = yargs
    .command('add', "Add a new note", {
        title: titleOptions,
        body: bodyOptions
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .help()
    .argv;

var command = argv._[0];
switch (command) {
    case 'add':
        console.log('Adding new note');
        var note = notes.addNote(argv.title, argv.body);
        if(note){
            console.log('Note created');
            notes.logNote(note);
        }
        else {
            console.log('Note was not saved. Duplicate title.');
        }
        break;

    case 'remove':
        console.log('Removing note');
        var noteRemoved = notes.removeNote(argv.title);
        var message = noteRemoved ? 'Note was removed' : 'Note was not removed';
        console.log(message);
        break;

    case 'list':
        console.log('Listing notes');
        var allNotes = notes.getAll();
        console.log(`Printing ${allNotes.length} note(s)`);
        allNotes.forEach(note => {
            notes.logNote(note);
        });
        break;

    case 'read':
        var note = notes.getNote(argv.title);
        if(note){
            console.log('Note found');
            notes.logNote(note);
        }
        else {
            console.log('Note was not found.');
        }
        break;

    default:
        console.log('Command not recognised');
        break;
}