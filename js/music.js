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
    const ctrlq = document.getElementById("youtube-audio");
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
        barHolder.style.width = `${percent}%`;
        youTubePlayer.setVolume(percent);
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