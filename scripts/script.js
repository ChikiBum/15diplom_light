'use strict';


const sendForm = () => {

	const errorMessage = 'Что-то пошло не так....',
		loadMessage = 'Загрузка...',
		successMessage = 'Отправлено!';

	const forms = document.querySelectorAll('form');

	const statusMassage = document.createElement('div');
	statusMassage.style.csstext = 'font-size: 2rem; ';
	statusMassage.classList.add('status-massage');


	forms.forEach((elem) => {
		elem.addEventListener('submit', (event) => {
			event.preventDefault();
			const target = event.target,
				form = target.closest('form');

			const inputs = form.querySelectorAll('input');

			form.appendChild(statusMassage);
			statusMassage.textContent = '';
			statusMassage.textContent = loadMessage;

			const formData = new FormData(form);

			let body = {};

			// for (let val of formData.entries()){
			//     body[val[0]] = val[1];
			// }

			formData.forEach((val, key) => {
				body[key] = val;
			});

			postData(body)
				.then((response) => {
					if (response.status !== 200) {
						throw new Error('status network not 200')
					}
					statusMassage.setAttribute("style","height: auto;");
					statusMassage.textContent = successMessage;
				})
				.catch((error) => {
					statusMassage.setAttribute("style","height: auto;");
					statusMassage.textContent = errorMessage;
					console.error(error);
				});

			inputs.forEach((elem) => {
				elem.value = '';
			});
		});

	});

	// eslint-disable-next-line arrow-body-style
	const postData = (body) => {
		return fetch('./server.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});
	};
};

sendForm();

const validateForm = () => {
	const phoneUser = document.querySelectorAll('.phone-user'),
		username = document.querySelectorAll('input[name=user_name]'),
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
                margin: 0
            }
         </style>`
	);

	phoneUser.forEach(elem => {
		elem.pattern = '\\+7\\s?[\\(]{0,1}[0-9]{3}[\\)]{0,1}\\s?\\d{3}[-]{0,1}\\d{2}[-]{0,1}\\d{2}';
	});

	username.forEach(elem => {
		elem.pattern = '^[А-Яа-яЁё\s]+$';
	});
};

validateForm();


const listener = () => {

	document.addEventListener('click', (event) => {
		event.preventDefault();

		const target = event.target,
			popupCall = document.querySelector('.popup-call');

		if (target.classList.contains('call-btn') && target.tagName.toLowerCase() === 'a') {
			popupCall.style.display = 'block';
		}

		if (target.classList.contains('popup-close') || target.classList.contains('popup')) {
			popupCall.style.display = 'none';
		}

        //accordion
        const panelGroup = document.querySelectorAll('.panel-group');
        panelGroup.forEach(elem => {
            const accordionItems = document.querySelectorAll(`#${elem.id} .panel-default`);

            accordionItems.forEach(item => {
                const collapseItems = document.querySelectorAll(`#${elem.id} .panel-collapse`),
                    collapseItem = item.querySelector('.panel-collapse');
                if (target.closest('.panel-default') === item) {
                    collapseItems.forEach(item => item.classList.remove('in'));
                    collapseItem.classList.add('in');
                }
            });
        });
	});

	//message for validate form NAME
	const username = document.querySelectorAll('input[name=user_name]'),
		phoneUser = document.querySelectorAll('.phone-user');

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


};

listener();