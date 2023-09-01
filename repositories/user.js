import dbPool from "../utils/db.js";

export const getData = (limit) => {
    const sql = "SELECT user_id, name, email, password, created_at FROM users LIMIT ?";
    const values = [limit];

    return dbPool.query(sql, values)
}

export const createData = (name, email, password) => {
    let created_at = new Date();
    const sql = "INSERT INTO users (name, email, password, created_at) VALUE(?, ?, ?, ?)";
    const values = [name, email, password, created_at];
    const result = dbPool.query(sql, values);

    return result;
}

export const getDataById = (id) => {
    const sql = "SELECT user_id, name, email, password, created_at FROM users WHERE user_id = ?";
    const values = [id];

    return dbPool.query(sql, values)
}

export const updateData = () => {

}

export const deleteData = () => {
    
}

export const getDataByEmail = (email) => {
    const sql = "SELECT user_id, name, email, password, created_at FROM users WHERE email = ?";
    const values = [email];

    return dbPool.query(sql, values)
}