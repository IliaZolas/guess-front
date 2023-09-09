import React, { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { config } from '../config/config';

const URL = config.url;

const GameStart: React.FC = () => {
    const navigate = useNavigate();
    const [gameId, setGameId] = useState<string>("");
    const [gameNumber, setGameNumber] = useState<number | undefined>();
    const [inputValue, setInputValue] = useState<number | undefined>();
    const [guessResult, setGuessResult] = useState<string | null>(null);

    useEffect(() => {
        fetch(`${URL}/start-the-game`,  {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data: { gameId: string; gameNumber: number; }) => {
                setGameId(data.gameId);
                setGameNumber(data.gameNumber);
                sessionStorage.setItem('gameId', `${data.gameId}`);
                sessionStorage.setItem('gameNumber', `${data.gameNumber}`);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (inputValue === undefined) {
            setGuessResult("Please enter a number.");
        } else {
            try {
            const response = await fetch(`${URL}/check-guess`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                guess: inputValue,
                gameId: gameId, // Pass the game ID if needed
                gameNumber: gameNumber,
                }),
            });
        
            if (response.ok) {
                const data = await response.json();
                if (data.result === 'success') {
                // Correct guess, navigate to the game-over page or take other actions
                sessionStorage.removeItem('gameId');
                sessionStorage.removeItem('gameNumber');
                navigate("/game-over");
                } else if (data.result === 'low') {
                setGuessResult("Guess is too low");
                } else {
                setGuessResult("Guess is too high");
                }
            } else {
                console.error('Failed to submit guess:', response.status);
                // Handle other error cases
            }
            } catch (error) {
            console.error('Error submitting guess:', error);
            // Handle fetch error
            }
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
