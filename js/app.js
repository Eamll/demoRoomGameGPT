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

            if (el.id === "option-1") {
                alert("op1")
            } else if (el.id === "option-2") {
                alert("op2")
            }
            // el.setAttribute('visible', false);
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
            { text: 'Option 1', action: 'next' },
            { text: 'Option 2', action: 'next' },
        ],
    }, {
        text: 'This is the third message.'
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
