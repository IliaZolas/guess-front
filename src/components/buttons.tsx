import { Link } from 'react-router-dom';

interface PrimaryButtonProps {
    to: string;
    value: string;
    onSubmit?: () => void;
  }

interface SecondaryButtonProps {
    to: string;
    value: string;
    onClick?: () => void;
    }

const PrimaryButton: React.FC<PrimaryButtonProps> = ({value, to, onSubmit}) => {
    return (
        <div className="btn-container">
            <Link to={to} onSubmit={onSubmit} className="primary-button" >
                {value}
            </Link>
        </div>
    );
};

const SecondaryButton: React.FC<SecondaryButtonProps>  = ({value, to, onClick}) => {
    return (
        <div className="btn-container">
            <Link to={to}  onClick={onClick} className="secondary-button">
                {value}
            </Link>
        </div>
    );
};

export { PrimaryButton, SecondaryButton};
