export function createAnimations(scene) {
    // anims de l'archer
    scene.anims.create({
        key: "idle",
        frames: scene.anims.generateFrameNumbers('archer', { start: 0, end: 5 }),
        frameRate: scene.speed,
        repeat: -1
    });

    scene.anims.create({
        key: "shoot_up",
        frames: scene.anims.generateFrameNumbers('archer', { start: 16, end: 23 }),
        frameRate: scene.speed
    });

    scene.anims.create({
        key: "shoot_side",
        frames: scene.anims.generateFrameNumbers('archer', { start: 32, end: 39 }),
        frameRate: scene.speed
    });

    scene.anims.create({
        key: "shoot_diag_up",
        frames: scene.anims.generateFrameNumbers('archer', { start: 24, end: 31 }),
        frameRate: scene.speed
    });

    scene.anims.create({
        key: "shoot_diag_down",
        frames: scene.anims.generateFrameNumbers('archer', { start: 40, end: 47 }),
        frameRate: scene.speed
    });

    scene.anims.create({
        key: "shoot_down",
        frames: scene.anims.generateFrameNumbers('archer', { start: 48, end: 55 }),
        frameRate: scene.speed
    });

    // anims du goblin à torche
    scene.anims.create({
        key: "idle_torch",
        frames: scene.anims.generateFrameNumbers('torch_goblins', { start: 0, end: 6}),
        frameRate: 10,
        repeat: -1
    })

    scene.anims.create({
        key: "attack_torch",
        frames: scene.anims.generateFrameNumbers('torch_goblins', { start: 14, end: 19}),
        frameRate: 8,
        repeat: -1,
    })

    scene.anims.create({
        key: "walk_torch",
        frames: scene.anims.generateFrameNumbers('torch_goblins', { start: 7, end: 12}),
        frameRate: 10,
        repeat: -1
    })

    scene.anims.create({
        key: "attack_torch_down",
        frames: scene.anims.generateFrameNumbers('torch_goblins', { start: 21, end: 26}),
        frameRate: 10,
        repeat: -1
    })

    scene.anims.create({
        key: "attack_torch_up",
        frames: scene.anims.generateFrameNumbers('torch_goblins', { start: 28, end: 33}),
        frameRate: 10,
        repeat: -1
    })

    scene.anims.create({
        key: "idle_tnt",
        frames: scene.anims.generateFrameNumbers('boss_goblins', { start: 0, end: 5}),
        frameRate: 10,
        repeat: -1
    })

    scene.anims.create({
        key: "walk_tnt",
        frames: scene.anims.generateFrameNumbers('boss_goblins', {start: 7, end: 12}),
        frameRate: 10,
        repeat: -1
    })

    scene.anims.create({
        key: "throw_tnt",
        frames: scene.anims.generateFrameNumbers('boss_goblins', {start: 14, end: 20}),
        frameRate: 10,
    })

    scene.anims.create({
        key: "throw_torch",
        frames: scene.anims.generateFrameNumbers('torch', {start: 0, end: 5}),
        frameRate: 10,
    })

    scene.anims.create({
        key: "explosion",
        frames: scene.anims.generateFrameNumbers('explosion', {start: 0, end: 8}),
        frameRate: 12,
    })

    scene.anims.create({
        key: "skull_anim",
        frames: scene.anims.generateFrameNumbers('skull', {start: 0, end: 13}),
        frameRate:10,
    })

    scene.anims.create({
        key: "drop_money",
        frames: scene.anims.generateFrameNumbers('money', {start:0, end: 6}),
        frameRate:10
    })
    
    scene.anims.create({
        key: "disapear_money",
        frames: scene.anims.generateFrameNumbers('money', {start:6, end: 0}),
        frameRate:10
    })
}
// hitbox

// console.log(scene.goblinArmy);

export function modifyHitbox(scene) {
    // console.log(scene.tower)
    scene.tower.setOffset(scene.tower.frame.halfWidth/5, scene.tower.frame.halfHeight/3);
    scene.tower.setSize(scene.tower.frame.halfWidth * 1.6, scene.tower.frame.halfHeight * 1.4, false);
    // scene.tower.body.setCircle(100);
    // scene.input.setDefaultCursor('url("../assets/TDAssets/Tiny Swords/UI/Pointers/01.png"), pointer');
}

export function resetArcherAnimations(scene) {
    // Liste des clés d'animations à créer
    const animations = [
        { key: "shoot_up", start: 16, end: 23 },
        { key: "shoot_side", start: 32, end: 39 },
        { key: "shoot_diag_up", start: 24, end: 31 },
        { key: "shoot_diag_down", start: 40, end: 47 },
        { key: "shoot_down", start: 48, end: 55 }
    ];

    scene.archer.anims.play('idle');
    // Supprimer les animations existantes
    animations.forEach(anim => {
        if (scene.anims.exists(anim.key)) {
            scene.anims.remove(anim.key);
            // scene.anims.get(anim.key) = null;
            // console.log(scene.anims.get(anim.key));
        }
    });

    // Recréer les animations
    animations.forEach(anim => {
        scene.anims.create({
            key: anim.key,
            frames: scene.anims.generateFrameNumbers('archer', { start: anim.start, end: anim.end }),
            frameRate: scene.speed,
            // repeat: anim.key === "idle" ? -1 : 0 // idle loop infinie, les autres ne sont pas en boucle
        });
    });
    console.log(scene.archer);
    console.log(scene.anims);
    console.log(scene.speed)
}