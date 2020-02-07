class setUserInput {
    // date
    /** 年份選擇 */yearInput = document.querySelector('#year');
    /** 月份選擇 */monthInput = document.querySelector('#month');
    /** 日期選擇 */dayInput = document.querySelector('#day');
    /** 年份選擇 */year_show = document.querySelector('#year_show');
    /** 月份選擇 */month_show = document.querySelector('#month_show');
    /** 日期選擇 */day_show = document.querySelector('#day_show');
    /** 取得時間 */today = new Date();
    /** 取得今年 */year = this.today.getFullYear();
    /** 取得今月 */month = this.today.getMonth() + 1;
    /** 取得今日 */day = this.today.getDate();
    /** 根據月份取得日天數 */days = new Date(this.year, this.month, 0).getDate();


    constructor() {

    }

    /** 年份選擇 */
    onYearClick() {
        this.yearInput.style.pointerEvents = 'none';
        const options = document.querySelector('.userInput_year .options');
        for (let i = 0; i <= 0; i++) {
            const li = document.createElement('li');
            li.innerHTML = `${ i + 2020 }年`;
            li.addEventListener('click', () => {
                this.yearInput.value = i + 2020;
                this.year_show.value = `${this.yearInput.value} 年`;
                li.removeEventListener('click', this.onYearClick);
                options.innerHTML = '';
                this.yearInput.style.pointerEvents = 'auto';
            });
            options.appendChild(li);
        }
    }

    /** 月份選擇 */
    onMonthClick() {
        this.monthInput.style.pointerEvents = 'none';
        const options = document.querySelector('.userInput_month .options');
        for (let i = 1; i <= 12; i++) {
            const li = document.createElement('li');
            li.innerHTML = `${i}月`;
            li.addEventListener('click', () => {
                this.monthInput.value = i;
                this.month_show.value = `${this.monthInput.value} 月`;
                li.removeEventListener('click', this.onMonthClick);
                options.innerHTML = '';
                this.monthInput.style.pointerEvents = 'auto';
            });
            options.appendChild(li);
        }

    }

    /** 日選擇 */
    onDayClick() {
        this.dayInput.style.pointerEvents = 'none';
        this.days = new Date(this.yearInput.value, this.monthInput.value, 0).getDate();
        const options = document.querySelector('.userInput_day .options');
        // 日設置
        for(let i = 1; i <= this.days; i++) {
            const li = document.createElement('li');
            li.innerHTML = `${i}日`;
            li.addEventListener('click', () => {
                this.dayInput.value = i;
                this.day_show.value = `${this.dayInput.value} 日`;
                console.log(`dayInput.value`, this.dayInput.value);
                options.innerHTML = '';
                this.dayInput.style.pointerEvents = 'auto';
            });
            options.appendChild(li);
        }

    }

}


const userInput = new setUserInput();
