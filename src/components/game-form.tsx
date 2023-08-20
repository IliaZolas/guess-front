import React, { useState, FormEvent } from "react";
import { config } from '../config/config';

const URL = config.url;

const AddMealPlan: React.FC = () => {
  const [input, setInput] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await fetch(`${URL}/game`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          input: input
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setInput(data.result);

    } catch(error: any) {
      console.error(error);
      alert(error.message);
    }
  }  

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <input
          type="number"
          name="number"
          placeholder="Guess number here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddMealPlan;
