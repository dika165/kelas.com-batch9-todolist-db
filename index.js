/*
    1. buat endpoint untuk update dan delete user
    2. Buat table dengan nama tasks dan buat field / column sebagai berikut: 
        - task_id
        - user_id
        - title
        - is_done
        - created_at
        - updated_at
    3. Buat endpoint untuk CRUD table tasks di atas.
*/

import express from 'express';
import * as UserService from './services/userService.js'

const app = express();
const port = 8080;
const host = "localhost";

app.use(express.json());
app.get("/users",UserService.getUser);
app.post("/users", UserService.createUser);
app.get("/users/:id", UserService.getUerById);
app.put("/users/:id");
app.delete("/users/:id");
app.listen(port, host, ()=> {
    console.log(`Server berjalan di http://${host}:${port}`)
})