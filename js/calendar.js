
/** client_id */
// 778859427056-10vjmc69bmoco4ihp23te7vn08pj7o4f.apps.googleusercontent.com


/** api key */
// AIzaSyDyOOtKCJxiXo6oKV0eZv2_0E8B0wpTaUI

const credentialsJSON = {
    web: {
        "client_id": "778859427056-10vjmc69bmoco4ihp23te7vn08pj7o4f.apps.googleusercontent.com",
        "project_id": "quickstart-1593654771135",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_secret": "P5egwr0waQ7IIP5lcScgz4lo",
        "javascript_origins": [
            "http://localhost:8000"
        ]
    },
    web2: {
        "client_id": "642711235750-8rblvofmb9lpe7ldja07mkou1g38bf7u.apps.googleusercontent.com",
        "project_id": "root-rock-277903",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_secret": "Yx1JhqnX7zl4V97As4y3CLO_",
        "redirect_uris": [
            "https://hongyiliou.github.io/BalanceSheet/",
            "http://localhost:8848/index.html"
        ],
        "javascript_origins": [
            "http://localhost:8848",
            "https://hongyiliou.github.io"
        ]
    }
};



// Client ID and API key from the Developer Console
// var CLIENT_ID = '642711235750-8rblvofmb9lpe7ldja07mkou1g38bf7u.apps.googleusercontent.com';
const CLIENT_ID = '642711235750-8rblvofmb9lpe7ldja07mkou1g38bf7u.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDwWZgP8EiFW1IdT0_Ejctl9ecUl9shOvo';

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/calendar";

const authorizeButton = document.getElementById('authorize_button');
const signoutButton = document.getElementById('signout_button');

let auth2;

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

const revokeAllScopes = function () {
    auth2.disconnect();
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        auth2 = gapi.auth2.getAuthInstance();
        // Listen for sign-in state changes.
        auth2.isSignedIn.listen(updateSigninStatus);
        // Handle the initial sign-in state.
        updateSigninStatus(auth2.isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function (error) {
        appendPre(JSON.stringify(error, null, 2));
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        listUpcomingEvents();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    auth2.signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    auth2.disconnect();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
    gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    }).then(function (response) {
        var events = response.result.items;
        appendPre('Upcoming events:');

        if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
                var event = events[i];
                var when = event.start.dateTime;
                if (!when) {
                    when = event.start.date;
                }
                appendPre(event.summary + ' (' + when + ')')
            }
        } else {
            appendPre('No upcoming events found.');
        }
    });
}


/** 寫入 Google 行事曆 */
function insertEventToGoogleCalendar() {
    const googleCalendarEvent = document.querySelectorAll('.googleCalendarEvent');
    
    const timeObj1 = {
        year: 2020,
        month: 7,
        date: 9,
    }

    const timeObj2 = {
        year: 2020,
        month: 7,
        date: 10,
    }
    
    for (let i = 0; i < googleCalendarEvent.length ; i++) {
        var event = {
            'summary': googleCalendarEvent[i].value,
            'location': "",
            'description': '一些描述',
            'start': {
                'date': convertDateJsonToDateString(timeObj1),
                'timeZone': 'Asia/Taipei'
                },
            'end': {
                'date': convertDateJsonToDateString(timeObj2),
                'timeZone': 'Asia/Taipei'
                },
            'reminders': {
                'useDefault': false,
                'overrides': [
                    // {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 10}
                ]
            }
        };

        var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event
        });

        request.execute();
    }
    // listUpcomingEvents();
}


// 以下為行事曆彈窗程式______________________________________________________________________________________
/** 某月行事曆標題 */let summaries_calendar
/** 某月行事曆描述 */let descriptions_calendar;

/** 初始化行事曆 */
function initialCalendar() {
    calendarListener();
    setDateToShow_calendar(`${ year }/${ month }/${ day }`);
    setCalender_calendar(month);
}

function calendarListener() {
    const dateBlocks = document.querySelectorAll('.calendarPageBox .selectArea .calender .userSelectArea .datePicker_day li');
    const showArea_calendar = document.querySelector('.showArea_calendar');
    /** 日期選取按鈕 */const datePicker_day = document.querySelectorAll('.calendarPageBox .datePicker_day li');

    dateBlocks.forEach((dayBlock) => {
        dayBlock.addEventListener('click', () => {
            const mousePos = getMouseElementPos();
            const windowWidth = document.body.offsetWidth;
            const windowHeight = document.body.offsetHeight;
            const hideCalendarInput = () => {
                showArea_calendar.classList.remove('active');
                datePicker_day.forEach(x => {
                    x.classList.remove('active');
                });
            }
            // console.log('mousePos', getMouseElementPos());
            // console.log('offsetWidth', document.body.offsetWidth);
            // console.log('offsetHeight', document.body.offsetHeight);
            showArea_calendar.classList.add('active');

            // 畫面左右
            showArea_calendar.style.left = mousePos.x < (windowWidth / 2) ? `${mousePos.x + 30}px` : `${mousePos.x - 330}px`;
            // 畫面上下
            showArea_calendar.style.top = 'initial';
            showArea_calendar.style.top = mousePos.y < (windowHeight / 2) ? `${mousePos.y - 100}px` : `${mousePos.y - 430}px`;
            showScreenHolder(true, hideCalendarInput)
            
        });
    });
}


/**
 * 設定行日曆彈窗的顯示日期
 * @param {String} dateString
 * 日期字串，格式： yyyy/mm/dd
 */
function setDateToShow_calendar(dateString) {
    /** 顯示年 */const dataPickerShowYear = document.querySelector('.showArea_calendar .content .year');
    /** 顯示月 */const dataPickerShowMonth = document.querySelector('.showArea_calendar .content .month');
    /** 顯示日 */const dataPickerShowDay = document.querySelector('.showArea_calendar .content .day');
    /** 年份選取按鈕 */const datePicker_year = document.querySelector('.calendarPageBox .selectArea header .datePicker_year p');
    /** 月份選取按鈕 */const datePicker_month = document.querySelector('.calendarPageBox .selectArea header .datePicker_month p');
    const date = new Date(dateString);
    const dateToString = date.toString();    
    
    setShowWeek_calendar(dateToString.slice(0, 3));
    dataPickerShowMonth.innerHTML = dateToString.slice(4, 7);
    dataPickerShowYear.innerHTML = dateToString.slice(11, 15);

    if (dateToString.slice(8, 9) == '0') {
        dataPickerShowDay.innerHTML = dateToString.slice(9, 10);
    } else {
        dataPickerShowDay.innerHTML = dateToString.slice(8, 10);        
    }

    datePicker_year.innerHTML = `${dateToString.slice(11, 15)} 年`;
    datePicker_month.innerHTML = `${date.getMonth() + 1} 月`;
}


/** 轉換行日曆彈窗的顯示星期 */
function setShowWeek_calendar(weekString) {
    /** 顯示星期 */const dataPickerShowWeek = document.querySelector('.showArea_calendar header .week');
    switch(weekString) {
        case 'Sun':
            dataPickerShowWeek.innerHTML = '星期日';
            break;
        case 'Mon':
            dataPickerShowWeek.innerHTML = '星期一';
            break;
        case 'Tue':
            dataPickerShowWeek.innerHTML = '星期二';
            break;
        case 'Wed':
            dataPickerShowWeek.innerHTML = '星期三';
            break;
        case 'Thu':
            dataPickerShowWeek.innerHTML = '星期四';
            break;
        case 'Fri':
            dataPickerShowWeek.innerHTML = '星期五';
            break;
        case 'Sat':
            dataPickerShowWeek.innerHTML = '星期六';
            break;
    }
}


/**
 * 設定 Calender內容
 * @param {String} monthString
 * 月份字串 
 */
function setCalender_calendar(monthString) {
    showLoading(true);
    /** 顯示年 */const dataPickerShowYear = document.querySelector('.showArea_calendar .year');
    /** 顯示日 */const dataPickerShowDay = document.querySelector('.showArea_calendar .day');
    /** 日期選取按鈕 */const datePicker_day = document.querySelectorAll('.calendarPageBox .datePicker_day li');
    /** 行事曆清單 */const inputArea_calendar = document.querySelector('.showArea_calendar .inputArea_calendar ul');
    /** 行事曆標題 */const calendarInput_summary = document.querySelector('.showArea_calendar .inputArea_calendar label .calendar_summary');
    /** 行事曆描述 */const calendarInput_description = document.querySelector('.showArea_calendar .inputArea_calendar label .calendar_description');
    /** 刪除按鈕 */const deleteBtn = document.querySelector('.showArea_calendar footer .delete');
    /** 遊戲刪除按鈕 */const gameDeleteBtn = document.querySelector('.showArea_calendar .sidebar_calendar .delete');
    /** 新增按鈕 */const addBtn = document.querySelector('.showArea_calendar footer .add');
    /** 遊戲新增按鈕 */const gameAddBtn = document.querySelector('.showArea_calendar .sidebar_calendar .add');
    /** 全部儲存按鈕 */const saveAllBtn = document.querySelector('.showArea_calendar footer .saveAll');
    /** 遊戲全部儲存按鈕 */const gameSaveAllBtn = document.querySelector('.showArea_calendar .sidebar_calendar .saveAll');
    const date = new Date(Number(dataPickerShowYear.innerHTML), monthString, 0);
    const week = new Date(`${dataPickerShowYear.innerHTML}/${monthString}/1`).getDay();
    const fullMonth = date.getDate();

    datePicker_day.forEach(x => {
        x.innerHTML = '';
        x.classList = '';
    });

    const accountNumber = JSON.parse(localStorage.getItem('login')).AccountNumber;
    const parameter = {
        accountNumber: accountNumber,
        functionType: 'get',
        year: Number(dataPickerShowYear.innerHTML),
        month: monthString
    };
    $.get('https://script.google.com/macros/s/AKfycbw6E5iG_GFX6pyyThqh9IYAvgvhXyrKt25DYdOG-UCsIE8F7d42/exec', parameter).done(res => {
        showLoading(false);
        // console.log(res);

        const resData = res;
        summaries_calendar = resData.summary;
        descriptions_calendar = resData.description;

        console.log('summaries_calendar', summaries_calendar);
        console.log('descriptions_calendar', descriptions_calendar);
        
        // 依據月份天數將日期置入月曆中，順便置入行事曆內容
        for (let i = week; i < fullMonth + week; i++) {
            let datePicker_dayTemplate = `<h6>${i - week + 1}</h6><div class="textArea">`
            const p = summaries_calendar[i - week].split(',');
            p.forEach(x => {
                datePicker_dayTemplate += `<p title="${x}">${x}</p>`;
            });
            datePicker_dayTemplate = datePicker_dayTemplate;
            datePicker_day[i].innerHTML = datePicker_dayTemplate + '</div>';
            datePicker_day[i].classList.add('pointerEventAuto');
            if (datePicker_day[i].innerHTML === dataPickerShowDay.innerHTML) {
                datePicker_day[i].classList.add('active');
            }
        }
        
        // // 註冊點擊事件
        /** 所有日期 button */const dateBtns = document.querySelectorAll('.calendarPageBox .pointerEventAuto');
        // /** OK button */const okBtn = document.querySelector('.datePickerBox .okBtn');
        dateBtns.forEach((btn, i) => {
            const timer = btn.addEventListener('click', () => {
                inputArea_calendar.innerHTML = '';
                calendarInput_summary.value = '';
                calendarInput_description.value = '';
                deleteBtn.style.display = 'none';
                gameDeleteBtn.classList.remove('active');
                dateBtns.forEach(x => {
                    x.classList.remove('active');
                });

                const summaries = summaries_calendar[i].split(',');
                const descriptions = descriptions_calendar[i].split(',');
                console.log(summaries);
                
                summaries.forEach((x, index) => {
                    const li = document.createElement('li');
                    li.title = x;
                    li.innerHTML = x;
                    if (x) {
                        inputArea_calendar.appendChild(li);
                        li.addEventListener('click', () => {
                            calendarInput_summary.value = x;
                            calendarInput_description.value = descriptions[index];
                            deleteBtn.style.display = 'block';
                            gameDeleteBtn.classList.add('active');
                        });
                    }
                });
                btn.classList.add('active');
                setDateToShow_calendar(`${dataPickerShowYear.innerHTML}/${monthString}/${i + 1}`);
                btn.removeEventListener('click', timer);

                // 新增按鈕
                addBtn.addEventListener('click', () => { addBtnFunc(i); });
                gameAddBtn.addEventListener('click', () => { addBtnFunc(i); });
            });

        });

        setButtons_calendar();
    });
 
}



/** 設定月曆所有按鈕 */
function setButtons_calendar() {
    /** 顯示年 */const dataPickerShowYear = document.querySelector('.showArea_calendar .year');
    /** 顯示日 */const dataPickerShowDay = document.querySelector('.showArea_calendar .day');
    /** 年份選取按鈕 */const datePicker_year = document.querySelector('.calendarPageBox .selectArea header .datePicker_year p');
    /** 月份選取按鈕 */const datePicker_month = document.querySelector('.calendarPageBox .selectArea header .datePicker_month p');
    /** 區塊顯示 - 日期選擇 */const userSelectArea = document.querySelector('.calendarPageBox .selectArea .calender .userSelectArea');
    /** 區塊顯示 - 年份選擇 */const selectYearArea = document.querySelector('.calendarPageBox .selectArea .calender .selectYearArea');
    /** 區塊顯示 - 月份選擇  */const selectMonthArea = document.querySelector('.calendarPageBox .selectArea .calender .selectMonthArea');
    /** 所有年份選單 */const selectYearAreaBtns = document.querySelectorAll('.calendarPageBox .selectYearArea ul li');
    /** 所有月份選單 */const selectMonthAreaBtns = document.querySelectorAll('.calendarPageBox .selectMonthArea ul li');
    /** Prev - year */const datePicker_yearPrevBtn = document.querySelector('.calendarPageBox .datePicker_year .prev');
    /** Next - year */const datePicker_yearNextBtn = document.querySelector('.calendarPageBox .datePicker_year .next');
    /** Prev - month */const datePicker_monthPrevBtn = document.querySelector('.calendarPageBox .datePicker_month .prev');
    /** Next - month */const datePicker_monthNextBtn = document.querySelector('.calendarPageBox .datePicker_month .next');
    
    /** 最外層 BOX */const calendarPageBox = document.querySelector('.calendarPageBox');

    const today = new Date();
    selectMonthAreaBtns[today.getMonth()].classList.add('active');
    
    // 顯示年份區塊按鈕
    datePicker_year.addEventListener('click', () => {
        userSelectArea.classList.remove('active');
        selectMonthArea.classList.remove('active');
        selectYearArea.classList.add('active');
    });

    // 顯示月份區塊按鈕
    datePicker_month.addEventListener('click', () => {
        userSelectArea.classList.remove('active');
        selectYearArea.classList.remove('active');
        selectMonthArea.classList.add('active');
    });

    // 年份按鈕
    selectYearAreaBtns.forEach(btn => {
        if (dataPickerShowYear.innerHTML === btn.innerHTML) {
            btn.classList.add('active');
        }
        btn.addEventListener('click', () => {
            selectYearAreaBtns.forEach(x => {
                x.classList.remove('active');
            });
            const dateString = `${btn.innerHTML}/${datePicker_month.innerHTML.slice(0, 2).trim()}/${dataPickerShowDay.innerHTML}`;
            
            setDateToShow_calendar(dateString);
            setCalender_calendar(datePicker_month.innerHTML.slice(0, 2).trim());
            btn.classList.add('active');
            selectMonthArea.classList.remove('active');
            selectYearArea.classList.remove('active');
            userSelectArea.classList.add('active');
        });
    });

    // 月份按鈕
    selectMonthAreaBtns.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            selectMonthAreaBtns.forEach(x => {
                console.log(123);
                x.classList.remove('active');
            });
            let dateString;
            const fullMonth = new Date(Number(dataPickerShowYear.innerHTML), i + 1, 0).getDate();

            // 若選取的月份總天數超過上一次選取的，需做判斷處理
            if (Number(dataPickerShowDay.innerHTML) > fullMonth) {
                dateString = `${dataPickerShowYear.innerHTML}/${i + 1}/${fullMonth}`;
            } else {
                dateString = `${dataPickerShowYear.innerHTML}/${i + 1}/${dataPickerShowDay.innerHTML}`;
            }

            setDateToShow_calendar(dateString);
            setCalender_calendar(i + 1);
            btn.classList.add('active');
            selectMonthArea.classList.remove('active');
            selectYearArea.classList.remove('active');
            userSelectArea.classList.add('active');
        });
    });

    // 上一年
    datePicker_yearPrevBtn.addEventListener('click', () => {
        /** 目前顯示的年份 */const yearShowNow = Number(dataPickerShowYear.innerHTML);
        for (let i = selectYearAreaBtns.length - 1; i >= 0; i--) {
            if (Number(selectYearAreaBtns[i].innerHTML) < yearShowNow) {
                selectYearAreaBtns[i].click();
                return;
            }
        }
    });

    // 下一年
    datePicker_yearNextBtn.addEventListener('click', () => {
        /** 目前顯示的年份 */const yearShowNow = Number(dataPickerShowYear.innerHTML);
        for (let btn of selectYearAreaBtns) {
            if (Number(btn.innerHTML) > yearShowNow) {
                btn.click();
                return;
            }
        }
    });

    // 上一月
    datePicker_monthPrevBtn.addEventListener('click', () => {
        /** 目前顯示的年份 */const yearShowNow = Number(datePicker_month.innerHTML.slice(0, 2).trim());
        for (let i = selectMonthAreaBtns.length - 1; i >= 0; i--) {
            if (Number(selectMonthAreaBtns[i].innerHTML.slice(0, 2).trim()) < yearShowNow) {
                selectMonthAreaBtns[i].click();
                return;
            }
        }
    });

    // 下一月
    datePicker_monthNextBtn.addEventListener('click', () => {
        /** 目前顯示的年份 */const yearShowNow = Number(datePicker_month.innerHTML.slice(0, 2).trim());
        for (let btn of selectMonthAreaBtns) {
            if (Number(btn.innerHTML.slice(0, 2).trim()) > yearShowNow) {
                btn.click();
                return;
            }
        }
    });

    // OK按鈕
    // okBtn.addEventListener('click', () => {
    //     switch (datePickerType) {
    //         case 'datePicker_balanceSheet':
    //             const showDate = document.querySelector('.balanceSheetBox .showDate');

    //             // 設定送至後端的值
    //             yearInput.value = Number(dataPickerShowYear.innerHTML);
    //             monthInput.value = Number(datePicker_month.innerHTML.slice(0, 2).trim());
    //             dayInput.value = Number(dataPickerShowDay.innerHTML);

    //             // 設定顯示的日期
    //             showDate.value = `${yearInput.value} 年 ${monthInput.value} 月 ${dayInput.value} 日`;

    //             console.log(yearInput.value , monthInput.value , dayInput.value);

    //             // 控制是否顯示「今日」文字
    //             const todayObj = getToday();
    //             if (
    //                 Number(yearInput.value) === todayObj.year &&
    //                 Number(monthInput.value) === todayObj.month &&
    //                 Number(dayInput.value) === todayObj.date
    //             ) {
    //                 const showToday = document.querySelector('.balanceSheetBox .showListArea .today');
    //                 showToday.style.display = 'block';
    //             } else {
    //                 const showToday = document.querySelector('.balanceSheetBox .showListArea .today');
    //                 showToday.style.display = 'none';
    //             }
                

    //             // 由後端取德該日期資料
    //             getBalanceSheet();
    //             getBalanceSheetDetail();

    //             cancelBtn.click();

    //         default:
    //             break;
    //     }
    // });

}

// https://script.google.com/macros/s/AKfycbw6E5iG_GFX6pyyThqh9IYAvgvhXyrKt25DYdOG-UCsIE8F7d42/exec

function testCalendar() {
}


/** 行事曆編輯器 - 新增按鈕 (Add) */
function addBtnFunc(index) {
    /** 行事曆標題 */const calendarInput_summary = document.querySelector('.showArea_calendar .inputArea_calendar label .calendar_summary');
    /** 行事曆描述 */const calendarInput_description = document.querySelector('.showArea_calendar .inputArea_calendar label .calendar_description');
    /** 行事曆清單 */const inputArea_calendar = document.querySelector('.showArea_calendar .inputArea_calendar ul');
    /** 刪除按鈕 */const deleteBtn = document.querySelector('.showArea_calendar footer .delete');
    /** 遊戲刪除按鈕 */const gameDeleteBtn = document.querySelector('.showArea_calendar .sidebar_calendar .delete');

    if (calendarInput_summary.value && calendarInput_description.value) {
        const oSummary = calendarInput_summary.value;
        const oDescription = calendarInput_description.value;
        const li = document.createElement('li');
        li.title = calendarInput_summary.value;
        li.innerHTML = calendarInput_summary.value;
        summaries_calendar[index] = `${summaries_calendar[index]},${calendarInput_summary.value}`;
        descriptions_calendar[index] = `${descriptions_calendar[index]},${calendarInput_description.value}`;
        calendarInput_summary.value = '';
        calendarInput_description.value = '';
        deleteBtn.style.display = 'none';
        gameDeleteBtn.classList.remove('active');
        
        inputArea_calendar.appendChild(li);
        li.addEventListener('click', () => {
            calendarInput_summary.value = oSummary;
            calendarInput_description.value = oDescription;
            deleteBtn.style.display = 'block';
            gameDeleteBtn.classList.add('active');
        });

    } else {

    }

    console.log(1233);
}


/** 行事曆編輯器 */
// 1.點行事曆行程，出現 Delete。

// 2.點 Add，隱藏 Delete，若標題欄位、描述欄位皆有值，則新增至行事曆清單暫存，清空標題、描述。

// 3.點 Save All 讀取清單暫存全部存入行事曆，更新行事曆，清除標題、描述欄位。

