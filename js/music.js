// Music.js


/** YouTubePlayer */
let youTubePlayer;
/**
 * 重置播放器
 * @param {string}} videoId 
 */
function onYouTubeIframeAPIReady(videoId) {
    const album = document.querySelector('.musicPageBox .albumList .album');
    const ctrlq = document.getElementById("youtube-audio");
    ctrlq.innerHTML = '<div id="youtube-player"></div>';
    ctrlq.style.cssText = 'display:none';
    album.classList.add('active');

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
    setTimeout(() => {
        youTubePlayer.playVideo();
    }, 800);
}


/** 暫停播放音樂 */
function pauseYouTubePlayer() {
    youTubePlayer.pauseVideo();
}


/** 停止播放音樂 */
function stopYouTubePlayer() {
    youTubePlayer.stopVideo();
}

