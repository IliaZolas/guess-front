import React, { useContext } from "react";
import { PrimaryButton } from "../components/buttons";
import { SecondaryButton } from "../components/buttons";
import Cookies from "universal-cookie";
import { UserContext } from '../UserContext';

const GameOver: React.FC = () => {
    const { setUser } = useContext(UserContext);

    const logout = () => {
        const cookies = new Cookies();
        cookies.remove("TOKEN", { path: "/" });
        localStorage.clear();
        setUser(null);
    };

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
