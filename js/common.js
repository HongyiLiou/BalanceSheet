// Common.js


/** 取得今日日期時間 Obj */
function getToday() {
    const time = new Date();
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const date = time.getDate();
    const day = time.getDay();

    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();

    const timeObj = {
        dateString: `${time}`,
        year: year,
        month: month,
        date: date,
        day: day,
        hour: hour,
        minute: minute,
        second: second
    }
    
    return timeObj;
}


/**
 * 轉換星期中文 (0 ~ 6 → 日 ~ 一)
 * @param {Number} day 0 ~ 6
 */
function changeWeekDay(day) {
    let dayString;

    switch(day) {
        case 0:
            dayString = '日';
            break;
        case 1:
            dayString = '一';
            break;
        case 2:
            dayString = '二';
            break;
        case 3:
            dayString = '三';
            break;
        case 4:
            dayString = '四';
            break;
        case 5:
            dayString = '五';
            break;
        case 6:
            dayString = '六';
            break;
        default:
            break;
    }

    return dayString;
}


/**
 * 取得滑鼠座標相對於文件位置
 * @param {MouseEvent} event 滑鼠事件
 */
function getMouseElementPos(event) {
    const e = event || window.event;
    const scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    const scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    const x = e.pageX || e.clientX + scrollX;
    const y = e.pageY || e.clientY + scrollY;
    //alert('x: ' + x + '\ny: ' + y);
    return { 'x': x, 'y': y };
}


/** 取得滑鼠座標相對於元素位置 */
function getMousePos(event) {
    const e = event || window.event;
    const x = e.offsetX;
    const y = e.offsetY;
    // alert('x: ' + x + '\ny: ' + y);
    return { x: x, y: y };
}

/**
 * 顯示 Loading畫面
 * @param {Boolean} isShow 是否顯示
 */
function showLoading(isShow) {
    const loading = document.querySelector('.loading');

    if (isShow) {
        loading.classList.add('active');
    } else {
        loading.classList.remove('active');
    }
}


/**
 * 禁止輸入某些按鈕
 * @param {Document} document
 * @param {String[]} keys
 */
function preventInputKeys(document, keys) {    
    document.addEventListener('keypress', function(e) {
        console.log(e.key);
        
        keys.forEach(key => {
            if (e.key === key) { 
              e.preventDefault();
            } // 當輸出等於 key的時候，阻止預設行為
        });
    })
}


/**
 * 顯示/關閉 ScreenHolder
 * @param {Boolean} boolean 是否顯示
 * @param {Void} doSomething 按下 ScreenHolder 時要做的事
 * @param {String[]} cssClass 要附加的 css class
 */
function showScreenHolder(boolean, doSomething, cssClass) {
    // const body = document.querySelector('body');

    if (boolean) {
        // 建立一個 ScreenHolder
        const screenHolderTag = document.createElement('div');
        screenHolderTag.className = 'screenHolder';
        document.body.appendChild(screenHolderTag);
        /** Screen Holder */const screenHolder = document.querySelector('.screenHolder');
        screenHolder.classList.add('show');

        // css class
        if (cssClass) {
            setTimeout(() => {
                cssClass.forEach(cssClass => {
                    screenHolder.classList.add(cssClass);
                });
            }, 0)
        }
    
        // 監聽事件
        screenHolder.addEventListener('click', () => {            
            if (doSomething) {
                doSomething();
            }
    
            screenHolder.classList.remove('show');
            
            if (cssClass) {
                cssClass.forEach(cssClass => {
                    screenHolder.classList.remove(cssClass);
                });
            }
            
            setTimeout(() => {
                document.body.removeChild(screenHolder);
            }, 300)
        });

    } else {
        // 移除 ScreenHolder
        const screenHolder = document.querySelector('.screenHolder');
        screenHolder.classList.remove('show');
        if (cssClass) {
            cssClass.forEach(cssClass => {
                screenHolder.classList.remove(cssClass);
            });
        }
        setTimeout(() => {
            document.body.removeChild(screenHolder);
            screenHolder = null;            
        }, 300)
    }

    

}


/**
 * 訊息彈窗
 * @param {{
 *  text: string
 *  showCancel: boolean
 *  showInput: number
 *  inputText1: string
 *  inputText2: string
 *  enterBtn: string
 *  cancelBtn: string
 *  enterClick: function()
 *  cancelClick: function()
 * }} popupSettingObj
 * 
  text: 訊息文字,
  showCancel: 是否顯示取消按鈕,
  showInput: 顯示幾個 input(最多2個),
  showInputTime: 顯示時間 input,
  inputText1: 第 1個 input標題文字,
  inputText2: 第 2個 input標題文字,
  enterBtn: 「確認」按鈕文字,
  cancelBtn: 「取消」按鈕文字,
  enterClick: 「確認」按鈕 function,
  cancelClick: 「取消」按鈕 function,
 */
function showPopupBox(popupSettingObj) {
    const popupBox_checkMessage = document.createElement('div');
    popupBox_checkMessage.className = 'popupBox_checkMessage';
    popupBox_checkMessage.innerHTML = `
        <p></p>
        <div class="inputArea">
            <label class="userInput">
                <p></p>
                <input id="popupInput1" type="text" spellcheck="false" onblur="setPopupInputTitle(true, 0)">
            </label>
            <label class="userInput">
                <p></p>
                <input id="popupInput2" type="text" spellcheck="false" onblur="setPopupInputTitle(true, 1)">
            </label>
            <label class="userInput">
                <p></p>
                <input id="popupInputTime1" type="time" value="00:00">
            </label>
        </div>
        <div class="buttonArea">
            <button class="cancel">Cancel</button>
            <button class="enter">OK</button>
        </div>
    `;
    document.body.appendChild(popupBox_checkMessage);

    /** 彈窗訊息 */const message = document.querySelector('.popupBox_checkMessage p');
    /** 彈窗 Input Area */const popupInputArea = document.querySelector('.popupBox_checkMessage .inputArea');
    /** 彈窗 Input */const popupInput = document.querySelectorAll('.popupBox_checkMessage .inputArea .userInput');
    /** 彈窗 Input 標題 */const popupInputTitle = document.querySelectorAll('.popupBox_checkMessage .inputArea p');
    /** 取消按鈕 */const cancelBtn = document.querySelector('.popupBox_checkMessage .cancel');
    /** 確認按鈕 */const enterBtn = document.querySelector('.popupBox_checkMessage .enter');
    const settingObj = popupSettingObj;
    

    popupBox_checkMessage.style.display = 'block';
    cancelBtn.style.display = settingObj.showCancel ? 'block' : 'none';
    popupInputArea.style.display = settingObj.showInput ? 'flex' : 'none';
    popupInput[0].style.display = settingObj.showInput && (settingObj.showInput === 1 || settingObj.showInput === 2) ? 'block' : 'none';
    popupInput[1].style.display = settingObj.showInput && settingObj.showInput === 2 ? 'block' : 'none';
    popupInput[2].style.display = settingObj.showInput && settingObj.showInput === 3 ? 'block' : 'none';
    popupInputTitle[0].innerHTML = settingObj.inputText1 ? settingObj.inputText1 : '標題文字一';
    popupInputTitle[1].innerHTML = settingObj.inputText2 ? settingObj.inputText2 : '標題文字二';
    message.innerHTML = settingObj.text ? settingObj.text : '';
    enterBtn.innerHTML = settingObj.enterBtn ? settingObj.enterBtn : 'OK';

    if (settingObj.showInput) {
        setPopupInputTitle(false);
        setPopupInputTitle(true, 0);
        setPopupInputTitle(true, 1);
    }
    if (settingObj.enterBtn) {
        enterBtn.innerHTML = settingObj.enterBtn;
    }
    if (settingObj.cancelBtn) {
        cancelBtn.innerHTML = settingObj.cancelBtn;
    }
    if (settingObj.showInput && settingObj.showInput === 1) {
        
    }
    
    if (settingObj.enterClick) {
        enterBtn.addEventListener('click', settingObj.enterClick);
    }

    const onClickScreenHolder = () => {
        popupBox_checkMessage.classList.add('hide');
        setTimeout(() => {
            popupBox_checkMessage.classList.remove('hide');
            document.body.removeChild(popupBox_checkMessage);
            cancelBtn.removeEventListener('click', timer);
        }, 500);
    }
    
    showScreenHolder(true, onClickScreenHolder);

    const enterTimer = enterBtn.addEventListener('click', () => {
        popupBox_checkMessage.classList.add('hide');
        showScreenHolder(false);
        setTimeout(() => {
            popupBox_checkMessage.classList.remove('hide');
            document.body.removeChild(popupBox_checkMessage);
            enterBtn.removeEventListener('click', enterTimer);
        }, 500);
    });

    if (settingObj.showCancel && settingObj.cancelClick) {
        const timer = cancelBtn.addEventListener('click', settingObj.cancelClick);
        const timer2 = cancelBtn.addEventListener('click', () => {
            showScreenHolder(false);
            popupBox_checkMessage.classList.add('hide');
            setTimeout(() => {
                popupBox_checkMessage.classList.remove('hide');
                document.body.removeChild(popupBox_checkMessage);
                cancelBtn.removeEventListener('click', timer);
                cancelBtn.removeEventListener('click', timer2);
            }, 500);
        });

    } else if (settingObj.showCancel) {
        const timer = cancelBtn.addEventListener('click', () => {
            showScreenHolder(false);
            popupBox_checkMessage.classList.add('hide');
            setTimeout(() => {
                popupBox_checkMessage.classList.remove('hide');
                document.body.removeChild(popupBox_checkMessage);
                cancelBtn.removeEventListener('click', timer);
            }, 500);
        });
    }


}


/**
 * 設定 Popup Input 標題 css
 * @param {Boolean} check 是否檢查欄位值
 * @param {Number} index
 */
function setPopupInputTitle(check, index) {
    const userInputTitle = document.querySelectorAll('.popupBox_checkMessage .inputArea .userInput p');
    const userInput = document.querySelectorAll('.popupBox_checkMessage .inputArea .userInput input');

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


/** 位數不足前方補0， ex: prefixInteger(100, 6) // 100 -> 000100 */
function prefixInteger(num, length) {
    return (Array(length).join('0') + num).slice(-length);
}

