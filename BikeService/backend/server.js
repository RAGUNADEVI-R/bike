// import { useHistory } from "react-router-dom";
const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser'); 
const nodemailer = require('nodemailer');
const axios=require('axios')
// Import bodyParser



const app = express()

app.use(express.static(path.join(__dirname,"public")))
app.use(cors())
app.use(express.json())

const port = 8000

const db = mysql.createConnection({
    host: '127.0.0.1',
    port: "3306",
    user: 'root',
    password: '',
    database: 'bikeservice',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

// insert the values into services table
app.post('/service',(req,res)=>{
    sql="INSERT INTO services (`name`,`price`,`description`)VALUES(?,?,?)"
    const values = [
        req.body.name,
        req.body.price,
        req.body.description
    ]
    db.query(sql,values, (err,result)=>{
        if(err) {
            return res.json({message: "Something unexpected has occured" + err})
        }
        return res.json({success:"Add Successfully"})
    })
})








// insert login table 
app.post('/login',(req,res)=>{
    sql="INSERT INTO login (`name`,`phone`,`email`,`pass`)VALUES(?)";
    const values = [
        req.body.name,
        req.body.phone,
        req.body.email,
        req.body.pass
    ]
    // console.log(sql);
    // console.log(values)
    db.query(sql,[values], (err,data)=>{
        if(err) {
            return res.json({message: "Something unexpected has occured" + err})
        }
        return res.json({success:"Add Successfully"})
    })
})
let mail,name,phone
// check the tabel and login 
app.post('/signin', (req, res) => {
    const { email, pass } = req.body;
    mail=email 
    // Query the database to find the user with the provided email and password
    const sql = "SELECT * FROM login WHERE email = ? AND pass = ?";
    db.query(sql, [email, pass], (err, data) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: "Internal server error" });
        }

        if (data.length > 0) {
            const user = data[0]; // Assuming there's only one user with the given credentials

            // For simplicity, let's assume a simple session token for now
            const sessionToken = email; // You can use a more secure token generation mechanism
            console.log(sessionToken);
           
            // Send the session token along with the user data
            return res.json({ message: "Login Successful"});
        } else {
            return res.status(401).json({ error: "Invalid credentials" });
        }
    });
});


app.get('/serv', (req, res) => {
    db.query('SELECT * FROM services', (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving services from database');
        } else {
            res.status(200).json(results);
        }
    });
});

// Add a new service
app.post('/serv', (req, res) => {
    const { name, price, description } = req.body;
    db.query('INSERT INTO services (name, price, description) VALUES (?, ?, ?)', [name, price, description], (err, result) => {
        if (err) {
            res.status(500).send('Error adding service to database');
        } else {
            res.status(201).send('Service added successfully');
        }
    });
});


app.delete('/delUsers_serv/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM services WHERE id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).send('Error deleting service');
        } else {
            res.status(200).send('Service deleted successfully');
        }
    });
});


app.post('/updateserv/:id', (req, res) => {
    const serviceId = req.params.id;
    const { name, price, description } = req.body;
    
    // Update service in the database
    db.query('UPDATE services SET name = ?, price = ?, description = ? WHERE id = ?', [name, price, description, serviceId], (err, result) => {
        if (err) {
            res.status(500).send('Error updating service');
        } else {
            res.status(200).send('Service updated successfully');
        }
    });
});


app.get('/book', (req, res) => {
    db.query('SELECT * FROM bookings', (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving bookings from database');
        } else {
            res.status(200).json(results);
        }
    });
});





// inserting bookings table 

app.post('/insert',(req,res)=>{
    const { model, regno, year, service, pickup_date, pickup, drop_date, drop, note } = req.body;
    const values = [
        name, // Assuming name is defined globally
        mail, // Assuming mail is defined globally
        phone, // Assuming phone is defined globally
        model,
        regno,
        year,
        service,
        pickup_date,
        pickup,
        drop_date,
        drop,
        note,
    ];
    const sql = "INSERT INTO bookings (`name`,`email`,`phone`,`model`,`regno`,`year`,`service`,`pickup_date`,`pickup`,`drop_date`,`drop`,`note`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
    
    db.query(sql,values, (err,result)=>{
        if(err) {
            return res.json({message: "Something unexpected has occured" + err})
        }
        return res.json({success:"Add Successfully"})
    })
})


//fetch data from booking table
app.get('/insert_reload', (req,res)=>{
    const sql = "SELECT * FROM bookings WHERE email= ?";
    db.query(sql,[mail], (err,result)=>{
        if(err){
            res.json({message:"Server error"})
        }
        return res.json(result);
    })
})


//fetch data from service table
app.get('/service', (req,res)=>{
    const sql = "SELECT * FROM services";
    db.query(sql, (err,result)=>{
        if(err){
            res.json({message:"Server error"});
        }
        return res.json(result);
    })
})


//fetch data from bookings table
app.get('/bookings', (req, res) => {
    const sql = "SELECT * FROM bookings WHERE email= ?";
    db.query(sql,[mail],(err, result) => {
        if (err) {
            console.error("Error fetching bookings:", err)
            res.status(500).json({ message: "Server error" })
        } else {
            res.json(result); // Send the result as JSON response
        }
    });
});



// fetch query from the login table 
app.get("/profile", (req, res) => {
    // let userdetails
    // const {email} =req.query
    // console.log("request")
    // console.log(req.query)
    const sql = "SELECT * FROM login WHERE email= ?" ;
    db.query(sql,[mail],(err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Server error" });
        } else {
            // console.log(result)
           const userdetails=result[0] // Send the result as JSON response
            name=userdetails.name
            phone=userdetails.phone
            res.json(userdetails);

        }
    });
    console.log("hai")
    // console.log(userdetails)
});

// selecting for edit services 
app.post('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  const sql = "UPDATE services SET `name`=?, `price`=?, `description`=? WHERE id=?";
  const values = [ name, price, description,id];
  console.log(id); 
  console.log("Values:", values); 

  db.query(sql, values, (error, results) => {
      if (error) {
          console.error('Error updating user:', error);
          res.json({ status: 'failure', message: 'Failed to update user', error: error.message }); // Include error message in response
      } else {
          if (results.affectedRows === 1) {
              res.json({ status: 'success', message: 'User edited successfully' });
          } else {
              res.json({ status: 'failure', message: 'User not found or no changes made' });
          }
      }
  });
});

// delete user in the service table 

app.delete('/delUsers/:id', (req, res) => {
    const { id } = req.params;
  
    db.query(
      'DELETE FROM services WHERE id = ?',
      [id],
      (err, results) => {
        if (err) {
          console.error('Error deleting :', err);
          res.status(500).json({ error: 'Error in deleting ' });
          return;
        }
        res.json({ message: 'Service deleted successfully' });
      }
    );
  });


// delete the bookings table

  app.delete('/delserv/:id', (req, res) => {
    const { id } = req.params;
  
    db.query(
        'DELETE FROM bookings WHERE id = ?',
        [id],
        (err, results) => {
            if (err) {
                console.error('Error deleting:', err);
                res.status(500).json({ error: 'Error deleting booking' });
                return;
            }
            res.json({ status: 'success', message: 'Booking deleted successfully' });
        }
    );
});

app.post('/updatebookStatus', (req, res) => {
    const { id, status, email } = req.body;

    const sql = 'UPDATE bookings SET status = ? WHERE id = ?';
    db.query(sql, [status, id], async (err, result) => {
        if (err) {
            console.error('Error updating booking status:', err);
            return res.status(500).json({ error: 'Error updating booking status' });
        }

        // Send email if the status is 'Ready For Delivery'
        // if (status === 'Ready For Delivery') {
        //     try {
        //         // Assuming you have a sendEmail function defined somewhere
        //         await sendEmail(email, 'Booking Status Updated', 'Your booking is now ready for delivery.');
        //     } catch (error) {
        //         console.error('Error sending email:', error);
        //         return res.status(500).json({ error: 'Error sending email' });
        //     }
        // }
        // console.log('Booking status updated successfully');
        return res.status(200).json({ message: 'Booking status updated successfully' });
    });
});

  app.get('/users', (req, res) => {
  const query = 'SELECT name, phone, email FROM bookings LIMIT 1'; // Adjust the query according to your schema
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching user data:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'No user found' });
      return;
    }
    const user = results[0];
    res.json({
      name: user.name,
      phone: user.phone,
      email: user.email
    });
  });
});



  app.use(bodyParser.json());

// Endpoint to handle status update
app.post('/updateStatus', (req, res) => {
    // Extract id and status from request body
    const { id, status, email } = req.body;
  
    // Update the status in the booking table
    const sql = 'UPDATE bookings SET status = ? WHERE id = ?';
    db.query(sql, [status, id], (err, result) => {
      if (err) {
        console.error('Error updating status:', err);
        res.status(500).json({ error: 'Error updating status' });
        return;
      }
      // sendStatusEmail(email, status);

      console.log('Status updated successfully');
      res.status(200).json({ message: 'Status updated successfully' });
    });
  });

  app.get('/users', async (req, res) => {
    const { email } = req.query;
  
    try {
      // Execute the query
      const [rows] = await connection.execute('SELECT * FROM login WHERE email = ?', [email])
  
      if (rows.length > 0) {
        res.status(200).json(rows[0]); // Send the user data if found
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  app.post('/send-email', (req, res) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'udan.services3@gmail.com',
            pass: 'jzzmbextwbvmscxc'
        }
    });

    const mailOptions = {
        from: 'udan.services3@gmail.com',
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error occurred:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Email sent successfully' });
    });
});

app.listen(port,()=>{
    console.log('listening to 8000')
})