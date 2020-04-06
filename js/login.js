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

    // setloginInputTitle(false);
    setloginInputTitle(true, 0);
    setloginInputTitle(true, 1);
    setSidebarBtnHidden(true);
}


/**
 * 設定 Login Input 標題
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


/**
 * 使用帳號密碼登入並取得使用者資料
 * @param {String} accountNumber 
 * @param {String} password 
 */
function onLoginBtn(accountNumber, password) {
    const acn = document.querySelector('.loginPageBox .userInput .acn');
    const psw = document.querySelector('.loginPageBox .userInput .psw');
    const rememberChecked = document.querySelector('.loginPageBox .remember .rememberChecked');
    const login = JSON.parse(localStorage.getItem('login'));
    
    if (login) {
        // 直接幫登入
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
                afterLogin();
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
    const sidebarHomeBtn = document.querySelector('.sidebar .sidebarContent ul li .home');
    const userName = document.querySelector('.sidebar .topArea .name');
    const userSetting = JSON.parse(localStorage.getItem('userSetting'));
    userName.value = userSetting.UserName;
    setSidebarBtnHidden(false);

    sidebarHomeBtn.click();
}


/** 確認登入狀態、時間 */
function checkLoginState() {
    const lastLoginTime = new Date(localStorage.getItem('lastLoginTime'));
    const now = new Date();

    // 若距離上次登入時間超過 8 小時，需重新登入
    if ((parseInt(now - lastLoginTime) / 1000 / 60 / 60) > 8) {
        setSidebarBtnHidden(true);
        initialLoginPage();
        setloginInputTitle(false);
    } else {
        onLoginBtn();
        setSidebarBtnHidden(false);
    }
}


/** 登出 */
function setLogOutBtn() {
    const sidebarLoginBtn = document.querySelector('.sidebar .sidebarContent ul li .login');
    const logOutBtn = document.querySelector('.sidebarContent .logOut').parentNode;

    logOutBtn.addEventListener('click', () => {
        const userName = document.querySelector('.sidebar .topArea .name');
        userName.value = 'User Name';
        localStorage.removeItem('login');
        localStorage.removeItem('lastLoginTime');
        localStorage.removeItem('userSetting');
        initialLoginPage();
        sidebarLoginBtn.click();
    });
}

