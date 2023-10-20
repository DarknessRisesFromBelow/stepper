import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import Steps from '../components/steps'


const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <Steps/>
        <div className="bgcolor"><h1>placeholder for what would probably be graphs</h1></div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
