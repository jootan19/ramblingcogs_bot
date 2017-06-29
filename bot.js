var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);

var textArray = require('./termsrepo.js');
var randomNumber = Math.floor(Math.random()*textArray.length);
var queryterm = textArray[randomNumber]; 
var query = queryterm + ' AND (neuroscience OR fmri OR EEG OR cognition OR neuroimaging OR psychology) -filter:retweets';

var params_jobs = { 
  q: query,
  count: 1,
  result_type: 'recent',
};

T.get('search/tweets', params_jobs, function(err, data, response) {
  if(!err){
    for(let i = 0; i < data.statuses.length; i++){
      // -- GET USERNAME OF TWEET-ER
      var username = String(data.statuses[i].user.screen_name);
      var tweeturl  = ': twitter.com/' + username + '/statuses/' + data.statuses[i].id_str;
      var retweetbody = 'Random cog. neuro topic of the hour: ' + queryterm  +' \n| RT @' + username + tweeturl;
      T.post('statuses/update',{status:retweetbody},function(err,data){console.log(data.text)});
      T.post('favorites/create', {id: data.statuses[i].id_str}, function(err, response){});
    }
    
  }else{
    var sadtweetbody = 'I feel sick..*ugh*...someone get help from @gnafuy...' ;
    T.post('statuses/update',{status:sadtweetbody},function(err,data){console.log(data.text)});
  }});
              
  