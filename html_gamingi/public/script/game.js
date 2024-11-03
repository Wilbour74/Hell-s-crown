import { preloadAssets } from './preload.js';
import { createAnimations, modifyHitbox } from './animations.js';
import { prepareShoot, shootArrow } from './shooting.js';

import { generateMobs, generateBoss } from './monster.js';
import { market } from "./market.js";

class Example extends Phaser.Scene {
    preload() {
        preloadAssets(this);
    }

    create() {
        var musicBool = localStorage.getItem("musique");
        this.effectBool = localStorage.getItem("effets");
        this.volumeEffect = this.effectBool === "Non" ? 0 : 0.2;

        if(musicBool == "Oui"){
            if (!this.music || !this.music.isPlaying) {
                this.music = this.sound.add('backgroundMusic');
                this.music.play({
                    loop: true,
                    volume: 0.1
                });
            }
        }

        
        this.middleX = this.sys.game.config.width / 2;
        this.middleY = this.sys.game.config.height / 2;
        this.distance = Infinity;
        this.coords = [{x: 0, y: 0}];


        this.gold = 0;

        this.speed = 10;
        this.levelSpeed = 1;
        this.costSpeed = 15;
        
        this.speedArrow = 300;
        this.levelSpeedArrow = 1;
        this.costSpeedArrow = 15;

        
        this.damage = 50;
        this.levelDamage = 1;
        this.costDamage = 10;
        
        this.inGame = false;
        this.inWave = false;
        this.wave = 0;
        
        this.nbGobz = 5;
        this.goblinHealth = 50;
        this.goblinDamage = 10;
        this.goblinGold = 10;
        
        this.bossSpeed = 50;
        this.bossDamage = 50;
        this.bossHealth = 500;
        this.bossGold = 100;
        

        let background = this.add.image(0, 0, 'backg').setOrigin(0.25, 0.25); // Origine en haut à gauche
        background.setDisplaySize(this.sys.canvas.width * 2, this.sys.canvas.height * 2); // Ajuste à la taille du canvas
        this.tower = this.physics.add.image(this.middleX, this.middleY, 'tower').setImmovable();
        this.tower.health = 1000;
        this.archer = this.add.sprite(this.middleX, this.middleY, "archer");

        this.button = this.add.image(this.middleX, (this.middleY * 2.5), 'buttonMarket').setInteractive().setScale(2.4);
        this.icon = this.add.image(this.middleX, this.middleX, 'iconMarket').setScale(2.2);

        this.buttonGroup = this.add.container(-125,0, [this.button, this.icon]);
        this.icon.setPosition(this.button.x, this.button.y);
///////////////
        this.rubanStart = this.add.image(this.middleX, (this.middleY * 2.5), 'rubanStart').setInteractive().setScale(1.5);
        this.rubanText = this.add.text(0, 0, `Start`, {
            font: '40px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);

        this.rubbanGroup = this.add.container(125,0, [this.rubanStart, this.rubanText]);
        this.rubanText.setPosition(this.rubanStart.x, this.rubanStart.y - 10);        
        
        this.rubanLife = this.add.image(1650, -150 , 'rubanLife').setScale(2.5);
        this.textLife = this.add.text(1650, -150, `Vie : ${this.tower.health}`, {
            font: '30px Arial',
            fill: '#ffffff'
        }).setScale(2);

        // this.ruban = this.add.image(2200, 70, 'rubanMarket').setScale(2.5)
        // this.marketText = this.add.text(2200, 70, `Gold : ${this.gold}`, {
        //     font: '30px Arial',
        //     fill: '#ffffff'
        // }).setScale(2);

        this.arrows = this.physics.add.group({
            defaultKey: 'arrow',
            maxSize: 1,
            createCallback: (arrow) => {
                arrow.body.setSize(arrow.frame.halfWidth, arrow.frame.halfHeight/2);
            }
        });
        
        this.goblinArmy = this.physics.add.group({
            defaultKey: 'torch_goblins',
            maxSize: 100,
            createCallback: (goblin) => {
                goblin.body.setSize(goblin.frame.halfWidth*0.65, goblin.frame.halfHeight/2);

                goblin.health = this.goblinHealth;
            }
        });
        
        this.button.on('pointerdown', () => {
            market(this);
        });
        // this.input.enableDebug(this.button);

        this.rubanStart.on('pointerdown', () => {
            if (!this.pageMarketContainer) {
                this.inGame = true;
                this.inWave = true;
                this.wave += 1;
                generateMobs(this, this.nbGobz);
            }
        });
        
        createAnimations(this);
        modifyHitbox(this);

        this.archer.anims.play('idle');
        this.cameras.main.setZoom(0.5);
    }

    update() {
        if ((this.goblinArmy.children.entries.length < 1 || !this.boss) && this.inGame === false && this.inWave == false) {
            this.arrows.children.each(arrow => {
                arrow.destroy();
            });
            if (!this.button && !this.rubanStart) {
                this.button = this.add.image(this.middleX, (this.middleY * 2.5), 'buttonMarket').setInteractive().setScale(2.4);
                this.icon = this.add.image(this.middleX, this.middleX, 'iconMarket').setScale(2.2);
        
                this.buttonGroup = this.add.container(-125,0, [this.button, this.icon]);
                this.icon.setPosition(this.button.x, this.button.y);

                this.rubanStart = this.add.image(this.middleX, (this.middleY * 2.5), 'rubanStart').setInteractive().setScale(1.5);
                this.rubanText = this.add.text(0, 0, `Start`, {
                    font: '40px Arial',
                    fill: '#ffffff'
                }).setOrigin(0.5);
        
                this.rubbanGroup = this.add.container(125,0, [this.rubanStart, this.rubanText]);
                this.rubanText.setPosition(this.rubanStart.x, this.rubanStart.y - 10);
                
                this.button.on('pointerdown', () => {
                    market(this);
                });
                // this.input.enableDebug(this.button);
        
                this.rubanStart.on('pointerdown', () => {
                    if (!this.pageMarketContainer) {
                        this.inGame = true;
                        this.inWave = true;
                        this.wave += 1;
                        generateMobs(this, this.nbGobz);

                    }
                });
            }
        } else {
            if (this.button && this.rubanStart) {
                this.button.destroy();
                this.button = null;
                this.icon.destroy();
                this.icon = null;
                this.buttonGroup.destroy();
                this.buttonGroup = null;
                this.rubanStart.destroy();
                this.rubanStart = null;
                this.rubanText.destroy();
                this.rubanText = null;
                this.rubbanGroup.destroy();
                this.rubbanGroup = null;
            }
            if (this.goblinArmy.children.entries.length < 1 && (!this.boss || this.boss == null) && this.inGame == true && this.inWave == false) {
                this.inGame = false;

                // this.goblinDamage *= (1 + 0.10 * (this.wave - 1));
                // this.goblinHealth *= (1 + 0.15 * (this.wave - 1));
                this.goblinDamage = Math.round(this.goblinDamage * 1.10);
                this.goblinHealth = Math.round(this.goblinHealth * 1.15);
                // this.goblinGold *= (1 + 0.05 * (this.wave - 1));
                this.goblinGold = Math.round(this.goblinGold * 1.05);
                this.nbGobz += 2;
                if(this.wave % 5 == 0){
                    this.bossHealth = Math.round(this.bossHealth * 1.25);
                    this.bossDamage = Math.round(this.bossDamage * 1.15);
                    this.bossGold = Math.round(this.bossGold * 1.15);
                }

            }
        }
        if ((this.goblinArmy || this.boss) && this.inGame === true) {
            let gobzArmy = this.goblinArmy.children.entries;
            if (gobzArmy.length > 0 || this.boss) {
                for (let index = 0; index < gobzArmy.length; index++) {
                    let distanceIndex = Phaser.Math.Distance.Between(gobzArmy[index].x, gobzArmy[index].y, this.middleX, this.middleY);
    
                    if (distanceIndex < this.distance) {
                        this.distance = distanceIndex;
                        this.coords.x = gobzArmy[index].x;
                        this.coords.y = gobzArmy[index].y;
                    }
                }

                if(this.boss){
                    if (!this.boss.body) return;
                    let distanceBoss = Phaser.Math.Distance.Between(this.boss.x, this.boss.y, this.middleX, this.middleY);
                    if (distanceBoss < this.distance) {
                        this.distance = distanceBoss;
                        this.coords.x = this.boss.x;
                        this.coords.y = this.boss.y;
                    }
                    
                }

                        const isAnimated = this.archer.anims; 
                        if (isAnimated.currentAnim === null || !isAnimated.currentAnim.key.includes("shoot")) {
                            if (this.arrows.getChildren().length < 1) {
                                prepareShoot(this);
                            }
                            this.archer.on('animationcomplete', (animation, frame) => shootArrow(this, animation, frame));
                        }
                        this.distance = Infinity;
            }
        } else {
        }
        if(this.dynamite){
            this.dynamite.rotation += 0.1;
        }

        if (this.inWave == true && (this.goblinArmy.children.entries.length < 1) && !this.boss) {
            this.inWave = false;
        }
        //     if(distanceBoss < this.distance){
        //         this.distance = distanceBoss;
        //         this.coords.x = boss.x;
        //         this.coords.y = boss.y;
        //     }
        //     if(isAnimated.currentAnim === null || !isAnimated.currentAnim.key.includes("shoot")){
        //         prepareShoot(this);
        //         this.archer.on('animationcomplete', (animation, frame) => shootArrow(this, animation, frame))
                
        //     }
        // }
        if(this.textLife){
            this.textLife.destroy()
            this.textLife = this.add.text(1525, -200, `Vie : ${this.tower.health}`, {
                font: '30px Arial',
                fill: '#ffffff'
            }).setScale(2);
        }

        // if(this.marketText){
        //     this.marketText.destroy();
        //     this.marketText = this.add.text(2070, 20, `Gold : ${this.gold}`, {
        //         font: '30px Arial',
        //         fill: '#ffffff'
        //     }).setScale(2);

        // }

        if (this.tower.health < 1) {
            window.location.href = "http://localhost:3000/";
        }
        

       
    }
}

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: Example,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);