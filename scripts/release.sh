#!/bin/sh

PUBLISH_VERSION=$(node scripts/publish-version)
PUBLISH_BRANCH=$(node scripts/publish-branch)
NPM_TAG=$(node scripts/npm-tag)

if [ "$NPM_TOKEN" = "" ]; then
  echo "NPM_TOKEN is not available on PR from forked repository!"
  echo "If you're a member of Alauda, just checkout a new branch instead."
  exit 0
else
  npm set //registry.npmjs.org/:_authToken "$NPM_TOKEN"
fi

if [ "$NPM_TAG" = "latest" ]; then
  echo "Publish latest tag via this script is not permitted anymore."
  exit 1
else
  SRC_PKG=package.json
  TMP=$(mktemp)
  jq ".version = \"$PUBLISH_VERSION\"" "$SRC_PKG" >"$TMP"
  mv -f "$TMP" "$SRC_PKG"
fi

yarn build

if [ "$PUBLISH_BRANCH" != "" ]; then
  git push --follow-tags origin "$PUBLISH_BRANCH"
fi

npm publish release --tag "$NPM_TAG"
