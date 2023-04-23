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

            // if (el.id === "option-1") {
            //     alert("op1")
            // } else if (el.id === "option-2") {
            //     alert("op2")
            // }
            // // el.setAttribute('visible', false);
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
        text: 'This is the first message.'
    },
    {
        text: 'This is the second message.',
        options: [
            { text: 'Optcion 1 omg' },
            { text: 'Opcion 22' },
        ],
    }, {
        text: 'This is the third message.'
    },
    {
        text: 'This is the fourth Aliquip culpa laborum ut incididunt. Culpa in consectetur ea duis qui duis ut dolor labore ipsum dolore sit. Mollit irure adipisicing esse veniam nisi id ut ut. Dolor deserunt enim cillum reprehenderit labore aliqua tempor dolore. Adipisicing occaecat culpa ipsum amet. Cupidatat ea mollit pariatur commodo veniam reprehenderit eu..'
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



function showDialog(index) {
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

                option1Entity.addEventListener("click", () => {
                    showDialog(index + 1);
                });
                option2Entity.addEventListener("click", () => {
                    showDialog(index + 2);
                });
            } else {
                // If there are no options, automatically display the next dialog
                setTimeout(() => {
                    showDialog(index + 1);
                }, 1000);
            }
        });
        dialogBox.setAttribute("text", {
            width: 1,
            wrapCount: 20,
        });
    }
}
window.addEventListener("DOMContentLoaded", (event) => {
    showDialog(0)
});
