#!/bin/sh

PUBLISH_VERSION=$(node scripts/publish-version)
NPM_TAG=$(node scripts/npm-tag)

if [ "$NPM_TAG" = "beta" ]; then
  SRC_PKG=package.json
  TMP=$(mktemp)
  jq ".version = \"$PUBLISH_VERSION\"" "$SRC_PKG" >"$TMP"
  mv -f "$TMP" "$SRC_PKG"

  if [ "$CI" = "true" ] && [ "$(git remote get-url origin)" != "https://github.com/alauda/alauda-ui.git" ]; then
    echo "Publish beta is only available on non-forked PR!"
    echo "If you're a member of alauda, just checkout a new branch instead."
    exit 0
  fi
else
  if [ "$CI" = "true" ]; then
    git config --local user.email "actions@github.com"
    git config --local user.name "GitHub Actions"
  fi
  yarn release --release-as "$PUBLISH_VERSION"
fi

yarn build
npm set //registry.npmjs.org/:_authToken "$NPM_TOKEN"
npm publish release --tag "$NPM_TAG"
