// login.js

/**
 * 設定 Login Input 標題
 * @param {Boolean} check 是否檢查欄位值
 * @param {Number} index
 */
function setloginInputTitle(check, index) {
    const userInputTitle = document.querySelectorAll('.loginPageBox .userArea .userInput p');
    const userInput = document.querySelectorAll('.loginPageBox .userArea .userInput input');

    if (check) {        
        if (userInput[index].value) {
            userInputTitle[index].classList.add('active');
        } else {
            userInputTitle[index].classList.remove('active');
        }
    } else {
        userInput.forEach((input, i) => {
            input.addEventListener('focus', () => {
                userInputTitle[i].classList.add('active');
            })
            if (input.value) {
                userInputTitle[i].classList.add('active');
            }
        });
    }
}
