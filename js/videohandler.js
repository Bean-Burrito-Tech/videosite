
const videos = []

const refreshVideos = () => {
    fetch('https://api.github.com/repos/Bean-Burrito-Tech/beanburrito-videos/contents/')
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                videos.push(element.download_url);
            });
        })
        .then(() => {
            const currentDate = new Date();
            localStorage.setItem('lastRefresh', currentDate.toISOString());
            localStorage.setItem('videos', JSON.stringify(videos));

            iziToast.show({
                title: 'Success',
                message: 'Successfully refreshed videos! Next refresh is in an hour.',
                position: 'topRight',
                color: 'green'
            });
        })
        .catch(error => console.error(error));
}

const checkVideos = async () => {
    const lastRefresh = localStorage.getItem('lastRefresh');

    if (lastRefresh === null)
        return refreshVideos();

    const refreshDate = new Date(lastRefresh)

    const currentDate = new Date();

    let difference = currentDate.getTime() - refreshDate.getTime();
    let hoursMilli = 1000 * 60 * 60; // milliseconds * seconds * minutes

    if (!(Math.abs(difference) < hoursMilli)) {
        iziToast.show({
            title: 'Refresh',
            message: 'Refreshing Videos...',
            position: 'topRight',
        });
        return refreshVideos();
        // more than 1 hour ago
    }
}