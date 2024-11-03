class Example extends Phaser.Scene
{
    preload ()
    {
        this.load.image('blockA', 'assets/sprites/blockA.png');
        this.load.image('blockB', 'assets/sprites/blockB.png');
        this.load.image('blockC', 'assets/sprites/blockC.png');
        this.load.image('blockD', 'assets/sprites/blockD.png');
    }

    create ()
    {
        const blockA = this.physics.add.sprite(200, 290, 'blockA');
        const blockB = this.physics.add.sprite(400, 300, 'blockB');
        const blockC = this.physics.add.sprite(600, 310, 'blockC');
        const blockD = this.physics.add.sprite(500, 310, 'blockD');

        // const category1 = this.physics.nextCategory();

        //  blockA.setCollisionCategory(1);
        //  blockB.setCollisionCategory(2);
        //  blockC.setCollisionCategory(3);

        //  blockA.setCollidesWith(2);
        //  blockB.setCollidesWith(2);
        //  blockC.setCollidesWith(3);

        const blocks = [ blockB, blockC ];

        this.physics.add.collider(blockA, blocks);

        this.input.once('pointerdown', () => {

            blockA.setVelocityX(200);

        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 1980,
    height: 600,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: Example
};

const game = new Phaser.Game(config);

<<<<<<< HEAD
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
}
=======
if(distanceBoss % 150 == 0){
    Animation();
}
>>>>>>> Boss
