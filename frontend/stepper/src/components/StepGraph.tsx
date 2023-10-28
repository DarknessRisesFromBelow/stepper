import React from 'react'
import {readFile, writeFile} from './fileWork'
import Chart from 'react-google-charts'
import './StepGraph.css'

export default class StepGraph extends React.Component<any, {stepsArr: any[]}>
{

	constructor(props:any)
	{
		super(props);
		this.state = {stepsArr: [['day', 'steps'], ['sunday', 1000], ['monday', 4781], ['tuesday', 500], ['thursday', 10000]]}
	}

	componentDidMount()
	{
		console.log("loaded step graph component")

		try
		{
			const dat = readFile("data/account/steps/stepHistoryData.dat");
			console.log(dat);
		}
		catch
		{
			console.log("file does not exist");
		}

		// TODO : read the data file and update the states
	}

	render()
	{
		const options = {title: "daily performance: ", titleTextStyle: {color: '#fff' },lineWidth: 4, backgroundColor:"#262626", hAxis:{textStyle:{color: '#FFF'}}, vAxis:{textStyle:{color: '#FFF'}},legend: { position: "none" }};
		const data = this.state.stepsArr;
		return <div id="chartContainer"><Chart chartType="LineChart" data={data} options={options} height="25vh" width="90vw"/></div>
	}
}