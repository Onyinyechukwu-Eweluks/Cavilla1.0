import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "p@33word",
    database: "carvilla",
    synchronize: true,
    logging: false,
    entities: ["src/entity/**/*.ts"],
    migrations:  ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
})
