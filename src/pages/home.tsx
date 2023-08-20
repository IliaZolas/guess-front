import {PrimaryButton} from "../components/buttons";
import { SecondaryButton } from "../components/buttons";

const Home = () => {
    return (
        <div className="fullwidth">
            <div className="container-home">
                <div className="hero-banner">
                    <h1>Guess the Number</h1>
                    <p>You need to be logged in to play.</p>
                    <PrimaryButton value="Signup to get started" to="/signup" />
                    <SecondaryButton value="or login" to="/login" />
                </div>
            </div>
        </div>
    );
}

export default Home;

