#!/bin/bash

npm run build &&

scp -rp ./dist/* root@92.53.115.123:/var/www/html/juice_up.ru &&

echo "Deploy juice-up frontend finish"