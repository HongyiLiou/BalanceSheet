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
];


/** 重置背景音樂清單 */
function initialYouTubeMusicData() {
    // 清單版型
    /** List區域 */const playList = document.querySelector('.musicPageBox .playList ul');
    /** 右側可滑動區域 */const albumBox = document.querySelector('.musicPageBox .playList .rightArea .albumBox');
    /** 右側可滑動區域_曲名 */const albumBox_songName = document.querySelector('.musicPageBox .playList .rightArea p');

    // 清單版型
    let playListHTML = '';
    let albumBoxHTML = '';
    playList.innerHTML = '';
    albumBox.innerHTML = '';

    youTubeMusicData.forEach((musicData, i) => {
        // 清單版型
        const playListTemplate = `
            <li>
                <div class="list">
                    <div class="albumPhoto" style="background-image: url(${musicData.url});"></div>
                    <p>${musicData.name}</p>
                </div>
                <div class="setting">
                    <button class="play" onclick="onYouTubeIframeAPIReady('${musicData.id}'); playYouTubePlayer();" title="播放"></button>
                    <button class="edit" title="編輯"></button>
                    <button class="delete" title="刪除"></button>
                </div>
            </li>
        `;

        const albumBoxTemplate = `
            <div data-id="${musicData.id}" data-name="${musicData.name}"
                class="album ${i === 0 ? 'center' : ''}${i === 1 ? 'right' : ''}${i === 2 ? 'visableRight' : ''}"
                style="background-image: url(${musicData.url})">
            </div>
        `;

        playListHTML += playListTemplate;
        albumBoxHTML += albumBoxTemplate;
    })

    // 清單版型
    playList.innerHTML = playListHTML;
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
    /** 控制器_正在播放：曲名 */const controler_songName = document.querySelector('.musicPageBox .controler .viewer .songName span');
    const matchMusicID = youTubeMusicData.find(x => x.id === videoId);
    ctrlq.innerHTML = '<div id="youtube-player"></div>';
    controler_songName.innerHTML = matchMusicID.name;
    ctrlq.style.cssText = 'display:none';

    if (videoId) {
        youTubePlayerSetting.videoId = videoId;
        youTubePlayerSetting.playerVars.playlist = videoId;
    }

    youTubePlayer = new YT.Player('youtube-player', youTubePlayerSetting);
}


/** 播放音樂 */
function playYouTubePlayer() {
    const album = document.querySelector('.musicPageBox .albumList .album');
    const pauseBtn = document.querySelector('.musicPageBox .controler .buttons .pause');
    const playBtn = document.querySelector('.musicPageBox .controler .buttons .play');
    const visual = document.querySelector('.musicPageBox .controler .viewer .visual');
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
    album.classList.remove('paused');
    visual.classList.remove('paused');
    album.classList.add('active');
    setTimeout(() => {
        youTubePlayer.playVideo();
        youTubePlayer.setVolume(youTubePlayerVolume);
        visual.classList.add('active');
    }, 1000);
}


/** 暫停播放音樂 */
function pauseYouTubePlayer() {
    const album = document.querySelector('.musicPageBox .albumList .album');
    const pauseBtn = document.querySelector('.musicPageBox .controler .buttons .pause');
    const playBtn = document.querySelector('.musicPageBox .controler .buttons .play');
    const visual = document.querySelector('.musicPageBox .controler .viewer .visual');
    pauseBtn.style.display = 'none';
    playBtn.style.display = 'block';
    album.classList.add('paused');
    visual.classList.add('paused');
    youTubePlayer.pauseVideo();
}


/** 停止播放音樂 */
function stopYouTubePlayer() {
    const albums = document.querySelectorAll('.musicPageBox .albumList .album');
    const pauseBtn = document.querySelector('.musicPageBox .controler .buttons .pause');
    const playBtn = document.querySelector('.musicPageBox .controler .buttons .play');
    const visual = document.querySelector('.musicPageBox .controler .viewer .visual');
    pauseBtn.style.display = 'none';
    playBtn.style.display = 'block';
    youTubePlayer.stopVideo();

    albums.forEach(album => {
        album.classList.remove('paused', 'active');
    });
    
    visual.classList.remove('paused', 'active');

    onYouTubeIframeAPIReady('LHZXT6813VE');
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



/** albumBoxScroller */
function albumBoxScroller() {
    const albumBox = document.querySelector('.musicPageBox .playList .rightArea .albumBox');
    const albums = document.querySelectorAll('.musicPageBox .playList .rightArea .albumBox .album');
    const prevBtn = document.querySelector('.musicPageBox .playList .rightArea .buttonArea .prev');
    const nextBtn = document.querySelector('.musicPageBox .playList .rightArea .buttonArea .next');
    const playBtn = document.querySelector('.musicPageBox .playList .rightArea .buttonArea .play');

    const width = albumBox.firstElementChild.offsetWidth; // 150
    let scrollWidth = 75;
    let scrollPoint = 0;
    let canScroll = true;

    // albumBox.addEventListener('mousedown')
    let onMousemove = function() {
        const albumBoxWidth = albumBox.offsetWidth;
        const mousePos = getMousePos(event);
        const translateX = Number(Math.round(mousePos.x));

        // 往左滑 (Next)
        if (scrollPoint < mousePos.x && canScroll) {
            nextBtn.click();
            scrollPoint = 0;
            canScroll = false;
            setTimeout(() => {
                canScroll = true;
            }, 300);
        
        // 往右滑 (Prev)
        } else if (scrollPoint > mousePos.x && canScroll) {
            prevBtn.click();
            scrollPoint = 0;
            canScroll = false;
            setTimeout(() => {
                canScroll = true;
            }, 300);

        }

        scrollPoint = mousePos.x;

        console.log(mousePos);
        // albumBox.style.transform = `translateX(${-scrollWidth}px)`;
    }
    
    // 拖曳按下 / 放開 / 移出
    albumBox.addEventListener('mousedown', () => {
        albumBox.addEventListener('mousemove', onMousemove);
    });
    albumBox.addEventListener('mouseup', () => {
        albumBox.removeEventListener('mousemove', onMousemove);
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
        const centerName = document.querySelector('.musicPageBox .playList .rightArea .albumBox .album.center');
        /** 控制器_正在播放：曲名 */const controler_songName = document.querySelector('.musicPageBox .controler .viewer .songName span');
        const playID = centerName.dataset.id;
        const playName = centerName.dataset.name;
        controler_songName.innerHTML = centerName.dataset.name;
        onYouTubeIframeAPIReady(playID);
        playYouTubePlayer();
    });
    
}