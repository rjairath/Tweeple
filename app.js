
const config = require('./config');
const Twitter = require('twitter');

const T = new Twitter(config);

const params = {
    q: '#india',
    count: 2,
    result_type: 'recent',
    lang: 'en'
}

T.get('search/tweets', params, (err, data, response)=>{
    if(!err){
        //Favourite all tweets here
        for(let i=0; i<data.statuses.length; i++){
            let id = {id: data.statuses[i].id_str};
            T.post('favorites/create', id, (err, response)=>{
                if(!err){
                    let userName = response.user.screen_name;
                    let id = response.id_str;
                    let url = `https://twitter.com/${userName}/status/${id}`;

                    console.log("Liked: ", url, "\n");
                }else{
                    console.log(err);
                }
            });
        }
    }else{
        console.log("error:", err);
    }
})