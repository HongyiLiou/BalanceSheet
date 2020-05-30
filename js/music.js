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
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
    album.classList.remove('paused');
    album.classList.add('active');
    setTimeout(() => {
        youTubePlayer.playVideo();
    }, 1000);
}


/** 暫停播放音樂 */
function pauseYouTubePlayer() {
    const album = document.querySelector('.musicPageBox .albumList .album');
    const pauseBtn = document.querySelector('.musicPageBox .controler .buttons .pause');
    const playBtn = document.querySelector('.musicPageBox .controler .buttons .play');
    pauseBtn.style.display = 'none';
    playBtn.style.display = 'block';
    album.classList.add('paused');
    youTubePlayer.pauseVideo();
}


/** 停止播放音樂 */
function stopYouTubePlayer() {
    const albums = document.querySelectorAll('.musicPageBox .albumList .album');
    const pauseBtn = document.querySelector('.musicPageBox .controler .buttons .pause');
    const playBtn = document.querySelector('.musicPageBox .controler .buttons .play');
    pauseBtn.style.display = 'none';
    playBtn.style.display = 'block';
    youTubePlayer.stopVideo();

    albums.forEach(album => {
        album.classList.remove('paused', 'active');
    });

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


function getVolumeYouTubePlayer() {
    const volume = youTubePlayer.getVolume();
    console.log('音量音量', volume);
    
}