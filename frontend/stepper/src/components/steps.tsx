import React, {useState, useEffect} from 'react';
import { Health } from '@ionic-native/health';

class Steps extends React.Component<any, {steps:number}>
{
	health:typeof Health;

	constructor(health: typeof Health, props:any)
	{
		super(health, props);
		this.health = Health;
		this.state = {steps: 0};
	}

	componentDidMount()
	{
		this.getSteps();
	}

	getSteps()
	{
		try
		{
			this.health.query(
			{
				startDate: new Date(new Date().setUTCHours(0,0,0,0)),
				endDate: new Date(),
				dataType: 'steps'
			}).then(data=>{
				console.log(data);
				//this.setState({steps: data});
			})
		}
		catch
		{
			console.log("could not get steps count");
		}
	}

	render()
	{
		return <p>{this.state.steps}</p>
	}

}

export default Steps;