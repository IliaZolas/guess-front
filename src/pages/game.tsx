import React from "react";
import { PrimaryButton } from "../components/buttons";

const Game: React.FC = () => {

    return (
        <div className="background">
            <div className="form-container">
                <div className="text-container">   
                    <h1>Start Game</h1>
                    <p style={{ paddingBottom: "20px"}}> 
                        Try to guess the randomly generated number by inputting your guess in the provided field and clicking the "Submit" button.
                        <br/>
                        <br/>The app will give you feedback on whether your guess is too high, too low, or correct.
                        <br/>Keep guessing until you find the correct number!
                    </p>
                    <PrimaryButton to={'/game-start'} value="Start Game"/>
                </div>
            </div>
        </div>
    );
}

export default Game;
