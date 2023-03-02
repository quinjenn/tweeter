"use strict";
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetDatabase = {
  user: {
    name: "Newton",
    avatars: "https://i.imgur.com/73hZDYK.png",
    handle: "@SirIsaac",
  },
  content: {
    text: "If I have seen further it is by standing on the shoulders of giants",
  },
  created_at: 1461116232227,
};

// takes in a tweet object and returns a tweet <article> element
const createTweetElement = function (tweetData) {
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
};

const $tweet = createTweetElement(tweetDatabase);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$("#tweets-container").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

// LECTURE INPUT MAR 1 structure
// global constant
const $tweetsContainer = $("#tweets-container");

// render/fetch tweets
const renderTweets = function () {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  // fetches and rendering
  $.ajax({
    method: "GET",
    url: "/tweets",
    success: (tweets) => {
      console.log(tweets);
      console.log($tweetsContainer);
      $tweetsContainer.empty();
      //loops through the provided array
      for (const tweet of tweets) {
        // create a new DOM node(s) for each element in the array
        const $tweetElement = createTweetElement(tweet);

        // append the new DOM elemnt to our #tweets-container
        // const $tweetsContainer = $('#tweets-container');
        $tweetsContainer.prepend($tweetElement);
      }
    },
  });
};

renderTweets();
/////

const $tweetForm = $(".tweet-form");
$tweetForm.on("submit", (event) => {
  // prevent the default behaviour of browser
  event.preventDefault();
  // get the data from the form
  // urlencode the data
  const urlencoded = $tweetForm.serialize();
  // console.log(urlencoded);
  // make an AJAX post request
  $.ajax({
    method: "POST",
    url: "/tweets",
    data: urlencoded,
    success: (response) => {
      console.log(response);
      // fetch the tweets again
      renderTweets();
    },
  });
});
