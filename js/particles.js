const particleSets = {
    uncommon: [
        './assets/particles/uncommon-1.svg',
        './assets/particles/uncommon-2.svg',
        './assets/particles/uncommon-3.svg',
        './assets/particles/uncommon-4.svg',
        './assets/particles/uncommon-5.svg',
        './assets/particles/uncommon-6.svg',
        './assets/particles/uncommon-7.svg'
    ],
    rare: [
        './assets/particles/rare-1.svg',
        './assets/particles/rare-2.svg',
        './assets/particles/rare-3.svg',
        './assets/particles/rare-4.svg',
        './assets/particles/rare-5.svg',
        './assets/particles/rare-6.svg',
        './assets/particles/rare-7.svg'
    ],
    epic: [
        './assets/particles/epic-1.svg',
        './assets/particles/epic-2.svg',
        './assets/particles/epic-3.svg',
        './assets/particles/epic-4.svg',
        './assets/particles/epic-5.svg',
        './assets/particles/epic-6.svg',
        './assets/particles/epic-7.svg'
    ],
    legendary: [
        './assets/particles/legendary-1.svg',
        './assets/particles/legendary-2.svg',
        './assets/particles/legendary-3.svg',
        './assets/particles/legendary-4.svg',
        './assets/particles/legendary-5.svg',
        './assets/particles/legendary-6.svg',
        './assets/particles/legendary-7.svg'
    ],
    chroma: [
        './assets/particles/chroma-1.svg',
        './assets/particles/chroma-2.svg',
        './assets/particles/chroma-3.svg',
        './assets/particles/chroma-4.svg',
        './assets/particles/chroma-5.svg',
        './assets/particles/chroma-6.svg',
        './assets/particles/chroma-7.svg'
    ] /*,
    mystical: [
        './assets/particles/mystical-1.svg',
        './assets/particles/mystical-2.svg',
        './assets/particles/mystical-3.svg',
        './assets/particles/mystical-4.svg',
        './assets/particles/mystical-5.svg',
        './assets/particles/mystical-6.svg',
        './assets/particles/mystical-7.svg'
    ] */
};

const rarityColors = {
    uncommon: "#2ecc40",
    rare: "#2980b9",
    epic: "#a259f7",
    legendary: "#ffb700",
    chroma: "#ff69b4"
};

function getBrowserScale() {
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    return isFirefox ? 0.0833 : 0.15;
}

let game = null;
let currentType = null;

function destroyGame() {
    if (game) {
        game.destroy(true);
        game = null;
    }
    $('#close').hide();
}

function startParticle(type) {
    destroyGame();
    $('#close').show();
    currentType = type;

    const config = {
        type: Phaser.WEBGL,
        width: window.innerWidth,
        height: window.innerHeight,
        parent: 'phaser-canvas',
        transparent: true,
        scene: {
            preload: preload,
            create: function () { createParticles(this, type); }
        }
    };

    game = new Phaser.Game(config);

    function preload() {
        const set = particleSets[type];
        for (let i = 0; i < set.length; i++) {
            this.load.image(type + '-p' + (i + 1), set[i]);
        }
    }
}

function createParticles(scene, type) {
    const particles = [];

    for (let i = 1; i <= 7; i++) {
        particles.push(scene.add.particles(type + '-p' + i));
    }

    if (type === 'uncommon') {
        const emitters = particles.map(p => p.createEmitter({
            scale: getBrowserScale(),
            speed: 700,
            angle: { min: -115, max: -65 },
            gravityY: 700,
            frequency: 75,
            lifespan: 5000,
            x: { min: scene.sys.game.config.width / 2 - 25, max: scene.sys.game.config.width / 2 + 25 },
            y: scene.sys.game.config.height / 2 + 25,
            rotate: { onEmit: () => 0, onUpdate: (p) => p.angle + 1 }
        }));
        setTimeout(() => emitters.forEach(e => e.stop()), 5000);
    }

    else if (type === 'rare') {
        const emitters = [];
        for (let i = 0; i < 7; i++) {
            emitters.push(particles[i].createEmitter({
                scale: getBrowserScale(),
                speed: { min: 500, max: 550 },
                angle: { min: -70, max: -20 },
                velocity: { min: 600, max: 750 },
                gravityY: 500,
                frequency: 200,
                lifespan: 5000,
                x: { min: -25, max: 25 },
                y: scene.sys.game.config.height,
                rotate: { onEmit: () => 0, onUpdate: p => p.angle + 1 }
            }));
            
            emitters.push(particles[i].createEmitter({
                scale: getBrowserScale(),
                speed: { min: 500, max: 550 },
                angle: { min: -160, max: -110 },
                velocity: { min: 600, max: 750 },
                gravityY: 500,
                frequency: 200,
                lifespan: 5000,
                x: { min: scene.sys.game.config.width - 25, max: scene.sys.game.config.width + 25 },
                y: scene.sys.game.config.height,
                rotate: { onEmit: () => 0, onUpdate: p => p.angle + 1 }
            }));
        }
        setTimeout(() => emitters.forEach(e => e.stop()), 5000);
    }

    else if (type === 'epic') {
        for (let i = 0; i < 7; i++) {
            particles[i].createEmitter({
                scale: getBrowserScale(),
                speed: 450,
                angle: { min: -50, max: 0 },
                velocity: { min: 600, max: 750 },
                gravityY: 400,
                frequency: 150,
                lifespan: 5000,
                x: 0,
                y: { min: 0, max: scene.sys.game.config.height },
                rotate: { onEmit: () => 0, onUpdate: p => p.angle + 1 }
            });
            
            particles[i].createEmitter({
                scale: getBrowserScale(),
                speed: 450,
                angle: { min: -180, max: -130 },
                velocity: { min: 600, max: 750 },
                gravityY: 400,
                frequency: 150,
                lifespan: 5000,
                x: scene.sys.game.config.width,
                y: { min: 0, max: scene.sys.game.config.height },
                rotate: { onEmit: () => 0, onUpdate: p => p.angle + 1 }
            });
        }
    }

    else if (type === 'legendary') {
        for (let i = 0; i < 7; i++) {
            particles[i].createEmitter({
                scale: getBrowserScale(),
                speed: 500,
                angle: 90,
                velocity: 180,
                gravityY: 300,
                frequency: 65,
                lifespan: 5000,
                x: { min: 0, max: scene.sys.game.config.width },
                y: -50,
                rotate: { onEmit: () => 0, onUpdate: p => p.angle + 1 }
            });
        }
    }

    else if (type === 'chroma') {
        let ys = [];
        for (let i = 0; i < 7; i++) {
            ys.push(scene.sys.game.config.height - (651 + i));
        }
        for (let i = 0; i < 7; i++) {
            particles[i].createEmitter({
                speed: 1000,
                angle: -30,
                velocity: 700,
                gravityY: 0,
                frequency: 350 - i * 50,
                scale: getBrowserScale(),
                lifespan: { min: 2500, max: 3000 },
                y: { min: ys[i] + 300, max: scene.sys.game.config.height },
                x: 0,
                rotate: { onEmit: () => 0, onUpdate: p => p.angle + 1 }
            });

            particles[i].createEmitter({
                speed: 1000,
                angle: -150,
                velocity: 700,
                gravityY: 0,
                frequency: 350 - i * 50,
                scale: getBrowserScale(),
                lifespan: { min: 2500, max: 3000 },
                y: { min: ys[i] + 300, max: scene.sys.game.config.height },
                x: scene.sys.game.config.width,
                rotate: { onEmit: () => 0, onUpdate: p => p.angle + 1 }
            });

            particles[i].createEmitter({
                speed: 1000,
                angle: 30,
                velocity: 700,
                gravityY: 0,
                frequency: 350 - i * 50,
                scale: getBrowserScale(),
                lifespan: { min: 2500, max: 3000 },
                y: { min: 0, max: 301 + i },
                x: 0,
                rotate: { onEmit: () => 0, onUpdate: p => p.angle + 1 }
            });

            particles[i].createEmitter({
                speed: 1000,
                angle: -210,
                velocity: 700,
                gravityY: 0,
                frequency: 350 - i * 50,
                scale: getBrowserScale(),
                lifespan: { min: 2500, max: 3000 },
                y: { min: 0, max: 301 + i },
                x: scene.sys.game.config.width,
                rotate: { onEmit: () => 0, onUpdate: p => p.angle + 1 }
            });
        }
    }

    /* else if (type === 'mystical') {
        
        let ys = [];
        for (let i = 0; i < 7; i++) {
            ys.push(scene.sys.game.config.height - (651 + i));
        }
        for (let i = 0; i < 7; i++) {

            particles[i].createEmitter({
                scale: getBrowserScale(),
                speed: { min: 700, max: 750 },
                angle: { min: -70, max: -20 },
                velocity: { min: 600, max: 750 },
                gravityY: 500,
                frequency: 300,

                lifespan: 5000,
                x: { min: -25, max: 25 },
                y: scene.sys.game.config.height,
                rotate: {
                    onEmit: () => 0,
                    onUpdate: (p) => p.angle + 1
                }
            });

            particles[i].createEmitter({
                scale: getBrowserScale(),
                speed: { min: 700, max: 750 },
                angle: { min: -160, max: -110 },
                velocity: { min: 600, max: 750 },
                gravityY: 500,
                frequency: 300,

                lifespan: 5000,
                x: { min: scene.sys.game.config.width - 25, max: scene.sys.game.config.width + 25 },
                y: scene.sys.game.config.height,
                rotate: {
                    onEmit: () => 0,
                    onUpdate: (p) => p.angle + 1
                }
            });
        }

        for (let i = 0; i < 7; i++) {
            particles[i].createEmitter({
                scale: getBrowserScale(),
                speed: { min: 700, max: 750 },
                angle: { min: 70, max: 20 },
                velocity: { min: 600, max: 750 },
                gravityY: -500,
                frequency: 300,
                lifespan: 5000,
                x: { min: -25, max: 25 },
                y: 0,
                rotate: {
                    onEmit: () => 0,
                    onUpdate: (p) => p.angle + 1
                }
            });
            
            particles[i].createEmitter({
                scale: getBrowserScale(),
                speed: { min: 700, max: 750 },
                angle: { min: 160, max: 110 },
                velocity: { min: 600, max: 750 },
                gravityY: -500,
                frequency: 300,

                lifespan: 5000,
                x: { min: scene.sys.game.config.width - 25, max: scene.sys.game.config.width + 25 },
                y: 0,
                rotate: {
                    onEmit: () => 0,
                    onUpdate: (p) => p.angle + 1
                }
            });
        }
    } */
}

window.addEventListener('resize', () => {
    if (game) game.scale.resize(window.innerWidth, window.innerHeight);
});
