import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, Modal,Dropdown, DropdownToggle, DropdownMenu, DropdownItem, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import axios from 'axios';
import { Link, useParams, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Container } from "reactstrap";
import Side from './side';

const ConsumerServices = () => {

    const [selectedBooking, setSelectedBooking] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [openViewModel, setopenViewModel] = useState(false);
    const [readModelOpen, setReadModelOpen] = useState(false);
    const [selectedId , SetSelectedID] = useState('');
    const [id,setId] = useState();
    const [name,setName] =useState('');
    const [email,setEmail] =useState('');
    const [phone,setPhone] =useState('');
    const [model,setModel] =useState('');
    const [regno,setRegno] =useState('');
    const [year,setYear] =useState('');
    const [cservice,setCservice] =useState('');
    const [pickup_date,setPickup_date] =useState('');
    const [pickup,setpickup] =useState('');
    const [drop_date,setDrop_date] =useState('');
    const [drop,setDrop] =useState('');
    const [note,setNote] =useState('');

    
  
    useEffect(() => {
      axios.get('http://localhost:8000/bookings')
        .then((res) => {
          setBookings(res.data); // Assuming res.data is an array of bookings
        })
        .catch((err) => console.log(err));
  }, []);
  
  
  const ViewModal = (bookingId) => {
    const booking = bookings.find(booking => booking.id === bookingId);
      setSelectedBooking(booking);
    setopenViewModel(!openViewModel);
  };
  
//   const toggleReadModel = (id) => {
//     // Call handleEdit to set the data for editing
//     handleEdit(bookings.find(booking => booking.id === id));
//     // Set selected ID
//     SetSelectedID(id);
//     // Open the edit modal
//     setReadModelOpen(true);
// };

  
    const handleCloseModal = () => {
        setopenViewModel(false);
    };
    
    //========= edit functions==========
  
  
  //   const handleEdit = (user) => {
  //     setId(user.id)
  //     setName(user.name);
  //     setEmail(user.email);
  //     setPhone(user.phone);
  //     setModel(user.model);
  //     setRegno(user.regno);
  //     setYear(user.year);
  //     setCservice(user.cservice);
  //     setPickup_date(user.pickup_date);
  //     setpickup(user.pickup);
  //     setDrop_date(user.drop_date);
  //     setDrop(user.drop);
  //     setNote(user.note);
  //   };
    
  //   const handleEditUser = async () => {
  //     const dataToUpdate = { id:id,name,phone,email, model, regno, year, cservice, pickup_date, pickup, drop_date, drop, note  }; // Assuming service.id is available
  //     try {
  //         const response = await axios.post(`http://localhost:8000/update_booking/${id}`, dataToUpdate);
  //         console.log('booking Saved successfully:', response.data);
  //         setReadModelOpen(false);
  //         reloadTable();
  //     } catch (error) {
  //         console.error('Error editing user:', error);
  //         // Handle error appropriately
  //     }
  // };
  
  
  // ========================delete fucntion =========================
    
  const delserv = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8000/delserv/${id}`);
        const { status, message } = response.data;
        if (status === 'success') {
            alert(message);
            reloadTable();
        } else {
            alert('Failed to delete booking');
        }
    } catch (error) {
        console.error('Error deleting booking:', error);
        // Handle error appropriately, e.g., show error message to user
    }
};

   
  // ========================dropdown fucntion =========================
   
  
  const [selectedStatus, setSelectedStatus] = useState(Array(bookings.length).fill('Pending')); // Initially set to "Pending" for each row
    const getStatusColor = (status, bookingStatus) => {
        switch (bookingStatus) {
          case 'Pending':
            return 'warning'; 
          case 'Ready For Delivery':
            return 'info'; 
          case 'Completed':
            return 'success'; 
          case 'Not Started':
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

    // ==========================================================
    const [modalOpen, setModalOpen] = useState(false);
    const [service, setService] = useState([]);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const [values, setValues] = useState({
        model: '',
        regno: '',
        year: '',
        service: '',
        pickup_date: '',
        pickup: '',
        drop_date: '',
        drop: '',
        note: '',
      });
    
      // model submit 
      const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/insert', values)
          .then((res) => {
            console.log(res);
            reloadTable();
          })
          .catch((err) => console.log(err));
        setModalOpen(false);
      };
    
      // reload table
      const reloadTable = () => {
        axios.get('http://localhost:8000/bookings') // Assuming your endpoint for fetching booking data is '/bookings'
          .then((res) => {
            // Assuming you have a state variable named 'setBookings' to update the bookings data
            setBookings(res.data);
          })
          .catch((err) => console.log(err));
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
        <>
            <Card>
                <CardBody>
                    <div className="d-flex justify-content-between align-items-center">
                        <CardTitle style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Manage Bookings</CardTitle>
                        <Button color="success" onClick={toggleModal}>Add Booking</Button>
                    </div>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Create new Booking | view Status of Each Booking
                    </CardSubtitle>
                    <Table className="no-wrap mt-3 align-middle" responsive borderless>
                    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Model</th>
        <th>Registeration Number</th>
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
          <td>{booking.model}</td>
          <td>{booking.regno}</td>
          <td>{booking.year}</td>
          <td>{booking.service}</td>
          <td>
  <Button 
    color={getStatusColor(selectedStatus[index], booking.status)}>
    {getStatusText(selectedStatus[index], booking.status)} 
  </Button>
</td>

          <td>
                      <Button color="info" style={{ marginRight: '5px' }} onClick={() => ViewModal(booking.id)}>View</Button>
            <Button color="danger"  onClick={() => delserv(booking.id)}>Delete</Button>
          </td>
        </tr>
      ))}
    </tbody>
                    </Table>
                </CardBody>
            </Card>
{/* create model  */}

            <Modal isOpen={modalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Add Service</ModalHeader>
                <ModalBody>
                    <Form  onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="name">Bike Brand and Model * </Label>
                            <Input
                                type="text"
                                name="model"
                                id="model"
                                onChange={(e) => setValues({ ...values, model: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Bike Registeration Number *</Label>
                            <Input
                                type="text"
                                name="regno"
                                id="regno"
                                onChange={(e) => setValues({ ...values, regno: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Year *</Label>
                            <Input
                                type="text"
                                name="year"
                                id="year"
                                onChange={(e) => setValues({ ...values, year: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Service *</Label>
                            <Input
                                type="text"
                                name="service"
                                id="service"
                                onChange={(e) => setValues({ ...values, service: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Date of Pickup *</Label>
                            <Input
                                type="date"
                                name="pickup_date"
                                id="pickup_date"
                                onChange={(e) => setValues({ ...values, pickup_date: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup check>
                        <div className="form-check form-switch">
                            <input className="form-check-input" name='pickup' type="checkbox" id="flexSwitchCheckDefault"
                            onClick={(e)=> setValues({...values,pickup:e.target.value})} />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Require Pickup</label>
                        </div>
                        </FormGroup>
                        <br />
                        <FormGroup>
                            <Label for="price">Expected Delivery *</Label>
                            <Input
                                type="date"
                                name="drop_date"
                                id="drop_date"
                                onChange={(e) => setValues({ ...values, drop_date: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup check>
                        <div className="form-check form-switch">
                            <input className="form-check-input"  name='drop' type="checkbox" id="flexSwitchCheckDefault"
                            onChange={(e) => setValues({ ...values, drop: e.target.value })}
                            />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Require Drop </label>
                        </div>
                        </FormGroup>
                        <br />
                        <FormGroup>
                            <Label for="description">Note *</Label>
                            <Input
                                type="textarea"
                                name="note"
                                id="note"
                                onChange={(e) => setValues({ ...values, note: e.target.value })}
                            />
                        </FormGroup>
                        <Button color="primary" onClick={handleSubmit} type="submit">Submit</Button>{" "}
                        <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                    </Form>
                </ModalBody>
            </Modal>

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

        </>
        </Container>
        </div>
      </div>
    </main>
    );
};

export default ConsumerServices;
