import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable("user_auth", (table) => {
            table.string("email").primary(); 
            table.string("password").notNullable(); 
            table.string("role").notNullable(); 
        })
        .createTable("user_data", (table) => {
            table.increments("id").primary();
            table.string("first_name").notNullable(); 
            table.string("last_name").notNullable();
            table.string("email").notNullable().references('user_auth.email');
            table.date("date_birth").notNullable;
        });;
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists("user_auth")
        .dropTableIfExists("user_data");
}

