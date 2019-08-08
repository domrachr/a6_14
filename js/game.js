const numDivs = 36;
const maxHits = 10;

let hits = 1;
let missCount = 1;
let firstHitTime = 0;

function round() {
  $(".target").text("");
  $(".target").removeClass("target");
  $(".miss").removeClass("miss");
  
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits);
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  
  $(".row").addClass("d-none");
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#miss-count").text(missCount);
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  
  if ($(event.target).hasClass("target")) {
    hits ++;
    round();
  }
  else {
    missCount++;
    $(event.target).addClass("miss")
  }

}

function init() {
  
  $("#button-start").click(function() {
    firstHitTime = getTimestamp();
    missCount = 0;
    $("#button-start").addClass("d-none");
    $("#button-reload").removeClass("d-none");
    round();
  });

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    $("#button-reload").addClass("d-none");
    $("#button-start").removeClass("d-none");

    location.reload();
  });
}

$(document).ready(init);
