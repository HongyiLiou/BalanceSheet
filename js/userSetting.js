// userSetting.js


/**
 * 變更使用者名稱
 * @param {String} name 
 */
function onChangeUserName(name) {
    showLoading(true);
    const userSetting = JSON.parse(localStorage.getItem('userSetting'));
    const accountNumber = JSON.parse(localStorage.getItem('login')).AccountNumber;
    const parameter = {
        accountNumber: accountNumber,
        url: userSetting.userSettingUrl,
        name: userSetting.userSettingName,
        functionType: 'post',
        dataType: 4, // UserName
        data: name,
    }
    $.get('https://script.google.com/macros/s/AKfycbwKNaOjxPaTafWlrLMB4q9zt0RkAHKc2m9D0StpmXsWqsJvYXy1/exec', parameter).done(res => {
        showLoading(false);
        if (res == 'true') {
            const popupObj = {
                text: '使用者名稱變更成功！',
            }
            showPopupBox(popupObj);
        } else {
            const popupObj = {
                text: '請稍後再試',
            }
            showPopupBox(popupObj);
        }

    })
    
}


/** 主題切換 */
function toggleSwitch_userSetting_themes() {    
    /** css root */const root = document.documentElement;
    /** Toggle Switch */const toggleSwitch = document.querySelector('.userSettingPageBox .toggleSwitch');
    /** 主題開關 checkbox */const checkBox = document.querySelector('.userSettingPageBox .toggleSwitch input');
    /** 外層 BOX */const webApp = document.querySelector('body');

    // 主題切換 switch按鈕
    toggleSwitch.addEventListener('click', () => {
        const userSetting = JSON.parse(localStorage.getItem('userSetting'));
        const accountNumber = JSON.parse(localStorage.getItem('login')).AccountNumber;

        setTimeout(() => {
            if (checkBox.checked === false) {
                root.style.setProperty('--colorMain', '#FFFFFF');
                webApp.classList.add('lightTheme');
                localStorage.setItem('userSettingTheme', 'light');
                const parameter = {
                    accountNumber: accountNumber,
                    url: userSetting.userSettingUrl,
                    name: userSetting.userSettingName,
                    functionType: 'post',
                    dataType: 5, // Theme
                    data: 'light',
                }
                $.get('https://script.google.com/macros/s/AKfycbwKNaOjxPaTafWlrLMB4q9zt0RkAHKc2m9D0StpmXsWqsJvYXy1/exec', parameter)


            } else {
                root.style.setProperty('--colorMain', '#111111');
                webApp.classList.remove('lightTheme');
                localStorage.removeItem('userSettingTheme');
                const accountNumber = JSON.parse(localStorage.getItem('login')).AccountNumber;
                const parameter = {
                    accountNumber: accountNumber,
                    url: userSetting.userSettingUrl,
                    name: userSetting.userSettingName,
                    functionType: 'post',
                    dataType: 5, // Theme
                    data: 'dark',
                }
                $.get('https://script.google.com/macros/s/AKfycbwKNaOjxPaTafWlrLMB4q9zt0RkAHKc2m9D0StpmXsWqsJvYXy1/exec', parameter)
            }
        }, 50);
    });


    const userTheme = JSON.parse(localStorage.getItem('userSetting')).Theme;
    const localTheme = localStorage.getItem('userSettingTheme');


    if (userTheme === 'light') {        
        root.style.setProperty('--colorMain', '#FFFFFF');
        checkBox.checked = false;
        webApp.classList.add('lightTheme');
    } else if (localTheme === 'light') {
        root.style.setProperty('--colorMain', '#FFFFFF');
        checkBox.checked = false;
        webApp.classList.add('lightTheme');
    } else {
        root.style.setProperty('--colorMain', '#111111');
        checkBox.checked = true;
    }
}
