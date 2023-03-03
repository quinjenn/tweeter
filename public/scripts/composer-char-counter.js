$(document).ready(function () {
  const maxCharLength = 140;
  // --- our code goes here ---
  // console.log("Is this running accurately?")
  // character count for tweet form
  $("#tweet-text").on("input", function (event) {
    let tweetLength = $(this).val().length;
    //  console.log("tweetLength", tweetLength);
    // subtract character number
    let charRemaining = maxCharLength - $(this).val().length;
    //  console.log("charRemaining", charRemaining)
    if (tweetLength > maxCharLength) {
      // change count to red if over character limit
      $(".counter").addClass("negative-counter");
    } else {
      $(".counter").removeClass("negative-counter");
    }
    // print remaining characters
    let keysLeft = $(this).closest("form").find(".counter");
    keysLeft.text(charRemaining);
  });
});
