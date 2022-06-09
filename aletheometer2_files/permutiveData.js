{
	let track = function (email) {
		const xmlhttp = new XMLHttpRequest();
		const theUrl = "https://nsmg.nsmgendpoints.co.uk/user_company/usercompanymatch";
		xmlhttp.open("POST", theUrl);
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.setRequestHeader("x-api-key", "GRJufHnAf4Dv4Tzu07jvaKfK0tA");
		xmlhttp.send(JSON.stringify({ "permutive_id": localStorage["permutive-id"], "company": fnExtractCompany(email) }));

	}
	let isValidEmail = function (email) {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}
	let fnExtractCompany = function (value) {
		return value.replace(/^[^@]*@/, '').replace(/\.[^\.]+$/, '').replace(/\.\b(co|mil|edu|info|gov)$/, '');
	}
	let waitForPermutive = setInterval(() => {
		if ('undefined' != typeof permutive) {
			let forms = document.getElementsByTagName('form');
			clearInterval(waitForPermutive);
			for (let form of forms) {
				form.addEventListener('formdata', function (e) {
					for (let el of e.target) {
						if (!isValidEmail(el.value)) {
							continue;
						}
						track(el.value);
					}
				});
			}
		}
	}, 100)
	jQuery('body').on('nsmgpollsResized', function () {
		jQuery('#nsmgpollswrap iframe.poll-loaded')[0].contentWindow.postMessage({
			nsmgpolls: { action: 'LoadSrc', data: { src: crbTracker.permutive.collectDomains } }
		}, '*')
	});
	window.addEventListener("message", (event) => {
		if ('undefined' === typeof event.data.nsmgtracking) {
			return;
		}
		if ('undefined' === typeof event.data.nsmgtracking.email) {
			return;
		}
		track(event.data.nsmgtracking.email);
	});
}
