

function sidebar() {

    var acc = document.getElementsByClassName("accordion");
    console.log(acc)
    for (var i = 0; i < acc.length; i++) {
        //console.log(acc[i])
        acc[i].addEventListener("click", function() {

            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
            this.classList.toggle("active");

            /* Toggle between hiding and showing the active panel */
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }

}
module.exports.sidebar = sidebar;