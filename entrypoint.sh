#!/usr/bin/bash

export NITRO_SSL_CERT=$(cat $SSL_CERT)

export NITRO_SSL_KEY=$(cat $SSL_KEY)

yarn build && node /app/.output/server/index.mjs