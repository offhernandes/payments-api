## Payments API

A simple API for making payments with boleto or credit card.

You will need NodeJS v10.15 for running the API. There's a `.nvmrc` file, so if you're using [nvm](https://github.com/nvm-sh/nvm), you can just type `nvm use` on your terminal.

First, install all dependencies with `npm install`. Then, run `npm start` on your terminal and access [http://localhost:8080](http://localhost:8080) on your web browser.

There you'll see a form for payment. Within this repository, there's a Postman's documentation file, with response and requests examples.

You'll need MySQL installed and set up on localhost, with a database called `payments` created(must be done manually). If you want to change access, you can edit [this file](./config/default.json).

For running unit tests, just type `npm t` on your terminal and see the magic :sparkles:
