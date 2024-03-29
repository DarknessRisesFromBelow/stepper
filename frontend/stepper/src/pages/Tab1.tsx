import React, {useEffect} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import Steps from '../components/steps'
import Wave from '../components/wave'
import OneSignal from 'onesignal-cordova-plugin';
import StepGraph from '../components/StepGraph';

const Tab1: React.FC = () => {

  useEffect(()=>
  {
    try
    {
      OneSignal.setExternalUserId(global.uid);
    }
    catch
    {
      console.log("could not set external user id for onesignal")
    }
  })


  return (
    <IonPage>
      <IonContent fullscreen>
        <Steps/>
        <div className="bgcolor"><StepGraph/></div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
