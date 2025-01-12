import { useState } from 'react';
import './Playlist.css';
import PlaylistTrack from './PlaylistTrack';
import ResetIcon from './images/rotate-right-solid.svg';

function Playlist({ playlistTracks, onHandleRemoveTrack, onHandleResetPlaylist }) {
    let listItems = [];

    const [playlistTitle, setPlaylistTitle] = useState('');

    function handlePlaylistTitleChange(e) {
        const playlistTitleStr = e.target.value;
        setPlaylistTitle(playlistTitleStr);
    }

    const playlistUris = () => {
        return playlistTracks.map(track => track.uri);
    }

    const savePlaylistToSpotify = async (playlistName) => {
        const accessToken = localStorage.getItem('accessToken');
        const userId = '';
        //Create the playlist first...
        const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                name: playlistName,
                description: playlistName,
                public: false
            })
        });
        const responseJson = await response.json();
        const playlistId = responseJson.id;

        const addResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                uris: playlistUris(),
                position: 0
            })
        });
        return addResponse;
    };

    function handleSaveToSpotify(e) {
        // Call Spotify API to save this playlist to Spotify
        const response = savePlaylistToSpotify(playlistTitle);
    }

    if (!playlistTracks || playlistTracks.length === 0) {
        listItems = <li>No item to display</li>;
    }
    else {
        listItems = playlistTracks.map(track => {
            return (
                <li key={track.id}>
                    <PlaylistTrack key={track.id} name={track.name} artist={track.artist} album={track.album} onHandleRemoveTrack={onHandleRemoveTrack}>
                    </PlaylistTrack>
                </li>
            );
        });
    }

    const resetPlaylist = (e) => {
        onHandleResetPlaylist(e);
        setPlaylistTitle('');
    }

    return (
        <div className="playlist">
            <div>
            <h2>Playlist</h2>
            <img src={ResetIcon} onClick={resetPlaylist}/>
            </div>
            <ul>
                {listItems}
            </ul>
            <br />
            <input type="text" name="playlistTitle" id="playlistTitle" value={playlistTitle} onChange={handlePlaylistTitleChange} />
            <button name="saveToPlaylist" id="saveToPlaylist" onClick={handleSaveToSpotify}>Save to Spotify</button>
        </div>
    )
}

export default Playlist;
