#!/bin/sh

PUBLISH_VERSION=$(node scripts/publish-version)
NPM_TAG=$(node scripts/npm-tag)

if [ "$NPM_TAG" = "beta" ]; then
  SRC_PKG=package.json
  TMP=$(mktemp)
  jq ".version = \"$PUBLISH_VERSION\"" "$SRC_PKG" >"$TMP"
  mv -f "$TMP" "$SRC_PKG"
else
  git config --local user.email "action@github.com"
  git config --local user.name "GitHub Action"
  yarn release --release-as "$PUBLISH_VERSION"
fi

yarn build
npm set //registry.npmjs.org/:_authToken "$NPM_TOKEN"
npm publish release --tag "$NPM_TAG"
