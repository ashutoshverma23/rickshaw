import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../constants.js";

export const usePassengerLogin = () => {
    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();

    const login = async ({ email, password }) => {
        const success = handleInputError({ email, password });
        if (!success) return;

        try {
            const response = await fetch(`${BACKEND_URL}/api/passenger/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) {
                toast.error(data.message || 'An error occurred');
                return;
            }

            const userData = { ...data, role: "passenger" };
            localStorage.setItem("User", JSON.stringify(userData));
            setAuthUser(userData);
            toast.success("Login successful");
            navigate("/");

        } catch (err) {
            toast.error(err.message);
        }
    };

    return { login };

}

function handleInputError({ email, password }) {
    if (!email || !password) {
        toast.error("Please fill all the fields");
        return false;
    }
    return true;
}