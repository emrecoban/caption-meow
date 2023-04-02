import React from "react";
import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { loginUser } from "../services/users";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const logInResponse = await loginUser({ email, password });
    return logInResponse;
  } catch (error) {
    return {
      error: error.message,
    };
  }
}

export default function Login() {
  const location = useLocation(); // geldiği sayfayı yakala.
  const navigate = useNavigate(); // sayfayı yönlendir.
  const navigation = useNavigation(); // mevut durumu yakala. submitting...
  const actionData = useActionData(); // action fonksiyonundan gelen veriyi al.

  const userFrom = location.state?.from || "/";

  React.useEffect(() => {
    if (actionData?.accessToken) {
      navigate(userFrom, {
        replace: true,
      });
    }
  }, [actionData]);

  return (
    <div className="loginPage">
      <div className="container">
        <div className="loginLogo">
          <img src="/images/login-cat.svg" height="80" />
        </div>
        <h2>Log-in</h2>
        {actionData?.error && (
          <h3 style={{ color: "red" }}>{actionData.error}</h3>
        )}
        {location.state?.register && (
          <div style={{ marginBottom: "20px", textAlign: "center" }}>
            <h3 style={{ color: "green", margin: "0" }}>Success!</h3>
            <p style={{ margin: "0" }}>Your account has been created.</p>
          </div>
        )}
        <Form method="post" action="/login">
          <label htmlFor="email">
            <strong>E-mail</strong>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter e-mail"
            required
          />

          <label htmlFor="password">
            <strong>Password</strong>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            required
          />

          <button disabled={navigation.state === "submitting"}>
            {navigation.state === "submitting" ? "Logging in..." : "Log-in"}
          </button>
        </Form>
        <p>
          Not a member yet? <Link to="/signup">Sign-up!</Link>
        </p>
      </div>
    </div>
  );
}
