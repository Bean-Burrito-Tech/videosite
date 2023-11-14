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

function showPlayPauseButton() {
    playPauseButton.style.display = 'flex';
}

function hidePlayPauseButton() {
    playPauseButton.style.display = 'none';
}

videoPlayer.addEventListener('play', function() {
    hidePlayPauseButton();
});

videoPlayer.addEventListener('pause', function() {
    showPlayPauseButton();
});

videoPlayer.addEventListener('loadeddata', function() {
    hideLoadingIndicator();
});

videoPlayer.addEventListener('waiting', function() {
    showLoadingIndicator();
});

function showLoadingIndicator() {
    var loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'block';
}

function hideLoadingIndicator() {
    var loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'none';
}

// when a user goes to scrub and it loads account for when the video finishes loading and hide the indicator
videoPlayer.addEventListener('canplay', function() {
    hideLoadingIndicator();
});
