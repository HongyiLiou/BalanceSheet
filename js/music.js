// Music.js


/** YouTubePlayer */
let youTubePlayer;
/** YouTubePlayerSetting */
let youTubePlayerSetting = {
    height: '0',
    width: '0',
    videoId: '',
    // videoId: 'LHZXT6813VE',
    playerVars: {
        loop: 1,
        start: 1,
        playlist: '',
        enablejsapi: 1
    },
    events: {
        'onReady': function() {
            youTubePlayer.setPlaybackQuality("small");
        }
    }
}
/** 預設音量 */
let youTubePlayerVolume = 100;
/** 正在播放 */
let youTubePlayingIndex = 0;
/** 背景音樂清單 */
let youTubeMusicData = [
    { id: 'LHZXT6813VE', name: '想見你', url: 'https://i.imgur.com/9A4Mx75.jpg' },
    { id: '8tuzFSXeKI0', name: '與我無關', url: 'https://i.ytimg.com/vi/8tuzFSXeKI0/maxresdefault.jpg' },
    { id: 'EZxVmhM6UpE', name: '突然好想你', url: 'https://i.kfs.io/album/global/111193,1v1/fit/500x500.jpg' },
    { id: 'LHZXT6813VE', name: '想見你', url: 'https://i.imgur.com/9A4Mx75.jpg' },
    { id: '8tuzFSXeKI0', name: '與我無關', url: 'https://i.ytimg.com/vi/8tuzFSXeKI0/maxresdefault.jpg' },
    { id: 'EZxVmhM6UpE', name: '突然好想你', url: 'https://i.kfs.io/album/global/111193,1v1/fit/500x500.jpg' },
    { id: 'LHZXT6813VE', name: '想見你', url: 'https://i.imgur.com/9A4Mx75.jpg' },
    { id: '8tuzFSXeKI0', name: '與我無關', url: 'https://i.ytimg.com/vi/8tuzFSXeKI0/maxresdefault.jpg' },
    { id: 'EZxVmhM6UpE', name: '突然好想你', url: 'https://i.kfs.io/album/global/111193,1v1/fit/500x500.jpg' },
    { id: 'LHZXT6813VE', name: '想見你', url: 'https://i.imgur.com/9A4Mx75.jpg' },
    { id: '8tuzFSXeKI0', name: '與我無關', url: 'https://i.ytimg.com/vi/8tuzFSXeKI0/maxresdefault.jpg' },
    { id: 'EZxVmhM6UpE', name: '突然好想你', url: 'https://i.kfs.io/album/global/111193,1v1/fit/500x500.jpg' },
    { id: 'LHZXT6813VE', name: '想見你', url: 'https://i.imgur.com/9A4Mx75.jpg' },
    { id: '8tuzFSXeKI0', name: '與我無關', url: 'https://i.ytimg.com/vi/8tuzFSXeKI0/maxresdefault.jpg' },
    { id: 'EZxVmhM6UpE', name: '突然好想你', url: 'https://i.kfs.io/album/global/111193,1v1/fit/500x500.jpg' },
    { id: 'LHZXT6813VE', name: '想見你', url: 'https://i.imgur.com/9A4Mx75.jpg' },
    { id: '8tuzFSXeKI0', name: '與我無關', url: 'https://i.ytimg.com/vi/8tuzFSXeKI0/maxresdefault.jpg' },
    { id: 'EZxVmhM6UpE', name: '突然好想你', url: 'https://i.kfs.io/album/global/111193,1v1/fit/500x500.jpg' },
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
                    <button class="play" onclick="onYouTubeIframeAPIReady('${musicData.id}'); playYouTubePlayer(${i});" title="播放"></button>
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
            <div class="album" data-index="${i}" data-id="${musicData.id}" data-name="${musicData.name}" onclick="onYouTubeIframeAPIReady('${musicData.id}'); playYouTubePlayer(${i});">
                <div class="albumBg" style="background-image: url(${musicData.url});"></div>
                <div class="albumPhoto" style="background-image: url(${musicData.url});"></div>
            </div>
            <div class="setting">
                <button class="edit" title="編輯"></button>
                <button class="delete" title="刪除"></button>
            </div>
            <p>${musicData.name}</p>
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
    ctrlq.style.cssText = 'display:none';
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
        youTubePlayer.playVideo();
        youTubePlayer.setVolume(youTubePlayerVolume);
        visual.classList.add('active');        
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
        playYouTubePlayer(findIndex.dataset.index);
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