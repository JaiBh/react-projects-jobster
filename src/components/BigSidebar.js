import { useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/BigSidebar";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
const BigSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);
  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? "show-sidebar sidebar-container" : "sidebar-container"
        }
      >
        <div className="content">
          <header>
            <Logo></Logo>
          </header>
          <NavLinks></NavLinks>
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSidebar;
