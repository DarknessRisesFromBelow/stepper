import React from 'react';
import { IonItem, IonLabel, IonList, IonContent, IonListHeader, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import User from './user'

export default class Leaderboard extends React.Component
{

	elements:any[] = [];

	createElementsFromString(text:string)
	{
		this.elements = [];
		const stuff = text.split(","); 
		const element = React.createElement("user", {name: stuff[0], imgURL: stuff[1], steps: +stuff[2]});
		this.elements.push(element);
	}

	render(elements:any[])
	{
		return <div><IonList>
            <IonListHeader><div className="firstHeader">Name</div><div className="secondHeader">steps</div></IonListHeader>
            {this.elements.map(el=> <IonItem key={el.name}>{el}</IonItem>)}
            </IonList>
            </div>
	}
}