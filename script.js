function moveRandomEl(elm) {
    elm.style.position = "absolute";
    elm.style.top = Math.floor(Math.random() * 90 + 5) + "%";
    elm.style.left = Math.floor(Math.random() * 90 + 5) + "%";
}

document.addEventListener("DOMContentLoaded", function() {
    const moveRandom = document.querySelector("#move-random");
    
    if (moveRandom) {
        const triggerMove = (target) => moveRandomEl(target instanceof Event ? target.target : target);

        moveRandom.addEventListener("mouseenter", function(e) {
            triggerMove(e);
        });

        moveRandom.addEventListener("click", function(e) {
            triggerMove(e);
        });

        moveRandom.addEventListener("keydown", function(e) {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                e.preventDefault();
                moveRandomEl(moveRandom);
            }
        });
    }
});