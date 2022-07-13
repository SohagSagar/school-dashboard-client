import React from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { AiOutlineDashboard, AiOutlineTrophy } from "react-icons/ai";
import { BsBook, BsPencilSquare } from "react-icons/bs";
import { GrGroup, GrAnnounce } from "react-icons/gr";
import { RiLiveLine } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import { NavLink, Outlet,Link } from "react-router-dom";
import '../Styles/SidebarMenu.css'

const routes = [
    {
        path: "/",
        name: "Dashboard",
        icon: <AiOutlineDashboard />,
    },
    {
        path: "/courses",
        name: "Courses",
        icon: <BsBook />,
    },
    {
        path: "students",
        name: "Students",
        icon: <GrGroup />,
    },
    {
        path: "exams",
        name: "Exams",
        icon: <BsPencilSquare />,
    },
    {
        path: "/results",
        name: "Results",
        icon: <AiOutlineTrophy />,

    },
    {
        path: "/notice-board",
        name: "Notice Board",
        icon: <GrAnnounce />,
    },
    {
        path: "/live-classes",
        name: "Live Classes",
        icon: <RiLiveLine />,
        exact: true,

    },
    {
        path: "/notifications",
        name: "Notifications",
        icon: <IoIosNotificationsOutline />,
    },
];

const SidebarMenu = () => {
    return (
        <div>
            <div class="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex flex-col items-start justify-start ">
                    
                    <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                    <Outlet />

                </div>

                <div class="drawer-side shadow-xl">
                    <label for="my-drawer-2" class="drawer-overlay"></label>

                    <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                        <div className='flex items-center justify-between'>
                            <h1 className='text-xl font-semibold ml-4 py-4'>School Space</h1>
                            <label for="my-drawer-2"><RiCloseLine for="my-drawer-2" className='text-2xl cursor-pointer lg:hidden' /></label>
                        </div>
                        <div class="divider"></div>

                        <section className="routes ">
                            {routes.map((route, index) => {
                                return (
                                    <NavLink
                                        to={route.path}
                                        key={index}
                                        className="link"
                                        activeClassName="active"
                                    >
                                        <div className="icon">{route.icon}</div>
                                        {route.name}
                                        
                                    </NavLink>
                                );
                            })}
                            
                        </section>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default SidebarMenu;