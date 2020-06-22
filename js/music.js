// Music.js


/** YouTubePlayer */
let youTubePlayer;
/** YouTubePlayerSetting */
let youTubePlayerSetting = {
    height: '200',
    width: '200',
    videoId: '',
    // videoId: 'LHZXT6813VE',
    playerVars: {
        autoplay: 0,
        loop: 1,
        start: 1,
        playlist: '',
        enablejsapi: 1,
        playsinline: 1 // ios 0.全螢幕  1.內嵌播放
    },
    events: {
        'onReady': function() {
            youTubePlayer.setPlaybackQuality("small");
            getVolumeYouTubePlayer();
        }
    }
}
/** 預設音量 */
let youTubePlayerVolume = 100;
/** 正在播放 */
let youTubePlayingIndex = 0;
/** 背景音樂清單 */
let youTubeMusicData = [
    { id: 'LHZXT6813VE', name: '想見你test', url: 'https://i.imgur.com/9A4Mx75.jpg' },
    { id: 'Ykx8JjW-c8Y', name: '【陳情令】主題曲《無羈》肖戰 王一博', url: 'https://inews.gtimg.com/newsapp_bt/0/9554276998/641' },
    { id: 'J_USGypwMrQ', name: '【陳情令】電視劇插曲《意難平》', url: 'https://i.ytimg.com/vi/-Zge37ofenc/hqdefault.jpg' },
    { id: 'HV9SQ3ZTGSA', name: 'Eric周興哲《This Is Love》', url: 'https://i.ytimg.com/vi/HV9SQ3ZTGSA/maxresdefault.jpg' },
    { id: 'lxsOcRm3dsU', name: 'Eric周興哲《小時候的我們 When We Were Young》', url: 'https://i.ytimg.com/vi/lxsOcRm3dsU/maxresdefault.jpg?x-oss-process=image/resize,m_lfit,h_78,w_140' },
    { id: 'rFj6azCUYrU', name: '艾怡良 Eve Ai《Forever Young》', url: 'https://img.mymusic.net.tw/mms/album/L/916/691916.jpg' },
    { id: '56vWTa3GyAk', name: '郁可唯 Yisa Yu - 路過人間', url: 'https://i.kfs.io/album/global/50498542,3v1/fit/500x500.jpg' },
    { id: '-Km_NObPF5E', name: '孫盛希 Shi Shi【Someday or One Day】', url: 'https://i.ytimg.com/vi/-Km_NObPF5E/maxresdefault.jpg' },
    { id: '62aYD2lzTgw', name: '黃宣 YELLOW【一天 Someday】', url: 'https://i.ytimg.com/vi/62aYD2lzTgw/maxresdefault.jpg' },
    { id: 'SzrDEBV28oM', name: '告五人 Accusefive 【披星戴月的想你】', url: 'https://cfstatic.streetvoice.com/song_covers/ac/cu/accusefive/afZSkqPhp3rbhD39Y9XkYY.jpeg?x-oss-process=image/resize,m_fill,h_600,w_600,limit_0/interlace,1/quality,q_85/format,jpg' },
];


/** 重置背景音樂清單 */
function initialYouTubeMusicData() {
    // 清單版型
    /** List區域 */const playList = document.querySelector('.musicPageBox .playList ul');
    /** 右側可滑動區域 */const albumBox = document.querySelector('.musicPageBox .playList .rightArea .albumBox');
    /** 右側可滑動區域_曲名 */const albumBox_songName = document.querySelector('.musicPageBox .playList .rightArea p');

    // 唱片版型
    /** Album區域 */const albumList = document.querySelector('.musicPageBox .albumList ul');
    
    // 清單版型
    let playListHTML = '';
    let albumBoxHTML = '';
    playList.innerHTML = '';
    albumBox.innerHTML = '';

    // 唱片版型
    let albumListHTML = '';
    albumList.innerHTML = '';

    youTubeMusicData.forEach((musicData, i) => {
        // 清單版型
        const playListTemplate = `
            <li>
                <div class="list">
                    <div class="albumPhoto" style="background-image: url(${musicData.url});"></div>
                    <p>${musicData.name}</p>
                </div>
                <div class="setting">
                    <button class="play" onclick="onYouTubeIframeAPIReady('${musicData.id}'); clickToPlay(${i});" title="播放"></button>
                    <button class="edit" title="編輯"></button>
                    <button class="delete" title="刪除"></button>
                </div>
            </li>
        `;

        const albumBoxTemplate = `
            <div data-index="${i}" data-id="${musicData.id}" data-name="${musicData.name}"
                class="album ${i === 0 ? 'center' : ''}${i === 1 ? 'right' : ''}${i === 2 ? 'visableRight' : ''}"
                style="background-image: url(${musicData.url})">
            </div>
        `;

        // 唱片版型
        const albumTemplate = `
        <li>
            <div class="album" data-index="${i}" data-id="${musicData.id}" data-name="${musicData.name}" onclick="onYouTubeIframeAPIReady('${musicData.id}'); clickToPlay(${i});">
                <div class="albumBg" style="background-image: url(${musicData.url});"></div>
                <div class="albumPhoto" style="background-image: url(${musicData.url});"></div>
            </div>
            <div class="setting">
                <button class="edit" title="編輯"></button>
                <button class="delete" title="刪除"></button>
            </div>
            <p title="${musicData.name}">${musicData.name}</p>
        </li>
    `;


        playListHTML += playListTemplate;
        albumListHTML += albumTemplate;

        albumBoxHTML += albumBoxTemplate;
    })

    // 清單版型
    playList.innerHTML = playListHTML;
    albumList.innerHTML = albumListHTML;
    albumBox.innerHTML = albumBoxHTML;
    albumBox_songName.innerHTML = youTubeMusicData[0].name;
    setScrollAlbumClickEvent();
    albumBoxScroller();

}


/** 設定右側可滑動區域 Album 點擊事件 */
function setScrollAlbumClickEvent() {
    const prevBtn = document.querySelector('.musicPageBox .playList .rightArea .buttonArea .prev');
    const nextBtn = document.querySelector('.musicPageBox .playList .rightArea .buttonArea .next');
    $('.album.visableLeft').off('click');
    $('.album.left').off('click');
    $('.album.right').off('click');
    $('.album.visableRight').off('click');

    $('.album.visableLeft').click(() => {
        prevBtn.click();
        setTimeout(() => {
            prevBtn.click();
            setPlayingMusicName();
        }, 200)
    });
    $('.album.left').click(() => {
        prevBtn.click();
        setPlayingMusicName();
    });
    $('.album.right').click(() => {
        nextBtn.click();
        setPlayingMusicName();
    });
    $('.album.visableRight').click(() => {
        nextBtn.click();
        setTimeout(() => {
            nextBtn.click();
            setPlayingMusicName();
        }, 200)
    });
}


/** 設定正在播放的歌曲 */
function setPlayingMusicName() {
    /** 右側可滑動區域_曲名 */const albumBox_name = document.querySelector('.musicPageBox .playList .rightArea p');
    const centerName = document.querySelector('.musicPageBox .playList .rightArea .albumBox .album.center');

    setTimeout(() => {
        albumBox_name.innerHTML = centerName.dataset.name;
    }, 800);
}


/**
 * 重置播放器
 * @param {string}} videoId 
 */
function onYouTubeIframeAPIReady(videoId) {
    const ctrlq = document.getElementById('youtube-audio');
    const controler_albumPhoto = document.querySelector('.musicPageBox .controler .albumPhoto');
    const controler_songName = document.querySelector('.musicPageBox .controler .viewer .songName span');
    const matchMusicID = youTubeMusicData.find(x => x.id === videoId);
    ctrlq.innerHTML = '<div id="youtube-player"></div>';
    controler_songName.innerHTML = matchMusicID.name;
    controler_albumPhoto.style.backgroundImage = `url(${matchMusicID.url})`;

    if (videoId) {
        youTubePlayerSetting.videoId = videoId;
        youTubePlayerSetting.playerVars.playlist = videoId;
    }

    youTubePlayer = new YT.Player('youtube-player', youTubePlayerSetting);
}


/** 播放音樂 */
function playYouTubePlayer(index) {
    const album = document.querySelectorAll('.musicPageBox .albumList .album');
    const pauseBtn = document.querySelector('.musicPageBox .controler .buttons .pause');
    const playBtn = document.querySelector('.musicPageBox .controler .buttons .play');
    const visual = document.querySelector('.musicPageBox .controler .viewer .visual');
    // const stopBtn = document.querySelector('.musicPageBox .controler .buttons .stop');
    // const iframeBtn = document.querySelector('.musicPageBox .controler .buttons .play .youtube-player');
    // stopYouTubePlayer(true);
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
    if (!index && index !== 0) {
        index = youTubePlayingIndex;
    } else {
        youTubePlayingIndex = index;
    }
    
    album[index].classList.remove('paused');
    visual.classList.remove('paused');
    album[index].classList.add('active');
    setTimeout(() => {
        // youTubePlayer.playVideo();
        // stopBtn.click();
        // iframeBtn.click();
        youTubePlayer.setVolume(youTubePlayerVolume);
        visual.classList.add('active');        
    }, 1000);
    console.log('play');
    
}

function clickToPlay(index) {
    playYouTubePlayer(index);
    setTimeout(() => {
        youTubePlayer.playVideo();
    }, 1000);

}


/** 暫停播放音樂 */
function pauseYouTubePlayer() {
    const albums = Array.from(document.querySelectorAll('.musicPageBox .albumList .album'));
    const pauseBtn = document.querySelector('.musicPageBox .controler .buttons .pause');
    const playBtn = document.querySelector('.musicPageBox .controler .buttons .play');
    const visual = document.querySelector('.musicPageBox .controler .viewer .visual');
    const nowPlaying = albums.find(x => x.classList.contains('active'));
    pauseBtn.style.display = 'none';
    playBtn.style.display = 'block';
    nowPlaying.classList.add('paused');
    visual.classList.add('paused');
    youTubePlayer.pauseVideo();
    console.log('pause');
}


/** 停止播放音樂 */
function stopYouTubePlayer(visaulOnly) {
    const albums = document.querySelectorAll('.musicPageBox .albumList .album');
    const pauseBtn = document.querySelector('.musicPageBox .controler .buttons .pause');
    const playBtn = document.querySelector('.musicPageBox .controler .buttons .play');
    const visual = document.querySelector('.musicPageBox .controler .viewer .visual');
    pauseBtn.style.display = 'none';
    playBtn.style.display = 'block';

    if (!visaulOnly) {
        youTubePlayer.stopVideo();
    }

    albums.forEach(album => {
        album.classList.remove('paused', 'active');
    });
    
    visual.classList.remove('paused', 'active');
    console.log('stop');

    // onYouTubeIframeAPIReady('LHZXT6813VE');
}


/** 靜音 */
function muteYouTubePlayer() {
    const muteBtn = document.querySelector('.musicPageBox .controler .buttons .mute');
    const unMuteBtn = document.querySelector('.musicPageBox .controler .buttons .unMute');
    muteBtn.style.display = 'block';
    unMuteBtn.style.display = 'none';
    youTubePlayer.mute();
}


/** 取消靜音 */
function unMuteYouTubePlayer() {
    const muteBtn = document.querySelector('.musicPageBox .controler .buttons .mute');
    const unMuteBtn = document.querySelector('.musicPageBox .controler .buttons .unMute');
    muteBtn.style.display = 'none';
    unMuteBtn.style.display = 'block';
    youTubePlayer.unMute();
}


/** 音量調節 */
function getVolumeYouTubePlayer() {
    const volumebar = document.querySelector('.musicPageBox .controler .buttons .volumebar');
    const barHolder = document.querySelector('.musicPageBox .controler .buttons .volumebar .barHolder');

    let onMousemove = function() {
        // const volume = youTubePlayer.getVolume();
        const volumebarWidth = volumebar.offsetWidth;
        const mousePos = getMousePos(event);
        const percent = Number(Math.round(mousePos.x / volumebarWidth * 100));
        if (percent < 0) { percent = 0; }
        if (percent > 100) { percent = 100; }
        // barHolder.style.transform = `translateX(-${100 - percent}px)`;
        barHolder.style.width = `${percent}px`;
        youTubePlayer.setVolume(percent);
        youTubePlayerVolume = percent;
    }
    
    // 點擊
    volumebar.addEventListener('click', () => {
        onMousemove();
    });

    // 拖曳按下 / 放開 / 移出
    volumebar.addEventListener('mousedown', () => {
        volumebar.addEventListener('mousemove', onMousemove);
    });
    volumebar.addEventListener('mouseup', () => {
        volumebar.removeEventListener('mousemove', onMousemove);
    });

}



/** 清單模式右方可滑動區域 */
function albumBoxScroller() {
    const albumBox = document.querySelector('.musicPageBox .playList .rightArea .albumBox');
    const albums = document.querySelectorAll('.musicPageBox .playList .rightArea .albumBox .album');
    const prevBtn = document.querySelector('.musicPageBox .playList .rightArea .buttonArea .prev');
    const nextBtn = document.querySelector('.musicPageBox .playList .rightArea .buttonArea .next');
    const playBtn = document.querySelector('.musicPageBox .playList .rightArea .buttonArea .play');

    const width = albumBox.firstElementChild.offsetWidth; // 150
    let scrollWidth = width / 2;
    let scrollPoint = 0;
    let canScroll = true;

    // albumBox.addEventListener('mousedown')
    let onMousemove = function() {
        const mousePos = getMousePos(event);

        // 往左滑 (Next)
        if (scrollPoint > mousePos.x && canScroll) {
            nextBtn.click();
            scrollPoint = 0;
            canScroll = false;
            setTimeout(() => {
                canScroll = true;
            }, 300);
        
        // 往右滑 (Prev)
        } else if (scrollPoint < mousePos.x && canScroll) {
            prevBtn.click();
            scrollPoint = 0;
            canScroll = false;
            setTimeout(() => {
                canScroll = true;
            }, 300);
        }

        scrollPoint = mousePos.x;
    }
    
    // 拖曳按下 / 放開 / 移出
    albumBox.addEventListener('mousedown', () => {
        const mousePos = getMousePos(event);
        scrollPoint = mousePos.x;
        albumBox.addEventListener('mousemove', onMousemove());
    });
    albumBox.addEventListener('mouseup', () => {
        albumBox.removeEventListener('mousemove', onMousemove());
    });

    // 上一首
    prevBtn.addEventListener('click', () => {
        if (albumBox.firstElementChild.classList.contains('center')) {
            albumBox.firstElementChild.style.transition = '0.2s';
            albumBox.firstElementChild.style.transform = 'translateX(10px) scale(1.8)';
            albumBox.firstElementChild.nextElementSibling.style.transition = '0.2s';
            albumBox.firstElementChild.nextElementSibling.style.transform = 'translateX(5px) scale(1.3)';
            albumBox.firstElementChild.nextElementSibling.nextElementSibling.style.transition = '0.2s';
            // albumBox.firstElementChild.nextElementSibling.nextElementSibling.style.transform = 'translateX(2px)';
            setTimeout(() => {
                albumBox.firstElementChild.style.transition = '0.5s';
                albumBox.firstElementChild.style.transform = 'translateX(0px) scale(1.8)';
                albumBox.firstElementChild.nextElementSibling.style.transition = '0.5s';
                albumBox.firstElementChild.nextElementSibling.style.transform = 'translateX(0px) scale(1.3)';
                albumBox.firstElementChild.nextElementSibling.nextElementSibling.style.transition = '0.5s';
                // albumBox.firstElementChild.nextElementSibling.nextElementSibling.style.transform = 'translateX(0px)';
                setTimeout(() => {
                    albumBox.firstElementChild.style.transition = '0.8s';
                    albumBox.firstElementChild.style.transform = '';
                    albumBox.firstElementChild.nextElementSibling.style.transition = '0.8s';
                    albumBox.firstElementChild.nextElementSibling.style.transform = '';
                    albumBox.firstElementChild.nextElementSibling.nextElementSibling.style.transition = '0.8s';
                }, 500);
            }, 100);
            return;
        }

        scrollWidth -= width;
        albumBox.style.transform = `translateX(${-scrollWidth}px)`;
        albums.forEach(x => {
            if (x.classList.contains('visableLeft')) {
                x.classList.remove('visableLeft');
                x.classList.add('left');    
                if (x.previousElementSibling) {
                    x.previousElementSibling.classList.add('visableLeft');
                }
            } else if (x.classList.contains('left')) {
                x.classList.remove('left');
                x.classList.add('center');
            } else if (x.classList.contains('center')) {
                x.classList.remove('center');
                x.classList.add('right');
            } else if (x.classList.contains('right')) {
                x.classList.remove('right');
                x.classList.add('visableRight');
            } else if (x.classList.contains('visableRight')) {
                x.classList.remove('visableRight');
            }
        });
        setScrollAlbumClickEvent();
        setPlayingMusicName();
    });

    // 下一首
    nextBtn.addEventListener('click', () => {
        if (albumBox.lastElementChild.classList.contains('center')) {
            albumBox.lastElementChild.style.transition = '0.2s';
            albumBox.lastElementChild.style.transform = 'translateX(-10px) scale(1.8)';
            albumBox.lastElementChild.previousElementSibling.style.transition = '0.2s';
            albumBox.lastElementChild.previousElementSibling.style.transform = 'translateX(-5px) scale(1.3)';
            albumBox.lastElementChild.previousElementSibling.previousElementSibling.style.transition = '0.2s';
            // albumBox.lastElementChild.previousElementSibling.previousElementSibling.style.transform = 'translateX(-2px)';
            setTimeout(() => {
                albumBox.lastElementChild.style.transition = '0.5s';
                albumBox.lastElementChild.style.transform = 'translateX(0px) scale(1.8)';
                albumBox.lastElementChild.previousElementSibling.style.transition = '0.5s';
                albumBox.lastElementChild.previousElementSibling.style.transform = 'translateX(0px) scale(1.3)';
                albumBox.lastElementChild.previousElementSibling.previousElementSibling.style.transition = '0.5s';
                // albumBox.lastElementChild.previousElementSibling.previousElementSibling.style.transform = 'translateX(0px)';
                setTimeout(() => {
                    albumBox.lastElementChild.style.transition = '0.8s';
                    albumBox.lastElementChild.style.transform = '';
                    albumBox.lastElementChild.previousElementSibling.style.transition = '0.8s';
                    albumBox.lastElementChild.previousElementSibling.style.transform = '';
                    albumBox.lastElementChild.previousElementSibling.previousElementSibling.style.transition = '0.8s';
                }, 500);
            }, 100);
            return;
        }

        scrollWidth += width;
        albumBox.style.transform = `translateX(${-scrollWidth}px)`;
        albums.forEach(x => {
            if (x.classList.contains('visableLeft')) {
                x.classList.remove('visableLeft');
            } else if (x.classList.contains('left')) {
                x.classList.remove('left');
                x.classList.add('visableLeft');
            } else if (x.classList.contains('center')) {
                x.classList.remove('center');
                x.classList.add('left');
            } else if (x.classList.contains('right')) {
                x.classList.remove('right');
                x.classList.add('center');
            } else if (x.classList.contains('visableRight') && x.previousElementSibling.classList.contains('center')) {
                x.classList.remove('visableRight');
                x.classList.add('right');
                if (x.nextElementSibling) {
                    x.nextElementSibling.classList.add('visableRight');
                }
            }
        });
        setScrollAlbumClickEvent();
        setPlayingMusicName();
    });

    // 播放
    playBtn.addEventListener('click', () => {
        const albums = Array.from(document.querySelectorAll('.musicPageBox .albumList ul .album'));
        const centerName = document.querySelector('.musicPageBox .playList .rightArea .albumBox .album.center');
        /** 控制器_正在播放：曲名 */const controler_songName = document.querySelector('.musicPageBox .controler .viewer .songName span');
        const playID = centerName.dataset.id;
        const playName = centerName.dataset.name;
        const playIndex = centerName.dataset.index;
        const findIndex = albums.find(x => x.dataset.index === playIndex);
        console.log(findIndex);
        
        controler_songName.innerHTML = playName;
        onYouTubeIframeAPIReady(playID);
        clickToPlay(findIndex.dataset.index);
    });
    
}


/** 設定顯示 Music的方式 */
function setShowMusicType() {
    const showMusicTypeRadio = document.querySelectorAll('.musicPageBox .controler .setting input');
    const showMusicType = document.querySelectorAll('.musicPageBox .controler .setting label');
    const showMusicTypeLocal = localStorage.getItem('showMusicType');
    /** 唱片版型 */const albumList = document.querySelector('.musicPageBox .albumList');
    /** 清單版型 */const playList = document.querySelector('.musicPageBox .playList');

    if (showMusicTypeLocal === 'album') {
        showMusicTypeRadio[1].setAttribute('checked', true);
        albumList.style.display = 'block';
        playList.style.display = 'none';
    } else {
        showMusicTypeRadio[0].setAttribute('checked', true);
        albumList.style.display = 'none';
        playList.style.display = 'flex';      
    }

    showMusicType.forEach(radio => {
        radio.addEventListener('click', (e) => {
            e.stopPropagation();
            setTimeout(() => {
                const value = $('input[type="radio"][name="showMusicsType"]:checked').val();
                console.log(value);

                localStorage.setItem('showMusicType', value);

                if (value === 'album') {                    
                    playList.classList.add('hide');
                    setTimeout(() => {
                        albumList.style.display = 'block';
                        playList.style.display = 'none';
                        playList.classList.remove('hide');
                    }, 500);

                } else {
                    albumList.classList.add('hide');
                    setTimeout(() => {
                        playList.style.display = 'flex';
                        albumList.style.display = 'none';
                        albumList.classList.remove('hide');
                    }, 500);
                }

            }, 0);
        });
    });
}









//     妳說了分開的那晚我徹夜未眠，腦袋重播我們認識起開始的種種，我們是怎麼從那快樂的模樣走散的？
// 第一個吸引我的是妳的笑臉，看著就讓人覺得療癒，像小天使一樣，後來才發現妳整個人都很治癒人心，很多舉動都非常可愛，不管別人怎麼說，我說的可愛都不是單指外表，不過妳好像從未聽懂我的意思。
// 儘管有很多生活習慣不同，時常為了小事吵架，但其實在妳身邊總是開心、安心的，我很喜歡有妳陪伴。
// 雖然不常說，但每次獨自一人的時候都是期待和妳見面的。因為近日有點久沒見面，時常和妳說想妳，沒想到這次妳不僅沒有感受到，還決定不再回應了。
// 人和人之間，不知道哪一次見的就是最後一面了，我沒少經歷過，卻永遠無法習慣，總是覺得受傷。
// 
//     我不是一個好男友、答應妳的事沒做到讓妳覺得我說話不算話、傷害了妳使妳缺乏安全感、規矩很多讓妳覺得綁手綁腳、明明放假卻想在家休息、吵架就說一些刺人的話讓妳難過，但讓妳難過的我其實也在傷害自己，我何嘗不希望自己能犧牲些什麼來換取妳的笑臉，撫平妳的悲傷。
// 漸漸的，我發覺只要一段時間沒見面，獨自一人的過程中妳就會開始疏遠我，然後我們變得連文字都會起爭執讓彼此難受，而且妳會很難過，然後我必須到妳身邊去，只有見到面才能真正解決當下的不愉快。所以每當我讓妳很難過時，即使犧牲精神體力休假也想到妳身邊安撫妳，只是因為不想讓妳繼續難過。
// 後來我又發現，即使在當下安撫了妳，妳也並未看得見並把我的付出放在心上，只覺得我能去找妳很好，只有當下很好。雖說不求回報，但被一次次被忽視也讓人心寒。
// 妳說我愛計較付出，我只是覺得應該把錢花在確實讓妳有幫助的事物上，但這些看起來妳同樣忘記了，因為他們不是讓妳感動的東西，不是妳想要的陪伴或出遊。
// 我承認自己體力太差很需要休息，但休假還是會問問妳讓我去找妳，妳嘴上雖說讓我好好休息，心裡卻不見得真這麼想，久了就在心裡認為我不願付出時間精力陪妳，每逢假日只想在家休息。
// 讓我在家好好休息的是妳，怨我放假只想休息的也是妳，妳說同妳出遊的朋友都雙雙對對只有妳孤身一人，卻忘了我把休假都拿來陪妳，而剩下的1.5天妳叫我留到我的生日。
// 
//     我不是不想好好陪妳，如妳所說多出去走走，活的不那麼封閉不要只剩自己，也決定趁朋友邀約的時機帶妳一起出遊，能讓妳開心也能把妳介紹給我為數不多的朋友。
// 曾經也盯著剛出浴的妳，覺得像可愛公仔一樣療癒的同時，也覺得自己真的可以和眼前的妳劉孟宣一直走下去。儘管個性使然生活會爭吵，但我相信只要之後距離變近了、能更常見面了，興許就會好轉，畢竟我的觀察是因為遠距離造成疏遠，疏離感造成爭吵與傷害。
// 我說過絕對不會主動提分手，原因是我覺得儘管有些時候會難過，但和妳一起的幸福快樂、妳的可愛等等都足以讓我繼續走下去，只要是劉孟宣就好，我一直相信我們會越來越好，簡單說就是沒想過要和妳分開。
// 妳知道嗎，我不怕黑不怕冷不怕熱不怕蟑螂，但是很怕被傷害，我說過每當妳難過的時候我也會傷害自己，就算彼此現狀有點進退兩難，我還是想試著走下去，我覺得妳值得。
// 可如今妳卻真的不要我了，既然這是妳認為正確的"往前"，那我便不再攔妳，或許這也是我自作自受，甚至還想到或許此刻有別的男生像當初的我一樣在妳身邊等妳了。
// 最後還是有些建議，不要再找遠距離，妳沒辦法承受；發脾氣前想清楚自己情緒的源頭是生氣還是難過，是難過的話就好好說好好解決，比起吵架強太多了，這是妳最大的缺點了。
// 決定把這些話寫在這裡，是因為想到妳或許還會想起我，或許還會來看看，但萬一沒看到也算了。
// 一句"不重要了"就能讓想和自己在乎的妳討論自己在乎的事的人閉嘴，可真好用。
// 我很喜歡妳，也還在學著用妳希望的方式愛妳，現在只覺得心疼自己。
// 說好的小人國台東武嶺去不了，想一起吃的麵家二眷沒辦法，連最近說要陪妳去重新貼保護貼也不行了吧，但最最重要的是沒辦法再被妳療癒了，弘弘真的好難過哈哈。