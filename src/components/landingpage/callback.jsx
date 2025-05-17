import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../store/login/Login";
import { jwtDecode } from "jwt-decode";

export default function AuthCallback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    if (token) {
      const userInfo = jwtDecode(token);
      dispatch(loginSuccess({ token, userInfo }));
    } else {
      navigate("/login");
    }
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  return <div className="text-white">Redirecting...</div>;
}
