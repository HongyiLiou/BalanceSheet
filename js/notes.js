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

        noteAddMode(false);
        const resData = res;
        const noteList = document.querySelector('.notesPageBox .noteList ul');
        const outputData = [];

        noteList.innerHTML = '';

        // 沒有記事本時
        if (resData === 'true') {
            noteList.innerHTML = `
                <li>
                    <div class="book addNew" title="新增一本新的記事本" onclick="noteAddMode(true)">
                        <div class="firstPage">
                            <p class="bookTitle">？？？</p>
                        </div>
                        <div class="backPages"></div>
                    </div>
                    <p class="noteTitle addNew">新增記事本</p>
                </li>
            `;
        } else {

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
                    <div class="book addNew" title="新增一本新的記事本" onclick="noteAddMode(true);onAddNote;">
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

        }

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
                    }, 500);
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
 * 新增/儲存記事本
 * @param {boolean} addNew 
 */
function noteAddMode(addNew) {
    const deleteNote = document.querySelector('.notesPageBox .editNoteArea .deleteNote');
    const saveNote = document.querySelector('.notesPageBox .editNoteArea .saveNote');
    const addNote = document.querySelector('.notesPageBox .editNoteArea .addNote');

    if (addNew) {
        deleteNote.style.display = 'none';
        saveNote.style.display = 'none';
        addNote.style.display = 'block';
        changeNoteColor(null);
    } else {
        deleteNote.style.display = 'block';
        saveNote.style.display = 'block';
        addNote.style.display = 'none';
    }
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


/** 變更記事本顏色 */
function changeNoteColor(color) {
    const book = document.querySelector('.notesPageBox .editNoteArea .top .book');
    book.className = 'book active';
    book.classList.add(color);
}


/** 取消按鈕 */
function onNoteCancelBtn() {
    const noteBooks = document.querySelectorAll('.notesPageBox .noteList ul li .book');
    const noteList = document.querySelector('.notesPageBox .noteList');
    const editNoteArea = document.querySelector('.notesPageBox .editNoteArea');

    const noteNo = document.querySelector('.notesPageBox .noteNo');
    const noteTitleInput = document.querySelector('.notesPageBox .editNoteArea .noteTitleInput');
    const colorInput = document.querySelector('.notesPageBox .editNoteArea .noteColorSelect');
    const noteContentTextArea = document.querySelector('.notesPageBox .editNoteArea .noteContentTextArea');

    noteAddMode(false);
    editNoteArea.classList.add('hide');
    
    setTimeout(() => {
        noteList.classList.add('hide');
        noteNo.value = '';
        noteTitleInput.value = '';
        colorInput.value = 'default';
        noteContentTextArea.value = '';
        // editNoteArea.style.display = 'none';
        // noteList.style.display = 'block';
        setTimeout(() => {
            noteList.classList.remove('hide');

            noteBooks.forEach(x => {
                x.style.pointerEvents = 'auto';
                if (x.classList.contains('active')) {
                    x.classList.remove('active');
                    x.classList.add('back');
                    // setTimeout(() => {
                    //     x.classList.remove('back');
                    // }, 500)
                }
            })
        }, 500);

        noteBooks.forEach(book => {
            setTimeout(() => {
                book.classList.remove('back');
            }, 1000);
        });
        

    }, 500);
}


/** 儲存按鈕 */
function onNoteSaveBtn() {
    showLoading(true);

    const noteNo = document.querySelector('.notesPageBox .noteNo');
    const noteTitleInput = document.querySelector('.notesPageBox .editNoteArea .noteTitleInput');
    const colorInput = document.querySelector('.notesPageBox .editNoteArea .noteColorSelect');
    const noteContentTextArea = document.querySelector('.notesPageBox .editNoteArea .noteContentTextArea');

    const accountNumber = JSON.parse(localStorage.getItem('login')).AccountNumber;
    const parameter = {
        accountNumber: accountNumber,
        functionType: 'post',
        index: noteNo.value,
        data1: noteTitleInput.value,
        data2: colorInput.value,
        data3: noteContentTextArea.value,
    };
    
    $.get('https://script.google.com/macros/s/AKfycbxzVWS4ccSSQx8Cp7pgzVhsU9j9m2JSN3Vnfe7HJ7X8oUE8RYE/exec', parameter).done(res => {
        showLoading(false);
        getNotes();
        onNoteCancelBtn();
        const popupObj = {
            text: '已儲存',
        }   
        showPopupBox(popupObj);
    });
}


/** 新增記事本 */
function onAddNote() {
    showLoading(true);

    const noteTitleInput = document.querySelector('.notesPageBox .editNoteArea .noteTitleInput');
    const colorInput = document.querySelector('.notesPageBox .editNoteArea .noteColorSelect');
    const noteContentTextArea = document.querySelector('.notesPageBox .editNoteArea .noteContentTextArea');

    const accountNumber = JSON.parse(localStorage.getItem('login')).AccountNumber;
    const parameter = {
        accountNumber: accountNumber,
        functionType: 'add',
        data1: noteTitleInput.value,
        data2: colorInput.value,
        data3: noteContentTextArea.value,
    };
    
    $.get('https://script.google.com/macros/s/AKfycbxzVWS4ccSSQx8Cp7pgzVhsU9j9m2JSN3Vnfe7HJ7X8oUE8RYE/exec', parameter).done(res => {
        showLoading(false);
        getNotes();
        onNoteCancelBtn();
        const popupObj = {
            text: `已新增 "${noteTitleInput.value}" 記事本`,
        }   
        showPopupBox(popupObj);
    });

}


/** 刪除記事本 */
function onNoteDeleteBtn() {
    const noteNo = document.querySelector('.notesPageBox .noteNo');


    const popupObj = {
            text: '確認刪除？',
            showCancel: true,
            enterClick: () => {
                showLoading(true);                     
                
                const accountNumber = JSON.parse(localStorage.getItem('login')).AccountNumber;
                const parameter = {
                    accountNumber: accountNumber,
                    functionType: 'delete',
                    delIndex: noteNo.value,
                };
                $.get('https://script.google.com/macros/s/AKfycbxzVWS4ccSSQx8Cp7pgzVhsU9j9m2JSN3Vnfe7HJ7X8oUE8RYE/exec', parameter).done(res => {
                    showLoading(false);
                    getNotes();
                    onNoteCancelBtn();
                    const popupObj = {
                        text: '已儲存',
                    }   
                    showPopupBox(popupObj);
                });    
            }

        }   
    showPopupBox(popupObj);
}



// https://script.google.com/macros/s/AKfycbxzVWS4ccSSQx8Cp7pgzVhsU9j9m2JSN3Vnfe7HJ7X8oUE8RYE/exec
