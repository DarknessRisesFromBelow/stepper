import React, {useState, useEffect} from 'react';
import { IonItem, IonLabel, IonList, IonContent, IonListHeader, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import User from './user'

export default class Leaderboard extends React.Component<any, {elements:any[]}>
{

	constructor(props:any) {
		super(props);
		this.state = {elements: []};
	}

	componentDidMount()
	{
		fetch("https://arriving-strictly-halibut.ngrok-free.app/getLeaderboard", {method: 'GET',headers: {"ngrok-skip-browser-warning": "69420",},}).then(response=>
			{
				response.text().then(
					responseString=>
					{ 
						this.createElementsFromString(responseString)
					}
				);
			}
		);

		//this.createElementsFromString("meow,https://www.law.berkeley.edu/wp-content/uploads/2015/04/Blank-profile.png,154")

	}

	createElementsFromString(text:string)
	{
		const elements:any[] = [];
		const dataSize = 3;
		const stuff = text.split(","); 	// create user from info passed as "name,imgURL,steps"
		for(let i = 0; i < stuff.length / dataSize; i++)
		{
			const shift = (i * dataSize);
			const element = React.createElement(User, {name: stuff[shift + 1], imgURL: stuff[shift], steps: +stuff[shift + 2], index: i});						
			elements.push(element);
		}
		this.setState({elements: elements});
	}

	outputAndReturnElement()
	{
		console.log("got element that symbolizes no objects")

		return <p>there are no objects to render</p>
	}

	render()
	{
		const thing = ()=>{console.log("getting text saying there are objects"); return <p>new component rendering</p>}
		console.log("there are " + this.state.elements.length + " elements to render");
		return <div id="page">
			<IonList>
				<IonListHeader><div className="firstHeader">Name</div><div className="secondHeader">steps</div></IonListHeader>
				{this.state.elements.map(el=> <IonItem key={el.index}>{el}</IonItem>)}
			</IonList>
		</div>
	}
}