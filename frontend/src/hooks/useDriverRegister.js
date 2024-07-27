import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useDriverRegister = () => {
    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();

    const register = async ({ fullName, email, password, confirmPassword, drivingLicense, licensePlate }) => {
        const success = handleInputError({ fullName, email, password, confirmPassword, drivingLicense, licensePlate });
        if (!success) return;

        try {
            const response = await fetch("/api/driver/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ fullName, email, password, confirmPassword, drivingLicense, licensePlate }),
            });

            const data = await response.json();
            if (!response.ok) {
                toast.error(data.message || 'An error occurred');
                return;
            }

            const userData = { ...data, role: "driver" };
            localStorage.setItem("User", JSON.stringify(userData));
            setAuthUser(data);
            toast.success("Registration successful");
            navigate("/");
        } catch (err) {
            console.error(err.message);
        }
    }

    return { register };

};

function handleInputError({ fullName, email, password, confirmPassword, drivingLicense, licensePlate }) {
    if (!fullName || !email || !password || !confirmPassword || !drivingLicense || !licensePlate) {
        toast.error("Please fill all the fields");
        return false;
    }
    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }
    return true;
}