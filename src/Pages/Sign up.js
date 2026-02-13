import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 40 }}>
      <h2>Sign Up</h2>

      <input placeholder="Name" /><br /><br />
      <input placeholder="Email" /><br /><br />
      <input placeholder="Password" type="password" /><br /><br />

      <button onClick={() => navigate("/dashboard")}>
        Create Account
      </button>
    </div>
  );
}

export default Signup;
