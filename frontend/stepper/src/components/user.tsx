import React from 'react';
import './user.css';

interface Props {
  name: string;
  imgURL: string;
  steps: number;
  index: number
}

const pfpSize = 48;

const User: React.FC<Props> = ({ name, imgURL, steps, index}) => {
  return (
    <div className="user">
      <img src={imgURL} width={pfpSize} height={pfpSize}></img>
      <label>{name}</label>
      <p>{steps}</p>
    </div>
  );
};

export default User;
