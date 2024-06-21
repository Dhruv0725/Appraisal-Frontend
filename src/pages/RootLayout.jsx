import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import NavHeader from "../components3/NavHeader";

export default function RootLayout() {
  return (
    <>
      <NavHeader />

      <Outlet />
    </>
  );
}
