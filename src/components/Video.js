import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import './Video.css'

const Video = (props) => {
  const [status, setStatus] = useState('');


  // const onInventoryChange = (event) => {
  //   setInventory(event.target.value);
  // };

  const onAddVideo = (event) => {
    setStatus(null);
    event.preventDefault();
    props.onAddLibraryCallback(props.external_id); 
    setStatus('Added video');
  };

  const button = () => {
    if (props.showButton === 'add') {
      return (<Button variant="outline-info" onClick={onAddVideo}>Add to Library</Button>);
    } else {
      return(<Button variant="outline-info" onClick={()=>props.onSelectVideo(props.video.title)}>Select this Video</Button>);
    }
  }

  return (
      <ul className="video-row">
        <div class="movie-text">
          <li><h1>{props.video.title}</h1></li>
          <li><strong>Overview: </strong>{props.video.overview}</li>
          <li><strong>Release Date: </strong>{props.video.release_date}</li>
          {/* <li>
            <form onSubmit={onAddVideo}>
            <div>
              <label htmlFor="inventory">Inventory:</label>
              <input name="inventory" onChange={onInventoryChange} value={inventory}/>
            </div>
            </form>
      </li> */}
          <li>{button()}</li>
         { status ? <div><h2 className="video-status">{status}</h2></div> : '' }
        </div>
        <li class="movie-image"><img src={props.video.image_url} alt={`the movie ${props.title}`} /></li>
      </ul>
  )
}

Video.propTypes = {

};

export default Video;
