import React from 'react'
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import Chart from 'react-google-charts'
import './StepGraph.css'

export default class StepGraph extends React.Component<any, any>
{
	componentDidMount()
	{
		console.log("loaded step graph component")
		// read the data file and update the states
	}

	render()
	{
		const options = {lineWidth: 5, backgroundColor:"#404040", hAxis:{textStyle:{color: '#FFF'}}, vAxis:{textStyle:{color: '#FFF'}},legend: { position: "none" }};
		const data = [['day', 'steps'], ['sunday', 1000], ['monday', 4781], ['tuesday', 500], ['thursday', 10000]]
		return <div id="chartContainer"><Chart chartType="LineChart" data={data} options={options} height="25vh" width="75vw"/></div>
	}
}