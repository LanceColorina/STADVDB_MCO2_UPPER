import mysql from 'mysql2/promise'

let connection;
export const createConnection2 = async () => {
    if(!connection){
        connection = await mysql.createConnection({
            host: process.env.DATABASE_HOST_LOWER,
            user: process.env.DATABASE_USER_LOWER,
            port:process.env.DATABASE_PORT_LOWER,
            password: process.env.DATABASE_PASSWORD_LOWER,
            database: process.env.DATABASE_NAME_LOWER,
        })
    }
    return connection;
}