import React, {useEffect} from 'react';
import { IonContent, IonHeader, IonButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {readFile, writeFile} from '../components/fileWork';
import './login.css';
import {useHistory} from "react-router-dom";

const Login: React.FC = () => {
  
  const history = useHistory();
  useEffect(()=>
  {
    try
    {
      readFile("data/account/login/login.dat").then(dat=>{
        global.uid = "" + dat;
        AttemptSwitch();
      });
    }
    catch
    {
      console.log("showing login screen");
    }
  })

  function AttemptSwitch()
  {
    const stringToWrite = '' + global.uid;
    writeFile('data/account/login/login.dat', stringToWrite);
    history.push('/tab1');
  }


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
        <IonButton onClick={()=>{fetch("https://arriving-strictly-halibut.ngrok-free.app/CreateUser" + (document.getElementById("input1") as HTMLInputElement)?.value + "|||" + (document.getElementById("input2") as HTMLInputElement)?.value, {method: 'GET',headers: {"ngrok-skip-browser-warning": "69420",},}).then(data=>{data.text().then(text=>{global.uid=text.split("=")[1]; AttemptSwitch();})})}}> Log In! </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};


export default Login;
