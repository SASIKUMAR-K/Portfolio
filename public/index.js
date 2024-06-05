// ---
const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont');
const smallMenu = document.querySelector('.header__sm-menu');
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu');
const headerHamMenuCloseBtn = document.querySelector(
	'.header__main-ham-menu-close'
);
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link');

hamMenuBtn.addEventListener('click', () => {
	if (smallMenu.classList.contains('header__sm-menu--active')) {
		smallMenu.classList.remove('header__sm-menu--active');
	} else {
		smallMenu.classList.add('header__sm-menu--active');
	}
	if (headerHamMenuBtn.classList.contains('d-none')) {
		headerHamMenuBtn.classList.remove('d-none');
		headerHamMenuCloseBtn.classList.add('d-none');
	} else {
		headerHamMenuBtn.classList.add('d-none');
		headerHamMenuCloseBtn.classList.remove('d-none');
	}
});

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
	headerSmallMenuLinks[i].addEventListener('click', () => {
		smallMenu.classList.remove('header__sm-menu--active');
		headerHamMenuBtn.classList.remove('d-none');
		headerHamMenuCloseBtn.classList.add('d-none');
	});
}

// ---
const headerLogoConatiner = document.querySelector('.header__logo-container');

headerLogoConatiner.addEventListener('click', () => {
	location.href = 'index.html';
});

const form = document.getElementById('contact-form');

form.addEventListener('submit', function (e) {
	e.preventDefault();
	const formData = new FormData(form);
	const object = Object.fromEntries(formData);
	const json = JSON.stringify(object);

	fetch('https://api.web3forms.com/submit', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: json,
	})
		.then(async (response) => {
			let json = await response.json();
			if (response.status == 200) {
				alert('Mail Sent Successfully');
			} else {
				console.log(response);
				result.innerHTML = json.message;
			}
		})
		.catch((error) => {
			console.log(error);
			alert('Something went wrong');
		})
		.then(function () {
			form.reset();
			setTimeout(() => {
				result.style.display = 'none';
			}, 3000);
		});
});
