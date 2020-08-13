const cards = document.querySelectorAll('.card');
var Flipped = false;
var a, b;//1st and 2nd card
var lock = false;

cards.forEach(card => card.addEventListener("click", flip));

function flip() {
    if (lock) return;
    if (this === a) return;
    this.classList.add("flip");
    if (!Flipped) {
        Flipped = true;
        a = this;
        return;
    }
    b = this;
    check();
}

function check() {
    var Match = a.dataset.image === b.dataset.image;
    Match ? success() : fail();
}

function success() {
    a.removeEventListener("click", flip);
    b.removeEventListener("click", flip);
    reset();
}

function fail() {
    lock = true;
    setTimeout(() => {
        a.classList.remove("flip");
        b.classList.remove("flip");
        reset();
    }, 1000);
}

function reset() {
    [Flipped, lock] = [false, false];
    [a, b] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        var position = Math.floor(Math.random() * 16);
        card.style.order = position;
    })
})();