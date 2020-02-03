
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

    /** 欄位一 */grid1 = $('#grid1');
    /** 欄位二 */grid2 = $('#grid2');
    /** 欄位三 */grid3 = $('#grid3');

    constructor() {
        console.log('postFunction is ready.');
        
    }

    /** 按鈕按鈕 */
    onClickSendBtn() {
        const data = [[`${this.grid1.val()}`, `${this.grid2.val()}`, `${this.grid3.val()}`]]
        const parameter = {
            url: 'https://docs.google.com/spreadsheets/d/1VCzkXIRBMjF9iv0Ca89xBLIzTSbYHMvXxxGq6lceusk/edit#gid=0',
            name: '2020BalanceSheet_hong',
            functionType: 'get',
            data: data.toString(),
            insertType: 'bottom',
            row: data.length,
            column: data[0].length,
        };
        $.get('https://script.google.com/macros/s/AKfycbwC9bl6xw2PIbL6mF0ojN1RqokP_43JtxurpA2839FP80Ih2l19/exec', parameter);
    }
}


const postFunction1 = new postFunction();
// const getFunction1 = new getFunction();