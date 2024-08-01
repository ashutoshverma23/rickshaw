import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../../../constants.js";

const VerifyEmail = ({ userType }) => {
  const { token } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/${userType}/verify-email/${token}`
        );
        const data = await response.json();

        if (response.status === 200) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Verification failed. Please try again.");
      }
    };

    verifyEmail();
  }, [token]);

  return <div>Email verification in progress...</div>;
};

export default VerifyEmail;
