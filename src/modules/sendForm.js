import {totalObj} from './calculate.js'; 
import clearForm  from './clearForm.js';

const sendForm = () => {

	const errorMessage = 'Что-то пошло не так....',
		loadMessage = 'Загрузка...',
		successMessage = 'Отправлено!';

	const forms = document.querySelectorAll('form'),
		popupDiscount = document.querySelector('.popup-discount'),
		popupDiscountInputs = popupDiscount.querySelectorAll('input');

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
					
			for (const key in totalObj) {
					body[key] = totalObj[key];
			}

			const isEmpty = (obj) => {
				for(const key in obj)
				{
					return false;
				}
				return true;
			};

			const calcIsEmpty = isEmpty(body);

			formData.forEach((val, key) => {
				body[key] = val;
			});

			postData(body)
				.then((response) => {
					if (response.status !== 200) {
						throw new Error('status network not 200');
					}
					statusMassage.setAttribute("style","height: auto;");
					statusMassage.textContent = successMessage;
					if (!calcIsEmpty){
						clearForm(calcIsEmpty);
					}
					for (const key in totalObj) {
						delete totalObj[key];
					}
					popupDiscountInputs.forEach(input => input.disabled = 'true');
					const popupDiscountStyle = () => {
						popupDiscount.style.display = 'none';
						popupDiscountInputs.forEach(input => input.disabled = false);
						statusMassage.textContent = '';
					}
					setTimeout (popupDiscountStyle, 2000);
					
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

export default sendForm;