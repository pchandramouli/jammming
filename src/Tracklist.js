import './Tracklist.css';
import Track from './Track';
import ResetIcon from './images/rotate-right-solid.svg';

function Tracklist({tracks, onHandleAddTrack, onHandleResetTracklist}) {
    let listItems = [];
    
    listItems = tracks.map(track => {
        return (
        <li key={track.id}>
            <Track key={track.id} name={ track.name } artist={ track.artist } album={ track.album } uri={track.uri} onHandleAddTrack={onHandleAddTrack}>
            </Track>
        </li>
        );
    });
    return (
        <div className="tracklist">
            <h2>Results</h2>
            <img src={ResetIcon} id="reset-tracklist" onClick={onHandleResetTracklist} />
            <ul>
                { listItems }
            </ul>
        </div>
    );
}

export default Tracklist; 