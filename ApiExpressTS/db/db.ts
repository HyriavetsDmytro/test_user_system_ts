//const knex = require("knex");
import  knex from "knex"
//const knexFile = require("../knexfile.ts");
import {config} from "../knexfile"

const environment = process.env.NODE_ENV || "development";

//module.exports = knex(config[environment]);
export default knex(config[environment]);
