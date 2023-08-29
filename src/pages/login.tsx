import { useContext, useState, FormEvent } from "react";
import { useNavigate } from 'react-router-dom';
// import Cookies from "universal-cookie";
import { UserContext } from '../UserContext';
import { config } from '../config/config';

// const cookies = new Cookies();

const URL = config.url;

const LoginUser: React.FC = () => {
    const [email, setEmail ] = useState('');
    const [password, setPassword] = useState('');
    // const [login, setLogin] = useState(false);
    const [token, setToken] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    function isError(err: any): err is Error {
        return err instanceof Error;
        }
    
    const loginUser = async () => {
        try {
            const response = await fetch(`${URL}/login`, {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${token}`,
            },
            });
        
            if (response.ok) {
            const result = await response.json();
            const userEmail = result.email;
            const userId = result.userId;
            const passwordCheck = result.passwordCheck
        
            if (userId !== undefined && userEmail !== undefined && passwordCheck !== false) {

                // Set HttpOnly cookies
                document.cookie = `accessToken=${result.accessToken}`;
                document.cookie = `refreshToken=${result.refreshToken}`;
                
                // Testing if tokens exist
                console.log("logn.tsx accessToken",result.accessToken)
                console.log("logn.tsx refreshToken",result.refreshToken)
                
                // Should be session storage
                sessionStorage.setItem('email', userEmail);
                sessionStorage.setItem('id', userId);
                setEmail('');
                setPassword('');
                // setLogin(true);
                setToken(result.token);
                setUser(result);
                navigate('/game',{ state: { token: result.token } });
            } 
        }
        } catch (err) {
            if (isError(err)) {
                alert("Login failed, password or email incorrect");
            } else {
                console.log("An unknown error occurred:", err);
            }
            }
        };

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loginUser();
};

    return (
        <div className="background">   
            <div className="form-container-login">
                <form method="post" onSubmit={handleSubmit} encType="multipart/form-data" className="login-form">
                    <label className="labels">
                        Email
                        <input 
                            type="text" 
                            name="email" 
                            placeholder="email"
                            onChange={e => setEmail(e.target.value)} />
                    </label>
                    <label className="labels">
                        Password
                        <input 
                            type="text" 
                            name="password" 
                            placeholder="password"
                            onChange={e => setPassword(e.target.value)} />
                    </label>
                    <input type="submit" value="Submit" className="primary-submit-button" />
                </form>
            </div>
    </div>
    )
};

export default LoginUser;
