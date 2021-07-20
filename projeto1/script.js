document.body.addEventListener('keyup', (event) => {
    playSound(event.code.toLowerCase());
});

// Get all the desired elements into a node list
let elements = document.querySelectorAll(".key");

// Convert the node list into an Array so we can
// safely use Array methods with it
let elementsArray = Array.prototype.slice.call(elements);

// Loop over the array of elements
elementsArray.forEach(function (elem) {
    // Assign an event handler
    elem.addEventListener("click", function () {
        playSound(`key${this.innerHTML.toLowerCase()}`);
    });
});

document.querySelector('.composer button').addEventListener('click', () => {
    let song = document.querySelector('#input').value;

    if (song !== '') {
        let songArray = song.split('');
        playComposition(songArray);
    }

});

function playSound(sound) {
    let audioElement = document.querySelector(`#s_${sound}`);
    let keyElement = document.querySelector(`div[data-key="${sound}"]`);

    if (audioElement) {
        audioElement.currentTime = 0;
        audioElement.play();
    }

    if (keyElement) {
        keyElement.classList.add('active');

        setTimeout(
            () => {
                keyElement.classList.remove('active');
            }, 300
        )
    }

}

function playComposition(songArray) {
    let wait = 0;

    for (let songItem of songArray) {
        setTimeout(() => {
            playSound(`key${songItem}`);
        }, wait
        );
        wait += 250;
    }
}