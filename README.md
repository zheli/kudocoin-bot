# kudocoin-bot
A slack bot that allows you to give kudos to other developers in some way.

# Deploy
Create a service account in GCP with permission to deploy cloud function and copy exmaple.env to `.env`.

Run `yarn deploy`.

# Debug
Run `yarn start` and then run `ngrok http 8080`, set the Request URL to the ngrok address.
