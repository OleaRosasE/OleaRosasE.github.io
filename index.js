document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("contact-form");
    const mensaje = document.getElementById("form-message");
    const secciones = document.querySelectorAll("section");
    const enlaces = document.querySelectorAll(".nav-link");
    const menuResposive = document.querySelector(".menu-res");

    menuResposive.onclick = function () {
        menu = document.querySelector(".menu");
        menu.classList.toggle("active");
    };

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

    enlaces.forEach(link => {
        link.addEventListener("click", () => {
            const navbar = document.querySelector(".menu");
            navbar.classList.remove("active");

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