// Main.js


// 共用變數
/** 取得目前時間 */let today = new Date();
/** 取得今年 */let year = today.getFullYear();
/** 取得今月 */let month = today.getMonth() + 1;
/** 取得今日 */let day = today.getDate();
/** 根據目前月份取得日天數 */let days = new Date(year, month, 0).getDate();


// 其他元件
// /** Screen Holder */const screenHolderBasic = document.querySelector('.screenHolderBasic');
/** Date Picker type */let datePickerType;


/**初始化 - 所有需要初始化的動作加入這裡 */
window.onload = function() {
    
    loadPages();
    
}


/** 載入 Pages */
function loadPages() {
    // Login Page
    $('#loginPage').load('html/login.html', function() {
        const sc = document.createElement('script');
        sc.src = 'js/login.js';
        $('body').append(sc);

        setTimeout(() => {
            initialLoginPage();
            setLogOutBtn();
            checkLoginState();
        }, 50);
    });

    // Home Page
    $('#homePage').load('html/home.html', function() {
        const sc = document.createElement('script');
        sc.src = 'js/home.js';
        $('body').append(sc);

        initialHomePageTime();
        initialSidebar();
    });

    // Balance Sheet Page
    $('#balanceSheetPage').load('html/balanceSheet.html', function() {
        const sc = document.createElement('script');
        sc.src = 'js/balanceSheet.js';
        $('body').append(sc);
        
        setTimeout(() => {
            inititialDate_balanceSheet();
        }, 0);
    });

    // User Setting Page
    $('#userSettingPage').load('html/userSetting.html', function() {
        const sc = document.createElement('script');
        sc.src = 'js/userSetting.js';
        $('body').append(sc);
        
        setTimeout(() => {
            toggleSwitch_userSetting_themes();
            changeBackground();
        }, 0);
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

        const onClickScreenHolder = () => {
            /** Cancel button */const cancelBtn = document.querySelector('.datePickerBox .cancelBtn');
            cancelBtn.click();
        }

        
        showScreenHolder(true, onClickScreenHolder);
    });
}