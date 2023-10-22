import React from 'react'
import './wave.css'

class Wave extends React.Component<any, any>
{
	render()
	{
		return <div className="ocean">
		<div className="wave"></div>
		<div className="wave"></div>
		<div className="wave"></div>
		</div>
	}
}

export default Wave;