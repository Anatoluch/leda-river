// Подключение точек пагинации справа page-nav
	$('#page-nav').onePageNav({
		currentClass: 'active',
		changeHash: false,
		scrollSpeed: 750,
		scrollThreshold: 0.5,
		filter: '',
		easing: 'swing',
		begin: function () {},
		end: function () {},
		scrollChange: function ($currentListItem) {}
	});