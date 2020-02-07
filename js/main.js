// // date
// /** 年份選擇 */const selectYear = document.getElementById('year');
// /** 月份選擇 */const selectMonth = document.getElementById('month');
// /** 日期選擇 */const selectDay = document.getElementById('day');
// /** 取得時間 */const today = new Date();
// /** 取得今年 */const year = today.getFullYear();
// /** 取得今月 */const month = today.getMonth() + 1;
// /** 取得今日 */const day = today.getDate();
// /** 根據月份取得日天數 */let days = new Date(year,month,0).getDate();
// console.log(year,month,day);

window.onload = function() {
    // setYearMonthSelect();

    // console.log(selectYear.value, selectMonth.value, selectDay.value);
    
    
}

/** 設置初始年月 */
function setYearMonthSelect() {
    // 年份設置
    for(let i = 0; i <= 3; i++) {
        const option = document.createElement('option');
        option.setAttribute('value', `${i + 2020}`);
        option.innerHTML = `${i + 2020}年`;
        selectYear.appendChild(option);
        // selectYear.options[i] = new Option(`${ i + 2020 }年`, `${ i + 2020 }`);
    }


    // 月份設置
    for(let i = 1; i <= 12; i++) {
        const option = document.createElement('option');
        option.setAttribute('value', `${i}`);
        option.innerHTML = `${i}月`;
        selectMonth.appendChild(option);
    }

    selectYear.value = year;
    selectMonth.value = month;
    
    // 日設置
    onMonthChanged();
    
    selectDay.value = day;
}

/** 日 */
function onMonthChanged() {
    selectDay.innerHTML = 'none';
    
    days = new Date(year, selectMonth.value, 0).getDate();
    // 日設置
    for(let i = 1; i <= days; i++) {
        const option = document.createElement('option');
        option.setAttribute('value', `${i}`);
        option.innerHTML = `${i}日`;
        selectDay.appendChild(option);
    }
    
}

/** 重置按鈕 */
function onClickResetBtn() {
    for(let i = 0; i < $('.itemInput').length; i++) {
        $('.itemInput')[i].value = '';
        $('.amountInput')[i].value = '';
    }
}

/** Get Functions */
class getFunction {
    constructor() {
        console.log('getFunction is ready.');
        
    }
}


/** Post Functions */
class postFunction {

    /** 所有收支項目欄位 */itemInputs = Array.from($('.itemInput'));
    /** 所有收支金額欄位 */amountInputs = Array.from($('.amountInput'));

    constructor() {
        console.log('postFunction is ready.');
        
    }

    /** 上傳支出按鈕 */
    onClickSendBtn() {
        this.sendBalanceSheet();
        this.sendBalanceSheetDetail();
    }

    /** 更新收支表 */
    sendBalanceSheet() {
        /** 最後要送至後端的 收支data */const data = [];
        /** amountInputs總和的值 */let dataContainer = 0;
        /** 收支型態 */const type = $('.type');

        for (let i = 0; i < this.amountInputs.length; i++) {
            if (this.itemInputs[i].value && this.amountInputs[i].value) {
                let amount = this.amountInputs[i].value;

                if (type[i].value === 'expenditure' && (this.amountInputs[i].value).toString().indexOf('-') === -1 ) {
                    amount = -(this.amountInputs[i].value);
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
            month: Number(userInput.monthInput.value) + 1,
            day: Number(userInput.dayInput.value) + 1,
        };

        console.log(parameter);
        

        $.get('https://script.google.com/macros/s/AKfycbwC9bl6xw2PIbL6mF0ojN1RqokP_43JtxurpA2839FP80Ih2l19/exec', parameter);

    }

    /** 更新收支表 Detail */
    sendBalanceSheetDetail() {
        /** 最後要送至後端的 項目data */const data1 = [];
        /** 最後要送至後端的 金額data */const data2 = [];
        /** 用來裝 itemInputs的值 */const dataContianer1 = [];
        /** 用來裝 amountInputs的值 */const dataContianer2 = [];
        /** 收支型態 */const type = $('.type');

        for (let i = 0; i < this.itemInputs.length; i++) {
            if (this.itemInputs[i].value && this.amountInputs[i].value) {
                const item = this.itemInputs[i].value;
                let amount = this.amountInputs[i].value;

                if (type[i].value === 'expenditure' && (this.amountInputs[i].value).toString().indexOf('-') === -1 ) {
                    amount = -(this.amountInputs[i].value);
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
            month: Number(userInput.monthInput.value) * 2,
            day: Number(userInput.dayInput.value) + 1,
        };

        $.get('https://script.google.com/macros/s/AKfycbwC9bl6xw2PIbL6mF0ojN1RqokP_43JtxurpA2839FP80Ih2l19/exec', parameter);

    }
}


const postFunction1 = new postFunction();
// const getFunction1 = new getFunction();