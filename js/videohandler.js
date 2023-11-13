
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
    })
    .catch(error => console.error(error));
}

const checkVideos = () => {
    const lastRefresh = localStorage.getItem('lastRefresh');

    if (lastRefresh === null)
        return refreshVideos();

    const refreshDate = new Date(lastRefresh)

    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(refreshDate.getDate() - 1);

    if (!(refreshDate.getTime() > threeDaysAgo.getTime())) {
        return refreshVideos();
    }
}