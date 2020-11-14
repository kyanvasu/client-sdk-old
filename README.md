# client-sdk

Kanvas Client SDK Library

[![NPM version](https://img.shields.io/npm/v/kanvas-sdk.svg)](https://www.npmjs.com/package/kanvas-sdk)
[![Codecov](https://img.shields.io/codecov/c/github.com/kyanvasu/client-sdk.svg)](https://codecov.io/gh/github.com/kyanvasu/client-sdk)
[![GitHub stars](https://img.shields.io/github/stars/kyanvasu/client-sdk.svg?style=social&logo=github&label=Stars)](https://github.com/kyanvasu/client-sdk)

# Features
- Generate API documentation (HTML or JSON) [without a mess of JSDoc tags](https://blog.cloudflare.com/generating-documentation-for-typescript-projects/) to maintain
- Collocated, atomic, concurrent unit tests with [AVA](https://github.com/avajs/ava)
- Source-mapped code coverage reports with [nyc](https://github.com/istanbuljs/nyc)
- Configurable code coverage testing (for continuous integration)
- Automatic linting and formatting using [`typescript-eslint`](https://github.com/typescript-eslint/typescript-eslint) and [Prettier](https://prettier.io/)


# Developing with typescript-starter

## Development zen

To start working, run the `watch:build` task using [`npm`](https://docs.npmjs.com/getting-started/what-is-npm) or [`yarn`](https://yarnpkg.com/).

```sh
npm run watch:build
```

In another terminal tab/window, run the `watch:test` task:

```sh
npm run watch:test
```

These watch tasks make development much faster and more interactive. They're particularly helpful for [TDD](https://en.wikipedia.org/wiki/Test-driven_development)/[BDD](https://en.wikipedia.org/wiki/Behavior-driven_development) workflows.

These watch tasks will build and watch the entire project for changes (to both the library source files and test source files). As you develop, you can add tests for new functionality – which will initially fail – before developing the new functionality. Each time you save, any changes will be rebuilt and retested.

Since only changed files are rebuilt and retested, this workflow remains fast even for large projects.


## Auto-fix and format project

To automatically fix `eslint` and `prettier` formatting issues, run:

```sh
npm run fix
```

## View test coverage

To generate and view test coverage, run:

```sh
npm run cov
```

This will create an HTML report of test coverage – source-mapped back to Typescript – and open it in your default browser.

<p align="center">
  <img height="600" alt="source-mapped typescript test coverage example" src="https://cloud.githubusercontent.com/assets/904007/22909301/5164c83a-f221-11e6-9d7c-72c924fde450.png">
</p>

## Generate your API docs

The src folder is analyzed and documentation is automatically generated using [TypeDoc](https://github.com/TypeStrong/typedoc).

```sh
npm run doc
```

This command generates API documentation for your library in HTML format and opens it in a browser.

Since types are tracked by Typescript, there's no need to indicate types in JSDoc format. For more information, see the [TypeDoc documentation](http://typedoc.org/guides/doccomments/).

To generate and publish your documentation to [GitHub Pages](https://pages.github.com/) use the following command:

```sh
npm run doc:publish
```

Once published, your documentation should be available at the proper GitHub Pages URL for your repo. See [`typescript-starter`'s GitHub Pages](https://bitjson.github.io/typescript-starter/) for an example.

<p align="center">
  <img height="500" alt="TypeDoc documentation example" src="https://cloud.githubusercontent.com/assets/904007/22909419/085b9e38-f222-11e6-996e-c7a86390478c.png">
</p>

For more advanced documentation generation, you can provide your own [TypeDoc theme](http://typedoc.org/guides/themes/), or [build your own documentation](https://blog.cloudflare.com/generating-documentation-for-typescript-projects/) using the JSON TypeDoc export:

```sh
npm run doc:json
```

## Bump version, update changelog, commit, & tag release

It's recommended that you install [`commitizen`](https://github.com/commitizen/cz-cli) to make commits to your project.

```sh
npm install -g commitizen

# commit your changes:
git cz
```

This project is tooled for [conventional changelog](https://github.com/conventional-changelog/conventional-changelog) to make managing releases easier. See the [standard-version](https://github.com/conventional-changelog/standard-version) documentation for more information on the workflow, or [`CHANGELOG.md`](CHANGELOG.md) for an example.

```sh
# bump package.json version, update CHANGELOG.md, git tag the release
npm run version
```

You may find a tool like [**`wip`**](https://github.com/bitjson/wip) helpful for managing work in progress before you're ready to create a meaningful commit.

## One-step publish preparation script

Bringing together many of the steps above, this repo includes a one-step release preparation command.

```sh
# Prepare a standard release:
npm run prepare-release
```

This command runs the following tasks:

- `hard-reset`: cleans the repo by removing all untracked files and resetting `--hard` to the latest commit. (**Note: this could be destructive.**)
- `test`: build and fully test the project
- `docs:html`: generate the latest version of the documentation
- `docs:publish`: publish the documentation to GitHub Pages
- `version`: bump package.json version, update CHANGELOG.md, and git tag the release

When the script finishes, it will log the final command needed to push the release commit to the repo and publish the package on the `npm` registry:

```sh
git push --follow-tags origin master; npm publish
```

Look over the release if you'd like, then execute the command to publish everything.

You can also prepare a non-standard release:

```sh
# Or a non-standard release:

# Reset the repo to the latest commit and build everything
npm run hard-reset && npm run test && npm run cov:check && npm run doc:html

# Then version it with standard-version options. e.g.:
# don't bump package.json version
npm run version -- --first-release

# Other popular options include:

# PGP sign it:
# $ npm run version -- --sign

# alpha release:
# $ npm run version -- --prerelease alpha

# And don't forget to push the docs to GitHub pages:
npm run doc:publish
```

# FAQs

## Why put tests next to the source code?

By convention, sample tests in this project are adjacent to the files they test.

- Such tests are easy to find.
- You see at a glance if a part of your project lacks tests.
- Nearby tests can reveal how a part works in context.
- When you move the source (inevitable), you remember to move the test.
- When you rename the source file (inevitable), you remember to rename the test file.

(Bullet points taken from [the Angular Testing Guide](https://angular.io/guide/testing#q-spec-file-location).)

## Can I move the tests?

Yes. For some projects, separating tests from the code they test may be desirable. This project is already configured to test any `*.spec.ts` files located in the `src` directory, so reorganize your tests however you'd like. You can put them all in a single folder, add tests that test more than one file, or mix and match strategies (e.g. for other types of tests, like integration or e2e tests).



