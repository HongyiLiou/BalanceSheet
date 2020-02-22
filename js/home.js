// home.js

/** 初始化 home page 時間 */
function initialHomePageTime() {
    const time = new Date();
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const date = time.getDate();
    const day = time.getDay();    

    const showAPM = document.querySelector('.homePageBox .clock .morningAfternoon');
    const showHour = document.querySelector('.homePageBox .clock .hour');
    const showMinute = document.querySelector('.homePageBox .clock .minute');
    const showSecond = document.querySelector('.homePageBox .clock .second');
    const showDate = document.querySelector('.homePageBox .clock span');
    
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();
    let dayText;

    if (hour == 0) {
        showAPM.innerHTML = '上午';
        showHour.innerHTML = `12:`;
    } else if (hour < 12) {
        showAPM.innerHTML = '上午';
        showHour.innerHTML = `${hour}:`;
    } else {
        showAPM.innerHTML = '下午';
        showHour.innerHTML = `${hour - 12}:`;
    }

    switch (day) {
        case 0:
            dayText = '日';
            break;
        case 1:
            dayText = '一';
            break;
        case 2:
            dayText = '二';
            break;
        case 3:
            dayText = '三';
            break;
        case 4:
            dayText = '四';
            break;
        case 5:
            dayText = '五';
            break;
        case 6:
            dayText = '六';
            break;
        default:
            break;
    }
    
    showSecond.innerHTML = second < 10 ? `0${second}` : second;
    showMinute.innerHTML = minute < 10 ? `0${minute}` : minute;
    

    console.log(hour);
    showDate.innerHTML = `${year}年 ${month}月 ${date}日  週${dayText}`;

    setInterval(() => {
        second += 1;
        showSecond.innerHTML = second < 10 ? `0${second}` : second;
        showMinute.innerHTML = minute < 10 ? `0${minute}` : minute;

        if (second > 59) {
            second = 0;
            minute += 1;
            showSecond.innerHTML = '00';
            showMinute.innerHTML = minute < 10 ? `0${minute}` : minute;
        }

        if (minute > 59) {
            minute = 0
            hour += 1;
            showMinute.innerHTML = '00';
            if (hour == 0) {
                showAPM.innerHTML = '上午';
                showHour.innerHTML = `12:`;
            } else if (hour < 12) {
                showAPM.innerHTML = '上午';
                showHour.innerHTML = `${hour}:`;
            } else {
                showAPM.innerHTML = '下午';
                showHour.innerHTML = `${hour - 12}:`;
            }
        }
        // alert(hour)
    }, 1000);


    const request = require('request')
    const url = 'http://www.cwb.gov.tw/V7/forecast/taiwan/Taipei_City.htm'
    request(url, (err, res, body) => {
    console.log(body)
    })
        
}