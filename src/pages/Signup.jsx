import React from "react";
import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import { registerUser } from "../services/users";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const signUpResponse = await registerUser({ email, password });
    return signUpResponse;
  } catch (error) {
    return {
      error: error.message,
    };
  }
}

export default function Signup() {
  const navigation = useNavigation();
  const actionData = useActionData();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (actionData?.accessToken) {
      navigate("/login", {
        replace: true,
        state: {
          register: true,
        },
      });
    }
  }, [actionData]);

  return (
    <div className="loginPage">
      <div className="container">
        <div className="loginLogo">
          <img src="/images/register-cat.svg" height="110" />
        </div>
        <h2>Sign-up</h2>
        {actionData?.error && (
          <h3 style={{ color: "red" }}>{actionData.error}</h3>
        )}
        <Form method="post" action="/signup">
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
            {navigation.state === "submitting" ? "Signing up..." : "Sign-up"}
          </button>
        </Form>
        <p>
          Already a member? <Link to="/login">Log-in here!</Link>
        </p>
      </div>
    </div>
  );
}
