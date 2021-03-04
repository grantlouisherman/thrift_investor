const needle = require("needle");

const token = ""
const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

const TwitterAccounts = [
     'WSJ',
     'CNBC',
     'PeterLBrandt',
     'SJosephBurns',
     'elerianm',
     'IBDinvestors',
     'bespokeinvest',
     'steve_hanke',
     'MarketWatch'
  ];

class TweetService {
  constructor(users){
    this.users = users;
  }
  async getUserTweets(user) {
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
    let table = {};
    for(let i of this.users){
      table[i] = await this.getUserTweets(i)
    }
    return table
  }
}
module.exports = { TweetService, TwitterAccounts };
