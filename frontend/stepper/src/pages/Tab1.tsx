import React, {useEffect} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import Steps from '../components/steps'


const Tab1: React.FC = () => {
  useEffect(()=>
  {
      fetch("https://arriving-strictly-halibut.ngrok-free.app/CreateUserNAME1,https://www.law.berkeley.edu/wp-content/uploads/2015/04/Blank-profile.png");    
  })


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
