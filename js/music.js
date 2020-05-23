// Music.js


/** YouTubePlayer */
let youTubePlayer;
/**
 * 重置播放器
 * @param {string}} videoId 
 */
function onYouTubeIframeAPIReady(videoId) {
    const ctrlq = document.getElementById("youtube-audio");
    ctrlq.innerHTML = '<div id="youtube-player"></div>';
    ctrlq.style.cssText = 'display:none';

    youTubePlayer = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        // videoId: ctrlq.dataset.video,
        videoId: videoId,
        // videoId: 'LHZXT6813VE',
        playerVars: {
        loop: 1,
        start: 1
        },
        events: {
            'onReady': function() {
                youTubePlayer.setPlaybackQuality("small");
            }
        }
    });
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

