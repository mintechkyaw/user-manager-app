import axios from "axios";

const instance = axios.create({
    baseURL: "https://user-manager-app.test"
})

export default instance;