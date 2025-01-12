/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length) => {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const loadAccessToken = () => {

    /**
     * Obtains parameters from the hash of the URL
     * @return Object
     */
    const getHashParams = () => {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while (e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }

    let params = getHashParams();

    let access_token = localStorage.getItem('accessToken');
    if (params.access_token) {
        access_token = params.access_token;
    }
    
    console.log(access_token);

    if (access_token) {
        localStorage.setItem('accessToken', access_token);
    } else {
        authorize();
    }
}

const authorize = () => {
    var client_id = ''; // Your client id
    var redirect_uri = 'http://localhost:3000'; // Your redirect uri
    var state = generateRandomString(16);
    var scope = 'playlist-modify-private';
    
    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);

    window.location = url;
}
export { loadAccessToken, authorize };