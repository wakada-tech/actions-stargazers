# actions-stargazers
> get repos' stargazers

## Package for distribution

GitHub Actions will run the entry point from the action.yml. Packaging assembles the code into one file that can be checked in to Git, enabling fast and reliable execution and preventing the need to check in node_modules.

Actions are run from GitHub repos.  Packaging the action will create a packaged action in the dist folder.

Run prepare

```bash
npm run prepare
```

Since the packaged index.js is run from the dist folder.

```bash
git add dist
```

## Usage

You can now consume the action by referencing the v1 branch

```yaml
uses: actions/javascript-action@v1
with:
  repotoken: ${{ secrets.GITHUB_TOKEN }}
  repo: templates
  owner: jiangweixian
  pickby: login
  target: ./assets/results.json
```

See the [actions tab](https://github.com/actions/javascript-action/actions) for runs of this action! :rocket:
