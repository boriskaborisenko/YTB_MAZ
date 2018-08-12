const channelID = 'UCYb-mfNx8FAN9NUFAFefHOA';
const apikey = 'AIzaSyCzn1RqYIq5XVTe0zdapraj5-PMRo1j3ss';

const channels = [
    'UCdbpv7a3VZLKd6MO3t3Tjtg', 
    'UCo-va9CYlAjGGlPFOuv7Eqg', 
    'UCYb-mfNx8FAN9NUFAFefHOA', 
    //'UC1sddoDrCyLuR-aZzN7DsRQ', 
    //'UCF_mDAyZrAusDi6U48CguVQ', 
    //'UCYTUf9MVb-dKKaddlgoqyGg', 
    //'UC2BfvCuXrPk-JCMu7Q8TAjA'

    /*
    UCdbpv7a3VZLKd6MO3t3Tjtg, 
    UCo-va9CYlAjGGlPFOuv7Eqg, 
    UCYb-mfNx8FAN9NUFAFefHOA
    */
];

function getChannel(key, id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const answer = JSON.parse(this.responseText);

        let newDiv
        if(answer.results.error == 'blocked'){
            newDiv = '<div class="item error">Channel ID: <b>'+answer.results.id+'</b> error! </div>';
        }else{
            newDiv = '<div class="item">'+
            '<div class="cid"> Channel ID: <b>'+ answer.results.id +'</b></div>'+
            '<div class="title"><b>'+ answer.results.raw.snippet.localized.title +'</b></div>'+
            '<div class="desc"><i>'+ answer.results.raw.snippet.localized.description +'</i></div>'+
            '<div class="st">Videos: '+ answer.results.raw.statistics.videoCount+'</div>'+
            '<div class="st">Views: '+ answer.results.raw.statistics.viewCount+'</div>'+
            '<div class="st">Subs: '+ answer.results.raw.statistics.subscriberCount+'</div>'+
            '<div class="st">Comments: '+ answer.results.raw.statistics.commentCount+'</div>'+
            '</div>';
        }

       let el = document.querySelector('#output');
       el.innerHTML += newDiv;
        
        console.log(answer);
      }
    };
    xhttp.open("GET", "http://localhost:3333/api/"+key+'/'+id, true);
    xhttp.send();
  }


  



  function pushTheButton(){
    let out = document.getElementById('output');
        out.innerHTML = '';
    const apikey = document.getElementById('apikey').value;
    const data = document.getElementById('ids').value;
    const newdata = data.split(', ');
    newdata.map( (i) =>  getChannel(apikey, i) );
}


//////////////////////////COPY CODE ////////////////////////////////


function getListFunc(key, channelid) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

        document.getElementById("loader").style.display = "block";
       
        if (this.readyState == 4 && this.status == 200) {
        const answer = JSON.parse(this.responseText);
        document.getElementById("loader").style.display = "none";
        
        const pl = answer;        
        //console.log(pl);
        pl.videos.map((video) => {
            var node = document.createElement("tr"); 
            var node2 = document.createElement("td"); 
            var textnode = document.createTextNode(video.title);   
            node.appendChild(node2);                              
            node2.appendChild(textnode);
            document.getElementById("table").appendChild(node);
            console.log(video.title)
        })
        console.log('loading end')
      }
    };
    xhttp.open("GET", "http://localhost:3333/api/playlist/"+key+'/'+channelid, true);
    xhttp.send();
  }

function getList(){
    let out = document.getElementById('table');
    out.innerHTML = '';
    const apikey = document.getElementById('apikey').value;
    const data = document.getElementById('chid').value;
    getListFunc(apikey, data);
}

//////////////////////////COPY CODE ////////////////////////////////
//test git

 