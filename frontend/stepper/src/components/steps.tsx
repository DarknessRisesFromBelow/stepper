import React, {useState, useEffect} from 'react';
import { Health } from '@ionic-native/health';
import './steps.css'
import Wave from './wave'
import { App } from '@capacitor/app';
import {BackgroundMode} from '@anuradev/capacitor-background-mode';

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
	
		try
		{
			BackgroundMode.enable();
			BackgroundMode.requestDisableBatteryOptimizations();

			App.addListener('backButton', () => {
				console.log("moving to background and initiating step counting");
				BackgroundMode.moveToBackground();
				this.updateStepCount();
			});
		}
		catch
		{
			console.log("erorr!erorr!erorr!erorr!");
		}
	}

	delay(ms: number){return new Promise( resolve => setTimeout(resolve, ms) );}
  
	updateStepCount()
	{
		this.getSteps();
		console.log("starting update schedule");
		this.delay(1200000).then(res=>this.updateStepCount());
	}

	getSteps()
	{
		const datesAreOnSameDay = (first:Date, second:Date)=>
		{
			return first.getFullYear() === second.getFullYear() &&
			first.getMonth() === second.getMonth() &&
			first.getDate() === second.getDate();
		}
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
						if(datesAreOnSameDay(data[elementId].startDate, new Date()))
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
		const r = document.querySelector(":root") as HTMLElement;
		if(r !== null && r !== undefined)
		{
			r.style.setProperty('--stepCount', '' + this.state.steps);
			const rs = getComputedStyle(r);
			console.log(rs.getPropertyValue('--stepCount'))
		}
		fetch("https://arriving-strictly-halibut.ngrok-free.app/setSteps" + this.state.steps + "," + global.uid,{method: 'GET',headers: {"ngrok-skip-browser-warning": "69420",},});
		return <div className="background">
		<div className="container">
			<input type="range" min={0} max = {10000} value={this.state.steps} id="rangeSlider"/>
		</div>
		<div className="siteHeadCenter">
			<h1 id="barText">you have made </h1><h1 className="stepsCount">{this.state.steps} steps</h1><h1> today, is this all you got?</h1>
		</div>
		<div className="customHeightWave">
		<Wave/>
		</div>
		</div>
	}

}

export default Steps;