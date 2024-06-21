import EmployeeSideBar from "../components3/EmployeeSideBar";
import Sidebar from "../components3/SideBar";
import { Outlet, useNavigate } from "react-router-dom";
export default function AdminPage() {
  return (
    <>
      <EmployeeSideBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
