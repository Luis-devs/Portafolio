window.onscroll = () => {
    ir = document.getElementById("boton_arriba");

    if (document.documentElement.scrollTop > 35) {

        ir.style.display = "block";
        ir.addEventListener("click", () => {
            window.scrollTo({
                top: 0
            });
        });
    } else {
        ir.style.display = "none";
    }
}