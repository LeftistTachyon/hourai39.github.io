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
var flag = false;
const ambience = document.getElementById("ambience");
ambience.play();
ambience.loop = true;

document.getElementById("haruna").addEventListener("click", function() {
  const voice = document.getElementById("voice");

  const audio = quote[Math.floor(Math.random() * quote.length)];
  flag = true;
  voice.setAttribute("src", "./audio/haruna/" + audio);
  voice.play();
  this.style.animationName = "bounce";
  this.style.animationDuration = "0.5s";
  this.style.animationTimingFunction = "linear";
});

setInterval(function () {
  const clock = document.getElementById("clock");
  const haruna = document.getElementById("haruna");
  const voice = document.getElementById("voice");

  let time = new Date();
  let sec = time.getSeconds();
  let min = time.getMinutes();
  let hr = time.getHours();
  // let sec = time.getSeconds() * 4 % 60;
  // let min = 0;
  // let hr = 1;

  if (sec === 0 && min === 0 && flag === false) {
    console.log("run");
    flag = true;
    let vcode = hr;
    vcode = String(vcode < 10 ? ("0" + vcode) : vcode);
    voice.setAttribute("src", "audio/haruna/" + vcode + ".ogg");
    voice.play();
    haruna.style.animationName = "rotate";
    haruna.style.animationDuration = "0.5s";
  }

  if (voice.ended) {
    haruna.style.animationName = "idle";
    haruna.style.animationDuration = "4s";
    haruna.style.animationTimingFunction = "ease";
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
