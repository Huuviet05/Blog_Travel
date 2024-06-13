$(document).ready(function () {
	$('.menu-toggle').on('click', function () {
		$('.navi').toggleClass('showing');
		$('.navi ul').toggleClass('showing');
	});

	$('.post-wrapper').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		nextArrow: $('.next'),
		prevArrow: $('.prev'),
		responsive: [
			{
				breakpoint: 1224,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		],
	});
	// Filter Js
	$('.filter-item').click(function () {
		const value = $(this).attr('data-filter');
		if (value == 'all') {
			$('.post-box').show('1000');
		} else {
			$('.post-box')
				.not('.' + value)
				.hide('1000');
			$('.post-box')
				.filter('.' + value)
				.show('1000');
		}
	});
	// Add active to btn
	$('.filter-item').click(function () {
		$(this).addClass('active-filter').siblings().removeClass('active-filter');
	});
});

// Light-Dark Mode
const body = document.querySelector('body');
const changeColor = document.querySelectorAll('.swap-color');
const sliderTitles = document.querySelectorAll('.slider-title');
const recentPostTitles = document.querySelectorAll('.recent-post-title');
const checkbox = document.querySelector('input[type="checkbox"]');

checkbox.addEventListener('change', function () {
	if (this.checked) {
		changeColor.forEach((title) => {
			title.style.color = '#f8f8f8'; // Thay đổi màu sắc của thẻ h1 thành màu trắng (#fff)
		});
		body.style.background = '#2b2b2b'; // Thay đổi màu sắc background thành màu đỏ (#2b2b2b)
	} else {
		changeColor.forEach((title) => {
			title.style.color = '#444'; // Thay đổi màu sắc của thẻ h1 thành màu đen (#000)
		});
		body.style.background = '#f8f8f8'; // Thay đổi màu sắc background thành màu trắng (#f8f8f8)
	}
});

const postsPerPage = 3;
let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
	showPostsForPage(currentPage);
	generatePagination();
});

function showPostsForPage(page) {
	const posts = document.querySelectorAll('.post-box');
	const totalPages = Math.ceil(posts.length / postsPerPage);
	if (page < 1) page = 1;
	if (page > totalPages) page = totalPages;
	currentPage = page;

	posts.forEach((post, index) => {
		if (
			index >= (currentPage - 1) * postsPerPage &&
			index < currentPage * postsPerPage
		) {
			post.style.display = 'block';
		} else {
			post.style.display = 'none';
		}
	});

	updatePagination(totalPages);
}

function changePage(direction) {
	const posts = document.querySelectorAll('.post-box');
	const totalPages = Math.ceil(posts.length / postsPerPage);

	if (direction === 'next') {
		showPostsForPage(currentPage + 1);
	} else if (direction === 'prev') {
		showPostsForPage(currentPage - 1);
	} else if (direction === 'first') {
		showPostsForPage(1);
	} else if (direction === 'last') {
		showPostsForPage(totalPages);
	} else {
		showPostsForPage(parseInt(direction));
	}
}

function generatePagination() {
	const posts = document.querySelectorAll('.post-box');
	const totalPages = Math.ceil(posts.length / postsPerPage);
	const pageNumbersContainer = document.querySelector('.page-numbers');

	for (let i = 1; i <= totalPages; i++) {
		const pageNumber = document.createElement('span');
		pageNumber.className = 'page-number';
		pageNumber.textContent = i;
		pageNumber.onclick = () => changePage(i);
		pageNumbersContainer.appendChild(pageNumber);
	}

	// Set the first page as active initially
	document.querySelector('.page-number').classList.add('active');
}

function updatePagination(totalPages) {
	const pageNumbers = document.querySelectorAll('.page-number');
	pageNumbers.forEach((pageNumber, index) => {
		if (index + 1 === currentPage) {
			pageNumber.classList.add('active');
		} else {
			pageNumber.classList.remove('active');
		}
	});

	const prevButton = document.querySelector('.prev-page');
	const nextButton = document.querySelector('.next-page');
	const firstButton = document.querySelector('.first-page');
	const lastButton = document.querySelector('.last-page');

	if (currentPage === 1) {
		prevButton.disabled = true;
		prevButton.classList.add('disabled');
		firstButton.disabled = true;
		firstButton.classList.add('disabled');
	} else {
		prevButton.disabled = false;
		prevButton.classList.remove('disabled');
		firstButton.disabled = false;
		firstButton.classList.remove('disabled');
	}

	if (currentPage === totalPages) {
		nextButton.disabled = true;
		nextButton.classList.add('disabled');
		lastButton.disabled = true;
		lastButton.classList.add('disabled');
	} else {
		nextButton.disabled = false;
		nextButton.classList.remove('disabled');
		lastButton.disabled = false;
		lastButton.classList.remove('disabled');
	}
}
