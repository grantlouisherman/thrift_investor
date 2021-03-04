const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const { TweetService, TwitterAccounts } = require('./TwitterService');
const app = express()
const port = 3000

app.use(morgan('tiny'));
app.use(cors());
app.get('/twitter', async (req, res) => {
  try {
      const TS = new TweetService(TwitterAccounts);
      const getUsersTweets = await TS.mapOverUsersArrayToGetTweets();
      res.json(getUsersTweets)

  } catch (e) {
      res.send({ error: true, e })
  }
})
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
