import React, {useState, useEffect} from 'react';
import { IonItem, IonLabel, IonList, IonContent, IonListHeader, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import User from '../components/user';
import ReactDOM from 'react-dom/client'
import Leaderboard from '../components/leaderboard'
import Test from '../components/Test'
import './Tab2.css';

global.shouldUpdate = false;

const Tab2: React.FC = () => {
  useEffect(()=>{
      console.log("something changed")
    }) 

  return (
    <IonPage>
      <IonContent fullscreen>
        <Leaderboard />
      </IonContent>
    </IonPage>
  );  
};

export default Tab2;
