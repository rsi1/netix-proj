#!/bin/bash

echo "--- NETIX setup ---"

cd /workspace/netix-react
npm install

cd /workspace/netix-backend
mvn -q clean install

echo "Environment ready "