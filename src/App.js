import { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults'
import Playlist from './Playlist';
import { authorize } from './SpotifyUtil';

const searchResultsList = [
  {
    name: "Symphony 9",
    artist: "Beethoven",
    album: "Beethoven Symphonies"
  },
  {
    name: "Symphony Fantastique",
    artist: "Berlioz",
    album: "Romantic Symphonies"
  },
  {
    name: "Hebrides Overture",
    artist: "Mendelssohn",
    album: "Romantic Classics"
  },
  {
    name: "Elvira Madigan",
    artist: "Mozart",
    album: "Piano Concertos"
  }
];

function App() {
  let [playlistTracks, setPlaylistTracks] = useState([]);
  let [searchResultsList, setSearchResultsList] = useState([]);
  let [username, setUsername] = useState('');
  let [query, setQuery] = useState('');

  const fetchSpotifyProfile = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return response;
  };

  const fetchData = async () => {
    let response = await fetchSpotifyProfile();
    if (!response.ok) {
      // If unauthorize, authorize again.
      const status = response.status;
      console.log(`Status is ${status}`);
      if (status === 401) {
        console.log('Calling authorize again');
        authorize();
        response = await fetchSpotifyProfile();
      }
      throw new Error("Failed to fetch data");
    }
    const responseJson = await response.json();
    setUsername(responseJson.display_name);

  };

  const searchSpotify = async (query) => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch('https://api.spotify.com/v1/search?type=track&q=' + query, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return response;
  }
  
  const fetchSearchData = async (e) => {
    if (e === '') {
      return [];
    }
    const query = e.currentTarget.getAttribute('data-query');

    if (!query) {
      return [];
    };

    const searchResponse = await searchSpotify(query);
    const searchResponseJson = await searchResponse.json();

    let results = [];

    results = searchResponseJson.tracks.items.map(track => {
      const album = track.album.name;
      const artist = track.artists[0].name;
      const name = track.name;
      const id = track.id;
      const uri = track.uri;

      return {
        name: name,
        album: album,
        artist: artist,
        id: id,
        uri: uri
      };
    });

    setSearchResultsList(results);
  }

  useEffect(() => {

    fetchData();
    fetchSearchData('');
  }, []);

  const handleAddTrack = (e) => {
    e.preventDefault();

    setPlaylistTracks([...playlistTracks, {
      id: e.currentTarget.getAttribute('data-track-id'),
      name: e.currentTarget.getAttribute('data-track-name'),
      artist: e.currentTarget.getAttribute('data-track-artist'),
      album: e.currentTarget.getAttribute('data-track-album'),
      uri: e.currentTarget.getAttribute('data-track-uri')
    }]);
  };

  const handleRemoveTrack = (e) => {
    e.preventDefault();
    const newPlaylistTracks = playlistTracks.filter(track => {
      return track.name !== e.currentTarget.getAttribute('data-track-name')
    })
    setPlaylistTracks(newPlaylistTracks);
  }

  const handleResetTracklist = (e) => {
    setSearchResultsList([]);
  }

  const handleResetPlaylist = (e) => {
    setPlaylistTracks([]);
  }

  return (
    <div className="App">
      <header>
        <h6>Username: {username}</h6>
        <h1>Jammming</h1>
      </header>
      <div className="search-panel">
        <SearchBar query={query} onHandleSearch={fetchSearchData}></SearchBar>
      </div>
      <div className="results-panel">
        <SearchResults results={searchResultsList} onHandleAddTrack={handleAddTrack} onHandleResetTracklist={handleResetTracklist}></SearchResults>
      </div>
      <div className="playlist-panel">
        <Playlist playlistTracks={playlistTracks} onHandleRemoveTrack={handleRemoveTrack} onHandleResetPlaylist={handleResetPlaylist}></Playlist>
      </div>
    </div>
  );
}

export default App;
