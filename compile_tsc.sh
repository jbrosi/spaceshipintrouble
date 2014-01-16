#!/bin/bash

(cd js && find . -name "*.ts" | xargs ../node_modules/.bin/tsc --module amd)
