import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo, FormRow } from "../components";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loginUser, registerUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((store) => store.user);
  const [values, setValues] = useState(initialState);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please fill out all fields");
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email, password }));
    } else {
      dispatch(registerUser({ name, email, password }));
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user]);

  return (
    <Wrapper className="full-page">
      <form onSubmit={handleSubmit} className="form">
        <Logo></Logo>
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {/* NAME FIELD */}
        {!values.isMember && (
          <FormRow
            name="name"
            handleChange={handleChange}
            value={values.name}
            type="text"
          ></FormRow>
        )}

        {/* EMAIL FIELD */}
        <FormRow
          name="email"
          handleChange={handleChange}
          value={values.email}
          type="text"
        ></FormRow>
        {/* PASSWORD FIELD */}
        <FormRow
          name="password"
          handleChange={handleChange}
          value={values.password}
          type="password"
        ></FormRow>
        <button className="btn btn-block" disabled={isLoading}>
          {isLoading ? "Loading..." : "submit"}
        </button>
        <button
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() => {
            dispatch(
              loginUser({ email: "testUser@test.com", password: "secret" })
            );
          }}
        >
          {isLoading ? "Loading..." : "demo app"}
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
