import { Outlet } from "react-router-dom";
import { Navbar, SmallSidebar, BigSidebar } from "../../components/";
import Wrapper from "../../assets/wrappers/SharedLayout";
const SharedLayout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar></SmallSidebar>
        <BigSidebar></BigSidebar>
        <div>
          <Navbar></Navbar>
          <div className="dashboard-page">
            <Outlet></Outlet>
          </div>
        </div>
      </main>
    </Wrapper>
  );
};
export default SharedLayout;
