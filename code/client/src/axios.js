import axios from "axios";

// also need to rebuild when changing
export default axios.create({
    baseURL: "http://20.254.67.130",
    header: {
        "Content-type": "application/json"
    }
})