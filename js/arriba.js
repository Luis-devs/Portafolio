window.onscroll = () => {
    ir = document.getElementById("boton_arriba");
    head = document.getElementById("inicio");
    if (document.documentElement.scrollTop > 35) {
        ir.style.display = "block";
        head.classList.add("sticky");
        ir.addEventListener("click", () => {
            window.scrollTo({
                top: 0
            });
        });
    } else {
        ir.style.display = "none";
        head.classList.contains("sticky") ? head.classList.remove("sticky") : null;
    }
}