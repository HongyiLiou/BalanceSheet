// links.js

// https://script.google.com/macros/s/AKfycbz7O-mKaU-dKpbDxIA0DLQ8U-71cI_4IhM7F9STav4v4BJwNf3U/exec

function getlinks() {
    showLoading(true);
    const accountNumber = JSON.parse(localStorage.getItem('login')).AccountNumber;
    const parameter = {
        accountNumber: accountNumber,
        functionType: 'get',
    }
    $.get('https://script.google.com/macros/s/AKfycbz7O-mKaU-dKpbDxIA0DLQ8U-71cI_4IhM7F9STav4v4BJwNf3U/exec', parameter).done(res => {
        showLoading(false);
        console.log(res);
        
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

    })

}