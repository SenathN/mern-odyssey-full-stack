import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import Footer from "./Footer";

const DashLayout = () => {
    return (
        <div id="container-fluid">
            <DashHeader />
            <div className="container-fluid">
                <Outlet />
            </div>
        </div>
    )
}

export default DashLayout;