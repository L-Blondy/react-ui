import React, { useState, useEffect, useRef } from 'react';
import { Input, Textarea, Select } from '#/components/inputs';

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
						className='customize-select'
						value={ selectVal }
						onChange={ e => console.log('onChange:', e.target) }
						onInputChange={ e => { } }
						placeholder='Select...'
						name='select-name'
						options={ [
							{ value: 12, display: 1200 },
							{ value: 13, display: 1300 },
							{ value: 23, display: 2300 },
							{ value: 24, display: 2400 },
						] }
					/>
				</div>
			</div>

		</div>
	);
}

export default App;
