var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);

var textArray = require('./termsrepo.js');
var randomNumber = Math.floor(Math.random()*textArray.length);
var queryterm = textArray[randomNumber]; 
var query = queryterm + ' AND (neuroscience OR fmri OR EEG OR cognition OR neuroimaging OR psychology OR TMS) -filter:retweets';

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
      
      // -- GET TWEET URL
      var tweeturl  = ': twitter.com/' + username + '/statuses/' + data.statuses[i].id_str;
      
      // -- FORMAT TWEET
      var tweetfmtID = Math.floor(Math.random()*7);
      switch(tweetfmtID){
        case 0:
          retweetbody = queryterm  +' caught my attention\nCaught @' + username + '\'s attention too' + tweeturl;  
          break;
        case 1:
          retweetbody = 'Who fancies a bit of '+  queryterm  +' ? \n@' + username + 'tweeted most recently about it' + tweeturl;  
          break;
        case 2:
          retweetbody = 'Thinking of '+  queryterm  +' now.\n@' + username + 'seems to be thinking of it too:' + tweeturl;  
          break;
        case 3:
          retweetbody = 'hmmm...pondering ' + queryterm  +'...\nso is @' + username + tweeturl;  
          break;
        case 4:
          retweetbody = queryterm  +' is thought provoking no?\n @' + username + ' thought about it too' + tweeturl;  
          break;
        case 5:
          retweetbody = queryterm  +' sounds interesting\n @' + username + ' recently tweeted about it' + tweeturl;  
          break;
        case 6:
          retweetbody = 'Thinking '+  queryterm  +' thoughts together with \n@' + username + tweeturl;  
          break;
      }
      
      
      T.post('statuses/update',{status:retweetbody},function(err,data){console.log(data.text)});
      T.post('favorites/create', {id: data.statuses[i].id_str}, function(err, response){});
    }
    
  }else{
    var sadtweetbody = 'I feel sick..*ugh*...someone pls get help from my human @gnafuy...' ;
    T.post('statuses/update',{status:sadtweetbody},function(err,data){console.log(data.text)});
  }});
              
  