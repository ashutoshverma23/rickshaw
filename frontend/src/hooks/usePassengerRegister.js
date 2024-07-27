import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const usePassengerRegister = () => {
    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();

    const register = async ({ fullName, email, password, confirmPassword }) => {
        const success = handleInputError({ fullName, email, password, confirmPassword });
        if (!success) return;

        try {
            const response = await fetch("/api/passenger/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ fullName, email, password, confirmPassword }),
            });

            const data = await response.json();
            if (!response.ok) {
                toast.error(data.message || 'An error occurred');
                return;
            }

            console.log("user data is", data);
            const userData = { ...data, role: "passenger" };
            localStorage.setItem("User", JSON.stringify(userData));
            setAuthUser(data);
            toast.success("Registration successful");
            navigate("/");

        } catch (err) {
            toast.error(err.message);
        }
    };

    return { register };

};

function handleInputError({ fullName, email, password, confirmPassword }) {
    if (!fullName || !email || !password || !confirmPassword) {
        toast.error("Please fill all the fields");
        return false;
    }
    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }
    return true;
}
