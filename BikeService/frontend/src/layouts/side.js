// Import React, useEffect, useState, Link, useLocation
import React, { useEffect, useState } from 'react';
import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";

// Second navigation array
const navigation2 = [
  {
    title: "Dashboard",
    href: "/dash",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Services",
    href: "/services",    
    icon: "bi bi-speedometer2",
  }
];

// Define Side component
const Side = () => {

  // Function to toggle mobile menu
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  // Render component
  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <span className="ms-auto d-lg-none">
          <Button
            close
            size="sm"
            className="ms-auto d-lg-none"
            onClick={() => showMobilemenu()}
          ></Button>
        </span>
      </div>
      <div className="pt-4 mt-2">
        {/* First navigation */}
        <Nav vertical className="sidebarNav mt-4">
          {navigation2.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? 'text-primary nav-link py-3'
                    : 'nav-link text-secondary py-3'
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

// Export Side component
export default Side;
