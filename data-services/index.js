const needle = require("needle");

const token =
  "AAAAAAAAAAAAAAAAAAAAADERNAEAAAAAky1O5yTSvwqiqVbmXuDdxJ5fSZ4%3DGgqHyfszHefdDE6RfYhNwsQqzFJnxUQSxaeMVBereAyhYHAbzv";
const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

const TwitterAccounts = [
     'trengriffin',
     'awealthofcs',
     'ReformedBroker',
     'michaelbatnick',
     'Wu_Tang_Finance',
     'Stalingrad_Poor',
  ];

class TweetService {
  constructor(users){
    this.users = users;
  }
  async getUserTweets(user) {

    // Edit query parameters below
    // specify a search query, and any additional fields that are required
    // by default, only the Tweet ID and text fields are returned
    const params = {
        'query': `from:${user}`,
        max_results: 10,
    }

    const res = await needle('get', endpointUrl, params, {
        headers: {
            "User-Agent": "v2RecentSearchJS",
            "authorization": `Bearer ${token}`
        }
    })

    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}
  async mapOverUsersArrayToGetTweets(){
    return this.users.map(async user => await this.getUserTweets(user))
  }
}

(async () => {

    try {
        const TS = new TweetService(TwitterAccounts);
        const getUsersTweets = await TS.mapOverUsersArrayToGetTweets();
        for(let i of getUsersTweets){
          const tweets = await i;
          console.log(tweets);
        }


    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
    process.exit();
})();
