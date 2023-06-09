#!/bin/bash

export NODE_OPTIONS=--openssl-legacy-provider
npm install
npm run build
exec npm run dev
