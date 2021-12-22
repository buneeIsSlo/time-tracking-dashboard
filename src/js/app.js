/* CSS imports */
import "../css/normalize.css";
import "../css/variables.css";
import "../css/loader.css";
import "../css/app.css";

/* JS imports */
import SwitchData from "../js/switchData.js";
import Animation from "../js/animation.js";

const animation = new Animation;
const switchData = new SwitchData;
const statsCard = Array.from(document.querySelectorAll(".card__stats"));

/* Stats card background effect on hover */
statsCard.forEach(card => {
    card.addEventListener("mousemove", event => {
        let hori = event.pageX - card.offsetLeft;
        let vert = event.pageY - card.offsetTop;

        card.style.setProperty("--top", hori + "px");
        card.style.setProperty("--left", vert + "px");
    });
});

/* Attribution :) */
console.log("(\\ /)\n(0_0) Coded this.");