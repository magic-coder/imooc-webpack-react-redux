#!/usr/bin/env bash

port=`lsof -i | grep mongod | sed -E 's/ +/;/g' | cut -d';' -f 2`

echo `kill -9 ${port}`

echo 'shutdown mongo ...'