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

// takes in a tweet object and returns a tweet
const createTweetElement = function (tweetData) {
  // prevent cross-site scripting
  // method 2: use escape function b/c element is string literal
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const ago = timeago.format(tweetData.created_at);
  const $tweet = $(`
  <article class="tweet">
    <header class="profile">
      <div class="picture-name">
        <img class="picture" src="${tweetData.user.avatars}">
        <div class="name">${tweetData.user.name}</div>
      </div>
      <div class="handle">${tweetData.user.handle}</div>
    </header>
    <p>${escape(tweetData.content.text)}</p>
    <footer class="tweet-footer">
    <div class="time-ago">${escape(ago)}</div>
      <div id="icons-footer">
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
// console.log($tweet); // to see what it looks like
// $("#tweets-container").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

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

const $tweetForm = $(".tweet-form");
$tweetForm.on("submit", (event) => {
  // prevent the default behaviour of browser
  event.preventDefault();
  // get the data from the form
  // add form validation
  const $tweetContent = $tweetForm.find("#tweet-text");
  const tweetLength = $tweetContent.val().trim().length;

  if (tweetLength === 0) {
    // error message replacing alert
    const errorMessage = "You must write something to tweet!";
    $("#error-message").text(errorMessage);
    $("#error-message").slideDown();
    // alert("You must write something to tweet!");
  } else if (tweetLength > 140) {
    // alert("Tweet limit is 140 characters!");
    const errorMessage = "Tweet limit is 140 characters!";
    $("#error-message").text(errorMessage);
    $("#error-message").slideDown();
  } else {
    // urlencode the data
    const urlencoded = $tweetForm.serialize();
    // make an AJAX post request
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: urlencoded,
      success: (response) => {
        // fetch the tweets again
       $(".counter").text("140");
       $("textarea").val("");
        renderTweets();
      },
    });
  }
});
