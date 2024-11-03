export function preloadAssets(scene) {
    scene.load.image('backg', '../assets/backbackback.png');
    scene.load.image('tower', '../assets/TDAssets/Tiny Swords/Factions/Knights/Buildings/Tower/Tower_Blue.png');
    scene.load.image('buttonMarket', '../assets/TDAssets/Tiny Swords/UI/Buttons/Button_Hover.png');
    scene.load.image('addButtonMarket', '../assets/TDAssets/Tiny Swords/UI/Buttons/Button_Blue.png');
    scene.load.image('iconMarket', '../assets/TDAssets/Tiny Swords/UI/Icons/Regular_07.png');
    scene.load.image('iconAdd', '../assets/TDAssets/Tiny Swords/UI/Icons/Regular_08.png');
    scene.load.image('iconCross', '../assets/TDAssets/Tiny Swords/UI/Icons/Regular_01.png');
    scene.load.image('bannerMarket', '../assets/TDAssets/Tiny Swords/UI/Banners/Carved_9Slides.png');

    scene.load.image('rubanStart', '../assets/TDAssets/Tiny Swords/UI/Ribbons/Ribbon_Blue_3Slides.png')

    scene.load.image('rubanMarket', '../assets/TDAssets/Tiny Swords/UI/Ribbons/Ribbon_Yellow_3Slides.png')
    scene.load.image('rubanLife', '../assets/TDAssets/Tiny Swords/UI/Ribbons/Ribbon_Red_3Slides.png');

    scene.load.spritesheet('arrow', '../assets/TDAssets/Tiny Swords/Factions/Knights/Troops/Archer/Arrow/Arrow.png', { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('archer', '../assets/TDAssets/Tiny Swords/Factions/Knights/Troops/Archer/Blue/Archer_Blue.png', { frameWidth: 192, frameHeight: 192 });
    scene.load.spritesheet('torch_goblins', '../assets/TDAssets/Tiny Swords/Factions/Goblins/Troops/Torch/Red/Torch_Red.png', { frameWidth: 192, frameHeight: 192 });
    scene.load.spritesheet('boss_goblins', '../assets/TDAssets/Tiny Swords/Factions/Goblins/Troops/TNT/Red/TNT_Red.png', { frameWidth: 192, frameHeight: 192});
    scene.load.spritesheet('torch', '../assets/TDAssets/Tiny Swords/Factions/Goblins/Troops/TNT/Dynamite/Dynamite.png', { frameWidth: 64, frameHeight: 64});
    scene.load.spritesheet('explosion', '../assets/TDAssets/Tiny Swords/Effects/Explosion/Explosions.png', { frameWidth: 192, frameHeight: 192});
    scene.load.spritesheet('skull', '../assets/TDAssets/Tiny Swords/Factions/Knights/Troops/Dead/Dead.png', { frameWidth: 128, frameHeight: 128});
    scene.load.spritesheet('money', '../assets/TDAssets/Tiny Swords/Resources/Resources/G_Spawn.png', { frameWidth: 128, frameHeight: 128});
    scene.load.audio('backgroundMusic', '../assets/music.mp3');
    scene.load.audio('goblin-death', '../assets/goblin-death.mp3');
    scene.load.audio('arrow', '../assets/arrow.mp3');
    scene.load.audio('hit', '../assets/hit.mp3');
    scene.load.audio('throw', '../assets/throw.mp3');
    scene.load.audio('explosion', '../assets/explosion.mp3')

}
