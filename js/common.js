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
function getMousePos(event) {
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
    //alert('x: ' + x + '\ny: ' + y);
    return { x: x, y: y };
}


/**
 * 顯示 Loading畫面
 * @param {Boolean} isShow 是否顯示
 */
function showLoading(isShow) {
    const loaging = document.querySelector('.loaging');

    if (isShow) {
        loaging.classList.add('active');
    } else {
        loaging.classList.remove('active');
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
 * @param {Void} doSomething 按下 ScreenHolder時要做的事
 */
function showScreenHolder(boolean, doSomething) {
    /** Screen Holder */const screenHolder = document.querySelector('.screenHolder');
    console.log('screenHolder');
    this.preventDefault;

    if (boolean) {
        screenHolder.classList.add('show');
    } else {
        screenHolder.classList.remove('show');
        return;
    }
    
    const onScreenClick = screenHolder.addEventListener('click', () => {
        if (doSomething) {
            doSomething();
        }

        screenHolder.classList.remove('show');
        screenHolder.removeEventListener('click', onScreenClick);
    });

    

}

// function showScreenHolder(boolean) {
//     if (boolean) {
//         screenHolder.classList.add('show');
//     } else {
//         screenHolder.classList.remove('show');
//     }
// }


/**
 * 訊息彈窗
 * @param {{
 *  text: string,
 *  showCancel: boolean,
 *  enterBtn: string,
 *  cancelBtn: string,
 *  enterClick: function(),
 *  cancelClick: function(),
 * }} popupSettingObj 
 */
function showPopupBox(popupSettingObj) {
    const popupBox_checkMessage = document.querySelector('.popupBox_checkMessage');
    // popupBox_checkMessage.innerHTML = '<p></p>\
    //     <div class="buttonArea">\
    //         <button class="cancel">Cancel</button>\
    //         <button class="enter">OK</button>\
    //     </div>\
    // ';

    const message = document.querySelector('.popupBox_checkMessage p');
    const cancelBtn = document.querySelector('.popupBox_checkMessage .cancel');
    const enterBtn = document.querySelector('.popupBox_checkMessage .enter');
    const settingObj = popupSettingObj;

    popupBox_checkMessage.style.display = 'block';
    cancelBtn.style.display = settingObj.showCancel ? 'block' : 'none';
    message.innerHTML = settingObj.text;
    enterBtn.innerHTML = settingObj.enterBtn ? settingObj.enterBtn : 'OK';

    if (settingObj.enterBtn) {
        enterBtn.innerHTML = settingObj.enterBtn;
    }
    if (settingObj.cancelBtn) {
        cancelBtn.innerHTML = settingObj.cancelBtn;
    }
    
    if (settingObj.enterClick) {
        enterBtn.addEventListener('click', settingObj.enterClick);
    }

    const enterTimer = enterBtn.addEventListener('click', () => {
        popupBox_checkMessage.classList.add('hide');
        setTimeout(() => {
            popupBox_checkMessage.style.display = 'none';
            popupBox_checkMessage.classList.remove('hide');
            enterBtn.removeEventListener('click', enterTimer);
        }, 500);
    });

    if (settingObj.showCancel && settingObj.cancelClick) {
        const timer = cancelBtn.addEventListener('click', settingObj.cancelClick);
        const timer2 = cancelBtn.addEventListener('click', () => {
            popupBox_checkMessage.classList.add('hide');
            setTimeout(() => {
                popupBox_checkMessage.style.display = 'none';
                popupBox_checkMessage.classList.remove('hide');
                cancelBtn.removeEventListener('click', timer);
                cancelBtn.removeEventListener('click', timer2);
            }, 500);
        });

    } else if (settingObj.showCancel) {
        const timer = cancelBtn.addEventListener('click', () => {
            popupBox_checkMessage.classList.add('hide');
            setTimeout(() => {
                popupBox_checkMessage.style.display = 'none';
                popupBox_checkMessage.classList.remove('hide');
                cancelBtn.removeEventListener('click', timer);
            }, 500);
        });
    }


}

// showPopupBox({text: '早安您好', enterClick: () => {alert('測試成功')}, showCancel: true})