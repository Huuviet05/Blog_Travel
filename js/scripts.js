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
const changeBg = document.querySelectorAll('.change-bg');
const sliderTitles = document.querySelectorAll('.slider-title');
const checkbox = document.querySelector('input[type="checkbox"]');

checkbox.addEventListener('change', function () {
	if (this.checked) {
		changeColor.forEach((title) => {
			title.style.color = '#f8f8f8'; // Thay đổi màu sắc của thẻ h1 thành màu trắng (#fff)
		});
		changeBg.forEach((element) => {
			element.style.backgroundColor = '#3b3b3b'; // Change background color to dark
		});
		body.style.background = '#3b3b3b'; // Thay đổi màu sắc background thành màu đỏ (#2b2b2b)
	} else {
		changeColor.forEach((title) => {
			title.style.color = '#444'; // Thay đổi màu sắc của thẻ h1 thành màu đen (#000)
		});
		changeBg.forEach((element) => {
			element.style.backgroundColor = '#f8f8f8'; // Change background color to dark
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

// autocomplete - search

let availableKeywords = [
	{ keyword: 'Tháp Eiffel', url: '../posts/single.html' },
	{ keyword: 'Đại Nội Huế', url: '../posts/single.html' },
	{ keyword: 'Hawaii', url: '../posts/single.html' },
	{
		keyword: 'Tour Nepal – Hành Trình Himalaya',
		url: '../posts/single.html',
	},
	{
		keyword: 'Chùa Chureito - Núi Phú Sỹ, Nhật Bản',
		url: '../posts/single.html',
	},
	{
		keyword: 'VinWonders Nha Trang - Công viên giải trí của những kỷ lục',
		url: '../posts/single.html',
	},
	{
		keyword: 'Bán Đảo Sơn Trà - Đà Nẵng',
		url: '../posts/single.html',
	},
	{ keyword: 'Sapa - Lào Cai', url: '../posts/single.html' },
	{ keyword: 'Biển Mỹ Khê - Đà Nẵng', url: '../posts/single.html' },
	{
		keyword: 'Nhà thờ Đức Bà - TP Hồ Chí Minh',
		url: '../posts/single.html',
	},
	{ keyword: 'Vịnh Hạ Long - Quảng Ninh', url: '../posts/single.html' },
	{
		keyword: 'Phong Nha Kẻ Bàng - Quảng Bình',
		url: '../posts/single.html',
	},
	{ keyword: 'Phú Quốc - Kiên Giang', url: '../posts/single.html' },
	{ keyword: 'Ba Vì - Hà Nội', url: '../posts/single.html' },
	{
		keyword: 'Phố cổ Hội An - Quảng Nam',
		url: '../posts/single.html',
	},
	{
		keyword: 'Tượng Chúa Ki-tô Vua - Vũng Tàu',
		url: '../posts/single.html',
	},
	{
		keyword: 'Hồ Ba Bể – Bắc Kạn',
		url: '../posts/single.html',
	},
	{
		keyword: 'Đảo Cát Bà – Hải Phòng',
		url: '../posts/single.html',
	},
	{
		keyword: 'Bãi Biển Sầm Sơn - Thanh Hóa',
		url: '../posts/single.html',
	},
	{
		keyword: 'Bãi Biển Đồ Sơn - Hải Phòng',
		url: '../posts/single.html',
	},
	{
		keyword: 'Tam Đảo - Vĩnh Phúc',
		url: '../posts/single.html',
	},
	{
		keyword: 'Ba Vì - Hà Nội',
		url: '../posts/single.html',
	},
	{
		keyword: 'Tràng An - Ninh Bình',
		url: '../posts/single.html',
	},
	{
		keyword: 'Thác Bản Giốc - Cao Bằng',
		url: '../posts/single.html',
	},
];

const resultsBox = document.querySelector('.result-box');
const inputBox = document.getElementById('input-box');

inputBox.onkeyup = function () {
	let result = [];
	let input = inputBox.value;
	if (input.length) {
		result = availableKeywords.filter((keywordObj) => {
			return keywordObj.keyword.toLowerCase().includes(input.toLowerCase());
		});
	}
	display(result);
};

function display(result) {
	if (result.length) {
		const content = result
			.map((keywordObj) => {
				return `<li data-url="${keywordObj.url}">${keywordObj.keyword}</li>`;
			})
			.join(''); // Join array elements to form a single string
		resultsBox.innerHTML = '<ul>' + content + '</ul>';
		resultsBox.style.visibility = 'visible'; // Make the result box visible
		resultsBox.style.opacity = '1'; // Make the result box fully opaque

		// Add click event listener to each list item
		const listItems = resultsBox.querySelectorAll('li');
		listItems.forEach((item) => {
			item.addEventListener('click', function () {
				const url = this.getAttribute('data-url');
				window.location.href = url; // Navigate to the URL
			});
		});
	} else {
		resultsBox.innerHTML = '';
		resultsBox.style.visibility = 'hidden'; // Hide the result box
		resultsBox.style.opacity = '0'; // Make the result box fully transparent
	}
}

// Optional: Hide results when clicking outside of the input or results box
document.addEventListener('click', function (event) {
	if (!inputBox.contains(event.target) && !resultsBox.contains(event.target)) {
		resultsBox.style.visibility = 'hidden';
		resultsBox.style.opacity = '0';
	}
});

// Contact
const inputs = document.querySelectorAll('.input');

function focusFunc() {
	let parent = this.parentNode;
	parent.classList.add('focus');
}

function blurFunc() {
	let parent = this.parentNode;
	if (this.value == '') {
		parent.classList.remove('focus');
	}
}

inputs.forEach((input) => {
	input.addEventListener('focus', focusFunc);
	input.addEventListener('blur', blurFunc);
});
