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
/**
 * 重置播放器
 * @param {string}} videoId 
 */
function onYouTubeIframeAPIReady(videoId) {
    const ctrlq = document.getElementById('youtube-audio');
    ctrlq.innerHTML = '<div id="youtube-player"></div>';
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

/** 預設音量 */
let youTubePlayerVolume = 100;
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

    // albumBox.addEventListener('mousedown')
    let onMousemove = function() {
        const albumBoxWidth = albumBox.offsetWidth;
        const mousePos = getMousePos(event);
        const translateX = Number(Math.round(mousePos.x));
        console.log();

        if (Math.round(width / translateX) > 5 && scrollPoint < translateX) {
            for (let i = 0; i < Math.round(Math.round(width / translateX)%3); i++) {
                console.log('i', i);
                prevBtn.click();
            }
        }
        // console.log('width / translateX', Math.round(width / translateX));
        // console.log('scrollPoint', scrollPoint);
        // console.log('translateX', translateX);
        console.log(Math.round(6%3));
        
        
        scrollPoint = translateX;
        
        // scrollWidth += translateX;
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
    });
    
}