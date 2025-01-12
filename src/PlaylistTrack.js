import { useState } from 'react';
import './Track.css';
import Delete from './images/trash-can-solid.svg';

function PlaylistTrack({ name, artist, album, onHandleRemoveTrack }) {
    
    return (
        <div className="track">
            <div className="content">
                <h4>{name}</h4>
                <p>{artist} | {album}</p>
            </div>
            <div className='add-to-playlist'>
                <a href="#" data-track-name={name} data-track-artist={artist} data-track-album={album} onClick={onHandleRemoveTrack}>
                    <img src={Delete} />
                </a>
            </div>
        </div>
    );
}

export default PlaylistTrack;
