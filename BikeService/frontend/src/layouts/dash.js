import { Col, Row } from "reactstrap";
import TopCards from "../components/dashboard/TopCards";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Container } from "reactstrap";
import Side from "./side";
import React, { useState, useEffect} from "react";
import { useLocation } from 'react-router-dom';


const Dash = () => {
  // const Email = useLocation();
  // const searchParams = new URLSearchParams(Email.search);
  // const email = searchParams.get('email');
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchBookings();
    fetchServices();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/insert_reload');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch('/service');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const getBookingCountByStatus = (status) => {
    return bookings.filter(booking => booking.status === status).length;
  };

  const getTotalBookingCount = () => {
    return bookings.length;
  };
  return (
    <main>
    <div className="pageWrapper d-lg-flex">
      {/********Sidebar**********/}
      <aside className="sidebarArea shadow" id="sidebarArea">
      <Side />
      </aside>
      {/********Content Area**********/}

      <div className="contentArea">
        {/********header**********/}
        <Header />
        {/********Middle Content**********/}
        <Container className="p-4 wrapper" fluid>
          <Outlet />
    <div>
      {/***Top Cards***/}
      <Row>
                <Col sm="6" lg="4">
                  <TopCards
                    bg="bg-light-success text-success"
                    title="Completed"
                    subtitle="Services Completed"
                    earning={getBookingCountByStatus("Completed")}
                    icon="bi bi-check-circle"
                  />
                </Col>
                <Col sm="6" lg="4">
                  <TopCards
                    bg="bg-light-danger text-danger"
                    title="Ready For Delivery"
                    subtitle="Services Ready For Delivery"
                    earning={getBookingCountByStatus("Ready For Delivery")}
                    icon="bi bi-truck"
                  />
                </Col>
                <Col sm="6" lg="4">
                  <TopCards
                    bg="bg-light-warning text-warning"
                    title="Pending"
                    subtitle="Services Pending"
                    earning={getBookingCountByStatus("Pending")}
                    icon="bi bi-basket3"
                  />
                </Col>
                <Col sm="6" lg="6">
                  <TopCards
                    bg="bg-light-warning text-warning"
                    title="Not yet started"
                    subtitle="Services Not Started"
                    earning={getBookingCountByStatus("Not Completed")}
                    icon="bi bi-basket3"
                  />
                </Col>
                <Col sm="6" lg="6">
                  <TopCards
                    bg="bg-light-warning text-warning"
                    title="Number of Bookings"
                    subtitle="Total Bookings"
                    earning={getTotalBookingCount()}
                    icon="bi bi-basket3"
                  />
                </Col>
              </Row>
    </div>
    </Container>
        </div>
      </div>
    </main>
  );
};

export default Dash;
