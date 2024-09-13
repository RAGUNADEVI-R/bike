import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, Modal,Dropdown, DropdownToggle, DropdownMenu, DropdownItem, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import axios from 'axios';
import {Link, useParams, useNavigate} from "react-router-dom"

const Services = () => {
  const [activeTab, setActiveTab] = useState('services');
  const [bookingDetails, setBookingDetails] = useState({});
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [service, setService] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [openViewModel, setopenViewModel] = useState(false);
  const [statusCheckModalOpen, setStatusCheckModalOpen] = useState(false);
  const [readModelOpen, setReadModelOpen] = useState(false);
  const [selectedId , SetSelectedID] = useState('');
  const [id,setId] = useState();
  const [name,setName] =useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  // change the tab 
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Sending datas to server.js
  useEffect(() => {
    axios.get('http://localhost:8000/serv')
      .then((res) => {
        setService(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  

  useEffect(() => {
    axios.get('http://localhost:8000/book')
      .then((res) => {
        setBookings(res.data); // Assuming res.data is an array of bookings
      })
      .catch((err) => console.log(err));
}, []);

const toggleModal = () => {
  setModalOpen(!modalOpen);
};

const ViewModal = (bookingId) => {
  const booking = bookings.find(booking => booking.id === bookingId);
    setSelectedBooking(booking);
  setopenViewModel(!openViewModel);
};

  const toggleStatusCheckModal = () => {
    setStatusCheckModalOpen(!statusCheckModalOpen);
  };

  const toggleReadModel = (id) => {
    SetSelectedID (id);
    setReadModelOpen(!readModelOpen);
  };

  const handleCloseModal = () => {
    setopenViewModel(false);
};

  //========= edit functions==========


  const handleEdit = (user) => {
    setId(user.id)
    setName(user.name);
    setPrice(user.price);
    setDescription(user.description);
    setReadModelOpen(true);
  };
  
  const handleEditUser = async () => {
    const dataToUpdate = { id:id, name, price, description }; // Assuming service.id is available
    try {
        const response = await axios.post(`http://localhost:8000/updateserv/${id}`, dataToUpdate);
        console.log('User edited successfully:', response.data);
        setReadModelOpen(false);
        reloadTable();
    } catch (error) {
        console.error('Error editing user:', error);
        // Handle error appropriately
    }
};


// ========================delete fucntion =========================
  
  const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8000/delUsers_serv/${id}`);
        const { status, message } = response.data;
        if (status === "success") {
            alert(message);
            reloadTable();
        } else {
            alert("User deleted ");
            reloadTable();
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        // Handle error appropriately
    }
};
 
// ========================create fucntion =========================

 
  // create values 
  const [values, setValues] = useState({
    name: '',
    price: '',
    description: '',
  });

  // model submit 
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/serv', values)
      .then((res) => {
        console.log(res);
        reloadTable();
      })
      .catch((err) => console.log(err));
    setModalOpen(false);
  };

  // reload table
  const reloadTable = () => {
    axios.get('http://localhost:8000/serv')
      .then((res) => {
        setService(res.data);
      })
      .catch((err) => console.log(err));
  };
  const [dropdownOpen, setDropdownOpen] = useState(Array(bookings.length).fill(false));
  const [selectedStatus, setSelectedStatus] = useState(Array(bookings.length).fill('Pending')); // Initially set to "Pending" for each row

// ========================dropdown fucntion =========================

  // Function to toggle the dropdown for a specific row
  const toggleDropdown = (index) => {
    const updatedDropdownOpen = [...dropdownOpen];
    updatedDropdownOpen[index] = !dropdownOpen[index];
    setDropdownOpen(updatedDropdownOpen);
  };
  

// Function to send email
const sendEmail = async (to, subject, text) => {
  try {
    // Make a POST request to your backend endpoint to send the email
    const response = await axios.post('http://localhost:8000/send-email', {
      to: to,
      subject: subject,
      text: text
    });
    console.log('Email sent successfully:', response.data);
    reloadTableBooking();
  } catch (error) {
    console.error('Error sending email:', error);
    reloadTableBooking();
    // Handle error appropriately
  }
};

// Function to handle status selection
const handleStatusSelect = (status, bookingId, bookingEmail, index) => {
  console.log("Selected status:", status, "Booking ID:", bookingId); // Log the selected status and booking ID
  setSelectedStatus([...selectedStatus.slice(0, index), status, ...selectedStatus.slice(index + 1)]);

  // Make an API call to update the status and send email on the server
  axios.post('http://localhost:8000/updatebookStatus', {
    id: bookingId,
    status: status,
    email: bookingEmail
  })
  .then(response => {
    // Handle success
    console.log("Status updated successfully:", response.data);
    if (status === 'Ready For Delivery') {
      // If the status is updated to "Ready For Delivery", send the email
      sendEmail(bookingEmail, 'Booking Status Updated', 'Your booking is now ready for delivery.');
    reloadTableBooking();

    }
    // You can update your UI or do any additional actions here
  })
  .catch(error => {
    // Handle error
    console.error("Error updating status:", error);
    reloadTableBooking();
  });
};

const reloadTableBooking = () => {
  axios.get('http://localhost:8000/book')
  .then(response => {
      // Assuming you have a function to update the table with the new data
      setBookings(response.data);
      console.log("Table reloaded successfully");
  })
  .catch(error => {
      console.error("Error reloading table:", error);
      // Handle error appropriately
  });
};

  
  

  
  const getStatusColor = (status, bookingStatus) => {
    switch (bookingStatus) {
      case 'Pending':
        return 'warning';
      case 'Ready For Delivery':
        return 'info';
      case 'Completed':
        return 'success';
      case 'Not Completed':
          return 'danger';
      default:
        return 'secondary';
    }
  };
  
  // Function to get text based on status
  const getStatusText = (selectedStatus, bookingStatus) => {
    switch (selectedStatus || bookingStatus) {
      case 'Pending':
        return 'Pending';
      case 'Ready For Delivery':
        return 'Ready For Delivery';
      case 'Completed':
        return 'Completed';
      default:
        return `${bookingStatus}`;
    }
  };
  


  const BookingsComponent = () => {
    const [bookings, setBookings] = useState([]);
  
    useEffect(() => {
      // Fetch bookings data from your backend
      axios.get('/books')
        .then(response => {
          setBookings(response.data); // Update bookings state with fetched data
        })
        .catch(error => {
          console.error('Error fetching bookings:', error);
        });
    }, []);
  }
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
      <Button color={activeTab === 'services' ? 'primary' : 'secondary'}  className="me-2" onClick={() => handleTabChange('services')}> Manage Services</Button>
        <Button color={activeTab === 'bookings' ? 'primary' : 'secondary'} onClick={() => handleTabChange('bookings')}> Bookings</Button>
      <br />
      <br />
      {activeTab === 'services' && (
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between align-items-center">
            <CardTitle style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Manage Services</CardTitle>
            <Button color="success" onClick={toggleModal}>Add Service</Button>
          </div>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Create | Edit | Delete Your Services
          </CardSubtitle>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>ID</th>
                <th>List Of Services</th>
                <th>Price</th>
                <th>Description </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {service.map((service, index) => (
                <tr className='border-top' key={index}>
                  <td>{service.id}</td>
                  <td>{service.name}</td>
                  <td>{service.price}</td>
                  <td>{service.description}</td>
                  <td>
                    <Button color="success" style={{ marginRight: '5px' }} onClick={() => handleEdit(service)}>Edit</Button>
                    <Button color="danger" onClick={() => deleteUser(service.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
)}

{activeTab === 'bookings' && (
        <Card>
          <CardBody>
            <CardTitle style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Customer Bookings</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              View and Update Status of the bookings
            </CardSubtitle>
            <Table className="no-wrap mt-3 align-middle" responsive borderless>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Number</th>
                  <th>Registration Number</th>
                  <th>Year</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr className='border-top' key={index}>
                    <td>{booking.id}</td>
                    <td>{booking.name}</td>
                    <td>{booking.phone}</td>
                    <td>{booking.regno}</td>
                    <td>{booking.year}</td>
                    <td>{booking.service}</td>
                    <td>
                    <Dropdown isOpen={dropdownOpen[index]} toggle={() => toggleDropdown(index)} disabled={booking.status === 'Completed'}>
  <DropdownToggle color={getStatusColor(selectedStatus[index], booking.status)} caret>
    {getStatusText(selectedStatus[index], booking.status)}
  </DropdownToggle>
  {!['Completed'].includes(booking.status) && ( // Conditionally render DropdownMenu if status is not 'Completed'
    <DropdownMenu>
      <DropdownItem onClick={() => handleStatusSelect('Pending', booking.id, booking.email, index)}>Pending</DropdownItem>
      <DropdownItem onClick={() => handleStatusSelect('Ready For Delivery', booking.id, booking.email, index)}>Ready For Delivery</DropdownItem>
      <DropdownItem onClick={() => handleStatusSelect('Completed', booking.id, booking.email, index)}>Completed</DropdownItem>
    </DropdownMenu>
  )}
</Dropdown>


    </td>
                    <td>
                      <Button color="success" style={{ marginRight: '5px' }} onClick={() => ViewModal(booking.id)}>View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <br />
          </CardBody>
        </Card>
      )}
      


{/* create new services model  */}

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add Service</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="ame">Service Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Price</Label>
              <Input
                type="text"
                name="price"
                id="price"
                onChange={(e) => setValues({ ...values, price: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                onChange={(e) => setValues({ ...values, description: e.target.value })}
                required
              />
            </FormGroup>
            <Button color="primary" type="submit">Submit</Button>{" "}
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
          </Form>
        </ModalBody>
      </Modal>

{/* view bookings model in admin  */}

      <Modal isOpen={openViewModel} toggle={handleCloseModal}>
        <ModalHeader toggle={handleCloseModal}>Booking Details</ModalHeader>
        <ModalBody>
          {selectedBooking && (
            <table style={{ marginLeft: '20px' }}>
            <tbody>
              <tr>
                <th className="text-start fw-bold" style={{ paddingRight: '20px' }}>Name</th>
                <td>{selectedBooking.name}</td>
              </tr>
              <tr>
                <th className="text-start fw-bold" style={{ paddingRight: '20px' }}>Phone Number</th>
                <td>{selectedBooking.phone}</td>
              </tr>
              <tr>
                <th className="text-start fw-bold" style={{ paddingRight: '20px' }}>Email</th>
                <td>{selectedBooking.email}</td>
              </tr>
              <tr>
                <th className="text-start fw-bold" style={{ paddingRight: '20px' }}>Bike Brand and Model</th>
                <td>{selectedBooking.model}</td>
              </tr>
              <tr>
                <th className="text-start fw-bold" style={{ paddingRight: '20px' }}>Registration Number</th>
                <td>{selectedBooking.regno}</td>
              </tr>
              <tr>
                <th className="text-start fw-bold" style={{ paddingRight: '20px' }}>Year</th>
                <td>{selectedBooking.year}</td>
              </tr>
              <tr>
                <th className="text-start fw-bold" style={{ paddingRight: '20px' }}>Service</th>
                <td>{selectedBooking.service}</td>
              </tr>
              <tr>
                <th className="text-start fw-bold" style={{ paddingRight: '20px' }}>Status</th>
                <td>{selectedBooking.status}</td>
              </tr>
              <tr>
                <th className="text-start fw-bold" style={{ paddingRight: '20px' }}>Date Of Submit</th>
                <td>{selectedBooking.pickup_date}</td>
              </tr>
              <tr>
                <th className="text-start fw-bold" style={{ paddingRight: '20px' }}>Required Pickup</th>
                <td>{selectedBooking.pickup}</td>
              </tr>
              <tr>
                <th className="text-start fw-bold" style={{ paddingRight: '20px' }}>Expected Date of Delivery</th>
                <td>{selectedBooking.drop_date}</td>
              </tr>
              <tr>
                <th className="text-start fw-bold" style={{ paddingRight: '20px' }}>Required Drop</th>
                <td>{selectedBooking.drop}</td>
              </tr>
              <tr>
                <th className="text-start fw-bold" style={{ paddingRight: '20px' }}>Note</th>
                <td>{selectedBooking.note}</td>
              </tr>
            </tbody>
          </table>
          
          )}
        </ModalBody>
        <ModalFooter>
          <Button color='secondary' onClick={handleCloseModal}>Close</Button>
        </ModalFooter>
      </Modal>

{/* edit model in admin  */}

      <Modal isOpen={readModelOpen} toggle={() => toggleReadModel(selectedId)}>
        <ModalHeader toggle={() => toggleReadModel(selectedId)}>Service Provided</ModalHeader>
        <ModalBody>
          {/* {data.map((service,)=>{             */}
        <Form>
            <FormGroup>
              <Label for="name">Service Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Price</Label>
              <Input
                type="text"
                name="price"
                id="price"
                value={price}
                onChange={(e) => setPrice( e.target.value )}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value )}
              />
            </FormGroup>
          </Form>          
        {/* })} */}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" typeof='submit' onClick={handleEditUser}>Save</Button>
        </ModalFooter>
      </Modal>
    </div>
    </Container>
        </div>
      </div>
    </main>
  );
};

export default Services;
