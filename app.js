
const config = require('./config');
const Twitter = require('twitter');
const argv = require('yargs').argv;

const T = new Twitter(config);

const likeParam = (argv.l)?`#${argv.l}`:null;
const followParam = (argv.f)?`#${argv.f}`:null;

if(likeParam == null && followParam == null){
    process.exit();
}
const params = {
    q: ((likeParam)?likeParam:followParam),
    count: 2,
    result_type: 'recent',
    lang: 'en'
}
// console.log(params);
T.get('search/tweets', params, (err, data, response)=>{
    if(!err){
        //Like or follow logic here
        if(likeParam){
            for(let i=0; i<data.statuses.length; i++){
                let id = {id: data.statuses[i].id_str};
                T.post('favorites/create', id, (err, response)=>{
                    if(!err){
                        let userName = response.user.screen_name;
                        let id = response.id_str;
                        let url = `https://twitter.com/${userName}/status/${id}`;
    
                        console.log("Liked: ", url);
                    }else{
                        console.log(err);
                    }
                });
            }
        }else{
            for(let i=0; i<data.statuses.length; i++){
                // console.log(data.statuses[i]);
                let screen_name = data.statuses[i].user.screen_name;
                T.post('friendships/create', {screen_name}, (err, response)=>{
                    if(!err){
                        console.log(`Followed: ${screen_name}`);
                    }else{
                        console.log(err);
                    }
                });
            }
        }
        
    }else{
        console.log("error:", err);
    }
})