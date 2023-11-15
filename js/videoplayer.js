var progress = document.getElementById("progress");
var progressBar = document.getElementById("progressBar");
var videoPlayer = document.getElementById("randomVideoPlayer");
var blank = document.getElementById("blank");


videoPlayer.addEventListener('timeupdate', () => {
    const percent = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    progressBar.style = `width: ${percent}%`;
})

progressBar.addEventListener('click', scrub);
progress.addEventListener('click', scrub);

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * videoPlayer.duration;
    videoPlayer.currentTime = scrubTime;
}

document.getElementById('overlay').addEventListener('click', function(event) {
    if (videoPlayer.src != '') {
        togglePlayPause();
    }
});

function togglePlayPause() {
    if (videoPlayer.paused) {
        videoPlayer.play();
    } else {
        videoPlayer.pause();
    }
}
videoPlayer.addEventListener('play', hidePlayPauseButton);

videoPlayer.addEventListener('pause', showPlayPauseButton);

videoPlayer.addEventListener('loadeddata', hideLoadingIndicator);
videoPlayer.addEventListener('canplay', hideLoadingIndicator);

videoPlayer.addEventListener('waiting', showLoadingIndicator);

function showLoadingIndicator() {
    var loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'block';
}

function hideLoadingIndicator() {
    var loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'none';
}

function showPlayPauseButton() {
    playPauseButton.style.display = 'flex';
}

function hidePlayPauseButton() {
    playPauseButton.style.display = 'none';
}