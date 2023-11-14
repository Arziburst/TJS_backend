<!-- local -->

npm i

.env {
    PORT
    PUBLIC_URL
    DB_URL
    TELEGRAM_API_URL
    TELEGRAM_GROUP_ID
    CLOUD_NAME
    API_KEY
    API_SECRET
    PASSWORD

    PUBLIC_KEY_LIQPAY
    PRIVATE_KEY_LIQPAY
}

npm run build

docker build -t arziburst/tjstore-backend .

docker push arziburst/tjstore-backend

<!-- droplet -->

docker pull arziburst/tjstore-backend

docker tag arziburst/tjstore-backend dokku/api

dokku tags:deploy api

<!-- Dokku fast docs -->
dokku [module]:[report|help] 

sudo dokku plugin:install https://github.com/dokku/dokku-postgres.git postgres
sudo dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git 

dokku postgres:create db

dokku postgres:[unexpose|expose] db [?port]

dokku apps:create [dokkuContainerName]

dokku postgres:link db [dokkuContainerName]

dokku config:set [dokkuContainerName] [key=value] [key=value]...

dokku domains:[add|remove][?-global] [?dokkuContainerName] [domain]

dokku proxy:ports-[add|remove|clear] [dokkuContainerName] [?http:[port:port]]

dokku letsencrypt [dokkuContainerName]