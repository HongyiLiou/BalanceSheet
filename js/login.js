// login.js


/** 初始化 Login Page */
function initialLoginPage() {
    const acn = document.querySelector('.loginPageBox .userInput .acn');
    const psw = document.querySelector('.loginPageBox .userInput .psw');
    const rememberChecked = document.querySelector('.loginPageBox .remember .rememberChecked');
    const rememberLogin = localStorage.getItem('rememberLogin');
    const loginData = JSON.parse(rememberLogin);
    
    acn.value = loginData ? loginData.AccountNumber : '';
    psw.value = loginData ? loginData.Password : '';
    rememberChecked.checked = loginData ? true : false;

    setloginInputTitle(false);
    setloginInputTitle(true, 0);
    setloginInputTitle(true, 1);
    setSidebarBtnHidden(true);
}


/**
 * 設定 Login Input 標題 css
 * @param {Boolean} check 是否檢查欄位值
 * @param {Number} index
 */
function setloginInputTitle(check, index) {
    const userInputTitle = document.querySelectorAll('.loginPageBox .userArea .userInput p');
    const userInput = document.querySelectorAll('.loginPageBox .userArea .userInput input');

    if (check) {
        if (userInput[index].value) {
            userInputTitle[index].classList.add('active');
        } else {
            userInputTitle[index].classList.remove('active');
        }
    } else {
        userInput.forEach((input, i) => {
            input.addEventListener('focus', () => {
                userInputTitle[i].classList.add('active');
            })
            if (input.value) {
                userInputTitle[i].classList.add('active');
            }
        });
    }
}


/**
 * 是否隱藏導覽列按鈕 (登入 / 登出狀態)
 * @param {Boolean} boolean 是 / 否
 */
function setSidebarBtnHidden(boolean) {
    const sidebarBtns = document.querySelectorAll('.sidebar .sidebarContent ul li');
    const sidebarLoginBtn = document.querySelector('.sidebar .sidebarContent ul li .login');
    const userSettingBtn = document.querySelector('.sidebar .userSettingBtn');

    if (boolean) {
        sidebarBtns.forEach(btn => {
            btn.classList.add('hide');
        });
        userSettingBtn.classList.add('hide');
        sidebarLoginBtn.parentNode.classList.remove('hide');
    } else {
        sidebarBtns.forEach(btn => {
            btn.classList.remove('hide');
        });
        userSettingBtn.classList.remove('hide');
        sidebarLoginBtn.parentNode.classList.add('hide');
    }
}


/** 按 Enter鍵登入 */
function loginEnterKeyboard(e) {
    if (e.key === 'Enter') {
        onLoginBtn();
    }
}


/**
 * 使用帳號密碼登入並取得使用者資料
 * @param {Boolean} autoLogOut 
 */
function onLoginBtn(autoLogOut) {
    const acn = document.querySelector('.loginPageBox .userInput .acn');
    const psw = document.querySelector('.loginPageBox .userInput .psw');
    const rememberChecked = document.querySelector('.loginPageBox .remember .rememberChecked');
    const login = JSON.parse(localStorage.getItem('login'));
    
    if (login) {
        // 直接幫登入
        showLoading(true);

        const parameter = {
            functionType: 'get',
            accountNumber: login.AccountNumber,
            password: login.Password,
        };

        $.get('https://script.google.com/macros/s/AKfycbwKNaOjxPaTafWlrLMB4q9zt0RkAHKc2m9D0StpmXsWqsJvYXy1/exec', parameter).done(res => {
            console.log(res);
            showLoading(false);

            if (res == '帳號或密碼錯誤' || res == '密碼錯誤') {
                const popupObj = {
                    text: res
                }
                showPopupBox(popupObj);
            } else {
                const jsonString = JSON.stringify(res);
                localStorage.setItem('userSetting', jsonString);
                const lastLoginTime = new Date();
                localStorage.setItem('lastLoginTime', lastLoginTime);

                afterLogin();

                if (autoLogOut) {
                    return;
                } else {
                    // 歡迎回來
                    const userName = JSON.parse(localStorage.getItem('userSetting')).UserName;
                    const popupObj = {
                        text: `歡迎回來，${userName}！😊`,
                    }
                    showPopupBox(popupObj);
                }
            }
            
        });

    } else if (acn.value && psw.value) {


        showLoading(true);

        const parameter = {
            functionType: 'get',
            accountNumber: acn.value,
            password: psw.value,
        };

        $.get('https://script.google.com/macros/s/AKfycbwKNaOjxPaTafWlrLMB4q9zt0RkAHKc2m9D0StpmXsWqsJvYXy1/exec', parameter).done(res => {
            console.log(res);
            showLoading(false);

            if (res == '帳號或密碼錯誤' || res == '密碼錯誤') {                
                const popupObj = {
                    text: res
                }
                showPopupBox(popupObj);
            } else {
                const jsonString = JSON.stringify(res);
                localStorage.setItem('userSetting', jsonString);

                // 是否記住我
                if (rememberChecked.checked === true) {
                    const jsonString = JSON.stringify({ AccountNumber: acn.value, Password: psw.value, rememberMe: true });
                    localStorage.setItem('rememberLogin', jsonString);
                } else {
                    localStorage.removeItem('rememberLogin')
                }
        
                const lastLoginTime = new Date();
                localStorage.setItem('lastLoginTime', lastLoginTime);
        
                // 登入資訊用於暫存
                const login = JSON.stringify({ AccountNumber: acn.value, Password: psw.value });
                localStorage.setItem('login', login);

         
                afterLogin();

                // 歡迎回來
                const userName = JSON.parse(localStorage.getItem('userSetting')).UserName;
                const popupObj = {
                    text: `歡迎回來，${userName}！😊`,
                }
                showPopupBox(popupObj);
            }
            
        });

    } else {
        const popupSettingObj = {
            text: '請輸入帳號密碼'
        }
        showPopupBox(popupSettingObj);
        return;
    }
}


/** 登入後要做的事 */
function afterLogin() {
    /** css root */const root = document.documentElement;
    /** 主題開關 checkbox */const checkBox = document.querySelector('.userSettingPageBox .toggleSwitch input');
    /** 外層 BOX */const webApp = document.querySelector('body');
    /** 背景 */const mainBackground = document.querySelector('.mainBackground .mainBackgroundImg');
    /** 變更大頭照按鈕 */const editPhoto = document.querySelector('.sidebar .topArea .photo .editPhoto');
    const userName = document.querySelector('.sidebar .topArea .name');
    const userSetting = JSON.parse(localStorage.getItem('userSetting'));
    userName.value = userSetting.UserName;
    editPhoto.style.display = 'block';
    setSidebarBtnHidden(false);

    // 設定主題
    const localTheme = localStorage.getItem('userSettingTheme');
    if (userSetting !== null) { 
        const userTheme = userSetting.Theme;
        if (userTheme === 'light') {
            localStorage.setItem('userSettingTheme', 'light');
            root.style.setProperty('--colorMain', '#FFFFFF');
            checkBox.checked = false;
            webApp.classList.add('lightTheme');
        } else {
            localStorage.removeItem('userSettingTheme');
            root.style.setProperty('--colorMain', '#111111');
            checkBox.checked = true;
            webApp.classList.remove('lightTheme');
        }
    } else if (localTheme === 'light') {
        root.style.setProperty('--colorMain', '#FFFFFF');
        checkBox.checked = false;
        webApp.classList.add('lightTheme');
    } else {
        root.style.setProperty('--colorMain', '#111111');
        localStorage.setItem('userSettingTheme', 'light');
        checkBox.checked = true;
    }

    // 設定背景
    if (userSetting) {
        const userBackground = userSetting.background;
        mainBackground.style.backgroundImage = `url("./images/${userBackground}Bg.jpg")`;
        localStorage.setItem('userSettingBackground', userBackground);
    } else if (localBackground) {
        mainBackground.style.backgroundImage = `url("./images/${localBackground}Bg.jpg")`;
    } else {
        mainBackground.style.backgroundImage = `url("./images/defaultBg.jpg")`;
    }

    // 設定使用者照片
    if (userSetting && userSetting.userPhotoUrl !== 'default') {
        const userPhoto = document.querySelector('.sidebar .topArea .photo');
        userPhoto.style.backgroundImage = `url(${userSetting.userPhotoUrl})`;
    }

    // 預設首頁
    const sidebarHomeBtn = document.querySelector('.sidebar .sidebarContent ul li .home');
    sidebarHomeBtn.click();

    // 取得 Links
    getlinks();
    onClickLinksType();
    setShowLinksType(userSetting.showLinksType);
    showOrHideLinkListWithType('bottom', false);
    showOrHideLinkListWithType('right', false);

    // 取得記事本
    getNotes();
}


/** 確認登入狀態、時間 */
function checkLoginState() {
    const lastLoginTime = new Date(localStorage.getItem('lastLoginTime'));
    const now = new Date();
    const autoLogOut = true;

    // 若距離上次登入時間超過 8 小時，需重新登入
    if ((parseInt(now - lastLoginTime) / 1000 / 60 / 60) > 8) {
        setSidebarBtnHidden(true);
        initialLoginPage();
        setloginInputTitle(false);
    } else {
        onLoginBtn(autoLogOut);
        setSidebarBtnHidden(false);
    }
}


/** 登出 */
function setLogOutBtn() {
    const sidebarLoginBtn = document.querySelector('.sidebar .sidebarContent ul li .login');
    const logOutBtn = document.querySelector('.sidebarContent .logOut').parentNode;
    const userPhoto = document.querySelector('.sidebar .topArea .photo');
    const editPhoto = document.querySelector('.sidebar .topArea .photo .editPhoto');

    logOutBtn.addEventListener('click', () => {
        const userName = document.querySelector('.sidebar .topArea .name');
        userName.value = 'User Name';
        userPhoto.style.backgroundImage = 'url("images/pictureHolder.png")';
        editPhoto.style.display = 'none';
        localStorage.removeItem('login');
        localStorage.removeItem('lastLoginTime');
        localStorage.removeItem('userSetting');
        initialLoginPage();
        sidebarLoginBtn.click();
    });
}

