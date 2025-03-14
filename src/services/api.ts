import axios from "axios";

//json-server --watch db.json - executa no terminal
export const api = axios.create({
    baseURL: 'http://localhost:3000'
})