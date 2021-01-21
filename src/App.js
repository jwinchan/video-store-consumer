import React, {useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import AddMovieForm from './components/AddMovieForm';
import VideoCollection from './components/VideoCollection';
import CustomerCollection from './components/CustomerCollection';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const API_URL_BASE = 'http://localhost:3000/';

const App = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState({
    id: null,
    name: 'none',
  });
  const [errorMessage, setErrorMessage] = useState(null);


  const selectVideo = (title) => {
    setErrorMessage('');
    setSelectedVideo(title);
  };

  const selectCustomer = (id, name) => {
    setErrorMessage('');
    setSelectedCustomer({
      id: id,
      name: name,
    })
  };

  const checkOut = () => {
    const today = new Date();
    today.setDate(today.getDate() + 7);

    if (selectedCustomer === null || selectedVideo === null) {
      setErrorMessage('Need to select a customer and video')
      return null
    }

    axios.post(API_URL_BASE + 'rentals/' + selectedVideo + '/check-out?customer_id=' + selectedCustomer.id + '&due_date=' + today.toString())
    .then((response) => {
      console.log(response);
      setErrorMessage(`Checked out ${selectedVideo} successfully to ${selectedCustomer.name}!`);
      setSelectedVideo(null);
      setSelectedCustomer({
        id: null,
        name: 'none',
      });
    })
    .catch((error) => {
      console.log(error);
      setErrorMessage(error.message);
    });
  };

  // setErrorMessage('')

    return (

      <Router>
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Hollywood Video</h1>
        </header> */}
        <Navbar fixed='top' bg="dark" variant="dark">
          <Nav className="mr-auto">
            <Link to='/'>Home</Link>
            <Link to='/videos'>Videos</Link>
            <Link to='/customers'>Customers</Link>
            <Link to='/add'>Add Movie</Link>
          </Nav>
          <span>Currently Selected Video: {selectedVideo}</span>
          <span>Currently Selected Customer: {selectedCustomer.name}</span>
          <Button variant="outline-info" onClick={checkOut}>Check Out</Button>
          {/* <Form inline>
            <FormControl type="text" placeholder="Search Movies" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form> */}
        </Navbar>
      

        { errorMessage ? <div><h2 className="error-msg">{errorMessage}</h2></div> : '' }


        {/* <AddMovieForm /> */}
        
        <Switch>
          <Route path="/videos">
            <VideoCollection onSelectVideo={selectVideo} showButton='select'/>
          </Route>
          <Route path="/customers">
            <CustomerCollection onSelectCustomer={selectCustomer}/>
          </Route>
          <Route path="/add">
            <AddMovieForm showButton='add'/> 
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    );  
}

function Home() {
  return (
    <img src={logo} className="App-logo" alt="logo" />
  );
}

export default App;
