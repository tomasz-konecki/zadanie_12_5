$(() => {
    getQuote();
    $('.trigger')
        .click(() => {
            getQuote();
        })
});

var prefix = "https://cors-anywhere.herokuapp.com/",
    tweetLink = "https://twitter.com/intent/tweet?text=",
    quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

function getQuote() {
    $.ajaxSetup({ cache: false });
    $.getJSON(prefix + quoteUrl, createTweet);
}

function createTweet(input) {
    var data = input[0],
        quoteText = $(data.content)
        .text()
        .trim(),
        quoteAuthor = data.title,
        tweetText = '';

    if (!quoteAuthor.length) {
        quoteAuthor = "Unknown author";
    }

    tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

    if (tweetText.length > 140) {
        getQuote();
    } else {
        var tweet = tweetLink + encodeURIComponent(tweetText);
        $('.quote')
            .text(quoteText);
        $('.author')
            .text("Author: " + quoteAuthor);
        $('.tweet')
            .attr('href', tweet);
    }
}