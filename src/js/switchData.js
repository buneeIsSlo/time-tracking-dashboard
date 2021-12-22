/* Import data from data.json */
import data from "../data.json";

export default class SwitchData {

    constructor() {
        if(!this.vars()) return false;
        this.setUpEvents();
    }

    vars() {
        this.selectors = {
            statsList: ".card__list",
            currentStats: ".card__time",
            previousStats: ".card__history"
        }

        this.statsList = document.querySelector(`${this.selectors.statsList}`);
        this.currentStats = document.querySelectorAll(`${this.selectors.currentStats}`);
        this.previousStats = document.querySelectorAll(`${this.selectors.previousStats}`);

        this.activities = 6;

        return true;
    }

    /* Function to set up events */
    setUpEvents() {
        // List item click event listener
        this.statsList.addEventListener("click", event => {
            this.removeCurrentActiveStyles();
            event.target.classList.add("active");
            this.updateCurrStats(event.target.dataset.stats);
            this.updatePrevStats(event.target.dataset.stats);
        })

        this.statsList.addEventListener("keydown", event => {
            if(event.keyCode === 13) {
                this.removeCurrentActiveStyles();
                event.target.classList.add("active");
                this.updateCurrStats(event.target.dataset.stats);
                this.updatePrevStats(event.target.dataset.stats);
            }
        })

        // Add active class to Daily list item
        window.addEventListener("load", () => {
            this.statsList.children[0].classList.add("active");
        })
    }

    /* Function to remove active styles from current selected list item */
    removeCurrentActiveStyles() {
        Array.from(this.statsList.children).forEach(item => item.classList.remove("active"));
    }

    /* Function to upadate data(current) based on selected list item */
    updateCurrStats(type) {
        const regExp = /\d+/;

        for(let i = 0;  i < this.activities; i++) 
                this.currentStats[i].innerHTML = this.currentStats[i].innerHTML.replace(regExp, data[i].timeframes[type].current);
    }

    /* Function to upadate data(previous) based on selected list item */
    updatePrevStats(type) {
        const prefix = type === "daily" ? "Yesterday" : type === "weekly" ? "Last Week" : "Last Month";

        for(let j = 0; j < this.activities; j++) {
            let num = data[j].timeframes[type].previous
            this.previousStats[j].innerHTML = `${prefix} - ${num}hrs`;
        }
    }

}