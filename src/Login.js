import { useState } from "react";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleUsernameChange(e) {
        setUsername(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }
    return (
        <div>
            <input type="text" value={username} onChange={handleUsernameChange}/>
            <input type="password" value={password} onChange={handlePasswordChange}/>

            <button type="submit" name="loginBtn">Login</button>
        </div>
    );
}

export default Login;
