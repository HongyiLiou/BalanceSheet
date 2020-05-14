// Notes.js

function onNoteActive() {
    const noteBooks = document.querySelectorAll('.notesPageBox .noteList ul li .book');
    const noteList = document.querySelector('.notesPageBox .noteList');
    const editNoteArea = document.querySelector('.notesPageBox .editNoteArea');

    editNoteArea.classList.add('hide');

    noteBooks.forEach((book, i) => {
        book.addEventListener('click', () => {
            console.log(123);
            
            noteBooks.forEach((x, j) => {
                if (j !== i && x.classList.contains('active')) {
                    x.classList.remove('active');
                    x.classList.add('back');
                    setTimeout(() => {
                        x.classList.remove('back');
                    }, 400);
                }
            });

            book.classList.add('active');
            setTimeout(() => {
                noteList.classList.add('hide');
                setTimeout(() => {
                    noteList.style.display = 'none';
                    editNoteArea.style.display = 'block';
                    editNoteArea.classList.remove('hide');
                }, 500)
            }, 1000)
        });
    })
}