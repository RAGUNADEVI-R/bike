import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Collapse, Nav, Navbar, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { useNavigate, useLocation } from 'react-router-dom';

import user1 from "../assets/images/users/user1.jpg";

const Header = ({ email }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const toggle = () => setDropdownOpen(prevState => !prevState);
  const Handletoggle = () => setIsOpen(!isOpen);

  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Pass the email to the backend to fetch user data
        const response = await axios.get(`http://localhost:8000/users?email=${email}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [email]); // Fetch data whenever email changes

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.has("email")) {
      setLoggedIn(true);
    }
  }, [location.search]);

  const handleLogout = () => {
    setLoggedIn(false);
    navigate('/');
  };
  const [UserDetails,SetUserDetails]=useState([])
  useEffect(()=>{
    fetch("http://localhost:8000/profile")
    .then((res)=>res.json())
    .then((json)=>{
      // const detail=json.map(obj=>obj)
      SetUserDetails(json)
    })
  },[])
  // console.log("output")
  // console.log(UserDetails.name)
  return (
    <Navbar color="dark" dark expand="md">
      <div className="d-flex align-items-center">
        <Button color="dark" className="d-lg-none" onClick={() => showMobilemenu()}>
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button color="dark" size="sm" className="d-sm-block d-md-none" onClick={Handletoggle}>
          {isOpen ? <i className="bi bi-x"></i> : <i className="bi bi-three-dots-vertical"></i>}
        </Button>
      </div>
      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar></Nav>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle color="dark">
            <img src={user1} alt="profile" className="rounded-circle" width="30" />
            </DropdownToggle>
            <DropdownMenu>
                {/* {userData && ( */}
                  <>
                    <DropdownItem>{UserDetails.name}</DropdownItem> {/* Assuming user data has a 'name' field */}
                    <DropdownItem>{UserDetails.phone}</DropdownItem> {/* Assuming user data has a 'name' field */}
                    <DropdownItem>{UserDetails.email}</DropdownItem>
                  </>
                {/* )} */}
                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
