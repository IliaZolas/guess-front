import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { config } from '../config/config';

interface User {
    _id: string;
    name: string;
    surname: string;
    email: string;
    imageUrl: string;
    public_id: string;
}

const URL = config.url;

const ShowUser: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const id = localStorage.getItem('id');

        fetch(`${URL}/user/show/${id}`, {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((data: User) => {
            setUser(data);
        })
        .catch((err) => {
            console.log(err.message);
        });
    }, []);

    const updateUser = (id: string) => {
        navigate(`/user/update/${id}`);
    };

    return (
        <div className="show-user-container">
            <div className="">
                <div className="" >
                    <div className="show-user-image-container">
                        {user && (
                            <img src={user.imageUrl} style={{paddingTop: "20px"}} alt="" className="new-user-image"/>
                        )}
                    </div>
                    {user && (
                        <>
                            <h1>{user.name} {user.surname}</h1>
                            <p>{user.email}</p>
                            <div className="user-button-area">
                                <div className="secondary-button" onClick={() => updateUser(user._id)} >Update</div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ShowUser;
