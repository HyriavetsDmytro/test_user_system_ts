import type { Knex } from "knex";

// Update with your config settings.

const moment = require('moment');
const { setTypeParser, builtins } = require('pg').types;

setTypeParser(builtins.DATE, (val : Date) => moment(val).format('YYYY-MM-DD'));


const config: { [key: string]: Knex.Config } = {
  // development: {
  //   client: "sqlite3",
  //   connection: {
  //     filename: "./dev.sqlite3"
  //   }
  // },

  development: {
    client: "pg",
    connection: {
      database: process.env.PG_DATABASE,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD
    },
    migrations: {
      directory: "./db/migrations",
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: process.env.PG_DATABASE,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: process.env.PG_DATABASE,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};




module.exports = config;
