import React, {useState, useEffect} from 'react';
import { IonItem, IonLabel, IonList, IonContent, IonListHeader, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import User from './user'

export default class Leaderboard extends React.Component
{

	elements:any[] = [];


	componentDidMount()
	{
		this.createElementsFromString("firstUser,https://www.law.berkeley.edu/wp-content/uploads/2015/04/Blank-profile.png,154");
	}


	IonViewWillEnter()
	{
		this.createElementsFromString("firstUser,https://www.law.berkeley.edu/wp-content/uploads/2015/04/Blank-profile.png,154");
	}

	componentDidUpdate()
	{
		this.render();
	}

	createElementsFromString(text:string)
	{
		this.elements = [];
		const dataSize = 3;
		const stuff = text.split(","); 	// create user from info passed as "name,imgURL,steps"
		for(let i = 0; i < stuff.length / dataSize; i++)
		{
			const shift = (i * dataSize);
			const element = React.createElement("user", {name: stuff[shift], imgURL: stuff[shift + 1], steps: +stuff[shift + 2], index: i});						
			this.elements.push(element);
		}
		this.render();
	}

	outputAndReturnElement()
	{
		console.log("got element that symbolizes no objects")

		return <p>there are no objects to render</p>
	}

	render()
	{
		const thing = ()=>{console.log("getting text saying there are objects"); return <p>new component rendering</p>}

		console.log("there are " + this.elements.length + " elements to render");
		console.log(this.elements);
		return <div id="page">
			<IonPage>
			<IonList>
				<IonListHeader><div className="firstHeader">Name</div><div className="secondHeader">steps</div></IonListHeader>
				{this.elements.length > 0 ? thing() : this.outputAndReturnElement()}
				{this.elements.map(el=> <IonItem key={el.index}>{el}</IonItem>)}
			</IonList>
			</IonPage>
		</div>
	}
}