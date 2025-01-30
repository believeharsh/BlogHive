import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Spinner from "./Spinner";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">

            <>
                <Navbar />
                <main className="flex-grow">
                    <Outlet />
                </main>
                <Footer />
            </>
        </div>
    );
};

export default Layout;
