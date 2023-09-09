import React, { useContext} from "react";
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from "../components/buttons";
import { SecondaryButton } from "../components/buttons";
import Cookies from "universal-cookie";
import { UserContext } from '../UserContext';
import { config } from '../config/config';

const URL = config.url;

const GameOver: React.FC = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const logout = async () => {
        console.log('Logout button clicked');
        try {
          const response = await fetch(`${URL}/logout`, {
            method: 'POST',
            credentials: 'include',
          });
      
          if (response.ok) {
            const cookies = new Cookies();
            cookies.remove("accessToken", { path: "/", domain: "localhost", secure: true });
            cookies.remove("refreshToken", { path: "/", domain: "localhost", secure: true });
            sessionStorage.clear();
            setUser(null);
            console.log('Logout successful');
            navigate('/')
          } else {
            console.error('Logout failed');
          }
        } catch (error) {
          console.error('Logout error:', error);
        }
      };

    console.log("does game-over show twice?")
    return (
        <div className="background">
            <div className="form-container">
                <div className="text-container">
                    <h1>You win!</h1>
                    <p style={{ paddingBottom: "20px"}}> 
                        The game is over
                    </p>
                    <PrimaryButton to={'/game-start'} value="Play Again?"/>
                    <SecondaryButton to="/" onClick={() => logout()} value="or logout"/>
                </div>
            </div>
        </div>
    );
}

export default GameOver;
