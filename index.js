const core = require('@actions/core');
const github = require('@actions/github')
const fs = require('fs')
const pickby = require('lodash.pickby')

const token = core.getInput('repotoken')
const owner = core.getInput('owner')
const repo = core.getInput('repo')
const pickbyParams = core.getInput('pickby') ? core.getInput('pickby').split(',') : []
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

    const data = results.data.map(v => pickby(v, pickbyParams))

    fs.writeFileSync(target, JSON.stringify(data, undefined, 2))

    core.info(fs.readFileSync(target).toString('utf-8'))

    core.setOutput('time', new Date().toTimeString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
