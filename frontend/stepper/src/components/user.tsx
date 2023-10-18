import React from 'react';
import './user.css';

interface Props {
  name: string;
  imgURL: string;
  bio: string; 
  steps: number;
}

const user: React.FC<Props> = ({ name, imgURL, bio, steps}) => {
  return (
    <div className="user">
      <img src={imgURL}></img>
      <p>{name}</p>
      <p>{steps}</p>
    </div>
  );
};

export default user;
