
const apikey = 'AIzaSyCzn1RqYIq5XVTe0zdapraj5-PMRo1j3ss';
const YouTube = require('simple-youtube-api');
const YTB = new YouTube(apikey);
const url = 'https://www.youtube.com/playlist?list=';


const channels = ['','',''];

/*
YTB.searchVideos('Centuries', 4)
    .then(results => {
        console.log(`The video's title is ${results[0].title}`);
    })
    .catch(console.log);
*/

/*
YTB.getChannelByID('UC477Kvszl9JivqOxN1dFgPQ', {'part': 'snippet,contentDetails,statistics'})
 .then(results => {
   console.log(results.raw.contentDetails.relatedPlaylists);
 })
 .catch(console.error);
*/
YTB.getPlaylistByID('UU477Kvszl9JivqOxN1dFgPQ')
.then(playlist => {
    console.log(`The playlist's title is ${playlist.title}`);
    playlist.getVideos()
        .then(videos => {
            console.log(`This playlist has ${videos.length === 50 ? '50+' : videos.length} videos.`);
            //console.log(videos)
        })
        .catch(console.log);
})
.catch(console.log);
/*
 YTB.getPlaylist(url+'UU477Kvszl9JivqOxN1dFgPQ')
     .then(playlist => {
         console.log(`The playlist's title is ${playlist.title}`);
         playlist.getVideos()
             .then(videos => {
                 console.log(`This playlist has ${videos.length === 50 ? '50+' : videos.length} videos.`);
                 //console.log(videos)
             })
             .catch(console.log);
     })
     .catch(console.log);
*/
