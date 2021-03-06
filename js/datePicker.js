// Date-Picker

/** 初始化 */
function initialDatePicker() {
    setButtons();
    setDateToShow(`${ year }/${ month }/${ day }`);
    setCalender_datePicker(month);
}





/**
 * 設定顯示日期
 * @param {String} dateString
 * 日期字串，格式： yyyy/mm/dd
 */
function setDateToShow(dateString) {
    /** 顯示年 */const dataPickerShowYear = document.querySelector('.datePickerBox .year');
    /** 顯示月 */const dataPickerShowMonth = document.querySelector('.datePickerBox .month');
    /** 顯示日 */const dataPickerShowDay = document.querySelector('.datePickerBox .day');
    /** 年份選取按鈕 */const datePicker_year = document.querySelector('.datePickerBox .datePicker_year p');
    /** 月份選取按鈕 */const datePicker_month = document.querySelector('.datePickerBox .datePicker_month p');
    const date = new Date(dateString);
    const dateToString = date.toString();
    
    setShowWeek(dateToString.slice(0, 3));
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


/** 轉換顯示星期 */
function setShowWeek(weekString) {
    /** 顯示星期 */const dataPickerShowWeek = document.querySelector('.datePickerBox .week');
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
function setCalender_datePicker(monthString) {
    /** 顯示年 */const dataPickerShowYear = document.querySelector('.datePickerBox .year');
    /** 顯示日 */const dataPickerShowDay = document.querySelector('.datePickerBox .day');
    /** 日期選取按鈕 */const datePicker_day = document.querySelectorAll('.datePickerBox .datePicker_day li');
    const date = new Date(Number(dataPickerShowYear.innerHTML), monthString, 0);
    const week = new Date(`${dataPickerShowYear.innerHTML}/${monthString}/1`).getDay();
    const fullMonth = date.getDate();


    datePicker_day.forEach(x => {
        x.innerHTML = '';
        x.classList = '';
    });

    // 依據月份天數將日期置入月曆中
    for (let i = week; i < fullMonth + week; i++) {
        datePicker_day[i].innerHTML = `${i - week + 1}`;
        datePicker_day[i].classList.add('pointerEventAuto');
        if (datePicker_day[i].innerHTML === dataPickerShowDay.innerHTML) {
            datePicker_day[i].classList.add('active');
        }
    }

    // 註冊點擊事件
    /** 所有日期 button */const dateBtns = document.querySelectorAll('.datePickerBox .pointerEventAuto');
    /** OK button */const okBtn = document.querySelector('.datePickerBox .okBtn');
    dateBtns.forEach((btn, i) => {
        const timer = btn.addEventListener('click', () => {
            dateBtns.forEach(x => {
                x.classList.remove('active');
            });

            btn.classList.add('active');
            setDateToShow(`${dataPickerShowYear.innerHTML}/${monthString}/${i + 1}`);
            btn.removeEventListener('click', timer);
        });

        const timer2 = btn.addEventListener('dblclick', () => {
            okBtn.click();
            btn.removeEventListener('dblclick', timer2);
        });
    });
    
}


/** 設定所有按鈕 */
function setButtons() {
    /** 顯示年 */const dataPickerShowYear = document.querySelector('.datePickerBox .year');
    /** 顯示日 */const dataPickerShowDay = document.querySelector('.datePickerBox .day');
    /** 年份選取按鈕 */const datePicker_year = document.querySelector('.datePickerBox .datePicker_year p');
    /** 月份選取按鈕 */const datePicker_month = document.querySelector('.datePickerBox .datePicker_month p');
    /** 區塊顯示 - 日期選擇 */const userSelectArea = document.querySelector('.datePickerBox .userSelectArea');
    /** 區塊顯示 - 年份選擇 */const selectYearArea = document.querySelector('.datePickerBox .selectYearArea');
    /** 區塊顯示 - 月份選擇  */const selectMonthArea = document.querySelector('.datePickerBox .selectMonthArea');
    /** 所有年份選單 */const selectYearAreaBtns = document.querySelectorAll('.datePickerBox .selectYearArea ul li');
    /** 所有月份選單 */const selectMonthAreaBtns = document.querySelectorAll('.datePickerBox .selectMonthArea ul li');
    /** Prev - year */const datePicker_yearPrevBtn = document.querySelector('.datePickerBox .datePicker_year .prev');
    /** Next - year */const datePicker_yearNextBtn = document.querySelector('.datePickerBox .datePicker_year .next');
    /** Prev - month */const datePicker_monthPrevBtn = document.querySelector('.datePickerBox .datePicker_month .prev');
    /** Next - month */const datePicker_monthNextBtn = document.querySelector('.datePickerBox .datePicker_month .next');
    /** Today button */const todayBtn = document.querySelector('.datePickerBox .todayBtn');
    /** Cancel button */const cancelBtn = document.querySelector('.datePickerBox .cancelBtn');
    /** OK button */const okBtn = document.querySelector('.datePickerBox .okBtn');
    /** Toggle Switch */const toggleSwitch = document.querySelector('.datePickerBox .toggleSwitch');
    
    /** 主題開關 checkbox */const checkBox = document.querySelector('.datePickerBox .toggleSwitch input');
    /** 最外層 BOX */const datePickerBox = document.querySelector('.datePickerBox');

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
            
            setDateToShow(dateString);
            setCalender_datePicker(datePicker_month.innerHTML.slice(0, 2).trim());
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

            setDateToShow(dateString);
            setCalender_datePicker(i + 1);
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

    // 今日按鈕
    todayBtn.addEventListener('click', () => {
        const todayYear = today.getFullYear();        
        const todayMonth = today.getMonth() + 1;

        selectYearAreaBtns.forEach(x => {
            x.classList.remove('active');
            if (Number(x.innerHTML) === todayYear) {
                x.classList.add('active');
            }
        });

        selectMonthAreaBtns.forEach(x => {
            x.classList.remove('active');
            if (x.innerHTML.slice(0, 2).trim() == todayMonth){
                x.classList.add('active');
            }
        });

        setDateToShow(`${ year }/${ month }/${ day }`);
        setCalender_datePicker(month);
    });

    // 取消按鈕
    cancelBtn.addEventListener('click', () => {
        const datePickerBox = document.querySelector('.datePickerBox');
        const popupBox = document.querySelector('.popupBox');
        datePickerBox.classList.add('hide');
        showScreenHolder(false);
        setTimeout(() => {
            popupBox.innerHTML = '';
            $('#datePickerJS').remove();
        }, 300);
    });

    // OK按鈕
    okBtn.addEventListener('click', () => {
        switch (datePickerType) {
            case 'datePicker_balanceSheet':
                const showDate = document.querySelector('.balanceSheetBox .showDate');

                // 設定送至後端的值
                yearInput.value = Number(dataPickerShowYear.innerHTML);
                monthInput.value = Number(datePicker_month.innerHTML.slice(0, 2).trim());
                dayInput.value = Number(dataPickerShowDay.innerHTML);

                // 設定顯示的日期
                showDate.value = `${yearInput.value} 年 ${monthInput.value} 月 ${dayInput.value} 日`;

                console.log(yearInput.value , monthInput.value , dayInput.value);

                // 控制是否顯示「今日」文字
                const todayObj = getToday();
                if (
                    Number(yearInput.value) === todayObj.year &&
                    Number(monthInput.value) === todayObj.month &&
                    Number(dayInput.value) === todayObj.date
                ) {
                    const showToday = document.querySelector('.balanceSheetBox .showListArea .today');
                    showToday.style.display = 'block';
                } else {
                    const showToday = document.querySelector('.balanceSheetBox .showListArea .today');
                    showToday.style.display = 'none';
                }
                

                // 由後端取德該日期資料
                getBalanceSheet();
                getBalanceSheetDetail();

                cancelBtn.click();

            default:
                break;
        }
    });

    // 主題切換 switch按鈕
    toggleSwitch.addEventListener('click', () => {
        setTimeout(() => {
            if (checkBox.checked === true) {
                datePickerBox.classList.add('darkTheme');
                localStorage.setItem('datePickerTheme', 'dark');
                const userSetting = JSON.parse(localStorage.getItem('userSetting'));
                const accountNumber = JSON.parse(localStorage.getItem('login')).AccountNumber;
                const parameter = {
                    accountNumber: accountNumber,
                    url: userSetting.userSettingUrl,
                    name: userSetting.userSettingName,
                    functionType: 'post',
                    dataType: 7, // datePickerTheme
                    data: 'dark',
                }
                $.get('https://script.google.com/macros/s/AKfycbwKNaOjxPaTafWlrLMB4q9zt0RkAHKc2m9D0StpmXsWqsJvYXy1/exec', parameter)
            } else {
                datePickerBox.classList.remove('darkTheme');
                localStorage.removeItem('datePickerTheme');
                const userSetting = JSON.parse(localStorage.getItem('userSetting'));
                const accountNumber = JSON.parse(localStorage.getItem('login')).AccountNumber;
                const parameter = {
                    accountNumber: accountNumber,
                    url: userSetting.userSettingUrl,
                    name: userSetting.userSettingName,
                    functionType: 'post',
                    dataType: 7, // datePickerTheme
                    data: 'light',
                }
                $.get('https://script.google.com/macros/s/AKfycbwKNaOjxPaTafWlrLMB4q9zt0RkAHKc2m9D0StpmXsWqsJvYXy1/exec', parameter)
            }
        }, 50);
    });

    
    const userTheme = JSON.parse(localStorage.getItem('userSetting')).datePickerTheme;
    const localTheme = localStorage.getItem('datePickerTheme');


    if (userTheme === 'dark') {
        checkBox.checked = true;
        datePickerBox.classList.add('darkTheme');
    } else if (localTheme === 'dark') {
        checkBox.checked = true;
        datePickerBox.classList.add('darkTheme');
    } else {
        checkBox.checked = false;
        datePickerBox.classList.remove('darkTheme');

    }

}

initialDatePicker();