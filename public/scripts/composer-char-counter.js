$(document).ready(function () {
  const maxCharLength = 140;
  // --- our code goes here ---
  // character count for tweet form
  $("#tweet-text").on("input", function (event) {
    let tweetLength = $(this).val().length;
    // subtract character number
    let charRemaining = maxCharLength - $(this).val().length;
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
