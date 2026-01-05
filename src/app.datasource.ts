import { DataSource } from "typeorm"
// import * as dotenv from 'dotenv';

require('dotenv').config();

const AppDataSource = new DataSource({
        type: "postgres", 
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        entities: ["src/entities/*.ts"], 
        migrations: ["src/migrations/*.ts"], 
})
export default AppDataSource;