
// $.post('https://script.google.com/macros/s/AKfycbwC9bl6xw2PIbL6mF0ojN1RqokP_43JtxurpA2839FP80Ih2l19/exec', {
//     name: 'Sasuke',
//     age: 27    
// }, function(e) {
//     alert(e)
// });

// var parameter = {
//     url: 'https://docs.google.com/spreadsheets/d/1VCzkXIRBMjF9iv0Ca89xBLIzTSbYHMvXxxGq6lceusk/edit#gid=0', // 試算表網址
//     name: 'hong',
//     startRow: 1,
//     startColumn: 1
// }

// $.get('https://script.google.com/macros/s/AKfycbwC9bl6xw2PIbL6mF0ojN1RqokP_43JtxurpA2839FP80Ih2l19/exec', parameter, function(data) {
//     alert(data)
// })


/** Get */
class getFunction {
    constructor() {
        console.log('getFunction is ready.');
        
    }
}


/** Post */
class postFunction {

    /** 用於計算目前 */itemAmount = 2;

    /** 所有支出欄位 */itemInput1s = Array.from($('.itemInput1'));

    constructor() {
        console.log('postFunction is ready.');
        
    }

    onAddItemsBtn() {

    }

    /** 按鈕按鈕 */
    onClickSendBtn() {
        // const data1 = [[`${this.grid1.val()}`, `${this.grid2.val()}`]]
        const data1 = [];
        const dataContianer1 = [];
        this.itemInput1s.forEach(element => {
            if (element.value) {
                dataContianer1.push(`${element.value}`);
            } else {
                return;
            }
        });
        
        data1.push(dataContianer1);
        console.log(data1);
        
        const parameter = {
            url: 'https://docs.google.com/spreadsheets/d/1VCzkXIRBMjF9iv0Ca89xBLIzTSbYHMvXxxGq6lceusk/edit#gid=0',
            name: '2020BalanceSheet_hong',
            functionType: 'post',
            data1: data1.toString(),
            // insertType: 'bottom',
            row1: data1.length,
            column1: data1[0].length,
            range: `2020BalanceSheet_hong!B2:B3`
        };
        $.get('https://script.google.com/macros/s/AKfycbwC9bl6xw2PIbL6mF0ojN1RqokP_43JtxurpA2839FP80Ih2l19/exec', parameter);
    }
}


const postFunction1 = new postFunction();
// const getFunction1 = new getFunction();