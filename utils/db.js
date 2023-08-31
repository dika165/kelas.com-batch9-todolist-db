import mysql from 'mysql2/promise';

const dbPool = mysql.createPool({
    host:"localhost",
    user:"root",
    password: "mauFJcuf5dhRMQrjj",
    database: "batch_9",
    port: 3307 //tidak perlu di tuliskan bila menggunakan default port
})

export default dbPool;