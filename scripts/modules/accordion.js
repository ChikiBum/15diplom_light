import {targetPanelGroup} from './listener.js'; 

const accordion = (targetPanelGroup) => {
	const panelGroup = document.querySelectorAll('.panel-group');
	
	panelGroup.forEach(elem => {
		const accordionItems = document.querySelectorAll(`#${elem.id} .panel-default`);

		accordionItems.forEach((item, i) => {
			const collapseItems = document.querySelectorAll(`#${elem.id} .panel-collapse`),
				collapseItem = item.querySelector('.panel-collapse');

			if (targetPanelGroup.closest('.panel-default') === item && !targetPanelGroup.closest('#next-step')) {

				//Для тестов калькулятора. В продакш поменять item.classList.add('in')); 	.add на .remove
				collapseItems.forEach(item => item.classList.remove('in'));
				collapseItem.classList.add('in');
			}  else if (targetPanelGroup.closest('.panel-default') === item && targetPanelGroup.closest('#next-step')) {
				collapseItems.forEach(item => item.classList.remove('in'));
				accordionItems[i+1].querySelector('.panel-collapse').classList.add('in');
			}
		});
	});
};

export default accordion;