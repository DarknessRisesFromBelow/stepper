import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import user from '../components/user';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <user name="firstUser" bio="hello!" steps={154} imgURL="https://www.law.berkeley.edu/wp-content/uploads/2015/04/Blank-profile.png"/>
        <ExploreContainer name="Tab 3 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
