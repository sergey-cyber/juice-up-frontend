#!/bin/bash

npm run build &&

scp -rp ./dist/* root@92.53.115.123:/var/www/juice-up/dist &&

echo "Deploy juice-up frontend finish"