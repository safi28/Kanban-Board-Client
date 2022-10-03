import React, { FC, useState } from "react"
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const Login: FC = () => {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e: any) => {
        e.preventDefault();
        localStorage.setItem("userId", username);
        setUsername("");
        navigate("/tasks");
    }

    return (
        <div className="cmp-login">
            <form className='cmp-login__form' onSubmit={handleLogin}>
                <label className="cmp-login__label" htmlFor='username'>Provide a username</label>
                <input
                    className="cmp-login__input"
                    type='text'
                    name='username'
                    id='username'
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                <button className="cmp-login__button">SIGN IN</button>
            </form>
        </div>
    )
}

export default Login;