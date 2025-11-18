import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { tokenStore } from "../auth/tokenStore";

export default function OAuthSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuth = async () => {
      const token = params.get("token");
      console.log("OAuth token:", token);

      if (!token) {
        navigate("/signin");
        return;
      }

      // Optional debug delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Store token in memory (same as normal login)
      tokenStore.set(token);

      // Navigate to dashboard
      navigate("/dashboard");
    };

    handleOAuth();
  }, [params, navigate]);

  return <div>Signing you in...</div>;
}
