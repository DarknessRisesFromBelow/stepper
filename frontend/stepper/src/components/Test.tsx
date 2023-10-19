import React, {useState, useEffect} from 'react';
import { IonItem, IonLabel, IonList, IonContent, IonListHeader, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

class Test extends React.Component<any, {count: number, numArr: number[]}>
{  	
	constructor(props:any) {
		super(props);
		this.state = {count : 0, numArr: [1]};
	}

	componentDidMount()
	{
		this.setState({count:1});
	}

	componentDidUpdate()
	{
		this.render();
	}

	render()
	{
		return <IonPage>
			<p>{this.state.count}</p>
			{this.state.numArr.map(el=> <p key={el}>{el}</p>)}
		</IonPage>
	}
}

export default Test;