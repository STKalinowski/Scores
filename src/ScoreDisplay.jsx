import React from 'react';
import SelectComponent from './SelectOption.jsx';

function ScoreDisplay({ 
	scores, 
	selectedField,
	setSelectedField,
	currentFields,
}){
	const highlightTable = ["#c0ffba", "#c0feae", "#c1fca1", "#c4fb94", "#c7f886", "#ccf677", "#d1f368", "#d7f058", "#deed46", "#e6e932"]


	return(
		<div className='main-section'>
			<div style={{maxWidth:'750px',width:'100%'}}>
			{scores.map( (item,index) => {
			if(!item.sentence){return null};
			if(!item['scores'][selectedField]){return (<span key={index} style={{fontWeight:'bold'}}>{item.sentence} </span>)}
			else{
				const score = parseInt(item['scores'][selectedField])-1;
				return (<span key={index} style={{backgroundColor:highlightTable[score], color:'black', fontWeight:'bold'}}>
				{item.sentence} </span>)}
			})}
			</div>
		</div>)
};

export default ScoreDisplay;
