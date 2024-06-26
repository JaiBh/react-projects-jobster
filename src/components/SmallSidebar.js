import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import Logo from "../components/Logo";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../features/user/userSlice";
import NavLinks from "./NavLinks";
const SmallSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch(toggleSidebar());
  };
  return (
    <Wrapper>
      <div
        className={
          !isSidebarOpen
            ? "show-sidebar sidebar-container"
            : "sidebar-container"
        }
      >
        <div className="content">
          <button className="close-btn" onClick={toggle}>
            <FaTimes></FaTimes>
          </button>
          <header>
            <Logo></Logo>
          </header>
          <NavLinks toggleSidebar={toggle}></NavLinks>
        </div>
      </div>
    </Wrapper>
  );
};
export default SmallSidebar;
