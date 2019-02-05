
window.onload = function() {

	
//при наличии свободного домена всплытие сообщения "Домен свободен"

	var inputDomainName = document.getElementById('input-text');
	var btnSearch = document.querySelector('.btn-search');
	var freeDomen = document.querySelector('.free-domen');
	var domenName = document.querySelector('.domen-name');
	var firstBox = document.querySelector('.box-1');


	btnSearch.onclick = function(e) {
		e.preventDefault();
		if (inputDomainName.value !== '') {
			fadeInDomenNameInfo();
		}
	}

	document.addEventListener("keydown", closeDomenNameInfo);
	
	function closeDomenNameInfo(e) {
		if (e.keyCode === 27) {
			fadeOutDomenNameInfo();
		}
	}

	function fadeOutDomenNameInfo() {
		freeDomen.classList.remove('free-domen_fadein-info');
		freeDomen.classList.add('free-domen_fadeout-info');
		inputDomainName.value = '';
	}
	function fadeInDomenNameInfo() {
		if (freeDomen.classList.contains('free-domen_fadeout-info')) {
			freeDomen.classList.remove('free-domen_fadeout-info');
		}
		freeDomen.classList.add('free-domen_fadein-info');
		domenName.innerText = inputDomainName.value;
	}


//клик по стрелке в первом блоке
	var arrowNextPage = document.querySelector('.arrow-next-page');
	arrowNextPage.onclick = function() {
		var secondBox = document.querySelector('.box-2');
		secondBox.scrollIntoView({block: "start", behavior: "smooth"});
	}
//карусель
	var winTop = window.pageYOffset;
	var viewportHeight = document.documentElement.clientHeight;
	var viewportBottom = winTop + viewportHeight;
	var boxPage = document.getElementsByClassName('box');
	var valueDomains = document.getElementsByClassName('value-domain');

	function showNavigation() {
		var divCarouselPages = document.getElementsByClassName('page-nav');
		for (var i = 0; i < divCarouselPages.length; i++) {
			divCarouselPages[i].addEventListener('click', {handleEvent: scrollBox, idx: i});
			document.addEventListener('scroll', {handleEvent: changeActiveBtn, idx: i, btnCircle: divCarouselPages[i]});
		}
	//переход при клике карусели
		function scrollBox(e) {
			boxPage[this.idx].scrollIntoView({block: "start", behavior: "smooth"});
		}

	//изменение цвета для активной кнопки карусели
		function changeActiveBtn(e) {

			boxTop = boxPage[this.idx].getBoundingClientRect().top;
			boxBottom = boxTop - boxPage[this.idx].offsetHeight;

			if (viewportBottom > boxTop + 200 && !divCarouselPages[this.idx].classList.contains('current')) {
				divCarouselPages[this.idx].classList.add('current');
				for (var i = 0; i < boxPage.length; i++) {
					if (divCarouselPages[i].classList.contains('current') && divCarouselPages[i] !== divCarouselPages[this.idx]) {
						divCarouselPages[i].classList.remove('current');
					}
				}
			}
		}

		var domainsAdditionallyValues = document.getElementsByClassName('domains-additionally-values');
		

		for (var j = 0; j < domainsAdditionallyValues.length; j++) {
			var domainsAdditionallyValue = domainsAdditionallyValues[j];
			var flag = true;
			
			domainsAdditionallyValue.onclick = function(e) {
				var self = this;
				var target = e.target;
				while (target != self) {
					if (target.className.split(' ')[0] === 'value-domain') {
						Object.keys(valueDomains).forEach(function(valueDomain, idx, arrValueDomains) {
							if (target.className === valueDomains[valueDomain].className) {
								var i = idx;
								var divDomainValuesDesc = document.getElementsByClassName('domain-values-desc')[0];

								if (divDomainValuesDesc !== undefined) {
									if (divDomainValuesDesc.innerHTML !== domainContents[i]) {
										hideContent(i, divDomainValuesDesc);
										var divDomainValuesDesc = document.createElement('div');
										showContent(i, self, divDomainValuesDesc);
									} else {
										hideContent(i, divDomainValuesDesc);
									}
								} else {
									var divDomainValuesDesc = document.createElement('div');
									showContent(i, self, divDomainValuesDesc);
									posPointer(i);
								}
							}
						});
						
					}
					target = target.parentNode;
				}
			}
		}
	}

//Описание доступных возможностей при клике по иконке

	var domainContents = [
		`<span class="domain-content">Для любого вашего домена, зарегистрированного на «Джино», 
		вы можете в несколько кликов создать простую страницу-визитку. 
		Это удобно, если ваш основной сайт еще не готов, 
		или если домен вам нужен только для почты. 
		Вы можете разместить здесь краткую информацию о себе или вашем бизнесе, 
		ссылки на аккаунты в соцсетях и любые другие сайты. 
		Создание и поддержка базового варианта сайта-визитки абсолютно бесплатны.</span>`,

		`<span class="domain-content">Зарегистрировав домен через «Джино», 
		вы бесплатно получаете постоянную возможность изменения NS-записей и 
		направления домена туда, куда вам хочется. У вас несколько доменов? 
		Мы предоставляем бесплатную поддержку DNS для всех доменов, 
		зарегистрированных и поддерживаемых «Джино».</span>`,

		`<span class="domain-content">Подтвердите владение доменным именем с помощью официального сертификата «Джино». 
		Вам достаточно распечатать документ в формате PDF, 
		который будет доступен в панели управления сразу же после делегирования домена.</span>`,

		`<span class="domain-content">С помощью функции «Автопродление» больше не нужно беспокоиться о том, 
		что ваш домен внезапно перестанет работать. «Джино» заблаговременно 
		продлит регистрацию на следующий период и вышлет вам уведомление об этом.</span>`,

		`<span class="domain-content">Специально для своих клиентов «Джино» предлагает абсолютно бесплатный сервис 
		— «Джино.Облако». Это надежное место для хранения файлов — здесь точно поместится всё. 
		Вы получите постоянный доступ к своей музыке, фотографиям и документам 
		и сможете без труда делиться данными с кем угодно.</span>`,

		`<span class="domain-content">Будучи клиентом «Джино», вы можете бесплатно получить SSL-сертификат 
		от удостоверяющего центра Let’s Encrypt. Данный сертификат позволит 
		вашим сайтам работать по безопасному протоколу HTTPS и избежать 
		предупреждений браузера о том, что на сайте используется незашифрованное соединение.<br><br>
		Вы можете легко обзавестись сертификатом: в разделе «Домены» вашего аккаунта 
		выберите нужный домен и на странице его настроек перейдите во вкладку «SSL». 
		Сертификат выдаётся по нажатию одной кнопки и продлевается автоматически.</span>`,

		`<span class="domain-content">С помощью технологии цифрового подписывания ответа DNS-сервера 
		вы можете застраховаться от возможной его подмены и быть уверенными в том, 
		что посетители вашего сайта не попали на замаскированный сайт злоумышленников.<br><br>
		Для подключения DNSSEC необходимо перейти в соответствующую вкладку 
		в настройках вашего домена и нажать кнопку «Включить».</span>`,

		`<span class="domain-content">Зарегистрировав домен на «Джино», вы сможете в любой момент просто 
		и бесплатно перенаправить его на любую страницу любого сайта.<br><br>
		У вас есть своя группа в социальной сети? Дайте ей персональный домен и 
		она сможет стать полноценным сайтом, а не только страницей соцсети! 
		Персонифицирование при помощи перенаправления доменного имени от «Джино» — 
		это дополнительный инструмент в продвижении и идентификации вашей деятельности.</span>`
	];

	function showContent(i, self, divDomainValuesDesc) {		
		
		divDomainValuesDesc.className = 'col-12 domain-values-desc';
		divDomainValuesDesc.innerHTML = domainContents[i];
		self.appendChild(divDomainValuesDesc);
		setTimeout(function() {
			posPointer(i);
			divDomainValuesDesc.classList.add('domain-values-anim-fadein');
		}, 200);

	}
	function hideContent(i, divDomainValuesDesc) {
		
		divDomainValuesDesc.classList.remove('domain-values-anim-fadein');
		divDomainValuesDesc.classList.add('domain-values-anim-fadeout');
		setTimeout(function() {
			divDomainValuesDesc.remove();
		}, 200);
	}

	function posPointer(i) {
		var styleValue = document.head.appendChild(document.createElement("style"));
		switch (i) {
			case 0:
			case 4:
				styleValue.innerHTML = ".domain-values-desc:before {left: 11.3%;}";
				break;
			case 1:
			case 5:
				styleValue.innerHTML = ".domain-values-desc:before {left: 36.3%;}";
				break;
			case 2:
			case 6:
				styleValue.innerHTML = ".domain-values-desc:before {left: 61.3%;}";
				break;
			case 3:
			case 7:
				styleValue.innerHTML = ".domain-values-desc:before {left: 86.6%;}";
				break;
		}
	}

	setTimeout(function() {
		window.scrollTo(0,0);
	});

	if (window.innerWidth > 859) {
		showNavigation();
	} else {
		var divCarousel = document.querySelector('.carousel');
		divCarousel.remove();
		if (window.innerWidth <= 859) {

//открытие и закрытие модального окна (доступные возможности при клике по иконке)
			var backdrop = document.querySelector('.backdrop');
			var wrapPopup = document.querySelector('.wrap-popup');
			var popup = document.querySelector('.popup');
			for (var i = 0; i < valueDomains.length; i++) {
				valueDomains[i].addEventListener('click', {handleEvent: openPopup, idx: i});
				function openPopup() {
					backdrop.classList.add('showblock', 'fade-in-backdrop');
					wrapPopup.classList.add('showblock', 'fade-in-elem');
					popup.innerHTML = `${domainContents[this.idx]}<br><button class="btn btn-close-popup">Закрыть</button>`;
					var btnClosePopup = document.querySelector('.btn-close-popup');
					btnClosePopup.addEventListener("click", fadeOutPopup);
				}
			}

			document.addEventListener("keydown", closePopup);
			backdrop.addEventListener('click', fadeOutPopup);

			function closePopup(e) {
				if (e.keyCode === 27) {
					fadeOutPopup();
				}
			}

			function fadeOutPopup() {
				if (backdrop.classList.contains('showblock') && wrapPopup.classList.contains('showblock')) {
					backdrop.classList.remove('fade-in-backdrop');
					backdrop.classList.add('fade-out-backdrop');
					wrapPopup.classList.remove('fade-in-elem');
					wrapPopup.classList.add('fade-out-elem');
					setTimeout(function() {
						backdrop.classList.remove('showblock', 'fade-out-backdrop');
						wrapPopup.classList.remove('showblock', 'fade-out-elem');
						popup.innerHTML = '';
					}, 500);
					
				}
			}
		}
	}
};


