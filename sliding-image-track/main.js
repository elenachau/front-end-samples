const track = document.getElementById("image-track");

window.onmousedown = (e) => {
  track.dataset.mouseDownAt = e.clientX; // update every time mouse is pressed down
};

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

window.onmousemove = (e) => {
    if(track.dataset.mouseDownAt == "0") return;
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
    const percentage = (mouseDelta / maxDelta) * -100; //create virtual slider
        nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;


    nextPercentage = Math.max(Math.min(nextPercentage, 0), -100);
    // Math.min(nextPercentage, 0);
    // Math.max(nextPercentage, -100);

    track.style.transform = 'translate(${nextPercentage}%, -50%';
    track.animate({
        transform: `translate($(nextPercentage}%, -50%)`
    }, {duration: 1200, fill: "forwards"});

    for(const image of track.getElementsByClassName("image")) {
        // image.style.objectPosition = '${nextPercentage + 100} 50%';
        image.animate({
            objectPosition: `${100 + nextPercentage}% center`
        }, {duration: 1200, fill: "forwards"});
    }
};