# Hackademy Node Starter Project [![Build Status](https://travis.innovate.ibm.com/hackademy/node-starter.svg?token=ufstvqxkop6WTjp1MZ9U&branch=master)](https://travis.innovate.ibm.com/hackademy/node-starter)

Welcome to Hackademy!

This repository will be the starting place for your work throughout Hackademy. Following the instructions below will get you set up and ready to start working. Many items may seem new at first, but as you progress through Hackademy, everything should become more familiar. We encourage you to make this codebase your own!

## Collaborating

One of the most effective ways to collaborate on GitHub is by using a forking/branching model as described in the [GitHub Guides](https://guides.github.com/).

### Setup

* [Fork](https://guides.github.com/activities/forking/) the main (blessed) repository to your personal GitHub Enterprise space
* Clone this new fork locally to your computer. Make sure you use the SSH URL, not the HTTPS URL. This will be your `origin` remote.
* Add an `upstream` remote whose URL is the SSH URL of the blessed repository - `git remote add upstream {{url}}`, replacing `{{url}}` with the blessed repo's URL.
* Ensure that the blessed repository's `master` branch is [protected](https://help.github.com/articles/about-protected-branches/)

### Divvying Up Work

* As a team, create [issues](https://guides.github.com/features/issues/) in the blessed repository to describe what work needs to be done
* Assign the issue to an individual to work on and add it to the `To Do` pipeline in the [ZenHub](ibm.biz/zenhub-install) boards
* When you have started working on an issue, move it to the `In Progress` pipeline.

### Doing Work

* Each time you begin doing work on a new issue, check out the master branch by doing `git checkout master`. You will only be able to do this if you don't have any changes in your local codebase.
* Pull in the latest changes from upstream's master branch - `git pull upstream master`
* Create a new [branch](https://guides.github.com/introduction/flow/), named something relevant to the issue being worked on - `git checkout -b {{branch-name}}`, replacing `{{branch-name}}` with the name of your branch.
* Push your new branch to your origin remote - `git push -u origin {{branch-name}}`
* Add your commits and push to that branch - `git push origin {{branch-name}}`
* Issue a Pull Request in to the upstream repository when the work is done. Make sure the Pull Request comment includes a [keyword for closing issues](https://help.github.com/articles/closing-issues-via-commit-messages/) for closing the issue the work is for - `Resolves #42` (with `42` being the issue number)
* Once the Pull Request is merged, delete the local and remote branch you worked on - `git branch -d {{branch-name}}` for local, `git push origin :{{branch-name}}` for remote. **Important: Never Reuse A Branch After It Has Been Merged**

## Installing

After forking and cloning the codebase, run the following command to install all of the dependencies:

```bash
npm install
```

Whenever you update your branch from `upstream master`, be sure to re-run `npm install` to install the latest dependencies from your team.

## Running

Running your project for development is a single command:

```bash
npm run gulp
```

This will run [Gulp](http://gulpjs.com/), starting your Node server, wrapping it in a proxy server that will be accessible on multiple devices and live reload your assets, and watch your Node file for changes, stopping and starting the Node server on changes. It will also lint all of your JavaScript and Sass, compile your Sass, Uglify your JavaScript, and optimize your Images (yay Task Runners!).

## Testing and Deploying to Bluemix

Testing and deploying to Bluemix is all done through Travis, which you should already have set up. Whenever a commit comes in to any branch of your repository, Travis will start up and run `npm test` (found in the `scripts` property in `package.json`). If it finds any errors, it'll be angry :rage: and you'll need to go fix them. Once all of your tests pass, Travis will be happy again :green_heart:. If you want to add tests to run, add some Gulp tasks and make sure they're run during the `test` Gulp task.

If a commit comes in to the `master` branch and all of the tests pass, Travis will use CloudFoundry to create a deployable app from your source code and go deploy it on Bluemix! Then, head over to your URL to see it live!

## Extending This Starter

The Node Starter is a very bare-bones Node server.

* `src` - Browser source files
  * `src/js` - Browser JS files you write. Will render to `public/js` and available in the `/js` folder from the browser
  * `src/images` - Images to be available to the browser. Will render to `public/images` and available in the `/images` folder from the browser
  * `src/sass` - Sass files to be rendered to CSS. Will render to `public/css` and available in the `/css` folder from the browser
* `lib` - Node source files
* `views` - Templates to be rendered by the Node server
* `index.js` - Main application file

The following folders contain generated content and _will not_ be included in your source control:

* `public` - The folder browser assets will be served from.
* `node_modules` - The folder containing Node dependencies

The following files are configuration files to configure different parts of the toolchain:

* `gulpfile.js` - [Gulp](http://gulpjs.com/) configuration file
* `manifest.yml` - [Bluemix Application](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html) configuration file
* `.cfignore` - [Bluemix Application](https://docs.cloudfoundry.org/devguide/deploy-apps/prepare-to-deploy.html) deployment ignore file
* `.nvmrc` - [NVM](https://github.com/creationix/nvm) version configuration
* `.editorconfig` - [EditorConfig](http://editorconfig.org/) configuration
* `.eslintrc` - [ESLint](http://eslint.org/) lint rule configuration
* `.sass-lint.yml` - [Sass Lint](https://github.com/sasstools/sass-lint) lint rule configuration
* `.travis.yml` - [Travis](https://docs.travis-ci.com/user/customizing-the-build/) configuration
* `.gitignore` - [Git](https://git-scm.com/docs/gitignore) source control ignore file

These files and folders each contain basic code for you to expand upon.

### Templating

Many applications will want to include templating for server-side rendering capabilities. The Node Starter comes with a very basic one: it will read `*.html` files in the `views` directory and render them out directly. It will neither allow you to pass variables in to the HTML to render, nor allow you to break up your files in to reusable pieces.

If you would like to use templating, it is recommended you research some available templating engines for Node and replace the default one with one of your choosing.

### Questions to Ask When Choosing a Tool

When choosing tools to extend this project with, you should keep the following questions in mind:

* Do you need to use a tool for this?
* How will this tool affect our ability to _load_ our application under our performance budget?
* Will this tool allow us _respond_ to user input in under 50ms?
* Can we enhance our experience with this tool, or is our experience dependent on it?
* What happens to our codebase if we had to stop using this tool tomorrow?
* Can we deliver an accessible experience with this tool?
* How much time will be added by this tool for a new developer to become productive?
* How much of the tool's functionality are you likely to use? Are there smaller, more targeted tools can you use instead?
* Do we now need to include other tools to use this one? Do those other tools meet this criteria?
"# UBX_Endpoint" 
