
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetDatabase =  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
 };

// takes in a tweet object and returns a tweet <article> element
const createTweetElement = function(tweetData) {
  // create HTML markup using template literals
  // creating user elements
//   const $tweet = $('<article class"tweet">')
//   const $header = $('<header>');
//   const $avatar = $('<img>').addClass('avatar').attr('src', tweetData.user.avatars);
//   const $username = $('<h2>').addClass('username').text(tweetData.user.name);
//   const $handle = $('<span>').addClass('handle').text(tweetData.user.handle);

//   // header w/ user elements
//   $header.append($avatar).append($username).append($handle);
//   $tweet.append($header);

//   // tweet content
//   const $content = $('<div>').addClass('content').text(tweetData.content.text);
//   $tweet.append($content);

//   const $footer = $('<footer>');
//   // add timestamp
//   const $timestamp = $('<span>').addClass('timestamp').text(moment(tweetData.created_at).fromNow());
//   // add icons
//   const $icons = $('<div>').addClass('icons');
//   const $flagIcon = $('<i>').addClass('fas fa-flag');
//   const $retweetIcon = $('<i>').addClass('fas fa-retweet');
//   const $heartIcon = $('<i>').addClass('fas fa-heart');
//   // tweeter icons
//   $icons.append($flagIcon).append($retweetIcon).append($heartIcon);
//   $footer.append($timestamp).append($icons);
//   $tweet.append($footer);

//   // Return the tweet <article> element
//   return $tweet;
// }

// ALTERNATE FUNCTION TO CREATETWEETELEMENT
  const $tweet = $(`
  <article class="tweet">
    <header>
      <div class="tweet-header">
        <img src="${tweetData.user.avatars}">
        <h4>${tweetData.user.name}</h4>
      </div>
      <h4>${tweetData.user.handle}</h4>
    </header>
    <p>${tweetData.content.text}</p>
    <footer class="tweet-footer">
      <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`);

  return $tweet;
}

const $tweet = createTweetElement(tweetDatabase);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.


// LECTURE INPUT MAR 1 structure
// global constant
const $tweetsContainer = $('#tweets-container');

// render/fetch tweets
const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  $.ajax({
  method: 'GET',
  url: '/tweets',
  success: (tweets) => { 
    console.log(tweets);
    $tweetsContainer.empty();
  //loops through the provided array
  for (const tweet of tweets){
    // create a new DOM node(s) for each element in the array
    const $tweetElement = $(`
    <div class= "tweet">
      <h2>Tweet: ${tweet.user.name} (${tweet.user.handle})</h2>
      <h2>Content: ${tweet.content}</h2>
    </div>
      `);

      // append the new DOM elemnt to our #tweets-container
      // const $tweetsContainer = $('#tweets-container');
      $tweetsContainer.prepend($tweetElement);
     }
    }
  });
  renderTweets(tweets);
}

/////

const $tweetForm = $('.tweet-form');
$tweetForm.on('submit', (event) => {
// prevent the default behqavour of browser
event.preventDefalt();
// get the data from the form
// urlencode the data
const urlencoded = $tweetForm.serialize();
// console.log(urlencoded);
// make an AJAX post request
$.ajax({
  method: 'POST',
  url: '/tweets',
  data: urlencoded,
  success: (response) => {
    console.log(response);
    // fetch the tweets again
    renderTweets(tweets);
    }
  })
});

