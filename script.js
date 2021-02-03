// for (let i = 0; i < 14; i++) {
//   let holder = "";
//   holder += "\t\t\t<audio id=\"" + i + "\">\n"
//   holder += "\t\t\t\t<source src=\"./audio/Haruna-" + (i < 10 ? ("0" + i) : i) + ".ogg\" type=\"audio/ogg\">\n"
//   holder += "\t\t\t</audio>\n"
//   audio_handler.innerHTML += holder;
// }

const quote = [
  "attack.ogg",
  "battle-start.ogg",
  "idle.ogg",
  "library.ogg",
  "night-battle.ogg",
  "secretary1.ogg",
  "secretary2.ogg",
  "secretary3.ogg",
];
var flag = 2, name = "haruna", searchWait = null;
const ambience = document.getElementById("ambience"),
		secretary = document.getElementById("secretary"),
		secImage = document.getElementById("image"),
		voice = document.getElementById("voice"),
		innerG = document.getElementById("innerG"),
		map = document.getElementById("map"),
		path = document.getElementById("path"),
		icons = document.getElementsByClassName("icon"),
		iconContainer = document.getElementById("icon-container"),
		searchBox = document.getElementById("searchbox");


function randQuote() {
	if (flag === 0) {
		const audio = quote[Math.floor(Math.random() * quote.length)];
		flag = 1;
		map.style.cursor = "unset";
		voice.setAttribute("src", "./audio/" + name + "/" + audio);
		voice.play();
		secretary.style.animation = "bounce 0.5s linear infinite";
	}
};

for (const icon of icons) {
	icon.addEventListener("click", function() {
		try {
			if(flag !== 2 && flag !== 3) {
				return;
			}
			flag = 1;
			for (const i of icons) {
				i.style.cursor = "unset";
			}
			map.style.cursor = "unset";
			
			// set the image
			name = this.dataset.name;
			let imagePath = "./img/" + name + ".webp";
			secImage.setAttribute("xlink:href", imagePath);
			
			let pathData = data[name];
			secretary.setAttribute("width", pathData.x);
			secretary.setAttribute("height", pathData.y);
			secretary.setAttribute("viewBox", "0 0 " + pathData.x + " " + pathData.y);
			innerG.setAttribute("transform", "translate(0," + pathData.y + ") scale(0.1,-0.1)");
			path.setAttribute("d", pathData.path);
			
			// start the fades
			secretary.style.animation = "fade-in 2s ease 1";
			iconContainer.style.animation = "fade-out 2s ease 1";
			
			setTimeout(function() {
				// console.log(secretary.style.animation);
				secretary.style.opacity = null;
				secretary.style.animation = "none !important";
				iconContainer.style.display = "none";
			}, 1950);
			
			// start the ambience
			ambience.play();
			ambience.loop = true;
			
			// play the beginning line
			voice.setAttribute("src", "./audio/" + name + "/sortie-start.ogg");
			voice.play();
		} catch(e) {
			console.error(e);
		}
	});
}

document.getElementById("back").addEventListener("click", function() {
	flag = 3;
	secretary.style.animation = "fade-out 2s ease 1";
	iconContainer.style.animation = "fade-in 2s ease 1";
	for (const i of icons) {
		i.style.cursor = null;
	}
	iconContainer.style.display = null;
	
	setTimeout(function() {
		secretary.style.opacity = 0;
	}, 1950);
});

searchBox.addEventListener("input", function() {
	if (searchWait !== null) clearTimeout(searchWait);
	searchWait = setTimeout(function() {
		if(!searchBox.value) return;
		
		const lev = new LevComparator(searchBox.value);
		console.log(Object.keys(data).sort(function(a, b) {
			return lev.compare(a, b);
		}));
	}, 500);
});

// var hour = 1;
var update = setInterval(function () {
	const clock = document.getElementById("clock");

	let time = new Date();
	let sec = time.getSeconds();
	let min = time.getMinutes();
	let hr = time.getHours();
	// let sec = time.getSeconds() * 3 % 60;
	// let min = 0;
	// let hr = hour;

	if (sec === 0 && min === 0 && flag === 0) {
		// console.log("run");
		flag = 1;
		map.style.cursor = "unset";
		let vcode = hr;
		vcode = String(vcode < 10 ? ("0" + vcode) : vcode);
		voice.setAttribute("src", "audio/" + name + "/" + vcode + ".ogg");
		voice.play();
		secretary.style.animation = "rotate 0.5s infinite";
	}

	if (voice.ended && flag !== 3) {
		secretary.style.animation = data[name].idle;
		flag = 0;
		map.style.cursor = null;
	}

	if (sec < 10) {
		sec = "0" + sec;
	}
	if (min < 10) {
		min = "0" + min;
	}
	if (hr < 10) {
		hr = "0" + hr;
	}
	clock.textContent = hr + ":" + min + ":" + sec;
});
