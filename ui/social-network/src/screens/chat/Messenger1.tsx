import { useState } from "react";
import ChatArea from "./ChatArea";
import ChatList1 from "./ChatList1";
import "./Chat.css"; // You can still use custom styles if needed
import { Link, Outlet } from "react-router";

export default function Messenger1() {
    return (
        <div className="mt-2">
            <div className="row">
                <div className="col-md-4 sticky-sidebar hide-bar">
                    <div className="d-flex flex-column">
                        <ChatList1 />
                    </div>
                </div>
                <div className="col-md-8">
                    <Outlet />
                </div>
            </div>
        </div>
        // <div className="d-flex vh-100 bg-light">
        // <ChatArea selectedChat={selectedChat} />
        // </div>
    );
}
