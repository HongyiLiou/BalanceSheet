// Balance Sheet

/** 輸入年份值 (年) */yearInput = document.querySelector('.balanceSheetBox #year');
/** 輸入月份值 (月) */monthInput = document.querySelector('.balanceSheetBox #month');
/** 輸入日期值 (日) */dayInput = document.querySelector('.balanceSheetBox #day'); // date


/** 初始化收支表日期 */
function inititialDate_balanceSheet() {
    const showDate = document.querySelector('.balanceSheetBox .showDate');
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    yearInput.value = year;
    monthInput.value = month;
    dayInput.value = day;

    showDate.value = `${year} 年 ${month} 月 ${day} 日`;
}

// 使用者輸入___________________________________________________________________________________


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

// Post Functions _______________________________________________________________________________________________

/** 上傳支出按鈕 */
function onClickSendBtn() {
    sendBalanceSheet();
    sendBalanceSheetDetail();
}


/** 更新收支表 */
function sendBalanceSheet() {
    /** 所有收支項目欄位 */itemInputs = Array.from($('.balanceSheetBox .userInputArea_itemList .itemInput'));
    /** 所有收支金額欄位 */amountInputs = Array.from($('.balanceSheetBox .userInputArea_itemList .amountInput'));
    /** 最後要送至後端的 收支data */const data = [];
    /** amountInputs總和的值 */let dataContainer = 0;
    /** 收支型態 */const type = $('.balanceSheetBox .userInputArea_itemList .type');

    showLoading(true);
    
    for (let i = 0; i < amountInputs.length; i++) {
        if (itemInputs[i].value && amountInputs[i].value) {
            let amount = amountInputs[i].value;

            if (type[i].value === 'expenditure' && (amountInputs[i].value).toString().indexOf('-') === -1) {
                amount = -(amountInputs[i].value);
            }

            dataContainer += Number(amount);
        }
    }

    if (dataContainer !== 0) {
        data.push(dataContainer);
    }
    
    
    const parameter = {
        // url: 'https://docs.google.com/spreadsheets/d/1VCzkXIRBMjF9iv0Ca89xBLIzTSbYHMvXxxGq6lceusk/edit#gid=0',
        url: 'https://docs.google.com/spreadsheets/d/1qk0sCr8iWS-DSaWTx1lhe8x5JrgvN2Iwwd_zQkD3jUg/edit#gid=0',
        name: '2020BalanceSheet_meng',
        // name: '2020BalanceSheet_hong',
        functionType: 'post',
        dataType: 'balanceSheet',
        data: data.toString(),
        month: Number(monthInput.value) + 1,
        day: Number(dayInput.value) + 1,
    };

    console.log(parameter);
    
    $.get('https://script.google.com/macros/s/AKfycbwC9bl6xw2PIbL6mF0ojN1RqokP_43JtxurpA2839FP80Ih2l19/exec', parameter).done(res => {
        getBalanceSheet();
        getBalanceSheetDetail();
        if (res == 'true') {
            const popupObj = {
                text: '傳送成功！',
            }
            showPopupBox(popupObj);
        }
    });

}


/** 更新收支表 Detail */
function sendBalanceSheetDetail() {
    /** 所有收支項目欄位 */itemInputs = Array.from($('.balanceSheetBox .userInputArea_itemList .itemInput'));
    /** 所有收支金額欄位 */amountInputs = Array.from($('.balanceSheetBox .userInputArea_itemList .amountInput'));
    /** 最後要送至後端的 項目data */const data1 = [];
    /** 最後要送至後端的 金額data */const data2 = [];
    /** 用來裝 itemInputs的值 */const dataContianer1 = [];
    /** 用來裝 amountInputs的值 */const dataContianer2 = [];
    /** 收支型態 */const type = $('.balanceSheetBox .userInputArea_itemList .type');

    showLoading(true);

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
        // url: 'https://docs.google.com/spreadsheets/d/1VCzkXIRBMjF9iv0Ca89xBLIzTSbYHMvXxxGq6lceusk/edit#gid=1948153821',
        url: 'https://docs.google.com/spreadsheets/d/1qk0sCr8iWS-DSaWTx1lhe8x5JrgvN2Iwwd_zQkD3jUg/edit#gid=1723505957',
        name: '2020BalanceSheetDetail_meng',
        // name: '2020BalanceSheetDetail_hong',
        functionType: 'post',
        dataType: 'balanceSheetDetail',
        data1: data1.toString(),
        data2: data2.toString(),
        month: Number(monthInput.value) * 2,
        day: Number(dayInput.value) + 1,
    };

    $.get('https://script.google.com/macros/s/AKfycbwC9bl6xw2PIbL6mF0ojN1RqokP_43JtxurpA2839FP80Ih2l19/exec', parameter).done(res => {
    });

}




// Get Functions _______________________________________________________________________________________________

/** 讀取收支表 */
function getBalanceSheet() {
    showLoading(true);
    
    const parameter = {
        // url: 'https://docs.google.com/spreadsheets/d/1VCzkXIRBMjF9iv0Ca89xBLIzTSbYHMvXxxGq6lceusk/edit#gid=0',
        url: 'https://docs.google.com/spreadsheets/d/1qk0sCr8iWS-DSaWTx1lhe8x5JrgvN2Iwwd_zQkD3jUg/edit#gid=0',
        name: '2020BalanceSheet_meng',
        // name: '2020BalanceSheet_hong',
        functionType: 'get',
        dataType: 'balanceSheet',
        month: Number(monthInput.value) + 1,
        day: Number(dayInput.value) + 1,
    };
    
    $.get('https://script.google.com/macros/s/AKfycbwC9bl6xw2PIbL6mF0ojN1RqokP_43JtxurpA2839FP80Ih2l19/exec', parameter).done(res => {
        console.log('balanceSheet', res);
        showLoading(false);
        
    });

}


/** 更新收支表 Detail */
function getBalanceSheetDetail() {
    showLoading(true);
    
    const parameter = {
        // url: 'https://docs.google.com/spreadsheets/d/1VCzkXIRBMjF9iv0Ca89xBLIzTSbYHMvXxxGq6lceusk/edit#gid=1948153821',
        url: 'https://docs.google.com/spreadsheets/d/1qk0sCr8iWS-DSaWTx1lhe8x5JrgvN2Iwwd_zQkD3jUg/edit#gid=1723505957',
        name: '2020BalanceSheetDetail_meng',
        // name: '2020BalanceSheetDetail_hong',
        functionType: 'get',
        dataType: 'balanceSheetDetail',
        month: Number(monthInput.value) * 2,
        day: Number(dayInput.value) + 1,
    };

    $.get('https://script.google.com/macros/s/AKfycbwC9bl6xw2PIbL6mF0ojN1RqokP_43JtxurpA2839FP80Ih2l19/exec', parameter).done(res => {
        console.log('balanceSheetDetail', res);
        showLoading(false);
        
    });

}