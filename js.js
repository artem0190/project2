const logo = document.querySelector('.header__timer-extra');
let count = 0;



let interval = setInterval(() => {
	count++;
	logo.innerHTML = count;
	if (count == 50) {
		clearInterval(interval);
		let intervalExtra = setInterval(() => {
			logo.innerHTML = count++;
			if (count == 101) {
				clearInterval(intervalExtra)
			}
		}, 80)
	}
}, 20)


/////////////////////////////////////////////
const mainProduct = document.querySelectorAll('.main__product-info');
const view = document.querySelector('.view');
const viewClose = document.querySelector('.view__close close');

document.addEventListener('dblclick', e => {
	const target = e.target;
	if (target.closest('.main__product-info')) {
		view.classList.add('active')
		document.body.classList.add('lock');
		const urlImage = target.closest('.main__product-info').querySelector('img').getAttribute('src');
		view.querySelector('img').setAttribute('src', urlImage);
	}

})

document.addEventListener('click', e => {
	const target = e.target;
	if (target.closest('.view__close') || target.tagName != 'IMG') {
		view.classList.remove('active')
		document.body.classList.remove('lock')
	}
})