import React, { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
// import { UserContext } from '../UserContext';
import { config } from '../config/config';

const URL = config.url;

const GameStart: React.FC = () => {
    // const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [gameId, setGameId] = useState<string>("");
    const [gameNumber, setGameNumber] = useState<number | undefined>();
    const [inputValue, setInputValue] = useState<number | undefined>();
    const [guessResult, setGuessResult] = useState<string | null>(null);

    useEffect(() => {
        fetch(`${URL}/start-the-game`)
            .then((response) => response.json())
            .then((data: { gameId: string; gameNumber: number }) => {
                // console.log(data);
                setGameId(data.gameId);
                setGameNumber(data.gameNumber);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (inputValue === undefined) {
            setGuessResult("Please enter a number.");
        } else if (inputValue < gameNumber!) {
            setGuessResult("Guess is too low");
        } else if (inputValue > gameNumber!) {
            setGuessResult("Guess is too high");
        } else {
            navigate('/game-over');
        }
    };

    return (
        <div className="background">
            <div className="form-container">   
                <div className="text-container">
                    <h1>Game #{gameId}</h1>
                    <p style={{ paddingBottom: "20px"}}> 
                        We have picked a number between 1 and 1000. 
                        <br/>Now guess what number we picked
                    </p>
                    <form onSubmit={onSubmit}>
                        <input 
                            type="number" 
                            placeholder="Guess number here"
                            onChange={(e) => setInputValue(Number(e.target.value))} 
                        />
                        {guessResult && <div className="guess-result">{guessResult}</div>}
                        <input type="submit" className="primary-submit-button" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default GameStart;
