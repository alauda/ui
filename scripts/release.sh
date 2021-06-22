#!/bin/sh

PUBLISH_VERSION=$(node scripts/publish-version)
NPM_TAG=$(node scripts/npm-tag)

if [ "$NPM_TOKEN" = "" ]; then
  echo "NPM_TOKEN is not available on PR from forked repository!"
  echo "If you're a member of Alauda, just checkout a new branch instead."
  exit 0
fi

if [ "$NPM_TAG" = "beta" ]; then
  SRC_PKG=package.json
  TMP=$(mktemp)
  jq ".version = \"$PUBLISH_VERSION\"" "$SRC_PKG" >"$TMP"
  mv -f "$TMP" "$SRC_PKG"
else
  yarn release --release-as "$PUBLISH_VERSION"
fi

yarn build
npm set //registry.npmjs.org/:_authToken "$NPM_TOKEN"
npm publish release --tag "$NPM_TAG"
