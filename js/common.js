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
    return { 'x': x, 'y': y };
}