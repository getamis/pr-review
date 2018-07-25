'use strict';

const octokit = require('@octokit/rest')();
const fetch = require('isomorphic-fetch');

const projects = require('./project');

const { GITHUB_TOKEN, SLACK_WEBHOOK, SLACK_TEXT } = process.env;

octokit.authenticate({
  type: 'token',
  token: GITHUB_TOKEN
});

module.exports.pr = async (event, context, callback) => {
  await fetch(SLACK_WEBHOOK, {
    method: 'POST',
    body: JSON.stringify({ text: SLACK_TEXT })
  });
  const promises = projects.map(async project => {
    const { owner, repo } = project;
    const state = 'open';

    const result = await octokit.pullRequests.getAll({ owner, repo, state });

    const prs = result.data.filter(
      pr => !pr.title.toLowerCase().includes('wip')
    );

    if (prs.length === 0) {
      return;
    }

    const projectName = `${owner}/${repo}`;
    console.log(projectName);
    console.log(
      prs.map(pr => `  - ${pr.title}\n    ${pr.html_url}`).join('\n')
    );

    const options = {
      method: 'POST',
      body: JSON.stringify({
        text: projectName,
        attachments: prs.map(pr => {
          return {
            title: pr.title,
            title_link: pr.html_url,
            color: '#36a64f'
          };
        })
      })
    };
    return fetch(SLACK_WEBHOOK, options);
  });

  await Promise.all(promises);
  callback(null, null);
};
