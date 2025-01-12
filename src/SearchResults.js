import Tracklist from './Tracklist';

function SearchResults({results, onHandleAddTrack, onHandleResetTracklist}) {
    return (
        <Tracklist tracks={results} onHandleAddTrack={onHandleAddTrack} onHandleResetTracklist={onHandleResetTracklist}>
        </Tracklist>
    )
}

export default SearchResults;
