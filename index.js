import quotes from './quotes.json' assert { type: 'json' };
// When Extention DOM Loads
document.addEventListener('DOMContentLoaded', function() {
    Store.init()
    let notes = document.querySelectorAll(".note");
    notes.forEach((note) => {
        note.addEventListener("input", Store.saveNotes)
    })
    let quote = document.querySelector('.quote');
    let author = document.querySelector('.author');
    let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quote.innerText = randomQuote['quote'];
    author.innerText = randomQuote['author'];
});

// dummy quotes 
const dummyQuotes = [
    "Any fool can write code that a computer can understand. Good coders write code that human understands.",
    "First solve the problem. Then, write the code.",
    "Experience is the name of everyone gives to thier mistakes.",
    "In order to be irreplacable, one can always be different.",
    "Code is like humor, when you have to explain it it's bad.",
    "Fix the cause, not the symptum.",
    "Simplicity is the soul of efficiency.",
    "Make it work, make it right, make it fast.",
    "Before software can be reusable it has to be usable,"
]

class Store {
    static getNotes = () => {
        let notes = JSON.parse(localStorage.getItem("notes")) ?? []
        return notes
    }

    static saveNotes = () => {
        let notes = document.querySelectorAll(".note");
        let data = []
        notes.forEach((note, index) => {
            data.push({ id: note.id, note: note.value })
        })
        localStorage.setItem('notes', JSON.stringify(data))
    }

    static init = () => {
        let notes = this.getNotes();
        notes.forEach((note, index) => {
            document.querySelector("#"+note.id).value = note.note
        })
    }
}