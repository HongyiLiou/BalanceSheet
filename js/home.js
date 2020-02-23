// home.js

/** Sidebar 選單設定檔 */const sidebarList = [
    { name: '首頁', id: 'homePage', class: 'home', selected: true },
    { name: '收支表', id: 'balanceSheetPage', class: 'balanceSheet', selected: false },
]

/** 初始化 home page 時間 */
function initialHomePageTime() {
    const time = new Date();
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const date = time.getDate();
    const day = time.getDay();    

    const showAPM = document.querySelector('.homePageBox .clock .morningAfternoon');
    const showHour = document.querySelector('.homePageBox .clock .hour');
    const showMinute = document.querySelector('.homePageBox .clock .minute');
    const showSecond = document.querySelector('.homePageBox .clock .second');
    const showDate = document.querySelector('.homePageBox .clock span');
    
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();
    let dayText;

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

    switch (day) {
        case 0:
            dayText = '日';
            break;
        case 1:
            dayText = '一';
            break;
        case 2:
            dayText = '二';
            break;
        case 3:
            dayText = '三';
            break;
        case 4:
            dayText = '四';
            break;
        case 5:
            dayText = '五';
            break;
        case 6:
            dayText = '六';
            break;
        default:
            break;
    }
    
    showSecond.innerHTML = second < 10 ? `0${second}` : second;
    showMinute.innerHTML = minute < 10 ? `0${minute}` : minute;
    

    console.log(hour);
    showDate.innerHTML = `${year}年 ${month}月 ${date}日  週${dayText}`;

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
        }
        // alert(hour)
    }, 1000);
    
}


/** 初始化 Sidebar */
function initialSidebar() {
    /** 漢堡選單 */const burgerMenu = document.querySelector('.burgerMenu');
    /** Sidebar 本人 */const sidebar = document.querySelector('.sidebar');
    /** Screen Holder */const screenHolder = document.querySelector('.screenHolder');

    let toggleScreenHolder = false;

    burgerMenu.addEventListener('click', () => {
        toggleScreenHolder = !toggleScreenHolder;
        burgerMenu.classList.toggle('active');
        sidebar.classList.toggle('active');
        showScreenHolder(toggleScreenHolder);
    });

    screenHolder.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        sidebar.classList.remove('active');
        screenHolder.removeEventListener('click', initialSidebar);
        toggleScreenHolder = false;
    })

    sidebarList.forEach(obj => {
        setSidebarBtns(obj);
    });

}


function setSidebarBtns(listObj) {
    const sidebarBtnsList = document.querySelector('.sidebarContent ul');
    const btn = document.createElement('li');
    const p = document.createElement('p');

    p.className = listObj.class;
    p.innerHTML = listObj.name;
    btn.appendChild(p);
    if (listObj.selected) { btn.classList.add('active'); }
    sidebarBtnsList.appendChild(btn);

    const sidebarBtn = document.querySelector(`.sidebarContent ul li .${listObj.class}`);

    sidebarBtn.parentNode.addEventListener('click', () => {
        const removeClassBtns = document.querySelectorAll('.sidebarContent ul li');
        const removeClassPages = document.querySelectorAll('.page');
        const activePage = document.querySelector(`#${listObj.id}`);
        const burgerBtn = document.querySelector('.burgerMenu');

        removeClassBtns.forEach((btn, i) => {
            btn.classList.remove('active');
            removeClassPages[i].classList.remove('active');
        });

        sidebarBtn.parentNode.classList.add('active');
        activePage.classList.add('active');

        if (window.screen.width < 500) {
            burgerBtn.click();
        }

    });
}