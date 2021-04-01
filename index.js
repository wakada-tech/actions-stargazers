const core = require('@actions/core');
const github = require('@actions/github')
const fs = require('fs-extra')
const pick = require('lodash.pick')

const token = core.getInput('repotoken')
const owner = core.getInput('owner')
const repo = core.getInput('repo')
const pickby = core.getInput('pickby') ? core.getInput('pickby').split(',') : []
const target = core.getInput('target') || './results.json'
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

    core.info(JSON.stringify(pickby))

    const data = results.data.map(v => pick(v, pickby))

    fs.outputJSONSync(target, data, { spaces: 2 })
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
