import React, { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";
import TopCards from "../components/dashboard/TopCards";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";

const Starter = () => {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchBookings();
    fetchServices();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/book');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch('/serv');
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

  const getTotalServiceCount = () => {
    return services.length;
  };


  return (
    <main>
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar />
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
                <Col sm="6" lg="4">
                  <TopCards
                    bg="bg-light-warning text-warning"
                    title="Not yet started"
                    subtitle="Services Not Started"
                    earning={getBookingCountByStatus("Not Completed")}
                    icon="bi bi-basket3"
                  />
                </Col>
                <Col sm="6" lg="4">
                  <TopCards
                    bg="bg-light-warning text-warning"
                    title="Number of Bookings"
                    subtitle="Total Bookings"
                    earning={getTotalBookingCount()}
                    icon="bi bi-basket3"
                  />
                </Col>
                <Col sm="6" lg="4">
                  <TopCards
                    bg="bg-light-warning text-warning"
                    title="Number of Services Provided"
                    subtitle="Services Provided"
                    earning={getTotalServiceCount()}
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

export default Starter;
