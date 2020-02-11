// import ('./balanceSheet.js');
// date
/** 年份選擇 */yearInput = document.querySelector('#year');
/** 月份選擇 */monthInput = document.querySelector('#month');
/** 日期選擇 */dayInput = document.querySelector('#day');// date
/** 年份顯示 */year_show = document.querySelector('#year_show');
/** 月份顯示 */month_show = document.querySelector('#month_show');
/** 日期顯示 */day_show = document.querySelector('#day_show');
/** 取得時間 */today = new Date();
/** 取得今年 */year = today.getFullYear();
/** 取得今月 */month = today.getMonth() + 1;
/** 取得今日 */day = today.getDate();
/** 根據月份取得日天數 */days = new Date(year, month, 0).getDate();

// 其他元件
/** Screen Holder */const screenHolder = document.querySelector('.screenHolder');

window.onload = function() {
    initialToday();
    screenHolder.addEventListener('click', () => {
        console.log(123);
        
        showScreenHolder(true);
    });
    // setYearMonthSelect();

    // console.log(selectYear.value, selectMonth.value, selectDay.value);
    
    
}

/** 顯示 screenHolder */
function showScreenHolder(boolean) {
    if (boolean) {
        screenHolder.classList.add('show');
    } else {
        screenHolder.classList.remove('show');
    }
}


// 使用者輸入___________________________________________________________________________________
/** 年份選擇 */
// function onYearClick() {
//     year_show.style.pointerEvents = 'none';
//     const options = document.querySelector('.userInput_year .options');
//     for (let i = 0; i <= 0; i++) {
//         const li = document.createElement('li');
//         li.innerHTML = `${ i + 2020 }年`;
//         li.addEventListener('click', () => {
//             yearInput.value = i + 2020;
//             year_show.value = `${yearInput.value} 年`;
//             li.removeEventListener('click', onYearClick);
//             options.innerHTML = '';
//             year_show.style.pointerEvents = 'auto';
//         });
//         options.appendChild(li);
//     }
// }

// /** 月份選擇 */
// function onMonthClick() {
//     month_show.style.pointerEvents = 'none';
//     const options = document.querySelector('.userInput_month .options');
//     for (let i = 1; i <= 12; i++) {
//         const li = document.createElement('li');
//         li.innerHTML = `${i}月`;
//         li.addEventListener('click', () => {
//             monthInput.value = i;
//             month_show.value = `${monthInput.value} 月`;
//             li.removeEventListener('click', onMonthClick);
//             options.innerHTML = '';
//             month_show.style.pointerEvents = 'auto';
//         });
//         options.appendChild(li);
//     }

// }

// /** 日選擇 */
// function onDayClick() {
//     day_show.style.pointerEvents = 'none';
//     days = new Date(yearInput.value, monthInput.value, 0).getDate();
//     const options = document.querySelector('.userInput_day .options');
//     // 日設置
//     for(let i = 1; i <= days; i++) {
//         const li = document.createElement('li');
//         li.innerHTML = `${i}日`;
//         li.addEventListener('click', () => {
//             dayInput.value = i;
//             day_show.value = `${dayInput.value} 日`;
//             console.log(`dayInput.value`, dayInput.value);
//             options.innerHTML = '';
//             day_show.style.pointerEvents = 'auto';
//         });
//         options.appendChild(li);
//     }

// }

/** 日期選擇 */
function onDateClick(obj = {index: number, type: string}) {
    const inputArray = [ year_show, month_show, day_show ];
    inputArray[obj.index].style.pointerEvents = 'none';    
    
    days = new Date(yearInput.value, monthInput.value, 0).getDate();
    const options = document.querySelector(`.${obj.type} .options`);

    switch (obj.type) {
        case 'userInput_year':
            for (let i = 0; i <= 0; i++) {
                const li = document.createElement('li');
                li.innerHTML = `${ i + 2020 }年`;
                li.addEventListener('click', () => {
                    yearInput.value = i + 2020;
                    year_show.value = `${yearInput.value} 年`;
                    // li.removeEventListener('click', onDateClick);
                    options.innerHTML = '';
                    year_show.style.pointerEvents = 'auto';
                });
                options.appendChild(li);
            }
            break;
        case 'userInput_month':
            for (let i = 1; i <= 12; i++) {
                const li = document.createElement('li');
                li.innerHTML = `${i}月`;
                li.addEventListener('click', () => {
                    monthInput.value = i;
                    month_show.value = `${monthInput.value} 月`;
                    // li.removeEventListener('click', onDateClick);
                    options.innerHTML = '';
                    month_show.style.pointerEvents = 'auto';
                });
                options.appendChild(li);
            }
            break;
        case 'userInput_day':
            for(let i = 1; i <= days; i++) {
                const li = document.createElement('li');
                li.innerHTML = `${i}日`;
                li.addEventListener('click', () => {
                    dayInput.value = i;
                    day_show.value = `${dayInput.value} 日`;
                    // li.removeEventListener('click', onDateClick);
                    options.innerHTML = '';
                    day_show.style.pointerEvents = 'auto';
                });
                options.appendChild(li);
            }
            break;

    }
    
    

}

/** 初始化日期 */
function initialToday() {
    yearInput.value = year;
    monthInput.value = month;
    dayInput.value = day;
    year_show.value = `${year} 年`;
    month_show.value = `${month} 月`;
    day_show.value = `${day} 日`;
}





// /** 設置初始年月 */
// function setYearMonthSelect() {
//     // 年份設置
//     for(let i = 0; i <= 3; i++) {
//         const option = document.createElement('option');
//         option.setAttribute('value', `${i + 2020}`);
//         option.innerHTML = `${i + 2020}年`;
//         yearInput.appendChild(option);
//         // selectYear.options[i] = new Option(`${ i + 2020 }年`, `${ i + 2020 }`);
//     }


//     // 月份設置
//     for(let i = 1; i <= 12; i++) {
//         const option = document.createElement('option');
//         option.setAttribute('value', `${i}`);
//         option.innerHTML = `${i}月`;
//         monthInput.appendChild(option);
//     }

//     yearInput.value = year;
//     monthInput.value = month;
    
//     // 日設置
//     onMonthChanged();
    
//     dayInput.value = day;
// }

// /** 日 */
// function onMonthChanged() {
//     dayInput.innerHTML = 'none';
    
//     days = new Date(year, monthInput.value, 0).getDate();
//     // 日設置
//     for(let i = 1; i <= days; i++) {
//         const option = document.createElement('option');
//         option.setAttribute('value', `${i}`);
//         option.innerHTML = `${i}日`;
//         dayInput.appendChild(option);
//     }
    
// }

// /** 重置按鈕 */
// function onClickResetBtn() {
//     for(let i = 0; i < $('.itemInput').length; i++) {
//         $('.itemInput')[i].value = '';
//         $('.amountInput')[i].value = '';
//     }
// }



// Post Functions _______________________________________________________________________________________________

/** 所有收支項目欄位 */itemInputs = Array.from($('.itemInput'));
/** 所有收支金額欄位 */amountInputs = Array.from($('.amountInput'));


/** 上傳支出按鈕 */
function onClickSendBtn() {
    sendBalanceSheet();
    sendBalanceSheetDetail();
}

/** 更新收支表 */
function sendBalanceSheet() {
    /** 最後要送至後端的 收支data */const data = [];
    /** amountInputs總和的值 */let dataContainer = 0;
    /** 收支型態 */const type = $('.type');

    for (let i = 0; i < amountInputs.length; i++) {
        if (itemInputs[i].value && amountInputs[i].value) {
            let amount = amountInputs[i].value;

            if (type[i].value === 'expenditure' && (amountInputs[i].value).toString().indexOf('-') === -1 ) {
                amount = -(amountInputs[i].value);
            }

            dataContainer += Number(amount);
        }
    }

    if (dataContainer !== 0) {
        data.push(dataContainer);
    }
    
    
    const parameter = {
        url: 'https://docs.google.com/spreadsheets/d/1VCzkXIRBMjF9iv0Ca89xBLIzTSbYHMvXxxGq6lceusk/edit#gid=0',
        name: '2020BalanceSheet_hong',
        functionType: 'post',
        dataType: 'balanceSheet',
        data: data.toString(),
        month: Number(monthInput.value) + 1,
        day: Number(dayInput.value) + 1,
    };

    console.log(parameter);
    

    $.get('https://script.google.com/macros/s/AKfycbwC9bl6xw2PIbL6mF0ojN1RqokP_43JtxurpA2839FP80Ih2l19/exec', parameter);

}

/** 更新收支表 Detail */
function sendBalanceSheetDetail() {
    /** 最後要送至後端的 項目data */const data1 = [];
    /** 最後要送至後端的 金額data */const data2 = [];
    /** 用來裝 itemInputs的值 */const dataContianer1 = [];
    /** 用來裝 amountInputs的值 */const dataContianer2 = [];
    /** 收支型態 */const type = $('.type');

    for (let i = 0; i < itemInputs.length; i++) {
        if (itemInputs[i].value && amountInputs[i].value) {
            const item = itemInputs[i].value;
            let amount = amountInputs[i].value;

            if (type[i].value === 'expenditure' && (amountInputs[i].value).toString().indexOf('-') === -1 ) {
                amount = -(amountInputs[i].value);
            }

            dataContianer1.push(item);
            dataContianer2.push(amount.toString());
        }
    }
    
    data1.push(dataContianer1);
    data2.push(dataContianer2);
    
    const parameter = {
        url: 'https://docs.google.com/spreadsheets/d/1VCzkXIRBMjF9iv0Ca89xBLIzTSbYHMvXxxGq6lceusk/edit#gid=1948153821',
        name: '2020BalanceSheetDetail_hong',
        functionType: 'post',
        dataType: 'balanceSheetDetail',
        data1: data1.toString(),
        data2: data2.toString(),
        month: Number(monthInput.value) * 2,
        day: Number(dayInput.value) + 1,
    };

    $.get('https://script.google.com/macros/s/AKfycbwC9bl6xw2PIbL6mF0ojN1RqokP_43JtxurpA2839FP80Ih2l19/exec', parameter);

}


// const getFunction1 = new getFunction();