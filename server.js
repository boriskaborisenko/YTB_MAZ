const express = require('express')
const app = express()
const server = require('http').Server(app);

const YouTube = require('simple-youtube-api');
//const url = 'https://www.youtube.com/playlist?list=';


app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});
app.get('/list',function(req,res){
    res.sendFile(__dirname+'/list.html');
});


app.get('/api/:key/:channelid', (req,res) => {
    new YouTube(req.params.key).getChannelByID(req.params.channelid, {'part': 'snippet,contentDetails,statistics'})
    .then(results => {
        res.json({
            results
        })
    })
    .catch( () => res.json({
        results:
        {
            id: req.params.channelid,
            error: 'blocked'
        }
    }) 
    );
});

app.get('/api/playlist/:key/:channelid', (req,res) => {

    new YouTube(req.params.key).getChannelByID(req.params.channelid, {'part': 'snippet,contentDetails,statistics'})
    .then(results => {
      const list = results.raw.contentDetails.relatedPlaylists.uploads;

      new YouTube(req.params.key).getPlaylistByID(list)
    .then(playlist => {
        //console.log(`The playlist's title is ${playlist.title}`);
        playlist.getVideos()
            .then(videos => {
                res.json({
                    videos
                })
            })
            .catch(console.log);
    })
    .catch(console.log);

    })
    .catch(console.error);

    
});





app.use('/css',express.static(__dirname + '/src/css'));
app.use('/js',express.static(__dirname + '/src/js'));
app.use('/images',express.static(__dirname + '/src/images'));
app.use('/json',express.static(__dirname + '/src/json'));

server.listen(3333, function () {
    console.log(`Listening on ${server.address().port}`);
});