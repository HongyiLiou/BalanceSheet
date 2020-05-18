// Notes.js


/** 初始化記事本 */
function getNotes() {
    showLoading(true);

    const accountNumber = JSON.parse(localStorage.getItem('login')).AccountNumber;
    const parameter = {
        accountNumber: accountNumber,
        functionType: 'get',
    };
    $.get('https://script.google.com/macros/s/AKfycbxzVWS4ccSSQx8Cp7pgzVhsU9j9m2JSN3Vnfe7HJ7X8oUE8RYE/exec', parameter).done(res => {
        showLoading(false);
        // console.log('Notes:', res);

        const resData = res;
        const noteList = document.querySelector('.notesPageBox .noteList ul');
        const outputData = [];

        noteList.innerHTML = '';

        // 沒有記事本時
        if (resData === 'true') {
            noteList.innerHTML = `
                <li>
                    <div class="book addNew" title="新增一本新的記事本">
                        <div class="firstPage">
                            <p class="bookTitle">？？？</p>
                        </div>
                        <div class="backPages"></div>
                    </div>
                    <p class="noteTitle addNew">新增記事本</p>
                </li>
            `;
        }

        resData.forEach(data => {
            const listData = {
                name: data[0],
                color: data[1],
                content: data[2]
            };
            outputData.push(listData);
        });

        console.log('Notes:', outputData);
        
        outputData.forEach((book, i) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="book ${book.color === 'default' ? '' : book.color}" title="${book.name}">
                    <div class="firstPage">
                        <p class="bookTitle">${book.name}</p>
                    </div>
                    <div class="backPages"></div>
                </div>
                <p class="noteTitle">${book.name}</p>
            `;
            noteList.appendChild(li);

        })

        noteList.innerHTML = noteList.innerHTML + `
            <li>
                <div class="book addNew" title="新增一本新的記事本">
                    <div class="firstPage">
                        <p class="bookTitle">？？？</p>
                    </div>
                    <div class="backPages"></div>
                </div>
                <p class="noteTitle addNew">新增記事本</p>
            </li>        
        `;
        
        const noteBooks = document.querySelectorAll('.notesPageBox .noteList ul li .book');
        noteBooks.forEach((book, i) => {
            if (!book.classList.contains('addNew')) {
                book.addEventListener('click', () => {
                    openNotebook(outputData[i]);
                })
            }
        });

        onNoteActive();
    });
}


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


/**
 * 開啟一本記事本
 * @param {{
 *  name: string
 *  color: string
 *  content: string
 * }} book 
 */
function openNotebook(book) {
    const noteTitleInput = document.querySelector('.notesPageBox .editNoteArea .noteTitleInput');
    const colorInput = document.querySelector('.notesPageBox .editNoteArea .noteColorSelect');
    const noteContentTextArea = document.querySelector('.notesPageBox .editNoteArea .noteContentTextArea');

    noteTitleInput.value = book.name;
    colorInput.value = book.color;
    noteContentTextArea.value = book.content;
    changeNoteColor(book.color);

}


function changeNoteColor(color) {
    const book = document.querySelector('.notesPageBox .editNoteArea .top .book');
    book.className = 'book active';
    book.classList.add(color);
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
        }, 500);

    }, 500);

}

// https://script.google.com/macros/s/AKfycbxzVWS4ccSSQx8Cp7pgzVhsU9j9m2JSN3Vnfe7HJ7X8oUE8RYE/exec
