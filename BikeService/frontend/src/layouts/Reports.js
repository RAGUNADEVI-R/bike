import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";

const Report = () => {
  const [data, setData] = useState([]);
  const [record, setRecords] = useState([]);
  const [rSelected, setRSelected] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/book')
      .then((res) => {
        setData(res.data);
        setRecords(res.data); // Initialize records with all data
      })
      .catch((err) => console.log(err));
  }, []);

  const filterRecords = (status) => {
    if (!status) {
      setRecords(data); // Reset to all records
    } else {
      const filteredRecords = data.filter(f => f.status.toUpperCase() === status.toUpperCase());
      setRecords(filteredRecords);
    }
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
              <br />

              {/* Radio buttons */}
              <div style={{ display: "flex", marginLeft: "20px" }}>
  <label style={{ marginRight: "200px" }}>
    <input
      type="radio"
      name="option"
      value="Not Completed"
      checked={rSelected === "Not Completed"}
      onChange={() => {
        setRSelected("Not Completed");
        filterRecords("Not Completed");
      }}
    />
    Not Started
  </label>
  <label style={{ marginRight: "200px" }}>
    <input
      type="radio"
      name="option"
      value="Pending"
      checked={rSelected === "Pending"}
      onChange={() => {
        setRSelected("Pending");
        filterRecords("Pending");
      }}
    />
    Pending
  </label>
  <label style={{ marginRight: "200px" }}>
    <input
      type="radio"
      name="option"
      value="Ready for Delivery"
      checked={rSelected === "Ready for Delivery"}
      onChange={() => {
        setRSelected("Ready for Delivery");
        filterRecords("Ready for Delivery");
      }}
    />
    Ready for Delivery
  </label>
  <label>
    <input
      type="radio"
      name="option"
      value="Completed"
      checked={rSelected === "Completed"}
      onChange={() => {
        setRSelected("Completed");
        filterRecords("Completed");
      }}
    />
    Completed
  </label>
</div>

              <br />
              
              {/* Selected table */}
              {record.length > 0 && (
                <Card>
                  <CardBody>
                    {/* <CardTitle tag="h5">Service Pending</CardTitle> */}
                    <Table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Contact</th>
                          <th>Service</th>
                          <th>Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {record.map((row) => (
                          <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.phone}</td>
                            <td>{row.service}</td>
                            <td>{row.pickup_date}</td>
                            <td>{row.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              )}
            </div>
          </Container>
        </div>
      </div>
    </main>
  );
};

export default Report;
