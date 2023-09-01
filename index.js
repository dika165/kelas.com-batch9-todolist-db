/*
    1. buat endpoint untuk update dan delete user <= tugas sesi 4
    2. Buat table dengan nama tasks dan buat field / column sebagai berikut: 
        - task_id
        - user_id
        - title
        - is_done
        - created_at
        - updated_at
    3. Buat endpoint untuk CRUD table tasks di atas. (field user_id diambil dari claims / payload tokennya)
    4. Di masing-masing endpoint CRUD tasks dilakukan otorisasi
*/

import express from 'express';
import userRouter from './routes/userRoute.js';
import authRouter from './routes/authRoute.js';
import { errorResp } from './utils/response.js';

const app = express();
const port = 8080;
const host = "localhost";

app.use(express.json());
app.use("/users",userRouter);
app.use("/auth", authRouter);

app.use((error, request, response, next) => {
    const message = "internal server error";
    console.log(error.message);
    errorResp(response, message, 500)
});

app.listen(port, host, ()=> {
    console.log(`Server berjalan di http://${host}:${port}`)
})