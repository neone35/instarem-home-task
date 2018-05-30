# Skycop home task

[Demo on Heroku](https://instarem-task.herokuapp.com/)

## How to use

Clone this repository

```bash
git clone https://github.com/neone35/instarem-home-task.git
cd skycop-home-task
```

Install deps and start project

```bash
yarn install
yarn dev
```

## Task

Use battle data to build an API Server using Node.JS/Express which exposes following 4 endpoints:

Criteria:

* /list returns list(array) of all the places where battle has taken place.
* /count returns total number of battle occurred.
* /stats returns most_active, outcome, battle_type and defender_size fields.
* /search which returns atacker or defender with additional query options
