import React, {useState, useEffect} from 'react';
import { IonItem, IonLabel, IonList, IonContent, IonListHeader, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import User from '../components/user';
import ReactDOM from 'react-dom/client'
import Leaderboard from '../components/leaderboard'
import './Tab2.css';

global.shouldUpdate = false;

const Tab2: React.FC = () => {
  useEffect(()=>{

      const element = document.getElementById("page");
      if(element !== null && element !== undefined)
      {
        const root = ReactDOM.createRoot(element);
      }
    }) 

  return (
    <IonPage>
      <IonContent fullscreen>
        <Leaderboard/>
      </IonContent>
    </IonPage>
  );  
};

export default Tab2;
