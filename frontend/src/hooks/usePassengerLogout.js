import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const usePassengerLogout = () => {
    const { setAuthUser } = useAuthContext();

    const passengerLogout = async () => {
        try {
            const response = await fetch("/api/passenger/logout", {
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
    return { passengerLogout };
}

export default usePassengerLogout;