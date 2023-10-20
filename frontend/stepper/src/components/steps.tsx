import React, {useState, useEffect} from 'react';
import { Health } from '@ionic-native/health';
import './steps.css'

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
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
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
		return <div className="background">
		<div className="container">
			<input type="range" min={0} max = {10000} value={this.state.steps} id="rangeSlider"/>
		</div>
			<h1 id="barText">you have made {this.state.steps} steps today, is this all you got?</h1>
		</div>
	}

}

export default Steps;