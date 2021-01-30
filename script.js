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
var flag = true;
const ambience = document.getElementById("ambience");
const haruna = document.getElementById("haruna");
const voice = document.getElementById("voice");

haruna.addEventListener("click", function() {
	const audio = quote[Math.floor(Math.random() * quote.length)];
	flag = true;
	voice.setAttribute("src", "./audio/haruna/" + audio);
	voice.play();
	this.style.animation = "bounce 0.5s linear infinite";
});

for (const icon of document.getElementsByClassName("icon")) {
	icon.addEventListener("click", function() {
		const iconContainer = document.getElementById("icon-container");
		
		// start the fades
		haruna.style.animation = "fade-in 2s ease 1";
		iconContainer.style.animation = "fade-out 2s ease 1";
		
		setTimeout(function() {
			// console.log(haruna.style.animation);
			haruna.style.opacity = null;
			haruna.style.animation = null;
			iconContainer.style.display = "none";
			
			flag = false;
		}, 2000);
		
		// start the ambience
		ambience.play();
		ambience.loop = true;
		
		// play the beginning line
		voice.setAttribute("src", "./audio/haruna/battle-start.ogg");
		voice.play();
	});
}

setInterval(function () {
	const clock = document.getElementById("clock");

	let time = new Date();
	let sec = time.getSeconds();
	let min = time.getMinutes();
	let hr = time.getHours();
	// let sec = time.getSeconds() * 3 % 60;
	// let min = 0;
	// let hr = 1;

	if (sec === 0 && min === 0 && flag === false) {
		// console.log("run");
		flag = true;
		let vcode = hr;
		vcode = String(vcode < 10 ? ("0" + vcode) : vcode);
		voice.setAttribute("src", "audio/haruna/" + vcode + ".ogg");
		voice.play();
		haruna.style.animation = "rotate 0.5s infinite";
	}

	if (voice.ended) {
		haruna.style.animation = "idle 6s ease infinite";
		flag = false;
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
