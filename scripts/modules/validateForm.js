const validateForm = () => {
	const phoneUser = document.querySelectorAll('.phone-user'),
		username = document.querySelectorAll('input[name=user_name]'),
		distance = document.getElementById('distance'),
		head = document.querySelector('head');

	head.insertAdjacentHTML('beforeend',
		`<style>
            input:focus:invalid {
                border: 3px solid red;
            }
            input:focus:valid {
                border: 3px solid green;
            }
            input{
                border: 3px solid black;
            }
            #input-validate {
                color:  red;
                font-size:  1rem;
				margin: 0;
				text-align: center 
            }
         </style>`
	);

	phoneUser.forEach(elem => {
		elem.pattern = '\\+7\\s?[\\(]{0,1}[0-9]{3}[\\)]{0,1}\\s?\\d{3}[-]{0,1}\\d{2}[-]{0,1}\\d{2}';
	});

	username.forEach(elem => {
		elem.pattern = '^[А-Яа-яЁё\s]+$';
	});

	// distance.pattern = '([0-5]{0,1})([0-9]{0,1})([0-9]{0,1})';


	//message for validate form NAME
	username.forEach(element => {
		const div = document.createElement('div'),
			wrongText = 'Допустима ТОЛЬКО кириллица!';
			div.id = 'input-validate';
		element.insertAdjacentElement('beforebegin', div);

		element.addEventListener('input', () =>{
			if (!element.checkValidity()) {
				element.setAttribute('style', 'margin-top: 0')
				div.textContent = wrongText;
			} else {
				element.removeAttribute('style');
				div.textContent = '';
			}
		});
	});

	//message for validate form PHONE
	phoneUser.forEach(element => {
		const div = document.createElement('div'),
			wrongText = 'Телефон в формате: +7(___)___-__-__';
		div.id = 'input-validate';
		element.insertAdjacentElement('beforebegin', div);

		element.addEventListener('input', () =>{
			if (!element.checkValidity()) {
				element.setAttribute('style', 'margin-top: 0')
				div.textContent = wrongText;
			} else {
				element.removeAttribute('style');
				div.textContent = '';
			}
		});
	});

	const div = document.createElement('div'),
		wrongText = 'Только число от 1 до 499!';
		div.id = 'input-validate';
		distance.insertAdjacentElement('beforebegin', div);

	distance.addEventListener('input', () =>{
		if (!distance.checkValidity()) {
			distance.setAttribute('style', 'margin-top: 0')
			div.textContent = wrongText;
		} else {
			distance.removeAttribute('style');
			div.textContent = '';
		}
	});
};

export default validateForm;