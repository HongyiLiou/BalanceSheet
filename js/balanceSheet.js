// Balance Sheet

/** 輸入年份值 (年) */yearInput = document.querySelector('.balanceSheetBox #year');
/** 輸入月份值 (月) */monthInput = document.querySelector('.balanceSheetBox #month');
/** 輸入日期值 (日) */dayInput = document.querySelector('.balanceSheetBox #day'); // date


/** 初始化收支表 */
function inititialDate_balanceSheet() {
    const balanceSheetSidebarBtn = document.querySelector('.sidebarContent li .balanceSheet').parentNode;
    balanceSheetSidebarBtn.addEventListener('click', () => {
        const showDate = document.querySelector('.balanceSheetBox .showDate');
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
    
        yearInput.value = year;
        monthInput.value = month;
        dayInput.value = day;
    
        showDate.value = `${year} 年 ${month} 月 ${day} 日`;
    
        
        getBalanceSheet();
        getBalanceSheetDetail();
        toggleSwitch_BalanceSheet();

    });
}

// 使用者輸入___________________________________________________________________________________

/** 編輯收支表 */
function toggleBalanceSheetEdit() {
    const editPopup = document.querySelector('.balanceSheetBox .editPopup');
    editPopup.classList.toggle('active');
}


/** 刪除按鈕 */
function onClickDeleteBtn() {
    const list = document.querySelectorAll('.balanceSheetBox .userInputArea_itemList ul li');
    const delBtns = document.querySelectorAll('.balanceSheetBox .userInputArea_itemList .delBtn');

    for (let i = 0; i < delBtns.length; i++) {
        const timer = delBtns[i].addEventListener('click', () => {            
            const listParent = list[i].parentNode;
            list[i].classList.add('hide');
            for (let j = i + 1; j < delBtns.length; j++) {
                list[j].classList.remove('fadeIn');
                list[j].classList.add('translate');
            }
            setTimeout(() => {
                listParent.removeChild(list[i]);
                for (let j = i + 1; j < delBtns.length; j++) {
                    list[j].classList.remove('translate');
                }
                delBtns[i].removeEventListener('click', timer);
                list[i] = null;                
            }, 500);

        });
    }
}


/** 重置按鈕 */
function onClickResetBtn() {
    const itemInput = document.querySelectorAll('.balanceSheetBox .itemInput');
    const amountInput = document.querySelectorAll('.balanceSheetBox .amountInput');
    const typeSelect = document.querySelectorAll('.balanceSheetBox select.type');

    for(let i = 0; i < itemInput.length; i++) {
        itemInput[i].value = '';
        amountInput[i].value = '';
        typeSelect[i].value = 'expenditure'; // 預設收支為支出
    }
}


/** 新增按鈕 */
function onClickAddBtn() {
    const userInputArea = document.querySelector('.balanceSheetBox .userInputArea_itemList ul');
    const userInputList = document.querySelectorAll('.balanceSheetBox .userInputArea_itemList ul li');
    const userInput_items = document.querySelectorAll('.item');
    const userInput_amounts = document.querySelectorAll('.amount');
    const userInput_type = document.querySelectorAll('.type');
    const inputContent = [];

    // 儲存原有欄位的值
    for (let i = 0; i < userInput_items.length; i++) {
        inputContent.push({ item: userInput_items[i].value, amount: userInput_amounts[i].value, type: userInput_type[i].value });
    }

    userInputList.forEach(list => {
        list.classList.remove('fadeIn');
    });

    
    const originalHtml = userInputArea.innerHTML;
    userInputArea.innerHTML = originalHtml + `
        <li class="fadeIn">
            <button class="delBtn"><i class="fa fa-close"></i></button>
            <input class="item itemInput" type="text" placeholder="收支項目"/>
            <input class="amount amountInput" type="number" placeholder="收支金額"/>
            <select class="type" name="type">
                <option value="expenditure">支出</option>
                <option value="income">收入</option>
            </select>
        </li>`;

    const userInput_itemsNew = document.querySelectorAll('.item');
    const userInput_amountsNew = document.querySelectorAll('.amount');
    const userInput_typeNew = document.querySelectorAll('.type');

    // 將原有欄位的值寫入新欄位
    for (let i = 0; i < userInput_items.length; i++) {
        userInput_itemsNew[i].value = inputContent[i].item;
        userInput_amountsNew[i].value = inputContent[i].amount;
        userInput_typeNew[i].value = inputContent[i].type;
    }

    
    const keys = [','];
    userInput_itemsNew.forEach((item, i) => {
        preventInputKeys(item, keys);
        preventInputKeys(userInput_amountsNew[i], keys);
    });
    
    
    $('.balanceSheetBox .userInputArea_itemList ul').animate({
        scrollTop: $('.balanceSheetBox .userInputArea_itemList ul li:last-child()').offset().top
    }, 600, 'swing');

    // const timer = setInterval(() => {
    //     $('.balanceSheetBox .userInputArea_itemList ul').scrollTop($('.balanceSheetBox .userInputArea_itemList ul li:last-child()').offset().top);
    //     if ($('.balanceSheetBox .userInputArea_itemList ul').scrollTop == 0) {
    //         clearInterval(timer);
    //     }
    // }, 50);
    onClickDeleteBtn();

    console.log($('.balanceSheetBox .userInputArea_itemList ul li:last-child()'), $('.balanceSheetBox .userInputArea_itemList ul li:last-child()').offset().top);
    
}


function toggleSwitch_BalanceSheet() {
    /** Toggle Switch */const toggleSwitch = document.querySelector('.balanceSheetBox .toggleSwitch');
    /** 主題開關 checkbox */const checkBox = document.querySelector('.balanceSheetBox .toggleSwitch input');
    /** 外層 BOX */const balanceSheetEdit = document.querySelector('.balanceSheetBox .editPopup');

    // 主題切換 switch按鈕
    toggleSwitch.addEventListener('click', () => {
        setTimeout(() => {
            if (checkBox.checked === false) {
                balanceSheetEdit.classList.add('lightTheme');
                localStorage.setItem('balanceSheetEditTheme', 'light');
                const userSetting = JSON.parse(localStorage.getItem('userSetting'));
                const accountNumber = JSON.parse(localStorage.getItem('login')).AccountNumber;
                const parameter = {
                    accountNumber: accountNumber,
                    url: userSetting.userSettingUrl,
                    name: userSetting.userSettingName,
                    functionType: 'post',
                    dataType: 6, // balanceSheetEditTheme
                    data: 'light',
                }
                $.get('https://script.google.com/macros/s/AKfycbwKNaOjxPaTafWlrLMB4q9zt0RkAHKc2m9D0StpmXsWqsJvYXy1/exec', parameter)

            } else {
                balanceSheetEdit.classList.remove('lightTheme');
                localStorage.removeItem('balanceSheetEditTheme');
                const userSetting = JSON.parse(localStorage.getItem('userSetting'));
                const accountNumber = JSON.parse(localStorage.getItem('login')).AccountNumber;
                const parameter = {
                    accountNumber: accountNumber,
                    url: userSetting.userSettingUrl,
                    name: userSetting.userSettingName,
                    functionType: 'post',
                    dataType: 6, // balanceSheetEditTheme
                    data: 'dark',
                }
                $.get('https://script.google.com/macros/s/AKfycbwKNaOjxPaTafWlrLMB4q9zt0RkAHKc2m9D0StpmXsWqsJvYXy1/exec', parameter)
            }
        }, 50);
    });

    const theme = localStorage.getItem('balanceSheetEditTheme');

    if (theme === 'light') {
        checkBox.checked = false;
        balanceSheetEdit.classList.add('lightTheme');
    } else {
        checkBox.checked = true;
    }
}


/**
 * 設定總金額
 * @param {object} res 
 */
function setBalanceSheetTotal(res) {
    const showTotal = document.querySelector('.balanceSheetBox .showListArea .total p');
    const totalAmount = res.TotalAmount;
    if (!totalAmount) {
        showTotal.innerHTML = '';
        return;
    }

    if (totalAmount < 0) {
        showTotal.innerHTML = `合計： -$${ totalAmount * -1 }`;
    } else {
        showTotal.innerHTML = `合計： $${ totalAmount }`;
    }
}

/**
 * 設定 Detail
 * @param {object} res 
 */
function setBalanceSheetDetail(res) {
    const userInputArea_itemList = document.querySelector('.balanceSheetBox .userInputArea_itemList ul');
    const showDetail = document.querySelector('.balanceSheetBox .showListArea ol');
    const detailItems = res.DetailData[0].split(',');
    const detailAmounts = res.DetailData[1].split(',').map(x => Number(x));
    /** list模板 */let template = `
        <li>
            <button class="delBtn"><i class="fa fa-close"></i></button>
            <input class="item itemInput" type="text" placeholder="收支項目">
            <input class="amount amountInput" type="text" placeholder="收支金額">
            <select class="type" name="type">
                <option value="expenditure">支出</option>
                <option value="income">收入</option>
            </select>
        </li>
        <li>
            <button class="delBtn"><i class="fa fa-close"></i></button>
            <input class="item itemInput" type="text" placeholder="收支項目">
            <input class="amount amountInput" type="text" placeholder="收支金額">
            <select class="type" name="type">
                <option value="expenditure">支出</option>
                <option value="income">收入</option>
            </select>
        </li>`;

    console.log(detailAmounts, detailItems);
    if (!detailItems || !detailAmounts || !detailItems[0]) {
        showDetail.innerHTML = '';
        const li = document.createElement('li');
        li.innerHTML = 
        `<p class="noDate">無資料</p>`
        showDetail.appendChild(li);
        userInputArea_itemList.innerHTML = template;
        return;
    }

    showDetail.innerHTML = '';

    /** 目前的所有list */let dataTemplate = '';

    detailItems.forEach((item, i) => {
        
        dataTemplate = dataTemplate + `
            <li>
                <button class="delBtn"><i class="fa fa-close"></i></button>
                <input class="item itemInput" type="text" placeholder="收支項目" value="${ item }">
                <input class="amount amountInput" type="text" placeholder="收支金額" value="${ Math.abs(detailAmounts[i]) }">
                <select class="type" name="type">
                    <option value="expenditure">支出</option>
                    <option value="income">收入</option>
                </select>
            </li>`;

        const li = document.createElement('li');
        li.innerHTML = `
            <p class="item">${ item }</p>
            <p class="type">${ detailAmounts[i] < 0 ? '支出' : '收入' }</p>
            <p class="amount">${ detailAmounts[i] < 0 ? `-$${ detailAmounts[i] * -1 }` : `$${ detailAmounts[i] }` }</p>`;
    
        showDetail.appendChild(li);
    });

    dataTemplate = dataTemplate + template;
    userInputArea_itemList.innerHTML = dataTemplate;

    // 設定編輯器內 List的收支類別
    const allSelect = document.querySelectorAll('.balanceSheetBox .userInputArea_itemList ul li .type');
    detailAmounts.forEach((amount, i) => {
        allSelect[i].value = amount < 0 ? 'expenditure' : 'income';
    })

    // 禁止使用者輸入逗號
    const detailItemsNew = document.querySelectorAll('.balanceSheetBox .userInputArea_itemList ul li .item');
    const detailAmountsNew = document.querySelectorAll('.balanceSheetBox .userInputArea_itemList ul li .amount');
    const keys = [','];
    detailItemsNew.forEach((item, i) => {
        preventInputKeys(item, keys);
        preventInputKeys(detailAmountsNew[i], keys);
    });
    
    onClickDeleteBtn();
}


// Post Functions _______________________________________________________________________________________________

/** 上傳支出按鈕 */
function onClickSendBtn() {
    sendBalanceSheet();
    sendBalanceSheetDetail();
    toggleBalanceSheetEdit();
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

    if (dataContainer) {
        data.push(dataContainer);
    } else {
        return;
    }
    
    
    const userSetting = JSON.parse(localStorage.getItem('userSetting'));
    const parameter = {
        // url: 'https://docs.google.com/spreadsheets/d/1VCzkXIRBMjF9iv0Ca89xBLIzTSbYHMvXxxGq6lceusk/edit#gid=0',
        // url: 'https://docs.google.com/spreadsheets/d/1qk0sCr8iWS-DSaWTx1lhe8x5JrgvN2Iwwd_zQkD3jUg/edit#gid=0',
        // name: '2020BalanceSheet_hong',
        // name: '2020BalanceSheet_meng',
        url: userSetting.balanceSheetUrl,
        name: userSetting.balanceSheetName,
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
        showLoading(false);
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
            
            if (item && amount) {
                dataContianer1.push(item);
                dataContianer2.push(amount.toString());
            } else {
                return;
            }
        }
    }

    if (dataContianer1 && dataContianer2) {
        data1.push(dataContianer1);
        data2.push(dataContianer2);
    } else {
        return;
    }
    
    
    const userSetting = JSON.parse(localStorage.getItem('userSetting'));
    const parameter = {
        // url: 'https://docs.google.com/spreadsheets/d/1VCzkXIRBMjF9iv0Ca89xBLIzTSbYHMvXxxGq6lceusk/edit#gid=1948153821',
        // url: 'https://docs.google.com/spreadsheets/d/1qk0sCr8iWS-DSaWTx1lhe8x5JrgvN2Iwwd_zQkD3jUg/edit#gid=1723505957',
        // name: '2020BalanceSheetDetail_hong',
        // name: '2020BalanceSheetDetail_meng',
        url: userSetting.balanceSheetDetailUrl,
        name: userSetting.balanceSheetDetailName,
        functionType: 'post',
        dataType: 'balanceSheetDetail',
        data1: data1.toString(),
        data2: data2.toString(),
        month: Number(monthInput.value) * 2,
        day: Number(dayInput.value) + 1,
    };

    $.get('https://script.google.com/macros/s/AKfycbwC9bl6xw2PIbL6mF0ojN1RqokP_43JtxurpA2839FP80Ih2l19/exec', parameter).done(res => {
        showLoading(false);
    });

}




// Get Functions _______________________________________________________________________________________________

/** 讀取收支表 */
function getBalanceSheet() {
    showLoading(true);
    
    
    const userSetting = JSON.parse(localStorage.getItem('userSetting'));
    console.log(userSetting);
    
    const parameter = {
        // url: 'https://docs.google.com/spreadsheets/d/1VCzkXIRBMjF9iv0Ca89xBLIzTSbYHMvXxxGq6lceusk/edit#gid=0',
        // url: 'https://docs.google.com/spreadsheets/d/1qk0sCr8iWS-DSaWTx1lhe8x5JrgvN2Iwwd_zQkD3jUg/edit#gid=0',
        // name: '2020BalanceSheet_hong',
        // name: '2020BalanceSheet_meng',
        url: userSetting.balanceSheetUrl,
        name: userSetting.balanceSheetName,
        functionType: 'get',
        dataType: 'balanceSheet',
        month: Number(monthInput.value) + 1,
        day: Number(dayInput.value) + 1,
    };
    
    $.get('https://script.google.com/macros/s/AKfycbwC9bl6xw2PIbL6mF0ojN1RqokP_43JtxurpA2839FP80Ih2l19/exec', parameter).done(res => {
        console.log('balanceSheet', res);
        setBalanceSheetTotal(res);
        showLoading(false);
        
    });

}


/** 讀取收支表 Detail */
function getBalanceSheetDetail() {
    showLoading(true);
    
    const userSetting = JSON.parse(localStorage.getItem('userSetting'));
    const parameter = {
        // url: 'https://docs.google.com/spreadsheets/d/1VCzkXIRBMjF9iv0Ca89xBLIzTSbYHMvXxxGq6lceusk/edit#gid=1948153821',
        // url: 'https://docs.google.com/spreadsheets/d/1qk0sCr8iWS-DSaWTx1lhe8x5JrgvN2Iwwd_zQkD3jUg/edit#gid=1723505957',
        // name: '2020BalanceSheetDetail_hong',
        // name: '2020BalanceSheetDetail_meng',
        url: userSetting.balanceSheetDetailUrl,
        name: userSetting.balanceSheetDetailName,
        functionType: 'get',
        dataType: 'balanceSheetDetail',
        month: Number(monthInput.value) * 2,
        day: Number(dayInput.value) + 1,
    };

    $.get('https://script.google.com/macros/s/AKfycbwC9bl6xw2PIbL6mF0ojN1RqokP_43JtxurpA2839FP80Ih2l19/exec', parameter).done(res => {
        console.log('balanceSheetDetail', res);
        setBalanceSheetDetail(res);
        
        showLoading(false);
        
    });

}