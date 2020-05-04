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
        console.log(res);
        const resData = res;
        const showLinksList = document.querySelector('.linksPageBox .links');
        const outputData = [];
        showLinksList.innerHTML = '';

        resData.forEach(data => {
            const listData = {
                name: data[0],
                link: data[1]
            };
            outputData.push(listData);
        });

        outputData.forEach(x => {
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
            showLinksList.appendChild(li);

        })

        showLinksList.innerHTML = showLinksList.innerHTML + `
            <li class="addLinkBtn" onclick="getlinks()">
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
  
        // if (res == 'true') {
        //     const popupObj = {
        //         text: '使用者名稱變更成功！',
        //     }
        //     showPopupBox(popupObj);
        // } else {
        //     const popupObj = {
        //         text: '請稍後再試',
        //     }
        //     showPopupBox(popupObj);
        // }


    });

}