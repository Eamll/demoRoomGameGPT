AFRAME.registerComponent('clickable', {
    init: function () {
        var el = this.el;
        el.addEventListener('click', function () {
            console.log('Clicked', el);

        });
    }
});

AFRAME.registerComponent('opciones', {
    init: function () {
        var el = this.el;
        el.addEventListener('click', function () {
        });
    }
});

AFRAME.registerComponent('door', {
    schema: {
        key: { type: 'boolean', default: false }
    },
    init: function () {
        this.hasKey = false;
        var el = this.el;
        el.addEventListener('click', function () {
            console.log('Clicked door', el);
            if (!el.getAttribute('animation')) {
                el.setAttribute('animation', 'property: rotation; from: 0 20 0; to: 0 -20 0; dur: 100; easing: easeInOutSine; dir: alternate; loop: 3');
            }
        }.bind(this));

        el.addEventListener('animationcomplete', function () {
            el.setAttribute('rotation', '0 0 0');
            el.removeAttribute('animation');
        });


    }

});
AFRAME.registerComponent('camera-mover', {
    init: function () {
        var el = this.el;
        el.addEventListener('click', function () {
            console.log('Clicked', el);
            var cameraEl = document.getElementById('player');
            var currentPosition = cameraEl.getAttribute('position');
            var newPosition = { x: currentPosition.x, y: currentPosition.y + 1, z: currentPosition.z };

            cameraEl.setAttribute('animation', {
                property: 'position',
                to: newPosition,
                dur: 1000, // duration of the animation in milliseconds
                easing: 'easeInOutQuad' // easing function
            });
        });
    }
});

const dialogs = [
    {
        text: "Un dia soleado, caminando hacia la escuela, te encuentras con tu amiga, quien te propone ir a un lugar especial despues de clases.",
    },
    {
        text: "¿Que decides hacer?",
        options: [
            { text: "Negarse" },
            { text: "Ir con tu amiga" },
        ],
    },
    {
        text: "Decides negarte y seguir caminando hacia la escuela. Mas tarde, te enteras de que habia personas sospechosas en ese lugar. ¡Buena decision!",
        route: "option1",
        end: true,
    },
    {
        text: "Decides ir con tu amiga. Al llegar al lugar, sientes que algo no esta bien y ves personas que parecen estar en problemas.",
        route: "option2",
    },
    {
        text: "¿Que haces a continuacion?",
        options: [
            { text: "Escapar y llamar a la policia" },
            { text: "Tratar de ayudar a esas personas" },
        ], route: "option2",
    },
    {
        text: "Decides escapar rapidamente y llamar a la policia. Gracias a tu llamada, la policia rescata a las personas en peligro y evita un caso de trata y trafico de personas. ¡Bien hecho!",
        route: "option1",
    },
    {
        text: "Decides tratar de ayudar a esas personas, pero te ves atrapado en una situacion peligrosa. Afortunadamente, alguien ve lo que esta sucediendo y llama a la policia. Todos son rescatados, pero aprendiste la importancia de pedir ayuda a las autoridades en situaciones como esta.",
        route: "option2",
    },
];


function typeText(element, message, index, callback) {
    if (index < message.length) {
        element.setAttribute('value', element.getAttribute('value') + message[index]);
        setTimeout(function () {
            typeText(element, message, index + 1, callback);
        }, 50);
    } else {
        if (callback) {
            callback();
        }
    }
}
function clearOptions() {
    const option1 = document.getElementById("text-op1");
    const option2 = document.getElementById("text-op2");

    option1.setAttribute("text", {
        value: "",
    });
    option2.setAttribute("text", {
        value: "",
    });

    // Remove click event listeners
    const option1Entity = document.getElementById("option-1");
    const option2Entity = document.getElementById("option-2");

    option1Entity.outerHTML = option1Entity.outerHTML;
    option2Entity.outerHTML = option2Entity.outerHTML;
}


function showDialog(index, currentRoute) {
    if (index < dialogs.length) {
        const dialog = dialogs[index];
        const dialogBox = document.getElementById("dialog-box");

        // Clear the previous text
        dialogBox.setAttribute("value", "");

        // Type the new text
        typeText(dialogBox, dialog.text, 0, () => {
            // If there are options, display them
            if (dialog.options) {
                const option1 = document.getElementById("text-op1");
                const option2 = document.getElementById("text-op2");

                option1.setAttribute("text", {
                    value: dialog.options[0].text,
                    color: "#080808",
                    width: 1,
                });
                option2.setAttribute("text", {
                    value: dialog.options[1].text,
                    color: "#080808",
                    width: 1,
                });

                // Add event listeners for the options
                const option1Entity = document.getElementById("option-1");
                const option2Entity = document.getElementById("option-2");
                const cameraPositionsOption1 = [
                    { x: 0, y: 1.6, z: -2 },
                    { x: 1, y: 1.6, z: -2 },
                ];

                const cameraPositionsOption2 = [
                    { x: 0, y: 1.6, z: -3 },
                    { x: -1, y: 1.6, z: -3 },
                ];

                option1Entity.addEventListener("click", () => {
                    showDialog(index + 1, 'option1');
                    moveCamera(cameraPositionsOption1, 0);
                });
                option2Entity.addEventListener("click", () => {
                    showDialog(index + 2, 'option2');
                    moveCamera(cameraPositionsOption2, 0);
                });
            } else {
                clearOptions();
                // If there are no options, automatically display the next dialog
                if (!dialog.end) {
                    setTimeout(() => {
                        let nextIndex = index + 1;

                        // If the next dialog has a route and it doesn't match the current route, skip it
                        while (dialogs[nextIndex] && dialogs[nextIndex].route && dialogs[nextIndex].route !== currentRoute) {
                            nextIndex++;
                        }

                        showDialog(nextIndex, currentRoute);
                    }, 1000);
                }

            }
        });
        dialogBox.setAttribute("text", {
            width: 1,
            wrapCount: 20,
        });
    }
}


function moveCamera(positions, index) {
    if (index < positions.length) {
        const cameraEl = document.getElementById("player");
        const newPosition = positions[index];

        cameraEl.setAttribute("animation", {
            property: "position",
            to: newPosition,
            dur: 1000, // duration of the animation in milliseconds
            easing: "easeInOutQuad", // easing function
            complete: () => moveCamera(positions, index + 1),
        });
    }
}

window.addEventListener("DOMContentLoaded", (event) => {
    showDialog(0)
});
