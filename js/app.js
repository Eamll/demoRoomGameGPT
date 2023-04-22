AFRAME.registerComponent('clickable', {
    init: function () {
        var el = this.el;
        el.addEventListener('click', function () {
            console.log('Clicked', el);
            el.setAttribute('visible', false);
        });
    }
});

AFRAME.registerComponent('key', {
    init: function () {
        var el = this.el;
        el.addEventListener('click', function () {
            console.log('Picked up key', el);
            el.parentNode.removeChild(el);
            var doorEl = document.getElementById('door');
            doorEl.setAttribute('door', 'key');
            doorEl.components.door.hasKey = true;
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
            if (this.hasKey) {
                el.parentNode.removeChild(el);
                document.getElementById('player').setAttribute('movement-controls', 'enabled', 'false');
                setTimeout(function () {
                    alert('You escaped!');
                    window.location.reload();
                }, 2000);
            } else {
                if (!el.getAttribute('animation')) {
                    el.setAttribute('animation', 'property: rotation; from: 0 20 0; to: 0 -20 0; dur: 100; easing: easeInOutSine; dir: alternate; loop: 3');
                }
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
