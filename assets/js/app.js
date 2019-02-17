//variables
var tweetList = document.getElementById('tweet-list'); 

// event listeners
eventListeners();

function eventListeners(){
    // form submission
    document.querySelector('#form').addEventListener('submit', newTweet); // when submits the form runs newTweet function

    // remove tweet from the list
    tweetList.addEventListener('click', removeTweet);// when everywhere in the tweetlist click then runs function removeTweet

    // load tweets from local storage to the DOM
    document.addEventListener("DOMContentLoaded", localStorageOnLoad);
}

// functions
function newTweet(event){
    event.preventDefault(); // it will stop the form

    // reads the text area value
    const tweet = document.getElementById('tweet').value; // the text value
    
    // creates the remove button
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-tweet';
    removeBtn.textContent = 'X';

    // creates an <li> element
    var li = document.createElement('li');
    li.textContent = tweet;

    // add the remove button to each tweet
    li.appendChild(removeBtn);

    // adds the <li> to tweet list
    tweetList.appendChild(li);

    // adds tweet to local storage
    addTweetLocalStorage(tweet);

    // prints the alert
    alert("tweet added");

    this.reset(); // this resets the text area (of the form)
}

// removes the tweets from the dom
function removeTweet(event){

    if (event.target.classList.contains('remove-tweet')){
        event.target.parentElement.remove();
    }

    // console.log(event.target.parentElement.textContent);
    // removes tweet from the local storage
    removeTweetLocalStorage(event.target.parentElement.textContent);
}

// add the tweets in the local storage
function addTweetLocalStorage(tweet){
    let tweets = getTweetsFromStorage();

    // add the tweet into the array
    tweets.push(tweet);

    // convert tweet array into string and add into the localstorage
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

function getTweetsFromStorage(){
    let tweets;
    const tweetsLS = localStorage.getItem("tweets");

    // get the values if returns null then creates an empty array
    if (tweetsLS === null){
        tweets = [];
    }else{
        tweets = JSON.parse(tweetsLS);
    }

    return tweets;
}

// prints localstorage tweets on load
function localStorageOnLoad(){
    let tweets = getTweetsFromStorage();

    // loop throught storage ad then print the values
    tweets.forEach(function(tweet){
    
    // create the remove button
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-tweet';
    removeBtn.textContent = 'X';

    // create an <li> element
    var li = document.createElement('li');
    li.textContent = tweet;

    // add the remove button to each tweet
    li.appendChild(removeBtn);

    // add the <li> to tweet list
    tweetList.appendChild(li);
    });
}

function removeTweetLocalStorage(tweet){

    // get tweets from the storage
    let tweets = getTweetsFromStorage();

    // remove the X character from tweet
    const tweetDelete = tweet.substring(0, tweet.length - 1); // it keeps all the characters except from the last

    localStorage.removeItem("tweets", tweetDelete);

    //loop through the tweets and remove the tweet that is equal
    tweets.forEach(function(tweetFromTweets, index){
        if (tweetDelete === tweetFromTweets){
            tweets.splice(index, 1);
        }
    });

    //saves the data to local storage
    localStorage.setItem("tweets", JSON.stringify(tweets));    
}
