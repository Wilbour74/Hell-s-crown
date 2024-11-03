import { resetArcherAnimations } from './animations.js';
export function market(scene) {
    if (!scene.pageMarketContainer) {
        scene.icon.setTexture('iconCross');

        // Background du market
        scene.pageMarket = scene.add.image(scene.middleX, scene.middleY, 'bannerMarket').setDisplaySize(scene.middleX*2, scene.middleY*2);

        scene.ruban = scene.add.image(scene.pageMarket.x, scene.pageMarket.y - scene.pageMarket.displayHeight / 2, 'rubanMarket').setScale(2)
        scene.marketText = scene.add.text(scene.pageMarket.x, scene.pageMarket.y - scene.pageMarket.displayHeight / 2 - 10, `Gold : ${scene.gold}`, {
            font: '20px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5).setScale(2);
    
    
        // Créer un container pour chaque bouton et son icône
        scene.speedButtonContainer = scene.add.container(0,-150).setScale(2);
        scene.speedButton = scene.add.image(0, 0, 'addButtonMarket').setInteractive();
        scene.speedIcon = scene.add.image(0, 0, 'iconAdd');
        scene.speedButtonContainer.add([scene.speedButton, scene.speedIcon]);
    
        // Ajouter du texte à gauche du bouton speed
        scene.speedText = scene.add.text(-scene.speedButton.displayWidth / 2 - 100, 0, `Speed shooters nv. ${scene.levelSpeed}`, {
            font: '20px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);
        scene.speedButtonContainer.add(scene.speedText);

        // Ajouter du texte à gauche du bouton speed
        scene.speedText = scene.add.text(-scene.speedButton.displayWidth / 2 + 100, 0, `côut : ${scene.costSpeed}`, {
            font: '20px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);
        scene.speedButtonContainer.add(scene.speedText);
    
    
        // Créer un container pour le bouton speed arrow et son icône
        scene.speedArrowButtonContainer = scene.add.container(0,0).setScale(2);
        scene.speedArrowButton = scene.add.image(0, 0, 'addButtonMarket').setInteractive();
        scene.speedArrowIcon = scene.add.image(0, 0, 'iconAdd');
        scene.speedArrowButtonContainer.add([scene.speedArrowButton, scene.speedArrowIcon]);
    
        // Ajouter du texte à gauche du bouton speed arrow
        scene.speedArrowText = scene.add.text(-scene.speedArrowButton.displayWidth / 2 - 100, 0, `SpeedArrow nv. ${scene.levelSpeedArrow}`, {
            font: '20px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);
        scene.speedArrowButtonContainer.add(scene.speedArrowText);

        // Ajouter du texte à gauche du bouton speed arrow
        scene.speedArrowText = scene.add.text(-scene.speedArrowButton.displayWidth / 2 + 100, 0, `côut : ${scene.costSpeedArrow}`, {
            font: '20px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);
        scene.speedArrowButtonContainer.add(scene.speedArrowText);
    
        // Créer un container pour le bouton damage et son icône
        scene.damageButtonContainer = scene.add.container(0, 150).setScale(2);
        scene.damageButton = scene.add.image(0, 0, 'addButtonMarket').setInteractive();
        scene.damageIcon = scene.add.image(0, 0, 'iconAdd');
        scene.damageButtonContainer.add([scene.damageButton, scene.damageIcon]);
    
        // Ajouter du texte à gauche du bouton damage
        scene.damageText = scene.add.text(-scene.damageButton.displayWidth / 2 - 100, 0, `Damage nv. ${scene.levelDamage}`, {
            font: '20px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);
        scene.damageButtonContainer.add(scene.damageText);

        // Ajouter du texte à gauche du bouton damage
        scene.damageText = scene.add.text(-scene.damageButton.displayWidth / 2 + 100, 0, `côut ${scene.costDamage}`, {
            font: '20px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);
        scene.damageButtonContainer.add(scene.damageText);
    
        
        scene.pageMarketContainer = scene.add.container(scene.pageMarket.x, scene.pageMarket.y);
        scene.pageMarketContainer.add([scene.speedButtonContainer, scene.speedArrowButtonContainer, scene.damageButtonContainer]);
    
        scene.speedButton.on('pointerdown', () => {
            if ((scene.gold - scene.costSpeed) >= 0) {                
                scene.gold -= scene.costSpeed;
                scene.speed += 1;
                // scene.costSpeed *= (1 + 0.20 * (scene.levelSpeed));
                scene.costSpeed = Math.round(scene.costSpeed * (1 + 0.15));
                resetArcherAnimations(scene);
                scene.levelSpeed += 1;
                market(scene);
                market(scene);
            }
        });
    
        scene.speedArrowButton.on('pointerdown', () => {
            if ((scene.gold - scene.costSpeedArrow) >= 0) {
                scene.gold -= scene.costSpeedArrow;
                scene.speedArrow += 50;
                // scene.costSpeedArrow *= (1 + 0.15 * (scene.levelSpeedArrow));
                scene.costSpeedArrow = Math.round(scene.costSpeedArrow * (1 + 0.15));
                scene.levelSpeedArrow += 1;
                market(scene);
                market(scene);
            }
        });
    
        scene.damageButton.on('pointerdown', () => {
            if ((scene.gold - scene.costDamage) >= 0) {
                scene.gold -= scene.costDamage;
                scene.damage += 10;
                // scene.costDamage *= (1 + 0.15 * (scene.levelDamage));
                scene.costDamage = Math.round(scene.costDamage * (1 + 0.15));
                scene.levelDamage += 1;
                market(scene);
                market(scene);
            }
        });

    } else {
        scene.icon.setTexture('iconMarket');
        if (scene.pageMarketContainer) {
            scene.pageMarketContainer.list.forEach(container => {
                container.destroy();
            });
            scene.pageMarket.destroy();
            scene.marketText.destroy();
            scene.pageMarketContainer.destroy();
            scene.ruban.destroy();

            scene.pageMarket = null;
            scene.pageMarketContainer = null;
            scene.speedButtonContainer = null;
            scene.speedButton = null;
            scene.speedIcon = null;
            scene.speedText = null;
            scene.speedArrowButtonContainer = null;
            scene.speedArrowButton = null;
            scene.speedArrowIcon = null;
            scene.speedArrowText = null;
            scene.damageButtonContainer = null;
            scene.damageButton = null;
            scene.damageIcon = null;
            scene.damageText = null;
            scene.marketText = null;
            scene.ruban = null;
        }
    }
}
