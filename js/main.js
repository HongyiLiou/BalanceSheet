// date
/** 年份選擇 */const selectYear = $('#year');
/** 月份選擇 */const selectMonth = $('#month');
/** 日期選擇 */const selectDay = $('#day');
/** 取得時間 */const today = new Date();
/** 取得今年 */const year = today.getFullYear();
/** 取得今月 */const month = today.getMonth() + 1;
/** 取得今日 */const day = today.getDate();
console.log(year,month,day);

window.onload = function() {
    setYearMonthSelect();
    
}

/** 年月 */
function setYearMonthSelect() {
    // 年份設置
    for(let i = year - 5; i <= year + 5; i++) {
        const option = document.createElement('option');
        option.innerHTML = i;
        selectYear[0].appendChild(option);
    }


    // 月份設置
    for(let i = 1; i <= 12; i++) {
        const option = document.createElement('option');
        option.setAttribute('value', `${i}`);
        option.innerHTML = `${i}月`;
        selectMonth[0].appendChild(option);
    }

    // 日設置
    onMonthChanged();

    selectYear[0].value = year;
    selectMonth[0].value = month;
    selectDay[0].value = day;
}

/** 日 */
function onMonthChanged() {
    selectDay.empty();
    // 日設置
    for(let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.setAttribute('value', `${i}`);
        option.innerHTML = `${i}日`;
        selectDay[0].appendChild(option);
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

    /** 所有支出項目欄位 */itemInputs = Array.from($('.itemInput'));
    /** 所有支出金額欄位 */amountInputs = Array.from($('.amountInput'));

    constructor() {
        console.log('postFunction is ready.');
        
    }

    onAddItemsBtn() {

    }

    /** 按鈕按鈕 */
    onClickSendBtn() {
        /** 最後要送至後端的 項目data */const data1 = [];
        /** 最後要送至後端的 金額data */const data2 = [];
        /** 用來裝 itemInputs的值 */const dataContianer1 = [];
        /** 用來裝 amountInputs的值 */const dataContianer2 = [];

        for (let i = 0; i < this.itemInputs.length; i++) {
            if (this.itemInputs[i].value && this.amountInputs[i].value) {
                dataContianer1.push(`${this.itemInputs[i].value}`);
                dataContianer2.push(`${this.amountInputs[i].value}`);
            }
        }
        
        data1.push(dataContianer1);
        data2.push(dataContianer2);
        
        // const parameter = {
        //     url: 'https://docs.google.com/spreadsheets/d/1VCzkXIRBMjF9iv0Ca89xBLIzTSbYHMvXxxGq6lceusk/edit#gid=0',
        //     name: '2020BalanceSheet_hong',
        //     functionType: 'post',
        //     data1: data1.toString(),
        //     // insertType: 'bottom',
        //     row1: data1.length,
        //     column1: data1[0].length,
        //     range: `2020BalanceSheet_hong!B2:B3`
        // };
        // $.get('https://script.google.com/macros/s/AKfycbwC9bl6xw2PIbL6mF0ojN1RqokP_43JtxurpA2839FP80Ih2l19/exec', parameter);
    }
}


const postFunction1 = new postFunction();
// const getFunction1 = new getFunction();