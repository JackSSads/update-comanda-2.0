import { API } from "../axiosConfig";

const auth = async (email, password) => {
    try {
        const { data } = await API.get("/auth", { data: { email, password } });

        if (data) {
            return data;
        };

        return new Error("Erro no login.");
    } catch (error) {
        console.error(error);
        return new Error((error.message || "Erro no login."));
    };
};

export const AuthService = {
    auth,
};
