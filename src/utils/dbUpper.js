import mysql from 'mysql2/promise'

let connection;
export const createConnection3 = async () => {
    if(!connection){
        connection = await mysql.createConnection({
            host: process.env.DATABASE_HOST_UPPER,
            user: process.env.DATABASE_USER_UPPER,
            port:process.env.DATABASE_PORT_UPPER,
            password: process.env.DATABASE_PASSWORD_UPPER,
            database: process.env.DATABASE_NAME_UPPER,
        })
    }
    return connection;
}