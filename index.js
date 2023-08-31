/*
    Tugas Praktek : 
    1. Buat function untuk update data user yang ada di database;
    2. buat function untuk delete data user yang ada di database;
*/
import * as UserRepo from './repository.js';

const createUser = async (name, email, password) => {
    const [result] = await UserRepo.createData(name, email, password);

    console.log(`Data berhasil dibuat dengan id : ${result.insertId}`);
}

const getUser = async (limit) => {
    const [result] = await UserRepo.getData(limit);

    console.log(result);
}

await createUser("zafif", "zafif@gmail.com", "pass1234");
await createUser("farhan", "farhan@gmail.com", "pass1234")

console.log("data yang ada di database: ");

getUser(100);

// updateUser()
// getUser()

// deleteUser()
// getUser()