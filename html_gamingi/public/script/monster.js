function generateCoordinates(scene){
    let x = "x"
    let y = "y"

    let tirage = Math.random();
    let resultat = tirage < 0.5 ? x : y;
    let resultatX, resultatY;
    if(resultat == "x"){
        let minX = (scene.sys.game.config.width/2) *-1;
        let maxX = scene.sys.game.config.width*1.33;  
        let tirage2 = Math.random();
        resultatX = tirage2 < 0.5 ? minX : maxX;
        resultatY = Math.floor(Math.random() * scene.sys.game.config.height*2);
    }else{
        let minY = (scene.sys.game.config.height/2) *-1;
        let maxY = scene.sys.game.config.height*1.5;
        let tirage3 = Math.random();
        resultatY = tirage3 < 0.5 ? minY : maxY;
        resultatX = Math.floor(Math.random() * scene.sys.game.config.width*2);
    }
    return { x: resultatX, y: resultatY };
}


function handleCollision(object1, object2) {
    // Comparer les positions pour déterminer le côté de la collision
    const overlapX = object1.x - object2.x;
    const overlapY = object1.y - object2.y;

    let side = '';

    // Vérifier sur l'axe X
    if (Math.abs(overlapX) > Math.abs(overlapY)) {
        if (overlapX > 0) {
            side = 'droite';
        } else {
            side = 'gauche';
        }
    } else {
        // Vérifier sur l'axe Y
        if (overlapY > 0) {
            side = 'bas';
        } else {
            side = 'haut';
        }
    }
    return side;
}



export function generateMobs(scene, mobsNumber) {

    const spawnInterval = 200;
    const speed = 200; 

    const number = localStorage.getItem("Ennemis")
    const ennemis = localStorage.setItem("Ennemis", 0)
    for (let i = 0; i < mobsNumber; i++) {

        setTimeout(() => {
            const coordinates = generateCoordinates(scene);
            if (!coordinates || typeof coordinates.x === 'undefined' || typeof coordinates.y === 'undefined') {
                console.error('Erreur: les coordonnées générées sont invalides.', coordinates);
                return;
            }

            const x = coordinates.x;
            const y = coordinates.y;

            const torch = scene.goblinArmy.get(x, y).setImmovable();
            if (scene.inWave == false && mobsNumber > 3) {
                scene.inWave = true;
            }


            const targetX = scene.sys.game.config.width / 2;
            const targetY = scene.sys.game.config.height / 2;

            if (x < targetX) {
                torch.anims.play('walk_torch').flipX = false;
            } else {
                torch.anims.play('walk_torch').flipX = true;
            }

            const angle = Phaser.Math.Angle.Between(torch.x, torch.y, targetX, targetY);

            // Définir la vitesse du gobelin en fonction de la direction
            torch.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);

            if((i == mobsNumber-3) && (scene.wave % 5 == 0)){
                setTimeout(() => {
                    generateBoss(scene)
                }, 3000)
            }

            if(i == 2){
                scene.inWave = false;
                scene.inGame = true;
            }

            scene.physics.add.collider(scene.goblinArmy, scene.tower, (tower, goblin) => {
                if (!goblin.isAttacking) {
                    goblin.isAttacking = true;

                    goblin.body.setVelocity(0, 0);
                    let whichSide = handleCollision(goblin, tower);
                    switch (whichSide) {
                        case "haut":
                            goblin.anims.play("attack_torch_down");
                            break;
                        case "bas":
                            goblin.anims.play("attack_torch_up");
                            break;
                        default:
                            goblin.anims.play("attack_torch");
                    }

                    goblin.on('animationcomplete', (animation, frame) => {
                        if (animation.key.includes('attack')) {
                            goblin.anims.play('idle');
                        }
                    });

                    goblin.on('animationrepeat', (animation, frame, index) => {
                        if (animation.key.includes('attack')) {
                            tower.health -= scene.goblinDamage;
                            scene.hit = scene.sound.add('hit');
                            scene.hit.play({
                                volume: scene.volumeEffect
                            })
                            if(tower.health <= 0){
                                goblin.anims.play('idle_torch');
                            }
                        }
                    });
                }
            });           
        }, i * spawnInterval);
    }
}

export function generateBoss(scene){

    if (scene.boss) {
        if (scene.shootLoop) {
            scene.shootLoop.remove(false);
        }

        if (scene.boss.moveEvent) {
            scene.boss.moveEvent.remove(false);
        }

        scene.boss.destroy();
        scene.boss = null;
    }
    const coordinates = generateCoordinates(scene);
    const x = coordinates.x;
    const y = coordinates.y;
    scene.boss = scene.physics.add.sprite(x, y).setImmovable();
    scene.boss.anims.play('walk_tnt')
    scene.boss.setScale(2.5);
    scene.boss.setSize(60, 60, true);
    scene.boss.health = scene.bossHealth;

    const targetX = scene.sys.game.config.width / 2;
    const targetY = scene.sys.game.config.height / 2;

    if (x < scene.middleX) {
        scene.boss.anims.play('walk_tnt').flipX = false;
    } else {
        scene.boss.anims.play('walk_tnt').flipX = true;
    }
    const speed = scene.bossSpeed;
    const angle = Phaser.Math.Angle.Between(scene.boss.x, scene.boss.y, scene.middleX, scene.middleY);
    
    scene.boss.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
    
    
    function animation() {
        let totalDistanceTraveled = 0;
        let targetDistance = 500;
        let stopDistance = 100;
    
        let initialX = scene.boss.x;
        let initialY = scene.boss.y;
    
        let moveBoss = scene.time.addEvent({
            delay: 16,
            callback: () => {
                if (!scene.boss || !scene.boss.body) return;
                scene.boss.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
                let distanceSinceLastStop = Phaser.Math.Distance.Between(initialX, initialY, scene.boss.x, scene.boss.y);
                let distanceToTarget = Phaser.Math.Distance.Between(scene.boss.x, scene.boss.y, targetX, targetY);
    
                if (distanceSinceLastStop >= stopDistance) {
                    totalDistanceTraveled += distanceSinceLastStop;

                    initialX = scene.boss.x;
                    initialY = scene.boss.y;
    
                    scene.boss.setVelocity(0, 0);
                    scene.boss.anims.play('throw_tnt');
                    throwTorch(scene, scene.boss.x, scene.boss.y);
    
                    scene.time.delayedCall(1000, () => {
                        if(!scene.boss || !scene.boss.body){ return }
                        if (distanceToTarget > targetDistance) {
                            scene.boss.anims.play('walk_tnt');
                            animation();
                        } else {
                            moveBoss.remove(false);
                            scene.boss.anims.play('idle_tnt')
                            startShootingLoop(); 
                        }
                    });
                    moveBoss.remove(false);
                }
            },
            loop: true
        });
    }

    function startShootingLoop() {
        scene.shootLoop = scene.time.addEvent({
            delay: 1500,
            callback: () => {
                if (!scene.boss || !scene.boss.body) return;
                scene.boss.anims.play('throw_tnt');
                throwTorch(scene, scene.boss.x, scene.boss.y);
                scene.boss.on('animationcomplete', (animation, frame) => {
                    scene.boss.anims.play('idle_tnt')
                })
                
            },
            loop: true
        });
    }
    
    animation();
    
    


}

export function throwTorch(scene, x, y){
    scene.activeTorches = scene.activeTorches || [];
    scene.dynamite = scene.physics.add.sprite(x, y).setImmovable();
    scene.dynamite.setSize(35,35)
    scene.dynamite.setOffset(10,10)
    scene.dynamite.setScale(2)
    scene.dynamite.anims.play('throw_torch')
    const speed = 300
    const angle = Phaser.Math.Angle.Between(x, y, scene.middleX, scene.middleY);
    
    scene.dynamite.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);

    scene.throw = scene.sound.add('throw')
    scene.throw = scene.throw.play({
        volume: scene.volumeEffect
    })

    scene.physics.add.collider(scene.dynamite, scene.tower, (dynamite, tower)=> {
        dynamite.destroy();
        scene.explosionS = scene.sound.add('explosion');
                scene.explosionS.play({
                    volume: scene.volumeEffect
        })
        tower.health -= scene.bossDamage;
        scene.explosion = scene.physics.add.sprite(dynamite.x, dynamite.y).setImmovable();
        scene.explosion.anims.play("explosion");
        scene.explosion.setScale(2);
        scene.explosion.on('animationcomplete', (animation, frame) => {
            if(animation.key.includes('explosion')){
                scene.explosion.destroy()
            }
        })

        scene.activeTorches.push(dynamite);
    })
}
