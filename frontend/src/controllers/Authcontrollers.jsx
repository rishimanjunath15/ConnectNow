import axios from "axios";
import httpStatus from "http-status";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import connectionManager from "../config/connectionManager";

export const Authcontext = createContext({});

export const Authprovider = ({ children }) => {
    const authContext = useContext(Authcontext);
    const [userData, setUserData] = useState(authContext);
    const router = useNavigate();

    // Get the current server URL dynamically
    const getClient = async () => {
        const serverUrl = await connectionManager.findWorkingServer();
        return axios.create({
            baseURL: `${serverUrl}/api/v1/users`
        });
    };

    const handleRegister = async (name, username, password) => {
        try {
            const client = await getClient();
            let request = await client.post("/register", {
                name: name,
                username: username,
                password: password
            });

            if (request.status === httpStatus.CREATED) {
                return request.data.message;
            }
        } catch (err) {
            throw err;
        }
    }

    const handleLogin = async (username, password) => {
        try {
            const client = await getClient();
            let request = await client.post("/login", {
                username: username,
                password: password
            });

            if (request.status === httpStatus.OK) {
                localStorage.setItem("token", request.data.token);
                router("/home");
                return request.data.message || "Login successful";
            }
        } catch (err) {
            throw err;
        }
    }

    const getHistoryOfUser = async () => {
        try {
            const client = await getClient();
            let request = await client.get("/getAllActivity", {
                params: {
                    token: localStorage.getItem("token")
                }
            });
            return request.data;
        } catch (err) {
            throw err;
        }
    }

    const addToUserHistory = async (meetingCode) => {
        try {
            const client = await getClient();
            let request = await client.post("/addActivity", {
                token: localStorage.getItem("token"),
                meeting_code: meetingCode
            });
            return request;
        } catch (e) {
            console.error("Error adding to user history:", e);
            throw e;
        }
    }

    const data = {
        userData, 
        setUserData, 
        addToUserHistory, 
        getHistoryOfUser, 
        handleRegister, 
        handleLogin
    }

    return (
        <Authcontext.Provider value={data}>
            {children}
        </Authcontext.Provider>
    )
}