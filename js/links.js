// links.js


/** 初始化快速連結 */
function inititialSidebarBtn_links() {
    const linksSidebarBtn = document.querySelector('.sidebarContent li .links').parentNode;
    linksSidebarBtn.addEventListener('click', () => {
        getlinks();
    });

}

/** 取得快速連結 Links */
function getlinks() {
    showLoading(true);
    const accountNumber = JSON.parse(localStorage.getItem('login')).AccountNumber;
    const parameter = {
        accountNumber: accountNumber,
        functionType: 'get',
    };
    $.get('https://script.google.com/macros/s/AKfycbz7O-mKaU-dKpbDxIA0DLQ8U-71cI_4IhM7F9STav4v4BJwNf3U/exec', parameter).done(res => {
        showLoading(false);
        console.log('Links：', res);
        const resData = res;
        const showLinksList = document.querySelector('.linksPageBox .links');
        const showLinksList_bottom = document.querySelector('.fixBottomLinks ul');
        const showLinksList_right = document.querySelector('.fixRightLinks ul');
        const showLinksList_home = document.querySelector('.fixHomeLinks ul');
        const outputData = [];
        showLinksList.innerHTML = showLinksList_bottom.innerHTML = showLinksList_right.innerHTML = showLinksList_home.innerHTML = '';

        if (resData === 'true') {
            showLinksList.innerHTML = showLinksList.innerHTML + `
                <li class="addLinkBtn" onclick="onClickAddLink()" title="新增快速連結">
                    <span>+</span>
                </li>
            `;
            return;
        }

        resData.forEach(data => {
            const listData = {
                name: data[0],
                link: data[1]
            };
            outputData.push(listData);
        });

        outputData.forEach((x, i) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <button class="delete"></button>
                <a href="${x.link}" target="_blank">
                    <div class="logo ${
                        x.link.indexOf('facebook') !== -1 ? 'facebook' : '' ||
                        x.link.indexOf('instagram') !== -1 ? 'instagram' : '' ||
                        x.link.indexOf('youtube') !== -1 ? 'youtube' : '' ||
                        x.link.indexOf('netflix') !== -1 ? 'netflix' : '' ||
                        x.link.indexOf('translate') !== -1 ? 'translate' : '' ||
                        x.link.indexOf('google') !== -1 && x.link.indexOf('mail') !== -1 ? 'gmail' : '' ||
                        x.link.indexOf('google') !== -1 && x.link.indexOf('maps') !== -1 ? 'googleMap' : '' ||
                        x.link.indexOf('google') !== -1 && x.link.indexOf('drive') !== -1 ? 'googleDrive' : '' ||
                        x.link.indexOf('google') !== -1 ? 'google' : '' ||
                        x.link.indexOf('codepen') !== -1 ? 'codepen' : '' ||
                        x.link.indexOf('github') !== -1 ? 'github' : '' ||
                        x.link.indexOf('pinterest') !== -1 ? 'pinterest' : '' ||
                        x.link.indexOf('railway') !== -1 ? 'railway' : ''
                    }" title="${x.name}">${
                        x.link.indexOf('facebook') !== -1 ||
                        x.link.indexOf('instagram') !== -1 ||
                        x.link.indexOf('youtube') !== -1 ||
                        x.link.indexOf('netflix') !== -1 ||
                        x.link.indexOf('translate') !== -1 ||
                        x.link.indexOf('google') !== -1 && x.link.indexOf('mail') !== -1 ||
                        x.link.indexOf('google') !== -1 && x.link.indexOf('maps') !== -1 ||
                        x.link.indexOf('google') !== -1 && x.link.indexOf('drive') !== -1 ||
                        x.link.indexOf('google') !== -1 ||
                        x.link.indexOf('codepen') !== -1 ||
                        x.link.indexOf('github') !== -1 ||
                        x.link.indexOf('pinterest') !== -1 ||
                        x.link.indexOf('railway') !== -1 ? '' : x.name.split('')[0] 
                    }</div>
                    <p>${x.name}</p>
                </a>
            `;

            // Links頁面以外，僅顯示10筆
            if (i <= 9) {
                const li_bottom = document.createElement('li');
                const li_right = document.createElement('li');
                const li_home = document.createElement('li');

                li_bottom.className = `${
                    x.link.indexOf('facebook') !== -1 ? 'facebook' : '' ||
                    x.link.indexOf('instagram') !== -1 ? 'instagram' : '' ||
                    x.link.indexOf('youtube') !== -1 ? 'youtube' : '' ||
                    x.link.indexOf('netflix') !== -1 ? 'netflix' : '' ||
                    x.link.indexOf('translate') !== -1 ? 'translate' : '' ||
                    x.link.indexOf('google') !== -1 && x.link.indexOf('mail') !== -1 ? 'gmail' : '' ||
                    x.link.indexOf('google') !== -1 && x.link.indexOf('maps') !== -1 ? 'googleMap' : '' ||
                    x.link.indexOf('google') !== -1 && x.link.indexOf('drive') !== -1 ? 'googleDrive' : '' ||
                    x.link.indexOf('google') !== -1 ? 'google' : '' ||
                    x.link.indexOf('codepen') !== -1 ? 'codepen' : '' ||
                    x.link.indexOf('github') !== -1 ? 'github' : '' ||
                    x.link.indexOf('pinterest') !== -1 ? 'pinterest' : '' ||
                    x.link.indexOf('railway') !== -1 ? 'railway' : ''
                }`;

                li_bottom.innerHTML = `${
                        x.link.indexOf('facebook') !== -1 ||
                        x.link.indexOf('instagram') !== -1 ||
                        x.link.indexOf('youtube') !== -1 ||
                        x.link.indexOf('netflix') !== -1 ||
                        x.link.indexOf('translate') !== -1 ||
                        x.link.indexOf('google') !== -1 && x.link.indexOf('mail') !== -1 ||
                        x.link.indexOf('google') !== -1 && x.link.indexOf('maps') !== -1 ||
                        x.link.indexOf('google') !== -1 && x.link.indexOf('drive') !== -1 ||
                        x.link.indexOf('google') !== -1 ||
                        x.link.indexOf('codepen') !== -1 ||
                        x.link.indexOf('github') !== -1 ||
                        x.link.indexOf('pinterest') !== -1 ||
                        x.link.indexOf('railway') !== -1 ? '' : x.name.split('')[0]
                    }
                    <a href="${x.link}" target="_blank" title="${x.name}"></a>
                `;
                li_right.className = `${
                    x.link.indexOf('facebook') !== -1 ? 'facebook' : '' ||
                    x.link.indexOf('instagram') !== -1 ? 'instagram' : '' ||
                    x.link.indexOf('youtube') !== -1 ? 'youtube' : '' ||
                    x.link.indexOf('netflix') !== -1 ? 'netflix' : '' ||
                    x.link.indexOf('translate') !== -1 ? 'translate' : '' ||
                    x.link.indexOf('google') !== -1 && x.link.indexOf('mail') !== -1 ? 'gmail' : '' ||
                    x.link.indexOf('google') !== -1 && x.link.indexOf('maps') !== -1 ? 'googleMap' : '' ||
                    x.link.indexOf('google') !== -1 && x.link.indexOf('drive') !== -1 ? 'googleDrive' : '' ||
                    x.link.indexOf('google') !== -1 ? 'google' : '' ||
                    x.link.indexOf('codepen') !== -1 ? 'codepen' : '' ||
                    x.link.indexOf('github') !== -1 ? 'github' : '' ||
                    x.link.indexOf('pinterest') !== -1 ? 'pinterest' : '' ||
                    x.link.indexOf('railway') !== -1 ? 'railway' : ''
                }`;

                li_right.innerHTML = `${
                        x.link.indexOf('facebook') !== -1 ||
                        x.link.indexOf('instagram') !== -1 ||
                        x.link.indexOf('youtube') !== -1 ||
                        x.link.indexOf('netflix') !== -1 ||
                        x.link.indexOf('translate') !== -1 ||
                        x.link.indexOf('google') !== -1 && x.link.indexOf('mail') !== -1 ||
                        x.link.indexOf('google') !== -1 && x.link.indexOf('maps') !== -1 ||
                        x.link.indexOf('google') !== -1 && x.link.indexOf('drive') !== -1 ||
                        x.link.indexOf('google') !== -1 ||
                        x.link.indexOf('codepen') !== -1 ||
                        x.link.indexOf('github') !== -1 ||
                        x.link.indexOf('pinterest') !== -1 ||
                        x.link.indexOf('railway') !== -1 ? '' : x.name.split('')[0]
                    }
                    <a href="${x.link}" target="_blank" title="${x.name}"></a>
                `;
                li_home.className = `${
                    x.link.indexOf('facebook') !== -1 ? 'facebook' : '' ||
                    x.link.indexOf('instagram') !== -1 ? 'instagram' : '' ||
                    x.link.indexOf('youtube') !== -1 ? 'youtube' : '' ||
                    x.link.indexOf('netflix') !== -1 ? 'netflix' : '' ||
                    x.link.indexOf('translate') !== -1 ? 'translate' : '' ||
                    x.link.indexOf('google') !== -1 && x.link.indexOf('mail') !== -1 ? 'gmail' : '' ||
                    x.link.indexOf('google') !== -1 && x.link.indexOf('maps') !== -1 ? 'googleMap' : '' ||
                    x.link.indexOf('google') !== -1 && x.link.indexOf('drive') !== -1 ? 'googleDrive' : '' ||
                    x.link.indexOf('google') !== -1 ? 'google' : '' ||
                    x.link.indexOf('codepen') !== -1 ? 'codepen' : '' ||
                    x.link.indexOf('github') !== -1 ? 'github' : '' ||
                    x.link.indexOf('pinterest') !== -1 ? 'pinterest' : '' ||
                    x.link.indexOf('railway') !== -1 ? 'railway' : ''
                }`;

                li_home.innerHTML = `${
                        x.link.indexOf('facebook') !== -1 ||
                        x.link.indexOf('instagram') !== -1 ||
                        x.link.indexOf('youtube') !== -1 ||
                        x.link.indexOf('netflix') !== -1 ||
                        x.link.indexOf('translate') !== -1 ||
                        x.link.indexOf('google') !== -1 && x.link.indexOf('mail') !== -1 ||
                        x.link.indexOf('google') !== -1 && x.link.indexOf('maps') !== -1 ||
                        x.link.indexOf('google') !== -1 && x.link.indexOf('drive') !== -1 ||
                        x.link.indexOf('google') !== -1 ||
                        x.link.indexOf('codepen') !== -1 ||
                        x.link.indexOf('github') !== -1 ||
                        x.link.indexOf('pinterest') !== -1 ||
                        x.link.indexOf('railway') !== -1 ? '' : x.name.split('')[0]
                    }
                    <a href="${x.link}" target="_blank" title="${x.name}"></a>
                `;

                showLinksList_bottom.appendChild(li_bottom);
                showLinksList_right.appendChild(li_right);
                showLinksList_home.appendChild(li_home);
            }

            
            showLinksList.appendChild(li);

        })

        if (!outputData.length) {
            showLinksList_bottom.style.display = 'none';
            showLinksList_right.style.display = 'none';
            showLinksList_home.style.display = 'none';
        }

        showLinksList.innerHTML = showLinksList.innerHTML + `
            <li class="addLinkBtn" onclick="onClickAddLink()" title="新增快速連結">
                <span>+</span>
            </li>
        `;

        // 註冊刪除按鈕事件
        const delBtns = document.querySelectorAll('.linksPageBox .links li .delete');
        delBtns.forEach((delBtn, i) => {
            delBtn.addEventListener('click', () => {
                const popupObj = {
                    text: '真的要刪除嗎？🥺',
                    showCancel: true,
                    enterClick: () => {
                        showLoading(true);                     
                        
                        const parameter_del = {
                            accountNumber: accountNumber,
                            functionType: 'delete',
                            delIndex: i
                        };
                        $.get('https://script.google.com/macros/s/AKfycbz7O-mKaU-dKpbDxIA0DLQ8U-71cI_4IhM7F9STav4v4BJwNf3U/exec', parameter_del).done(res => {
                            console.log(res);
                            showLoading(false);
                            getlinks();
                        })
                    }
                }
                showPopupBox(popupObj);

            });
        });

    });

}


/** 註冊快速連結類型點擊事件 */
function onClickLinksType() {
    // const showLinksType = document.querySelectorAll('.linksPageBox .showLinksType label');
    const showLinksType = document.querySelectorAll('.linksPageBox .showLinksType label');
    const userSetting = JSON.parse(localStorage.getItem('userSetting'));
    const accountNumber = JSON.parse(localStorage.getItem('login')).AccountNumber;
    let type = userSetting.showLinksType;
    
    showLinksType.forEach(radio => {
        radio.addEventListener('click', (e) => {
            e.stopPropagation();
            setTimeout(() => {
                const value = $('input[type="radio"][name="showLinksType"]:checked').val();
                console.log(value);

                if (type !== value) {
                    type = value;
                    showLoading(true);

                    const parameter = {
                        accountNumber: accountNumber,
                        url: userSetting.userSettingUrl,
                        name: userSetting.userSettingName,
                        functionType: 'post',
                        dataType: 15, // ShowLinksType
                        data: value,
                    }
                    $.get('https://script.google.com/macros/s/AKfycbwKNaOjxPaTafWlrLMB4q9zt0RkAHKc2m9D0StpmXsWqsJvYXy1/exec', parameter).done(res => {
                        showLoading(false);
                        setShowLinksType(value);
                        if (res == 'true') {
                            const popupObj = {
                                text: '設定好了嗷嗷😃',
                            }
                            showPopupBox(popupObj);
                        }
                    });

                } else {
                    return;
                }

            }, 0);
            
        });
    });
    
}


/** 新增快速連結 Link */
function onClickAddLink() {
    const sendLink = () => {
        const accountNumber = JSON.parse(localStorage.getItem('login')).AccountNumber;
        const linkName = document.querySelector('#popupInput1').value;
        const linkUrl = document.querySelector('#popupInput2').value;
        
        showLoading(true);

        const parameter = {
            accountNumber: accountNumber,
            functionType: 'post',
            data1: linkName.toString(),
            data2: linkUrl.toString(),
        }
        $.get('https://script.google.com/macros/s/AKfycbz7O-mKaU-dKpbDxIA0DLQ8U-71cI_4IhM7F9STav4v4BJwNf3U/exec', parameter).done(res => {
            showLoading(false);
            getlinks();
            if (res == 'true') {
                const popupObj = {
                    text: '新增好了！🤗',
                }
                showPopupBox(popupObj);
            }
        });
    }

    const popupSetting = {
        showCancel: true,
        showInput: 2,
        inputText1: '連結名稱',
        inputText2: '連結網址',
        enterClick: sendLink
    }

    showPopupBox(popupSetting);
}


/**
 * 設定 Links顯示/消失
 * @param {'home' | 'bottom' | 'right'} type 
 */
function showOrHideLinkListWithType(type, show) {
    if (type === 'home') {
        const showLinksList_home = document.querySelector('.fixHomeLinks ul');
        showLinksList_home.style.display = show ? 'flex' : 'none';

    } else if (type === 'bottom') {
        const showLinksList_bottom = document.querySelector('.fixBottomLinks ul');
        showLinksList_bottom.style.display = show ? 'flex' : 'none';

    } else if (type === 'right') {
        const showLinksList_right = document.querySelector('.fixRightLinks ul');
        showLinksList_right.style.display = show ? 'flex' : 'none';

    } else {
        return;
    }
}


/**
 * 設定顯示 Links的方式
 * @param {'home' | 'here' | 'bottom' | 'right'} type
 */
function setShowLinksType(type) {
    const sidebarBtn = document.querySelectorAll('.sidebarContent ul li');
    const showLinksTypeRadio = document.querySelectorAll('.linksPageBox .showLinksType input');
    // const showLinksList_bottom = document.querySelector('.fixBottomLinks');
    // const showLinksList_right = document.querySelector('.fixRightLinks');
    // const showLinksList_home = document.querySelector('.fixHomeLinks');

    switch (type) {
        case 'home':
            showLinksTypeRadio[0].setAttribute('checked', true);
            showOrHideLinkListWithType('home', true);
            showOrHideLinkListWithType('bottom', false);
            showOrHideLinkListWithType('right', false);
            sidebarBtn.forEach(btn => {
                btn.removeAttribute('onclick');
            });
            break;


        case 'here':
            showLinksTypeRadio[1].setAttribute('checked', true);
            showOrHideLinkListWithType('home', false);
            showOrHideLinkListWithType('bottom', false);
            showOrHideLinkListWithType('right', false);
            sidebarBtn.forEach(btn => {
                btn.removeAttribute('onclick');
            });
            break;


        case 'bottom':
            showLinksTypeRadio[2].setAttribute('checked', true);
            showOrHideLinkListWithType('home', true);
            showOrHideLinkListWithType('bottom', true);
            showOrHideLinkListWithType('right', false);
            sidebarBtn.forEach((btn, i) => {
                if (i === 0 || i === 1 || i === sidebarBtn.length - 1) {
                    btn.setAttribute('onclick', 'showOrHideLinkListWithType("bottom", false)');
                } else {
                    btn.setAttribute('onclick', 'showOrHideLinkListWithType("bottom", true)');
                }
            });
            break;


        case 'right':
            showLinksTypeRadio[3].setAttribute('checked', true);
            showOrHideLinkListWithType('home', true);
            showOrHideLinkListWithType('bottom', false);
            showOrHideLinkListWithType('right', true);
            sidebarBtn.forEach((btn, i) => {
                if (i === 0 || i === 1 || i === sidebarBtn.length - 1) {
                    btn.setAttribute('onclick', 'showOrHideLinkListWithType("right", false)');
                } else {
                    btn.setAttribute('onclick', 'showOrHideLinkListWithType("right", true)');
                }
            });
            break;
            

        default:
            break;
    }
    

}