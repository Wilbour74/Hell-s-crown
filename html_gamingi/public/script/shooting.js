// fonction pour l'anim de l'archer

import { generateBoss, generateMobs } from "./monster.js";
export function prepareShoot(scene, bigX, bigY) {
    const width = scene.sys.game.config.width;
    const height = scene.sys.game.config.height;

    const thirdWidth = width / 3;
    const thirdHeight = height / 3;

    let direction = '';

    if (scene.coords.x < thirdWidth) {
        direction = 'Ouest';
    } else if (scene.coords.x > 2 * thirdWidth) {
        direction = 'Est';
    }

    if (scene.coords.y < thirdHeight) {
        direction = 'Nord' + (direction ? '-' + direction : '');
    } else if (scene.coords.y > 2 * thirdHeight) {
        direction = 'Sud' + (direction ? '-' + direction : '');
    } else if (!direction) {
        direction = 'Centre';
    }

    switch (direction) {
        case "Nord":
            scene.archer.anims.play('shoot_up');
            break;
        case "Nord-Est":
            scene.archer.anims.play('shoot_diag_up').flipX = false;
            break;
        case "Est":
            scene.archer.anims.play('shoot_side').flipX = false;
            break;
        case "Sud-Est":
            scene.archer.anims.play('shoot_diag_down').flipX = false;
            break;
        case "Sud":
            scene.archer.anims.play('shoot_down');
            break;
        case "Nord-Ouest":
            scene.archer.anims.play('shoot_diag_up').flipX = true;
            break;
        case "Ouest":
            scene.archer.anims.play('shoot_side').flipX = true;
            break;
        case "Sud-Ouest":
            scene.archer.anims.play('shoot_diag_down').flipX = true;
            break;
        default:
            scene.archer.anims.play('shoot_side');
    }
}

// fonction pour le tir de la fleche
export function shootArrow(scene, animation, frame) {
    if (animation.key.includes("shoot")) {
        const arrow = scene.arrows.get(scene.archer.x, scene.archer.y);

        if (arrow) {
          arrow.setActive(true);
          arrow.setVisible(true);

          
          const angle = Phaser.Math.Angle.Between(
              scene.archer.x,
              scene.archer.y,
              scene.coords.x,
              scene.coords.y
            );
            
            
            arrow.setRotation(angle);
            
            const speed = scene.speedArrow;
            scene.physics.velocityFromRotation(angle, speed, arrow.body.velocity);
            scene.throwT = scene.sound.add('arrow');
            scene.throwT.play({
                volume: scene.volumeEffect
            })
          // systeme de collision
            scene.physics.add.collider(arrow, scene.goblinArmy, (arrow, goblin) => {
                arrow.destroy();
                goblin.health -= scene.damage;

                if (goblin.health <= 0) {
                    scene.death = scene.sound.add('goblin-death');
                    scene.death.play({
                        volume: scene.volumeEffect
                    })
                    goblin.destroy();
                    scene.gold += scene.goblinGold;
                    scene.money = scene.physics.add.sprite(goblin.x, goblin.y).setImmovable();
                    scene.money.anims.play('drop_money')
                    scene.money.on('animationcomplete', (animation, frame) => {
                        scene.money.destroy()
                    })
                }
            });

            scene.physics.add.collider(arrow, scene.boss, (arrow, goblin) => {
                arrow.destroy();
                const boss = scene.boss
                boss.health -= scene.damage;
                if(boss.health <= 0){
                    scene.death = scene.sound.add('goblin-death');
                    scene.death.play({
                        volume: scene.volumeEffect
                    })
                    boss.destroy();
                    scene.gold += scene.bossGold;
                    scene.boss = null;

                    scene.activeTorches.forEach(dynamite => {
                        dynamite.destroy();
                    });

                    scene.activeTorches = [];
                    // scene.explosion = scene.physics.add.sprite(boss.x, boss.y).setImmovable();
                    // scene.explosion.anims.play("explosion");
                    scene.money = scene.physics.add.sprite(goblin.x, goblin.y).setImmovable().setScale(2)
                    scene.money.anims.play('drop_money');
                    scene.money.on('animationcomplete', (animation, frame) => {
                        scene.money.destroy()
                    })
                }
                
            })

          scene.time.addEvent({
            delay: 3000,
            callback: () => {
              arrow.destroy();
            },
            callbackScope: this,
          });
        }

        scene.archer.anims.play('idle');
    }
}
