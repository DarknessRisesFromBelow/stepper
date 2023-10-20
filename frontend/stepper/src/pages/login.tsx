import React, {useEffect} from 'react';
import { IonContent, IonHeader, IonButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './login.css';


const Login: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div id="container">
        <label>username : </label>
        <input type="text" id="input1"/>
        <br></br>
        <br></br>
        <label>picture url : </label>
        <input type="text" id="input2"/>
        <br></br>
        <IonButton onClick={()=>{fetch("https://arriving-strictly-halibut.ngrok-free.app/CreateUser" + (document.getElementById("input1") as HTMLInputElement)?.value + "," + (document.getElementById("input2") as HTMLInputElement)?.value, {method: 'GET',headers: {"ngrok-skip-browser-warning": "69420",},})}}> Log In! </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};


export default Login;
