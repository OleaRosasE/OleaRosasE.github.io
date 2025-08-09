document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("contact-form");
    const mensaje = document.getElementById("form-message");
    const secciones = document.querySelectorAll("section");
    const enlaces = document.querySelectorAll(".nav-link");
    const menuResposive = document.querySelector(".menu-res");
    const menu = document.querySelector(".menu");



    document.addEventListener("click", (e) => {
    // Si el menú está activo y el click NO fue dentro del menú
    if (menu.classList.contains("active") && !menu.contains(e.target) && e.target !== btnMenu) {
        menu.classList.remove("active");
    }
});



    window.addEventListener("scroll", () => {

        let actual = "";

        secciones.forEach(section => {
            const seccionTop = section.offsetTop;                           //Obtener la seccion superior respecto del documento
            const seccionHeight = section.offsetHeight;                 //Obtener la altura de la seccion

            if (pageYOffset >= seccionTop - seccionHeight / 3) {    //Evaluar si se ha alcanzado 1/3 de la seccion actual
                actual = section.getAttribute("id");                            //Guardar la etiqueta actual en la variable actual
            }
        });

        enlaces.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${actual}`) {               //Comparamos si el enlace coincide con el id de la seccion
                link.classList.add("active");
            }
        });
    });

    menuResposive.onclick = function () {
        menu.classList.toggle("active");
    };

    enlaces.forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("active");
        });
    });

    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();
        const datos = new FormData(formulario);

        try {
            const respuesta = await fetch(formulario.action, {
                method: "POST",
                body: datos,
                headers: {
                    Accept: "application/json"
                }
            });

            if (respuesta.ok) {
                mensaje.style.display = "block";
                mensaje.textContent = "Gracias por contactarme, te escribiré pronto";
                formulario.reset();

            } else {
                mensaje.style.display = "block";
                mensaje.style.color = "red";
                mensaje.textContent = "Ocurrió un error, por favor intentalo una vez más";
            }
            setTimeout(() => {
                mensaje.style.display = "none";
            }, 15000); //Ocultar el mensaje tras 5 segundos
        } catch (error) {
            mensaje.style.display = "block";
            mensaje.style.color = "red";
            mensaje.textContent = "Ocurrió un error, por favor intentalo una vez más";
        }
    });
});