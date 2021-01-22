import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Video from './Video';
import { Button, Form, FormControl } from 'react-bootstrap';
import './AddMovieForm.css';

const AddMovieForm = (props) => {
  const BASE_URL = 'http://localhost:3000'

  // Use promises to allow app to sleep between API calls
  const { promisify } = require('util')
  const sleep = promisify(setTimeout)


  const [movieName, setMovieName] = useState('');
  const [videoList, setVideoList] = useState([]);
  // const [runSearch, setRunSearch] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null);

  // useEffect((movieName) => {
  //   console.log(movieName);
  //   axios.get(BASE_URL + '/videos?query=' + movieName)
  //     .then((response) => {
  //       console.log(videoList);
  //       setVideoList(response.data);
  //     })
  //     .catch((error) => {
  //       setErrorMessage(error.message);
  //       console.log(error.message);
  //     });
  // }, [runSearch]);

  const search = (movieName) => {
    sleep(2000).then(axios.get(BASE_URL + '/videos?query=' + movieName)
    .then((response) => {
      console.log(videoList);
      setVideoList(response.data);
    })
    .catch((error) => {
      setErrorMessage(error.message);
      console.log(error.message);
    }));
  };

  const onMovieChange = (event) => {
    setMovieName(event.target.value);
  };

  const onSearch = (event) => {
    setErrorMessage(null);
    event.preventDefault();
    if (movieName != '') {
      search(movieName);  
    }
    setMovieName('');
  };

  const addToLibrary = (externalId) => {
    console.log(externalId);
    sleep(2000).then(axios.post(BASE_URL + '/videos/' + externalId + '/1')
    .then((response) => {
      // We return this to the video Component
      console.log(response);
      return response
    })
    .catch((error) => {
      console.log(error.message);
      return error.message
    }));
  };

  const videoListDisplay = () => {
    if (videoList === []) {
      setErrorMessage('test')
    }

    console.log(videoList);

  
    return videoList.map((video, i) => {
      return(
      <li key={i}>
        {/* <Video title={video.title} overview={video.overview} 
        release_date={video.released_date} image_url={video.image_url} 
        onAddLibraryCallback={addToLibrary} external_id={video.external_id}/> */}
        <Video video={video} onAddLibraryCallback={addToLibrary} 
        external_id={video.external_id}
        showButton={props.showButton}/>
      </li>
    )});
  }
    

  return (
    <div className="movie-search-page">
      <div className="movie-search-form">
        {/* <form onSubmit={onSearch}>
        { errorMessage ? <div><h2 className="error-msg">{errorMessage}</h2></div> : '' }
          <div>
            <label htmlFor="movieName">Movie Name:</label>
            <input name="movieName" onChange={onMovieChange} value={movieName}/>
          </div>
          <input
            type="submit"
            value="Search"
          />
        </form> */}
        <Form onSubmit={onSearch}>
        { errorMessage ? <div><h2 className="error-msg">{errorMessage}</h2></div> : '' }
          <div>
            {/* <label htmlFor="movieName">Movie Name:</label> */}
            <FormControl type='text' placeholder='Search Movie' onChange={onMovieChange} value={movieName}/>
            <Button type="submit" variant="outline-info">Search</Button>
          </div>
          
        </Form>
    </div>
    <div className="video-list">
      {videoListDisplay()}
    </div>
    </div>
  )
}

AddMovieForm.propTypes = {
  
};

export default AddMovieForm;
