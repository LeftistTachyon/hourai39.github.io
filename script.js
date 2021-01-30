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
var flag = 2, name = "haruna";
const ambience = document.getElementById("ambience");
const secretary = document.getElementById("secretary");
const voice = document.getElementById("voice");

secretary.addEventListener("click", function() {
	if (flag === 0) {
		const audio = quote[Math.floor(Math.random() * quote.length)];
		flag = 1;
		voice.setAttribute("src", "./audio/" + name + "/" + audio);
		voice.play();
		this.style.animation = "bounce 0.5s linear infinite";
		this.style.cursor = null;
	}
});

for (const icon of document.getElementsByClassName("icon")) {
	icon.addEventListener("click", function() {
		if(flag !== 2) {
			return;
		}
		flag = 1;
		
		const iconContainer = document.getElementById("icon-container");
		
		// set the image
		name = this.dataset.name;
		secretary.setAttribute("src", "./img/" + name + ".webp");
		secretary.style.cursor = null;
		
		// start the fades
		secretary.style.animation = "fade-in 2s ease 1";
		iconContainer.style.animation = "fade-out 2s ease 1";
		
		setTimeout(function() {
			// console.log(secretary.style.animation);
			secretary.style.opacity = null;
			secretary.style.animation = "none !important";
			iconContainer.style.display = "none";
		}, 2000);
		
		// start the ambience
		ambience.play();
		ambience.loop = true;
		
		// play the beginning line
		voice.setAttribute("src", "./audio/" + name + "/sortie-start.ogg");
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

	if (sec === 0 && min === 0 && flag === 0) {
		// console.log("run");
		flag = 1;
		secretary.style.cursor = null;
		let vcode = hr;
		vcode = String(vcode < 10 ? ("0" + vcode) : vcode);
		voice.setAttribute("src", "audio/" + name + "/" + vcode + ".ogg");
		voice.play();
		secretary.style.animation = "rotate 0.5s infinite";
	}

	if (voice.ended) {
		secretary.style.animation = "idle 6s ease infinite";
		secretary.style.cursor = "pointer";
		flag = 0;
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
