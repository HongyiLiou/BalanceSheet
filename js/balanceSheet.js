// Post Functions _______________________________________________________________________________________________

/** 上傳支出按鈕 */
function onClickSendBtn() {
    sendBalanceSheet();
    sendBalanceSheetDetail();
}

/** 更新收支表 */
function sendBalanceSheet() {
    /** 所有收支項目欄位 */itemInputs = Array.from($('.itemInput'));
    /** 所有收支金額欄位 */amountInputs = Array.from($('.amountInput'));
    /** 最後要送至後端的 收支data */const data = [];
    /** amountInputs總和的值 */let dataContainer = 0;
    /** 收支型態 */const type = $('.type');

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
    /** 所有收支項目欄位 */itemInputs = Array.from($('.itemInput'));
    /** 所有收支金額欄位 */amountInputs = Array.from($('.amountInput'));
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