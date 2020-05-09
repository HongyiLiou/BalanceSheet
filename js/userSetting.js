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
    let canActive = true;

    // 主題切換 switch按鈕
    toggleSwitch.addEventListener('click', () => {
        const userSetting = JSON.parse(localStorage.getItem('userSetting'));
        const accountNumber = JSON.parse(localStorage.getItem('login')).AccountNumber;
        
        if (canActive) {
            canActive = false;
            setTimeout(() => {
                showLoading(true);
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
                    $.get('https://script.google.com/macros/s/AKfycbwKNaOjxPaTafWlrLMB4q9zt0RkAHKc2m9D0StpmXsWqsJvYXy1/exec', parameter).done(res => {
                        showLoading(false);
                        canActive = true;
                        if (res == 'true') {
                            const popupObj = {
                                text: '主題變更成功 ❤',
                            }
                            showPopupBox(popupObj);
                        }
                    });
    
                } else {
                    root.style.setProperty('--colorMain', '#111111');
                    webApp.classList.remove('lightTheme');
                    localStorage.removeItem('userSettingTheme');
                    // const accountNumber = JSON.parse(localStorage.getItem('login')).AccountNumber;
                    const parameter = {
                        accountNumber: accountNumber,
                        url: userSetting.userSettingUrl,
                        name: userSetting.userSettingName,
                        functionType: 'post',
                        dataType: 5, // Theme
                        data: 'dark',
                    }
                    $.get('https://script.google.com/macros/s/AKfycbwKNaOjxPaTafWlrLMB4q9zt0RkAHKc2m9D0StpmXsWqsJvYXy1/exec', parameter).done(res => {
                        showLoading(false);
                        canActive = true;
                        if (res == 'true') {
                            const popupObj = {
                                text: '主題變更成功 ❤',
                            }
                            showPopupBox(popupObj);
                        }
                    });
                }
            }, 50);
        }
    });


    const userSetting = JSON.parse(localStorage.getItem('userSetting'));
    const localTheme = localStorage.getItem('userSettingTheme');


    if (userSetting !== null) { 
        const userTheme = userSetting.Theme;
        if (userTheme === 'light') {
            root.style.setProperty('--colorMain', '#FFFFFF');
            checkBox.checked = false;
            webApp.classList.add('lightTheme');
        }
    } else if (localTheme === 'light') {
        root.style.setProperty('--colorMain', '#FFFFFF');
        checkBox.checked = false;
        webApp.classList.add('lightTheme');
    } else {
        root.style.setProperty('--colorMain', '#111111');
        checkBox.checked = true;
    }
}


/** 背景設定 */
function changeBackground() {
    /** 背景 */const mainBackground = document.querySelector('.mainBackground .mainBackgroundImg');
    const userSetting = JSON.parse(localStorage.getItem('userSetting'));
    const localBackground = localStorage.getItem('userSettingBackground');
    const settingBglist = document.querySelector('.userSettingPageBox .settingProject .backgroundList');

    if (userSetting) {
        const userBackground = userSetting.background;
        mainBackground.style.backgroundImage = `url("./images/${userBackground}Bg.jpg")`;
    } else if (localBackground) {
        mainBackground.style.backgroundImage = `url("./images/${localBackground}Bg.jpg")`;
    } else {
        mainBackground.style.backgroundImage = `url("./images/defaultBg.jpg")`;
    }


    // 載入所有背景圖片
    const backgroundList = [
        { name: 'default' },    // 預設
        { name: 'AegeanSea' },  // 愛琴海
        { name: 'Deer' },       // 夜鹿
        { name: 'NightLake' },  // 夜湖
    ]

    backgroundList.forEach(background => {
        const li = document.createElement('li');
        li.style.background = `url('./images/${background.name}Bg.jpg') center center no-repeat`;
        li.style.backgroundSize = 'cover';
        settingBglist.appendChild(li);

        li.addEventListener('click', () => {
            showLoading(true);
            mainBackground.style.backgroundImage = `url("./images/${background.name}Bg.jpg")`;
            localStorage.setItem('userSettingBackground', background.name);
            const accountNumber = JSON.parse(localStorage.getItem('login')).AccountNumber;
            const parameter = {
                accountNumber: accountNumber,
                url: userSetting.userSettingUrl,
                name: userSetting.userSettingName,
                functionType: 'post',
                dataType: 14, // background
                data: background.name,
            }
            $.get('https://script.google.com/macros/s/AKfycbwKNaOjxPaTafWlrLMB4q9zt0RkAHKc2m9D0StpmXsWqsJvYXy1/exec', parameter).done(res => {
                showLoading(false);
                if (res == 'true') {
                    const popupObj = {
                        text: '背景變更成功😊',
                    }
                    showPopupBox(popupObj);
                }
            });
        });
    });
}


/**
 * 修改大頭照
 * @param {event} e 
 */
function editPhoto(e) {

    if (e.target.files && e.target.files[0]) {
        const id = '8a47724fe82de23';
        const token = '681844b133f8b48bde360cb2a6386f12f295f9de';
        const album = 'P6zvdD0';

        const data = {
            file: e.target.files[0],                                    // input type="file" 的值
            name: e.target.files[0].name,                               // input 的圖檔名稱
            size: Math.floor(e.target.files[0].size * 0.001) + 'KB',    // input 的圖片大小
            thumbnail: window.URL.createObjectURL(e.target.files[0]),   // input 的圖片縮圖
            title: 'balanceSheetPhoto',                                 // 圖片標題
            des: 'balanceSheet photo of users'                          // 圖片描述
        }
        console.log(data);
    
        let settings = {
            async: false,
            crossDomain: true,
            processData: false,
            contentType: false,
            type: 'POST',
            url: 'https://api.imgur.com/3/image',
            headers: {
                Authorization: 'Bearer ' + token
            },
            mimeType: 'multipart/form-data'
        }
    
        let form = new FormData();
        form.append('image', data.file);
        form.append('title', data.title);
        form.append('description', data.des);
        form.append('album', album);
    
        settings.data = form;
    
        $.ajax(settings).done(res => {
            console.log('res===', res);
            
        })

    } else {
        return;
    }

    

}
