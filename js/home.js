// home.js

/** Sidebar 選單設定檔 */
const sidebarList = [
    { name: '首頁', id: 'homePage', class: 'home', selected: true },
    { name: '收支表', id: 'balanceSheetPage', class: 'balanceSheet', selected: false },
]

/** 初始化 home page 時間 */
function initialHomePageTime() {
    const timeObj = getToday(); // common.js
    const year = timeObj.year;
    const month = timeObj.month;
    const date = timeObj.date;
    let day = timeObj.day;

    const showAPM = document.querySelector('.homePageBox .clock .morningAfternoon');
    const showHour = document.querySelector('.homePageBox .clock .hour');
    const showMinute = document.querySelector('.homePageBox .clock .minute');
    const showSecond = document.querySelector('.homePageBox .clock .second');
    const showDate = document.querySelector('.homePageBox .clock span');
    
    let hour = timeObj.hour;
    let minute = timeObj.minute;
    let second = timeObj.second;

    if (hour == 0) {
        showAPM.innerHTML = '上午';
        showHour.innerHTML = `12:`;
    } else if (hour <= 12) {
        showAPM.innerHTML = '上午';
        showHour.innerHTML = `${hour}:`;
    } else {
        showAPM.innerHTML = '下午';
        showHour.innerHTML = `${hour - 12}:`;
    }
    
    showSecond.innerHTML = second < 10 ? `0${second}` : second;
    showMinute.innerHTML = minute < 10 ? `0${minute}` : minute;
    showDate.innerHTML = `${year}年 ${month}月 ${date}日  週${changeWeekDay(day)}`;

    setInterval(() => {
        second += 1;
        showSecond.innerHTML = second < 10 ? `0${second}` : second;
        showMinute.innerHTML = minute < 10 ? `0${minute}` : minute;

        if (second > 59) {
            second = 0;
            minute += 1;
            showSecond.innerHTML = '00';
            showMinute.innerHTML = minute < 10 ? `0${minute}` : minute;
        }

        if (minute > 59) {
            minute = 0
            hour += 1;
            showMinute.innerHTML = '00';
            if (hour > 23) {
                hour = 0;
                day = day < 6 ? day + 1 : 0;
                showDate.innerHTML = `${year}年 ${month}月 ${date + 1}日  週${changeWeekDay(day)}`;
                showAPM.innerHTML = '上午';
                showHour.innerHTML = `12:`;
            } else if (hour <= 12) {
                showAPM.innerHTML = '上午';
                showHour.innerHTML = `${hour}:`;
            } else {
                showAPM.innerHTML = '下午';
                showHour.innerHTML = `${hour - 12}:`;
            }
        }
        // alert(hour)
    }, 1000);
}


/** 初始化 Sidebar */
function initialSidebar() {
    /** 漢堡選單 */const burgerMenu = document.querySelector('.burgerMenu');
    /** Sidebar 本人 */const sidebar = document.querySelector('.sidebar');
    /** UserSettingBtn */const userSettingBtn = document.querySelector('.userSettingBtn');

    let toggleScreenHolder = false;

    burgerMenu.addEventListener('click', () => {
        toggleScreenHolder = !toggleScreenHolder;
        burgerMenu.classList.toggle('active');
        sidebar.classList.toggle('active');

        // 點擊 ScreenHolder 時要做的事
        const clickScreenHolderToDo = () => {
            burgerMenu.classList.remove('active');
            sidebar.classList.remove('active');
            toggleScreenHolder = false;
        }

        showScreenHolder(toggleScreenHolder, clickScreenHolderToDo, ['bgColorMain']);

    });


    sidebarList.forEach(obj => {
        setSidebarBtns(obj);
    });

    userSettingBtn.addEventListener('click', (event) => {
        const userSettingPage = document.querySelector(`#userSettingPage`);
        const burgerBtn = document.querySelector('.burgerMenu');
        
        removeAllSiderbarActive();
        userSettingPage.classList.add('active');
        event.target.classList.add('active');
        
        if (window.screen.width < 500) {
            burgerBtn.click();
        }

    });
}


/** 設定 Sidebar按鈕 */
function setSidebarBtns(listObj) {
    const sidebarBtnsList = document.querySelector('.sidebarContent ul');
    const btn = document.createElement('li');
    const clickCircle = document.createElement('div');
    const hoverCircle = document.createElement('div');
    const p = document.createElement('p');

    clickCircle.className = 'clickCircle';
    hoverCircle.className = 'hoverCircle';
    p.className = listObj.class;
    p.innerHTML = listObj.name;
    btn.appendChild(clickCircle);
    btn.appendChild(hoverCircle);
    btn.appendChild(p);
    if (listObj.selected) { btn.classList.add('active'); }
    sidebarBtnsList.appendChild(btn);

    const sidebarBtn = document.querySelector(`.sidebarContent ul li .${listObj.class}`);
    // const clickCircle = document.querySelector(`.sidebarContent ul li .${listObj.class}`);

    // 點擊事件
    sidebarBtn.parentNode.addEventListener('click', (event) => {
        const activePage = document.querySelector(`#${listObj.id}`);
        const burgerBtn = document.querySelector('.burgerMenu');
        const clickCircles = document.querySelectorAll('.clickCircle');
        const mousePos = getMousePos(event);

        clickCircles.forEach(circle => {
            circle.style.top = `${mousePos.y}px`;
            circle.style.left = `${mousePos.x}px`;
        });

        removeAllSiderbarActive();

        sidebarBtn.parentNode.classList.add('active');
        activePage.classList.add('active');

        if (window.screen.width < 500) {
            burgerBtn.click();
        }
    });

    // 滑鼠移入事件
    sidebarBtn.parentNode.addEventListener('mousemove', (event) => {
        const hoverCircles = document.querySelectorAll('.hoverCircle');
        const mousePos = getMousePos(event);

        hoverCircles.forEach(circle => {
            // circle.style.top = `${mousePos.y}px`;
            // circle.style.left = `${mousePos.x}px`;
            circle.setAttribute('style', `top: ${mousePos.y}px; left: ${mousePos.x}px;`);
        });
    });

}


/** 移除所有 Sidbar 按鈕、Pages 的 class active */
function removeAllSiderbarActive() {
    const removeClassBtns = document.querySelectorAll('.sidebarContent ul li');
    const removeClassPages = document.querySelectorAll('.page');
    /** UserSettingBtn */const userSettingBtn = document.querySelector('.userSettingBtn');

    removeClassBtns.forEach(btn => {
        btn.classList.remove('active');
    });

    removeClassPages.forEach(page => {
        page.classList.remove('active');
    });

    userSettingBtn.classList.remove('active');

}


function toggleSwitch_userSetting_themes() {
    console.log(123);
    
    /** Toggle Switch */const toggleSwitch = document.querySelector('.userSettingPageBox .toggleSwitch');
    /** 主題開關 checkbox */const checkBox = document.querySelector('.userSettingPageBox .toggleSwitch input');
    /** 外層 BOX */const webApp = document.querySelector('body');

    // 主題切換 switch按鈕
    toggleSwitch.addEventListener('click', () => {
        setTimeout(() => {
            if (checkBox.checked === false) {
                webApp.classList.add('lightTheme');
                localStorage.setItem('userSettingTheme', 'light');
            } else {
                webApp.classList.remove('lightTheme');
                localStorage.removeItem('userSettingTheme');
            }
        }, 50);
    });

    const theme = localStorage.getItem('userSettingTheme');

    if (theme === 'light') {
        checkBox.checked = false;
        webApp.classList.add('lightTheme');
    } else {
        checkBox.checked = true;
    }
}