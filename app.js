// Smooth scrolling for anchor links
const smoothScroll = function(target, duration) {
	const targetElement = document.querySelector(target);
	const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
	const startPosition = window.pageYOffset;
	const distance = targetPosition - startPosition;
	let startTime = null;

	const animation = function(currentTime) {
		if (startTime === null) {
			startTime = currentTime;
		}

		const timeElapsed = currentTime - startTime;
		const run = ease(timeElapsed, startPosition, distance, duration);
		window.scrollTo(0, run);

		if (timeElapsed < duration) {
			requestAnimationFrame(animation);
		}
	};

	const ease = function(t, b, c, d) {
		t /= d / 2;
		if (t < 1) {
			return c / 2 * t * t + b;
		}
		t--;
		return -c / 2 * (t * (t - 2) - 1) + b;
	};

	requestAnimationFrame(animation);
};

// Smooth scrolling for banner CTA button
const bannerButton = document.querySelector('#banner .cta-btn');
bannerButton.addEventListener('click', function(e) {
	e.preventDefault();
	const target = bannerButton.getAttribute('href');
	const duration = 1000;
	smoothScroll(target, duration);
});

// Enlarge photo boxes on hover
const photoBoxes = document.querySelectorAll('.photo-box');
photoBoxes.forEach(function(box) {
	box.addEventListener('mouseover', function() {
		box.querySelector('img').style.transform = 'scale(1.1)';
	});
	box.addEventListener('mouseout', function() {
		box.querySelector('img').style.transform = 'scale(1)';
	});
});

// When the user submits the sign-up form, display a confirmation message
const signUpForm = document.querySelector('#signup form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm-password');
const signUpButton = document.querySelector('#signup .cta-btn');

signUpButton.addEventListener('click', function(e) {
	e.preventDefault();
	signUpForm.submit();
});

signUpForm.addEventListener('submit', function(e) {
	e.preventDefault();

	// Validate form inputs
	const nameValue = nameInput.value.trim();
	const emailValue = emailInput.value.trim();
	const passwordValue = passwordInput.value;
	const confirmPasswordValue = confirmPasswordInput.value;

	if (nameValue === '') {
		alert('Please enter your name.');
		nameInput.focus();
		return;
	}

	if (emailValue === '') {
		alert('Please enter your email.');
		emailInput.focus();
		return;
	}

	if (passwordValue === '') {
		alert('Please enter a password.');
		passwordInput.focus();
		return;
	}

	if (confirmPasswordValue === '') {
		alert('Please confirm your password.');
		confirmPasswordInput.focus();
		return;
	}

	if (passwordValue !== confirmPasswordValue) {
		alert('Your password and confirmation password do not match.');
		passwordInput.focus();
		return;
	}

	// Submit form
	alert(`Thank you, ${nameValue}! Your account has been created. Please check your email for further instructions.`);
	signUpForm.reset();
});
