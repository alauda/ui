# Contributing

## Submitting a Pull Request

The following conditions must be met before merge to `master`:

- at least 1 approval
- the last commit was successfully built and no failed builds

## Commit Message

### Commit Message Format

```text
<type>(<scope>): <subject>
<blank line>
<body>
<blank line>
<footer>
```

### Revert

If the commit reverts a previous commit, it should begin with `revert:`, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests
- **icon**: Update aui-icons or basic-icons
- **chore**: Other changes that don't modify src or test files

### Scope

The scope could be anything specifying place of the commit change. For example `datepicker`, `dialog`, etc.

### Subject

The subject contains succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize first letter
- no dot (.) at the end

### Body

Just as in the subject, use the imperative, present tense: "change" not "changed" nor "changes". The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain any information about breaking changes and is also the place to reference jira task that this commit Closes.

Breaking changes should start with the word `BREAKING CHANGE`: with a space or two newlines. The rest of the commit message is then used for this.

## References

- [Contributing to Angular](https://github.com/angular/angular/blob/master/CONTRIBUTING.md)
- [Commit lint](https://github.com/conventional-changelog/commitlint)
