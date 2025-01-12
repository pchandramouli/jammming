import { useState } from 'react';
import './Track.css';
import RightArrow from './images/circle-arrow-right-solid.svg';

function Track({ key, name, artist, album, uri, onHandleAddTrack }) {
    
    return (
        <div className="track">
            <div className="content">
                <h4>{name}</h4>
                <p>{artist} | {album}</p>
            </div>
            <div className='add-to-playlist'>
                <a href="#" data-track-name={name} data-track-artist={artist} data-track-album={album} data-track-uri={uri} onClick={onHandleAddTrack}>
                    <img src={RightArrow} />
                </a>
            </div>
        </div>
    );
}

export default Track;
