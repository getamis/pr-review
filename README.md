# PR Review

A heads up slack bot for reviewing pull requests

## Installtion

you need to create two files `.env` and `project.js`:

```shell
# .env file
SLACK_WEBHOOK="YOUR_SLACK_INCOMING_WEBHOOK"
GITHUB_TOKEN="GITHUB PERSONAL TOKEN"
SLACK_TEXT="fresh pull requests need your review!!"
```

```javascript
// project.js
module.exports = [
  { owner: 'getamis', repo: 'pr-review' }
];

```

then execute `npm run deploy` to deploy to AWS lambda and done!

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details
