// Notes.js

function onNoteActive() {
    const noteBooks = document.querySelectorAll('.notesPageBox .noteList ul li .book');

    noteBooks.forEach(book => {
        book.addEventListener('click', () => {
            noteBooks.forEach(x => {
                x.classList.remove('active');
            });
            book.classList.add('active');
        });
    })
}