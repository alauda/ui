#!/bin/sh

set -e

PUBLISH_VERSION=$(node scripts/publish-version)
PUBLISH_BRANCH=$(node scripts/publish-branch)
NPM_TAG=$(node scripts/npm-tag)

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

npm publish ./release --tag "$NPM_TAG" --access public
