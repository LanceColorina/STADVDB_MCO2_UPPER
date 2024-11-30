import mysql from 'mysql2/promise'

let connection;
export const createConnection1 = async () => {
    if(!connection){
        connection = await mysql.createConnection({
            host: process.env.DATABASE_HOST_MASTER,
            user: process.env.DATABASE_USER_MASTER,
            port:process.env.DATABASE_PORT_MASTER,
            password: process.env.DATABASE_PASSWORD_MASTER,
            database: process.env.DATABASE_NAME_MASTER,
        })
    }
    return connection;
}