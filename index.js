const core = require('@actions/core');
const wait = require('./wait');
const github = require('@actions/github')
const fs = require('fs')

const octokit = github.getOctokit(token);

// most @actions toolkit packages have async methods
async function run() {
  try {
    const ms = core.getInput('milliseconds');
    core.info(`Waiting ${ms} milliseconds ...`);

    core.debug((new Date()).toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    await wait(parseInt(ms));
    core.info((new Date()).toTimeString());
    core.info(JSON.stringify(process.env))
    const results = await octokit.repos.listStargazersForRepo({
      owner: 'jiangweixian',
      repo: 'templates'
    })

    fs.writeFileSync('./results.json', JSON.stringify(results))

    core.info(fs.readFileSync('./results.json').toString('utf-8'))

    core.setOutput('time', new Date().toTimeString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
