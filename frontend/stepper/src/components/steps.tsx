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
		this.health.requestAuthorization([
			"distance",
			"nutrition", 
			{
				read: ["steps", "height", "weight"],  
				write: ["height", "weight"], 
			},
		]).then(data => {this.getSteps();});
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
	}

	getSteps()
	{
		console.log("startDate : " + new Date(new Date().setUTCHours(0,0,0,0)))
		console.log("endDate : " + new Date());
		try
		{		
			this.health.promptInstallFit().then(data1=>{
				this.health.query(
				{
					startDate: new Date(new Date().getTime() - 24*60*60*1000) ,
					endDate: new Date(),
					dataType: 'steps'
				}).then(data=>{
					console.log(data);
					let localSteps = 0;
					for(let elementId  = 0; elementId < data.length; elementId++)
					{
						localSteps += +data[elementId].value;
					}
					this.setState({steps: localSteps});
				})
			})
		}
		catch
		{
			console.log("could not get steps count");
		}
	}

	render()
	{
		fetch("https://arriving-strictly-halibut.ngrok-free.app/setSteps" + this.state.steps + "," + global.uid,{method: 'GET',headers: {"ngrok-skip-browser-warning": "69420",},});
		return <div className="background">
		<div className="container">
			<input type="range" min={0} max = {10000} value={this.state.steps} id="rangeSlider"/>
		</div>
			<h1 id="barText">you have made {this.state.steps} steps today, is this all you got?</h1>
		</div>
	}

}

export default Steps;