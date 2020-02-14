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
        showScreenHolder(false);
    });
    // setYearMonthSelect();

    // console.log(selectYear.value, selectMonth.value, selectDay.value);
    
    
}

/** 顯示 screenHolder */
function showScreenHolder(boolean) {
    if (boolean) {
        screenHolder.classList.add('show');
    } else {
        const allInput_show = document.querySelectorAll('.input_show');
        const allOptions = document.querySelectorAll('.options');
        screenHolder.classList.remove('show');
        allInput_show.forEach(input_show => {
            input_show.style.pointerEvents = 'auto';
        });
        allOptions.forEach(option => {
            option.innerHTML = '';
        });
    }
}


// 使用者輸入___________________________________________________________________________________

/** 日期選擇 */
function onDateClick(obj = {index: number, type: string}) {
    const inputArray = [ year_show, month_show, day_show ];
    inputArray[obj.index].style.pointerEvents = 'none';
    showScreenHolder(true);
    
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
                    options.innerHTML = '';
                    year_show.style.pointerEvents = 'auto';
                    showScreenHolder(false);
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
                    dayInput.value = 1;
                    day_show.value = `${dayInput.value} 日`;
                    options.innerHTML = '';
                    month_show.style.pointerEvents = 'auto';
                    showScreenHolder(false);
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
                    options.innerHTML = '';
                    day_show.style.pointerEvents = 'auto';
                    showScreenHolder(false);
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

/** 重置按鈕 */
function onClickResetBtn() {
    const itemInput = document.querySelectorAll('.itemInput');
    const amountInput = document.querySelectorAll('.amountInput');
    const typeSelect = document.querySelectorAll('.typeSelect');

    for(let i = 0; i < itemInput.length; i++) {
        itemInput[i].value = '';
        amountInput[i].value = '';
        typeSelect[i].value = '';
    }
}

/** 新增按鈕 */
function onClickAddBtn() {
    const userInputArea = document.querySelector('.userInputArea_itemList ul');
    const originalHtml = userInputArea.innerHTML;
    const userInput_items = document.querySelectorAll('.item');
    const userInput_amounts = document.querySelectorAll('.amount');
    const userInput_type = document.querySelectorAll('.type');
    const inputContent = [];

    // 儲存原有欄位的值
    for (let i = 0; i < userInput_items.length; i++) {
        inputContent.push({ item: userInput_items[i].value, amount: userInput_amounts[i].value, type: userInput_type[i].value });
    }

    userInputArea.innerHTML = originalHtml + '\
        <li>\
        <input class="item itemInput" type="text" placeholder="收支項目"/>\
        <input class="amount amountInput" type="number" placeholder="收支金額"/>\
        <select class="type" name="type">\
            <option value="expenditure">支出</option>\
            <option value="income">收入</option>\
        </select>\
        </li>';

    const userInput_itemsNew = document.querySelectorAll('.item');
    const userInput_amountsNew = document.querySelectorAll('.amount');
    const userInput_typeNew = document.querySelectorAll('.type');

    // 將原有欄位的值寫入新欄位
    for (let i = 0; i < userInput_items.length; i++) {
        userInput_itemsNew[i].value = inputContent[i].item;
        userInput_amountsNew[i].value = inputContent[i].amount;
        userInput_typeNew[i].value = inputContent[i].type;
    }
    
}