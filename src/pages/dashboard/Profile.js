import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useState } from "react";
import { toast } from "react-toastify";
import FormRow from "../../components/FormRow";
import { updateUser } from "../../features/user/userSlice";
const Profile = () => {
  const { isLoading, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    lastName: user?.lastName || "",
    location: user?.location || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, lastName, location } = userData;
    if (!name || !email || !lastName || !location) {
      toast.error("please fill out all fields");
      return;
    }
    const newUser = { name, email, lastName, location };
    dispatch(updateUser(newUser));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        <h4>profile</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={userData.name}
            handleChange={handleChange}
          ></FormRow>
          <FormRow
            type="text"
            name="lastName"
            value={userData.lastName}
            labelText={"last name"}
            handleChange={handleChange}
          ></FormRow>
          <FormRow
            type="text"
            name="email"
            value={userData.email}
            handleChange={handleChange}
          ></FormRow>
          <FormRow
            type="text"
            name="location"
            value={userData.location}
            handleChange={handleChange}
          ></FormRow>
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "please wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default Profile;
