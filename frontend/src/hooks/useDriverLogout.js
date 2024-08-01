import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { BACKEND_URL } from "../../constants.js";

const useDriverLogout = () => {
    const { setAuthUser } = useAuthContext();

    const driverLogout = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/driver/logout`, {
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (!response.ok) {
                toast.error(data.message || 'An error occurred');
                return;
            }
            localStorage.removeItem("User");
            setAuthUser(null);
            toast.success("Logout successful");
        } catch (error) {
            toast.error(error.message);
        }
    }
    return { driverLogout };
}

export default useDriverLogout;