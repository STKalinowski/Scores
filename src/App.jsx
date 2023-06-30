import './App.css';
import {useState} from 'react';
import FieldsInput from './FeildsInput.jsx';
import TextInput from './TextInput.jsx';
import ScoreDisplay from './ScoreDisplay.jsx';
import SelectComponent from './SelectOption.jsx';

export default function App() {
	const [scores, setScores] = useState([{'sentence':'<Example Sentence1>', 'scores':{'<Trait1>':1, '<Trait2>':2}}, {'sentence':'<Example Sentence2>', 'scores':{'<Trait1>':6}}]);
	const [currentFields, setCurrentFields] = useState(['<Trait1>', '<Trait2>', '<Trait3>']);
	const [selectedField, setSelectedField] = useState('<Trait1>');
	
	const [fields, setFields] = useState([]);
	const [APIKEY, setAPIKEY] = useState([]);
	const [textInp, setTextInp] = useState([]);
	const [error, setError] = useState("");
	
	// API Call & Update Scores.
	async function CreateScores(){
			
			try {
				// Check for empty textInp
				if(textInp.length === 0) {
					console.log("TEXT INPUT IS EMPTY")
    			throw new Error("Text Input is empty.");
	  		}	
				// Check for empty fields
				let fetchFields = [];
				for(let i = 0; i < fields.length; i++){
					if(fields[i].length != 0){
						fetchFields.push(fields[i]);
					}
				}
				if(fetchFields.length === 0){
					console.log("Fields are empty!");
					throw new Error("Fields are empty.");
				}
				
				const prompt = `
The following are good examples human labeled results. They recieve a paragraph and a set of traits. The output is a json list, where each individual sentence is scored based on the input traits. The input traits can very from input to intput! The scores go from 1 being not reflecting the trait, to 10 meaning it fully fufills the trait. The order of the output entries is based on the input sentence order.
Examples:
Input:
{
paragraph:"For millions of football fans, the rumour mill of the transfer market provides a small slice of entertainment in the wilderness months between seasons. Like any good story, there is usually one main protagonist that becomes the centre of attention."
traits:[importance, happy, clarity]
}
Output:
[
{
"sentence": "For millions of football fans, the rumour mill of the transfer market provides a small slice of entertainment in the wilderness months between seasons.",
"scores": {
"importance": 8,
"happy": 7,
"clarity": 9
}
},
{
"sentence": "Like any good story, there is usually one main protagonist that becomes the centre of attention.",
"scores": {
"importance": 7,
"happy": 6,
"clarity": 9
}
}
]
---
Input: 
{
paragraph:"${textInp}",
traits:[${fetchFields}],
}
Output:
[
`
				console.log(prompt);
				const response = await fetch('https://api.openai.com/v1/completions', 
							{
								method:'POST', 
								headers:{
									'Content-Type':'application/json',
									'Authorization':`Bearer ${APIKEY}`,
								},
								body: JSON.stringify({
									prompt: prompt,
									model:'davinci',
									max_tokens:1000,
									temperature: 0.4,
									top_p:0.97,
									n:1,
									stream:false,
									logprobs:null,
									stop:']'
								})
							}).then(async response => {
								if(response.status == 200){
									return response.json()
								} else {
									const errorText = await response.text();
									throw new Error(errorText);
								}
							}).then(data => {
								const completion = '[' + data.choices[0].text + ']';
								console.log('Completion')
								console.log(completion);
								const outputJson = JSON.parse(completion);
								setScores(outputJson);
								setCurrentFields(fetchFields);
					      setSelectedField(fetchFields[0]);
								setError('');
							})
			} catch(error){
				// Just display the error message.
				setError(error.message);
			}
	}
	
	const print = () => {console.log(currentFields); console.log(selectedField); console.log(scores)}
	
	const handleTextInput = (event) => {
    setTextInp(event.target.value);
  };
  return (
    <main>
			<div className='container'>
				<div className='header-section'>
					<h1>Scores</h1>
					<SelectComponent options={currentFields} selected={selectedField} setSelected={setSelectedField}/>
					
				</div>
				<ScoreDisplay scores={scores} selectedField={selectedField} setSelectedField={setSelectedField} currentFields={currentFields}/>
				<div className='section'>
					<h3>Input:</h3>
					<textarea value={textInp} onChange={handleTextInput}/>
					<div style={{display:'flex', alignItems:'center'}}>
						<h3 style={{'marginRight':'2px'}}>OPEN API KEY:</h3>
						<input
							type='text'
							value={APIKEY}
							onChange={event => setAPIKEY(event.target.value)}/>
					</div>
						
					<button onClick={CreateScores}>Create Scores</button>
					
					{error && <div style={{color: 'red'}}>Error: {error}</div>}
				</div>
				<FieldsInput handleFieldsInput={setFields}/>
			</div>
		</main>
  )
}
