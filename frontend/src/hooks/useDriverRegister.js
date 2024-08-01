import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../../constants.js";

export const useDriverRegister = () => {
    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();

    const register = async ({ fullName, email, password, confirmPassword, drivingLicense, licensePlate }) => {
        const success = handleInputError({ fullName, email, password, confirmPassword, drivingLicense, licensePlate });
        if (!success) return;

        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("confirmPassword", confirmPassword);
        formData.append("licensePlate", licensePlate);
        if (drivingLicense) {
            formData.append("drivingLicense", drivingLicense);
        }

        try {
            const response = await fetch(`${BACKEND_URL}/api/driver/register`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (!response.ok) {
                toast.error(data.message || 'An error occurred');
                return;
            }

            const userData = { ...data, role: "driver" };
            localStorage.setItem("User", JSON.stringify(userData));
            setAuthUser(userData);
            toast.success("Registration successful");
            navigate("/");
        } catch (err) {
            console.error(err.message);
            toast.error("An error occurred during registration");
        }
    };

    return { register };
};

function handleInputError({ fullName, email, password, confirmPassword, drivingLicense, licensePlate }) {
    if (!fullName || !email || !password || !confirmPassword || !licensePlate) {
        toast.error("Please fill all the required fields");
        return false;
    }
    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }
    return true;
}

export default useDriverRegister;