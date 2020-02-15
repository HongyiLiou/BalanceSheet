// Date-Picker

/** 顯示星期 */const dataPickerShowWeek = document.querySelector('.datePickerBox .week');
/** 顯示月 */const dataPickerShowMonth = document.querySelector('.datePickerBox .month');
/** 顯示日 */const dataPickerShowDay = document.querySelector('.datePickerBox .day');
/** 顯示年 */const dataPickerShowYear = document.querySelector('.datePickerBox .year');

/** 年份選取按鈕 */const datePicker_year = document.querySelector('.datePicker_year p');
/** 月份選取按鈕 */const datePicker_month = document.querySelector('.datePicker_month p');
/** 日期選取按鈕 */const datePicker_day = document.querySelectorAll('.datePicker_day li');

/** 區塊顯示 - 日期選擇 */const userSelectArea = document.querySelector('.userSelectArea');
/** 區塊顯示 - 年份選擇 */const selectYearArea = document.querySelector('.selectYearArea');
/** 區塊顯示 - 月份選擇  */const selectMonthArea = document.querySelector('.selectMonthArea');

/** 所有年份選單 */const selectYearAreaBtns = document.querySelectorAll('.selectYearArea ul li');
/** 所有月份選單 */const selectMonthAreaBtns = document.querySelectorAll('.selectMonthArea ul li');


/** 初始化 */
function initialDatePicker() {
    setDateToShow(`${ year }/${ month }/${ day }`);

    
    setCalender(month);

    const dateBtnIndex = new Date();
    selectMonthAreaBtns[dateBtnIndex.getMonth()].classList.add('active');
    
    // datePicker_day[dateBtnIndex.getDate()].classList.add('active');
    // console.log(datePicker_day);
    
    
    // 顯示年份按鈕
    datePicker_year.addEventListener('click', () => {
        userSelectArea.classList.remove('active');
        selectMonthArea.classList.remove('active');
        selectYearArea.classList.add('active');
    });

    // 顯示月份按鈕
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
            setCalender(datePicker_month.innerHTML.slice(0, 2).trim());
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
            })
            const dateString = `${dataPickerShowYear.innerHTML}/${i + 1}/${dataPickerShowDay.innerHTML}`;
            setDateToShow(dateString);
            setCalender(i + 1);
            btn.classList.add('active');
            selectMonthArea.classList.remove('active');
            selectYearArea.classList.remove('active');
            userSelectArea.classList.add('active');
        });
    });
    
}


/** 設定顯示日期 */
function setDateToShow(dateString) {
    const date = new Date(dateString);
    const dateToString = date.toString();
    console.log(dateToString);
    
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


/** 設定 Calender內容 */
function setCalender(monthString) {
    const date = new Date(Number(dataPickerShowYear.innerHTML), monthString, 0);
    const week = new Date(`${dataPickerShowYear.innerHTML}/${monthString}/1`).getDay();
    const fullMonth = date.getDate();
    console.log('week', week);
    console.log('fullMonth', fullMonth);
    datePicker_day.forEach(x => {
        x.innerHTML = '';
        x.classList = '';
    });

    // 依據月份天數將日期置入月曆中
    for (let i = week; i < fullMonth + week; i++) {
        datePicker_day[i].innerHTML = i - week + 1;
        datePicker_day[i].classList.add('pointerEventAuto');
        if (datePicker_day[i].innerHTML === dataPickerShowDay.innerHTML) {
            datePicker_day[i].classList.add('active');
        }
    }
    
}

initialDatePicker();