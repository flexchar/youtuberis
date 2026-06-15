#!/usr/bin/env sh
set -eu

# Cloudflare Pages build.
#
# Production (the "master" branch) keeps the canonical custom domain defined in
# config.toml (https://www.youtuberis.lt). Preview / branch deploys override
# baseURL with the Cloudflare-provided deployment URL ($CF_PAGES_URL) so their
# links, assets and canonical tags resolve on the *.pages.dev preview domain.
#
# Locally (no Cloudflare env vars) this falls through to the config.toml baseURL.
PROD_BRANCH="master"
BASEURL_FLAG=""
if [ "${CF_PAGES_BRANCH:-$PROD_BRANCH}" != "$PROD_BRANCH" ] && [ -n "${CF_PAGES_URL:-}" ]; then
  BASEURL_FLAG="--baseURL ${CF_PAGES_URL}"
fi

bun install
bun run prod
# shellcheck disable=SC2086  # intentional: expand the optional flag into argv
hugo --cleanDestinationDir $BASEURL_FLAG
