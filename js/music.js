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
    // { id: 'LHZXT6813VE', name: '想見你', url: 'https://i.imgur.com/9A4Mx75.jpg' },
    // { id: 'Ykx8JjW-c8Y', name: '【陳情令】主題曲《無羈》肖戰 王一博', url: 'https://inews.gtimg.com/newsapp_bt/0/9554276998/641' },
    // { id: 'J_USGypwMrQ', name: '【陳情令】電視劇插曲《意難平》', url: 'https://i.ytimg.com/vi/-Zge37ofenc/hqdefault.jpg' },
    // { id: 'HV9SQ3ZTGSA', name: 'Eric周興哲《This Is Love》', url: 'https://i.ytimg.com/vi/HV9SQ3ZTGSA/maxresdefault.jpg' },
    // { id: 'lxsOcRm3dsU', name: 'Eric周興哲《小時候的我們 When We Were Young》', url: 'https://i.ytimg.com/vi/lxsOcRm3dsU/maxresdefault.jpg?x-oss-process=image/resize,m_lfit,h_78,w_140' },
    // { id: 'rFj6azCUYrU', name: '艾怡良 Eve Ai《Forever Young》', url: 'https://img.mymusic.net.tw/mms/album/L/916/691916.jpg' },
    // { id: '56vWTa3GyAk', name: '郁可唯 Yisa Yu - 路過人間', url: 'https://i.kfs.io/album/global/50498542,3v1/fit/500x500.jpg' },
    // { id: '-Km_NObPF5E', name: '孫盛希 Shi Shi【Someday or One Day】', url: 'https://i.ytimg.com/vi/-Km_NObPF5E/maxresdefault.jpg' },
    // { id: '62aYD2lzTgw', name: '黃宣 YELLOW【一天 Someday】', url: 'https://i.ytimg.com/vi/62aYD2lzTgw/maxresdefault.jpg' },
    // { id: 'SzrDEBV28oM', name: '告五人 Accusefive 【披星戴月的想你】', url: 'https://cfstatic.streetvoice.com/song_covers/ac/cu/accusefive/afZSkqPhp3rbhD39Y9XkYY.jpeg?x-oss-process=image/resize,m_fill,h_600,w_600,limit_0/interlace,1/quality,q_85/format,jpg' },
];


/** 初始化背景音樂 */
function getMusic() {
    showLoading(true);

    // https://script.google.com/macros/s/AKfycbwHwM6OtQBrS72hK_WPLWk56i-6xnP4CA-XkVxXJJdCzLU6tlsw/exec
    const accountNumber = JSON.parse(localStorage.getItem('login')).AccountNumber;
    const parameter = {
        accountNumber: accountNumber,
        functionType: 'get',
    };
    $.get('https://script.google.com/macros/s/AKfycbwHwM6OtQBrS72hK_WPLWk56i-6xnP4CA-XkVxXJJdCzLU6tlsw/exec', parameter).done(res => {
        showLoading(false);
        // console.log('Music', res);
        const resData = res;
        // 清單版型
        /** List區域 */const playList = document.querySelector('.musicPageBox .playList ul');
        /** 右側可滑動區域 */const albumBox = document.querySelector('.musicPageBox .playList .rightArea .albumBox');
        /** 右側可滑動區域_曲名 */const albumBox_songName = document.querySelector('.musicPageBox .playList .rightArea p');
    
        // 唱片版型
        /** Album區域 */const albumList = document.querySelector('.musicPageBox .albumList ul');

        // 沒有背景音樂時
        if (resData === 'true') {
            albumList.innerHTML = `
                <li>
                    <p>尚無歌曲</p>
                </li>
            `;
            playList.innerHTML = `
                <li>
                    <div class="list" style="width: 100%;">
                        <p style="width: 100%; text-align: center;">尚無歌曲</p>
                    </div>
                </li>
            `;

        } else {
            const outputData = [];
    
            // 清單版型
            let playListHTML = '';
            let albumBoxHTML = '';
            playList.innerHTML = '';
            albumBox.innerHTML = '';
        
            // 唱片版型
            let albumListHTML = '';
            albumList.innerHTML = '';

            resData.forEach(data => {
                const listData = {
                    id: data[0],
                    name: data[1],
                    url: data[2]
                };
                outputData.push(listData);
            });

            console.log('Music:', outputData);
            youTubeMusicData = outputData;

            youTubeMusicData.forEach((music, i) => {
                // 清單版型
                const playListTemplate = `
                    <li>
                        <div class="list">
                            <div class="albumPhoto" style="background-image: url(${music.url});"></div>
                            <p>${music.name}</p>
                        </div>
                        <div class="setting">
                            <button class="play" onclick="onYouTubeIframeAPIReady('${music.id}'); clickToPlay(${i});" title="播放"></button>
                            <button class="edit" title="編輯"></button>
                            <button class="delete" title="刪除"></button>
                        </div>
                    </li>
                `;
        
                const albumBoxTemplate = `
                    <div data-index="${i}" data-id="${music.id}" data-name="${music.name}"
                        class="album ${i === 0 ? 'center' : ''}${i === 1 ? 'right' : ''}${i === 2 ? 'visableRight' : ''}"
                        style="background-image: url(${music.url})">
                    </div>
                `;
        
                // 唱片版型
                const albumTemplate = `
                    <li>
                        <div class="album" data-index="${i}" data-id="${music.id}" data-name="${music.name}" onclick="onYouTubeIframeAPIReady('${music.id}'); clickToPlay(${i});">
                            <div class="albumBg" style="background-image: url(${music.url});"></div>
                            <div class="albumPhoto" style="background-image: url(${music.url});"></div>
                        </div>
                        <div class="setting">
                            <button class="edit" title="編輯"></button>
                            <button class="delete" title="刪除"></button>
                        </div>
                        <p title="${music.name}">${music.name}</p>
                    </li>
                `;
        
        
                playListHTML += playListTemplate;
                albumListHTML += albumTemplate;
        
                albumBoxHTML += albumBoxTemplate;

            });

            // 清單版型
            playList.innerHTML = playListHTML;
            albumList.innerHTML = albumListHTML;
            albumBox.innerHTML = albumBoxHTML;
            albumBox_songName.innerHTML = youTubeMusicData[0].name;
            setScrollAlbumClickEvent();
            albumBoxScroller();
        }
    });
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
    stopYouTubePlayer(true);
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
            if (albumBox.firstElementChild.nextElementSibling) {
                albumBox.firstElementChild.nextElementSibling.style.transition = '0.2s';
                albumBox.firstElementChild.nextElementSibling.style.transform = 'translateX(5px) scale(1.3)';
            }
            if (albumBox.firstElementChild.nextElementSibling.nextElementSibling) {
                albumBox.firstElementChild.nextElementSibling.nextElementSibling.style.transition = '0.2s';
                // albumBox.firstElementChild.nextElementSibling.nextElementSibling.style.transform = 'translateX(2px)';
            }
            setTimeout(() => {
                albumBox.firstElementChild.style.transition = '0.5s';
                albumBox.firstElementChild.style.transform = 'translateX(0px) scale(1.8)';
                if (albumBox.firstElementChild.nextElementSibling) {
                    albumBox.firstElementChild.nextElementSibling.style.transition = '0.5s';
                    albumBox.firstElementChild.nextElementSibling.style.transform = 'translateX(0px) scale(1.3)';
                }
                if (albumBox.firstElementChild.nextElementSibling.nextElementSibling) {
                    albumBox.firstElementChild.nextElementSibling.nextElementSibling.style.transition = '0.5s';
                    // albumBox.firstElementChild.nextElementSibling.nextElementSibling.style.transform = 'translateX(0px)';
                }
                setTimeout(() => {
                    albumBox.firstElementChild.style.transition = '0.8s';
                    albumBox.firstElementChild.style.transform = '';
                    if (albumBox.firstElementChild.nextElementSibling) {
                        albumBox.firstElementChild.nextElementSibling.style.transition = '0.8s';
                        albumBox.firstElementChild.nextElementSibling.style.transform = '';
                    }
                    if (albumBox.firstElementChild.nextElementSibling.nextElementSibling) {
                        albumBox.firstElementChild.nextElementSibling.nextElementSibling.style.transition = '0.8s';
                    }
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
            if (albumBox.lastElementChild.previousElementSibling) {
                albumBox.lastElementChild.previousElementSibling.style.transition = '0.2s';
                albumBox.lastElementChild.previousElementSibling.style.transform = 'translateX(-5px) scale(1.3)';
            }
            if (albumBox.lastElementChild.previousElementSibling.previousElementSibling) {
                albumBox.lastElementChild.previousElementSibling.previousElementSibling.style.transition = '0.2s';
                // albumBox.lastElementChild.previousElementSibling.previousElementSibling.style.transform = 'translateX(-2px)';
            }
            setTimeout(() => {
                albumBox.lastElementChild.style.transition = '0.5s';
                albumBox.lastElementChild.style.transform = 'translateX(0px) scale(1.8)';
                if (albumBox.lastElementChild.previousElementSibling) {
                    albumBox.lastElementChild.previousElementSibling.style.transition = '0.5s';
                    albumBox.lastElementChild.previousElementSibling.style.transform = 'translateX(0px) scale(1.3)';
                }
                if (albumBox.lastElementChild.previousElementSibling.previousElementSibling) {
                    albumBox.lastElementChild.previousElementSibling.previousElementSibling.style.transition = '0.5s';
                    // albumBox.lastElementChild.previousElementSibling.previousElementSibling.style.transform = 'translateX(0px)';
                }
                setTimeout(() => {
                    albumBox.lastElementChild.style.transition = '0.8s';
                    albumBox.lastElementChild.style.transform = '';
                    if (albumBox.lastElementChild.previousElementSibling) {
                        albumBox.lastElementChild.previousElementSibling.style.transition = '0.8s';
                        albumBox.lastElementChild.previousElementSibling.style.transform = '';
                    }
                    if (albumBox.lastElementChild.previousElementSibling.previousElementSibling) {
                        albumBox.lastElementChild.previousElementSibling.previousElementSibling.style.transition = '0.8s';
                    }
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


/** 設定顯示 Music的方式_Mobile */
function setShowMusicType_modile() {
    const body = document.querySelector('body');

    if (body.offsetWidth < 500) {
        const mobileDisplayMode = document.querySelectorAll('.musicPageBox .controler .viewer .mobileDisplayMode button');
        const mobileDisplayMode_local = localStorage.getItem('mobileDisplayMode');
        const displayAreaUl = document.querySelector('.musicPageBox .playList ul');
        const displayAreaRightArea = document.querySelector('.musicPageBox .playList .rightArea');
        const mode = ['list', 'album'];

        console.log('displayAreaUl', displayAreaUl);
        console.log('displayAreaRightArea', displayAreaRightArea);
        

        if (mobileDisplayMode_local && mobileDisplayMode_local === 'album') {
            displayAreaUl.classList.remove('hide');
            displayAreaUl.style.display = 'none';
            displayAreaRightArea.style.display = 'block';
            mobileDisplayMode[0].classList.remove('active');
            mobileDisplayMode[1].classList.add('active');
        } else {
            displayAreaRightArea.classList.remove('hide');
            displayAreaRightArea.style.display = 'none';
            displayAreaUl.style.display = 'flex';
            mobileDisplayMode[1].classList.remove('active');
            mobileDisplayMode[0].classList.add('active');
        }

        // 切換 Mode事件
        mobileDisplayMode.forEach((modeBtn, i) => {
            modeBtn.addEventListener('click', () => {
                localStorage.setItem('mobileDisplayMode', mode[i]);
                if (i === 0) {
                    displayAreaRightArea.classList.add('hide');
                    mobileDisplayMode[1].classList.remove('active');
                    mobileDisplayMode[0].classList.add('active');
                    setTimeout(() => {
                        displayAreaRightArea.classList.remove('hide');
                        displayAreaRightArea.style.display = 'none';
                        displayAreaUl.style.display = 'flex';
                    }, 500);

                } else {
                    displayAreaUl.classList.add('hide');
                    mobileDisplayMode[0].classList.remove('active');
                    mobileDisplayMode[1].classList.add('active');
                    setTimeout(() => {
                        displayAreaUl.classList.remove('hide');
                        displayAreaUl.style.display = 'none';
                        displayAreaRightArea.style.display = 'block';
                    }, 500);
                }
            });
        });

    } else {
        return;
    }
    
}


/** 新增背景音樂彈窗
 * @param {{
 *  inputText1
 *  inputText2
 *  inputText3
 *  enterBtn: string
 *  enterClick: function()
 * }} popupSettingObj
 * 
  inputText1: 「歌曲名稱」欄位值
  inputText2: 「YouTube網址」欄位值
  inputText3: 「封面圖片網址」欄位值
  enterBtn: 「確認」按鈕文字,
  enterClick: 「確認」按鈕 function,
 */
function showPopupBox_addMusic() {
    const popupBox_addMusic = document.createElement('div');
    popupBox_addMusic.className = 'popupBox_addMusic';
    popupBox_addMusic.innerHTML = `
        <div class="inputArea">
            <label class="userInput">
                <p>歌曲名稱</p>
                <input id="popupInput_musicName" type="text" spellcheck="false" onblur="setMusicPopupInputTitle(true, 0)">
            </label>
            <label class="userInput">
                <p>YouTube網址</p>
                <input id="popupInput_musicUrl" type="text" spellcheck="false" onblur="setMusicPopupInputTitle(true, 1)">
            </label>
            <label class="userInput">
                <p>封面圖片網址</p>
                <input id="popupInput_musicPhoto"type="text" spellcheck="false" onblur="setMusicPopupInputTitle(true, 2)">
            </label>
        </div>
        <div class="buttonArea">
            <button class="cancel">Cancel</button>
            <button class="enter">Add</button>
        </div>
    `;
    document.body.appendChild(popupBox_addMusic);

    /** 彈窗訊息 */const message = document.querySelector('.popupBox_addMusic p');
    /** 彈窗 Input Area */const popupInputArea = document.querySelector('.popupBox_addMusic .inputArea');
    /** 彈窗 Input */const popupInput = document.querySelectorAll('.popupBox_addMusic .inputArea .userInput');
    /** 彈窗 Input 標題 */const popupInputTitle = document.querySelectorAll('.popupBox_addMusic .inputArea p');
    /** 取消按鈕 */const cancelBtn = document.querySelector('.popupBox_addMusic .cancel');
    /** 確認按鈕 */const enterBtn = document.querySelector('.popupBox_addMusic .enter');
    

    popupBox_addMusic.style.display = 'block';

    setMusicPopupInputTitle(false);
    setMusicPopupInputTitle(true, 0);
    setMusicPopupInputTitle(true, 1);

    const timer = cancelBtn.addEventListener('click', () => {
        showScreenHolder(false);
        popupBox_addMusic.classList.add('hide');
        setTimeout(() => {
            popupBox_addMusic.classList.remove('hide');
            document.body.removeChild(popupBox_addMusic);
            cancelBtn.removeEventListener('click', timer);
        }, 500);
    });

    const onClickScreenHolder = () => {
        popupBox_addMusic.classList.add('hide');
        setTimeout(() => {
            popupBox_addMusic.classList.remove('hide');
            document.body.removeChild(popupBox_addMusic);
            cancelBtn.removeEventListener('click', timer);
        }, 500);
    }
    
    showScreenHolder(true, onClickScreenHolder);

    const enterTimer = enterBtn.addEventListener('click', () => {
        popupBox_addMusic.classList.add('hide');
        showScreenHolder(false);
        setTimeout(() => {
            popupBox_addMusic.classList.remove('hide');
            document.body.removeChild(popupBox_addMusic);
            enterBtn.removeEventListener('click', enterTimer);
        }, 500);
    });

}


/**
 * 設定 Popup Input 標題 css
 * @param {Boolean} check 是否檢查欄位值
 * @param {Number} index
 */
function setMusicPopupInputTitle(check, index) {
    const userInputTitle = document.querySelectorAll('.popupBox_addMusic .inputArea .userInput p');
    const userInput = document.querySelectorAll('.popupBox_addMusic .inputArea .userInput input');
    

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