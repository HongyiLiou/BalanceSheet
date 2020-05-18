// Notes.js




/** 重新載入記事本 */
function onNoteActive() {
    const noteBooks = document.querySelectorAll('.notesPageBox .noteList ul li .book');
    const noteList = document.querySelector('.notesPageBox .noteList');
    const editNoteArea = document.querySelector('.notesPageBox .editNoteArea');
    const noteNo = document.querySelector('.notesPageBox .noteNo');

    
    editNoteArea.classList.add('hide');

    noteBooks.forEach((book, i) => {
        book.addEventListener('click', () => {
            
            editNoteArea.classList.add('hide');
            // editNoteArea.style.display = 'block';
            noteNo.value = i;
            
            noteBooks.forEach((x, j) => {
                x.style.pointerEvents = 'none';
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
                    // noteList.style.display = 'none';
                    editNoteArea.classList.remove('hide');
                }, 500)

            }, 1000)
        });
    })
}


/** 取消按鈕 */
function onNoteCancelBtn() {
    const noteNo = document.querySelector('.notesPageBox .noteNo');
    const noteBooks = document.querySelectorAll('.notesPageBox .noteList ul li .book');
    const noteList = document.querySelector('.notesPageBox .noteList');
    const editNoteArea = document.querySelector('.notesPageBox .editNoteArea');

    noteNo.value = '';
    editNoteArea.classList.add('hide');
    
    setTimeout(() => {
        noteList.classList.add('hide');
        // editNoteArea.style.display = 'none';
        // noteList.style.display = 'block';
        setTimeout(() => {
            noteList.classList.remove('hide');

            setTimeout(() => {
                noteBooks.forEach(x => {
                    x.style.pointerEvents = 'auto';
                    if (x.classList.contains('active')) {
                        x.classList.remove('active');
                        x.classList.add('back');
                        setTimeout(() => {
                            x.classList.remove('back');
                        }, 500)
                    }
                })
            }, 100)
        }, 500);

    }, 500);

}