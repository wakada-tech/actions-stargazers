const core = require('@actions/core');
const github = require('@actions/github')
const fs = require('fs')

const token = core.getInput('repotoken')
const owner = core.getInput('owner')
const repo = core.getInput('repo')
const octokit = github.getOctokit(token);

// most @actions toolkit packages have async methods
async function run() {
  try {
    core.info(JSON.stringify(process.env))
    const results = await octokit.activity.listStargazersForRepo({
      owner,
      repo,
      per_page: 100
    })

    fs.writeFileSync('./results.json', JSON.stringify(results.data, undefined, 2))

    core.info(fs.readFileSync('./results.json').toString('utf-8'))

    core.setOutput('time', new Date().toTimeString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
