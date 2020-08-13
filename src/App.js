import React, { useState, useEffect, useRef } from 'react';
import { Input, Textarea, Select } from '#/components';
import { getCities } from '#/API';

function App() {

	const title = useRef();
	const [ inputVal, setInputVal ] = useState('default value');
	const [ textareaVal, setTextareaVal ] = useState('default value');
	const [ selectVal, setSelectVal ] = useState('');

	return (
		<div>
			<h1 ref={ title }>
				React-UI
			</h1>

			<div>
				<div>
					<Input
						label='single-text-input'
						name='my-input'
						placeholder='type something'
						errors={ [ 'An error has occured' ] }
						value={ inputVal }
						onChange={ e => setInputVal(e.target.value) }
					/>
				</div>

				<br />

				<div>
					<Textarea
						label='textarea-label'
						name='my-textarea'
						errors={ [ 'An error has occured' ] }
						value={ textareaVal }
						onChange={ e => setTextareaVal(e.target.value) }
						minRows={ 5 }
					/>
				</div>

				<br />

				<div>
					<Select
						placeholder='Select...'
						name='select-name'
						options={ [ 'opt1', 'opt2', 'tel1', 'tel2', 'wap1', 'wap2' ] }
						maxMenuHeight={ '150px' }
					//value={ selectVal }
					//onChange={ setSelectVal }
					/>
				</div>
				{/* 
				<div>
					<Select
						placeholder='Select...'
						name='select-name'
						options={ [ 'opt1', 'opt2', 'tel1', 'tel2', 'wap1', 'wap2' ] }
						value={ selectVal }
						onChange={ setSelectVal }
					/>
				</div> */}

				<br />
			</div>

		</div>
	);
}

export default App;

