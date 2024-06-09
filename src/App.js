import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing, Error, Register } from "./pages";
import { ToastContainer } from "react-toastify";
import {
  AddJob,
  Profile,
  AllJobs,
  Stats,
  SharedLayout,
} from "./pages/dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SharedLayout></SharedLayout>
              </ProtectedRoute>
            }
          >
            <Route index element={<Stats></Stats>}></Route>
            <Route path="all-jobs" element={<AllJobs></AllJobs>}></Route>
            <Route path="add-job" element={<AddJob></AddJob>}></Route>
            <Route path="profile" element={<Profile></Profile>}></Route>
          </Route>
          <Route path="/landing" element={<Landing></Landing>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="*" element={<Error></Error>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
