const express = require('express')
const app = express()
const server = require('http').Server(app);

const YouTube = require('simple-youtube-api');
//const url = 'https://www.youtube.com/playlist?list=';


app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
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




app.use('/css',express.static(__dirname + '/src/css'));
app.use('/js',express.static(__dirname + '/src/js'));
app.use('/images',express.static(__dirname + '/src/images'));
app.use('/json',express.static(__dirname + '/src/json'));

server.listen(3333, function () {
    console.log(`Listening on ${server.address().port}`);
});