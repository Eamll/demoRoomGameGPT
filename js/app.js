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
            document.getElementById('door').setAttribute('door', 'key');
        });
    }
});

AFRAME.registerComponent('door', {
    schema: {
        key: { type: 'boolean', default: false }
    },
    init: function () {
        var el = this.el;
        el.addEventListener('click', function () {
            console.log('Clicked door', el);
            if (el.getAttribute('door').key) {
                el.parentNode.removeChild(el);
                document.getElementById('player').setAttribute('movement-controls', 'enabled', 'false');
                setTimeout(function () {
                    alert('You escaped!');
                    window.location.reload();
                }, 2000);
            } else {
                el.setAttribute('animation', 'property: rotation; from: 0 20 0; to: 0 -20 0; dur: 100; easing: easeInOutSine; dir: alternate; loop: 3');
            }
        });
    }
});