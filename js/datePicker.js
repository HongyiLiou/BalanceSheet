// Date-Picker

/** 顯示星期 */const dataPickerShowWeek = document.querySelector('.datePickerBox .week');
/** 顯示月 */const dataPickerShowMonth = document.querySelector('.datePickerBox .month');
/** 顯示日 */const dataPickerShowDay = document.querySelector('.datePickerBox .day');
/** 顯示年 */const dataPickerShowYear = document.querySelector('.datePickerBox .year');

/** 年份選取按鈕 */const datePicker_year = document.querySelector('.datePicker_year p');
/** 月份選取按鈕 */const datePicker_month = document.querySelector('.datePicker_month p');

/** 區塊顯示 - 日期選擇 */const userSelectArea = document.querySelector('.userSelectArea');
/** 區塊顯示 - 年份選擇 */const selectYearArea = document.querySelector('.selectYearArea');
/** 區塊顯示 - 月份選擇  */const selectMonthArea = document.querySelector('.selectMonthArea');

/** 所有年份選單 */const selectYearAreaBtns = document.querySelectorAll('.selectYearArea ul li');
/** 所有月份選單 */const selectMonthAreaBtns = document.querySelectorAll('.selectMonthArea ul li');


/** 初始化 */
function initialDatePicker() {
    setDateToShow(`${ year }/${ month }/${ day }`);

    const monthBtnIndex = new Date().getMonth();
    selectMonthAreaBtns[monthBtnIndex].classList.add('active');
    
    
    datePicker_year.addEventListener('click', () => {
        userSelectArea.classList.remove('active');
        selectMonthArea.classList.remove('active');
        selectYearArea.classList.add('active');
    });

    datePicker_month.addEventListener('click', () => {
        userSelectArea.classList.remove('active');
        selectYearArea.classList.remove('active');
        selectMonthArea.classList.add('active');
    });

    selectYearAreaBtns.forEach(btn => {
        if (dataPickerShowYear.innerHTML === btn.innerHTML) {
            btn.classList.add('active');
        }
        btn.addEventListener('click', () => {
            selectYearAreaBtns.forEach(x => {
                x.classList.remove('active');
            });
            const dateString = `${btn.innerHTML}/${dataPickerShowMonth.innerHTML}/${dataPickerShowDay.innerHTML}`;
            setDateToShow(dateString);
            btn.classList.add('active');
            selectMonthArea.classList.remove('active');
            selectYearArea.classList.remove('active');
            userSelectArea.classList.add('active');
        });
    });

    selectMonthAreaBtns.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            selectMonthAreaBtns.forEach(x => {
                x.classList.remove('active');
            })
            const dateString = `${dataPickerShowYear.innerHTML}/${i + 1}/${dataPickerShowDay.innerHTML}`;
            setDateToShow(dateString);
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

initialDatePicker();