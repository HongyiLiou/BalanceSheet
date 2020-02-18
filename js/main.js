// Main.js


// 共用變數
/** 取得目前時間 */let today = new Date();
/** 取得今年 */let year = today.getFullYear();
/** 取得今月 */let month = today.getMonth() + 1;
/** 取得今日 */let day = today.getDate();
/** 根據目前月份取得日天數 */let days = new Date(year, month, 0).getDate();


// 其他元件
/** Screen Holder */const screenHolder = document.querySelector('.screenHolder');
/** Date Picker type */let datePickerType;


/**初始化 - 所有需要初始化的動作加入這裡 */
window.onload = function() {
    
    loadPages();

    /** 初始化screenHolder狀態 */
    screenHolder.addEventListener('click', () => {
        showScreenHolder(false);
    });    
    
}


/** 顯示 screenHolder */
function showScreenHolder(boolean) {
    if (boolean) {
        screenHolder.classList.add('show');
    } else {
        screenHolder.classList.remove('show');
    }
}


/** 載入 Pages */
function loadPages() {
    // Home Page
    $('#homePage').load('html/home.html', function() {
        const sc = document.createElement('script');
        sc.src = 'js/home.js';
        $('body').append(sc);
    });

    // Balance Sheet Page
    $('#balanceSheetPage').load('html/balanceSheet.html', function() {
        const sc = document.createElement('script');
        sc.src = 'js/balanceSheet.js';
        $('body').append(sc);
        
        inititialDate_balanceSheet();
    });

}




/** 載入日期選擇彈窗 Date Picker */
function loadDatePicker() {
    datePickerType = 'datePicker_balanceSheet';
    $('.popupBox').load('html/datePicker.html', function() {
        const sc = document.createElement('script');
        sc.id = 'datePickerJS';
        sc.src = 'js/datePicker.js';
        $('body').append(sc);
        showScreenHolder(true);
        screenHolder.addEventListener('click', () => {
            /** Cancel button */const cancelBtn = document.querySelector('.datePickerBox .cancelBtn');
            cancelBtn.click();
            screenHolder.removeEventListener('click', loadDatePicker);
        });
    });
}