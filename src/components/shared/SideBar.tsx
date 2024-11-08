import React from "react";
import { useContext } from "react";
import { useDashboardContext } from "./DashboardProvider";

export default function SideBar() {
    const { activeMenu }  = useDashboardContext();
    const sideItems = [
        { id: 1, title: "Wallet", status: '' },
        { id: 2, title: "About", status: '' },
        { id: 3, title: "Contact", status: '' },
    ]
    return (
        <div className="sidebar">
            <ul >
                {sideItems.map((item) => (
                    <li key={`${item.id}side-bar-menu`} className={activeMenu.toLowerCase() == item.title.toLowerCase() ? 'active' : ''}>{item.title} 
                    {activeMenu.toLowerCase() == item.title.toLowerCase()} </li>
                ))}
            </ul>
        </div>
    );
    
}