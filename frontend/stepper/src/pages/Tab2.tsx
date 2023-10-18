import React from 'react';
import { IonItem, IonLabel, IonList, IonContent, IonListHeader, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import User from '../components/user';
import Leaderboard from '../components/leaderboard'
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <Leaderboard/>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
