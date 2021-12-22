import anime from "animejs/lib/anime.es.js";

export default class Animation {

    constructor() {
        if(!this.vars()) return false;
        this.setUpEvents();
    }

    vars() {
        this.selectors = {
            body: "body",
            progressBar: ".blue__progress",
            loaderImage: ".blue img",
            loaderGreeting: ".blue__greeting",
            loaderMessage: ".blue__message",
            loaderCards: ".loader",
            cardProfile: ".card__profile",
            cardImage: ".card__image",
            cardName: ".card__name",
            cardReport: ".card__report",
            cardStats: ".card__stats",
            yellow: ".yellow"
        }

        this.body = document.querySelector(`${this.selectors.body}`);
        this.progressBar = document.querySelector(`${this.selectors.progressBar}`);
        this.loaderImage = document.querySelector(`${this.selectors.loaderImage}`);
        this.loaderGreeting = document.querySelector(`${this.selectors.loaderGreeting}`);
        this.loaderMessage = document.querySelector(`${this.selectors.loaderMessage}`);
        this.loaderCards = Array.from(document.querySelectorAll(`${this.selectors.loaderCards}`));
        this.cardProfile = document.querySelector(`${this.selectors.cardProfile}`);
        this.cardImage = document.querySelector(`${this.selectors.cardImage}`);
        this.cardName = document.querySelector(`${this.selectors.cardName}`);
        this.cardReport = document.querySelector(`${this.selectors.cardReport}`);
        this.cardStats = Array.from(document.querySelectorAll(`${this.selectors.cardStats}`));
        this.yellow = document.querySelector(`${this.selectors.yellow}`);

        this.randomWidth = Math.random() * (30 - 0) + 1;
        this.reducedMotionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

        return true;
    }

    /* Function to set up events */
    setUpEvents() {
        // Set up animations based on users prefered motion
        if(this.prefersReducedMotion(this.reducedMotionMediaQuery)) 
            this.removeLoader();
        else
            window.addEventListener("load", () => this.loadingAnimations());        
    }

    /* Function to check if user prefers reduced motion */
    prefersReducedMotion(query) {
        if(!query || query.matches) return true;
        return false;
    }

    /* Function to remove the loader and its trail */
    removeLoader() {
        return this.loaderCards.forEach(card => card.remove()); 
    }

    /* Function to display loading animations */
    loadingAnimations() {
        this.progressBar.style.opacity = "1";
        anime({
            targets: this.progressBar,
            width: [`${this.randomWidth}%`, "100%"],
            easing: "easeOutInCirc",
            duration: 3000,
            begin: () => this.loadingOnBegin(),
            complete: () => this.loadingOnEnd()

        })
    }

    /* Function to animate elements when "loading" begins */
    loadingOnBegin() {

        anime({
            targets: this.loaderImage,
            scale: [.75, 1],
            opacity: [0, 1],
            easing: "easeInOutCirc"
        })

        anime({
            targets: this.loaderGreeting,
            translateY: [-30, 0],
            duration: 1200,
            opacity: [0, 1],
            easing: "easeInOutQuart"
        })

        anime({
            targets: this.loaderMessage,
            translateY: [-30, 0],
            duration: 1200,
            opacity: [0, 1],
            delay: 200,
            easing: "easeInOutQuart"
        })
    }

    /* Function to animate elements when "loading" ends */
    loadingOnEnd() {
        anime({
            targets: this.loaderImage,
            scale: [1, .25],
            opacity: [1, 0],
            duration: 2000,
            easing: "easeInOutQuart"
        })

        anime({
            targets: this.loaderGreeting,
            translateX: [0, -200],
            duration: 1500,
            opacity: [1, 0],
            easing: "easeInOutQuart"
        })

        anime({
            targets: this.loaderMessage,
            translateX: [0, -200],
            duration: 1500,
            opacity: [1, 0],
            delay: 100,
            easing: "easeInOutQuart",
        })

        anime({
            targets: this.loaderCards,
            height: ["100%", "0%"],
            easing: "easeInExpo",
            duration: 1200,
            delay: (_, i) => i * 25,
            complete: () => this.removeLoader()
        })

        anime({
            targets: this.yellow,
            complete: () => {
                // Call dashboard animation when the last trail's animation is complete
                this.dashboardAnimation()

                // Reset body overflow to auto
                this.body.style.overflow = "auto";
            }
        })
    }

    /* Function to animate some elements on the dashboard */
    dashboardAnimation() {
        anime({
            targets: [this.cardProfile, ...this.cardStats],
            scale: [.9, 1],
            opacity: [0, 1],
            duration: 2000,
            easing: "easeOutExpo",
        })

        anime({
            targets: this.cardImage,
            translateY: [-20, 0],
            scale: [.7, 1],
            opacity: [0, 1],
            duration: 1500,
            easing: "easeInOutQuart"
        })

        anime({
            targets: [this.cardName, this.cardReport],
            translateX: [-20, 0],
            opacity: [0, 1],
            duration: 1400,
            delay: (_, i) => i * 100,
            easing: "easeInOutExpo"
        })
    }

}