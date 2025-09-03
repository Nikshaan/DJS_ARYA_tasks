const variables = {
    width: 800,
    height: 600,
    roadHeight: 80,
    initPokeballSpeed: 80,
    playerSpeed: 3,
    collision: 32,
    roadDist: 400
};

const colors ={
    road: 0x34495e,
    gameOverBg: 0x2c3e50,
};

class gameScene extends Phaser.Scene{
    preload(){
        this.load.image('player', 'Psyduck.png');
        this.load.image('pokeball', 'Pokeball.png');
    }

    create(){
        this.width = variables.width;
        this.height = variables.height;
        this.roadHeight = variables.roadHeight;
        this.score = 0;
        this.gameOver = false;
        this.roads = [];
        this.pokeballs = [];
        this.lastRoadY = -this.roadHeight;
        this.playerStartY = 0;

        this.cameras.main.setBounds(0, -10000, this.width, 20000);

        for(let i = 0; i < 5; i++){
            const y = -this.roadHeight*(i+1);
            const road = this.add.rectangle(this.width/2, y,this.width, this.roadHeight-10, colors.road);
            road.setDepth(0);
            this.roads.push(road);
            const total = Math.floor(Math.random()*3)+1;

            for(let j = 0; j < total; j++){
                const direction = Math.random() >= 0.5 ? 1 : -1;
                const roadWidth = this.width+100;
                const spacing = roadWidth/total;
                const offset = j*spacing;

                let x;
                if(direction > 0){
                    x = -100-offset;
                } else{
                    x = this.width+100+offset;
                }
                
                const pokeball = this.add.image(x, y, 'pokeball');
                pokeball.direction = direction;
                pokeball.initSpeed = variables.initPokeballSpeed;
                pokeball.speed = pokeball.initSpeed +this.score * 10;
                if(direction < 0) pokeball.setFlipX(true);
                pokeball.setDepth(2);
                this.pokeballs.push(pokeball);
            }
            this.lastRoadY = y;
        }

        this.player = this.add.image(this.width/2, 0, 'player');
        this.player.setDepth(10);
        this.playerStartY = this.player.y;
        this.cameras.main.startFollow(this.player, true, 1, 1);

        this.scoreText = this.add.text(16, 16, 'Score: 0', {fontSize: '32px', fill: '#ffffff', fontWeight: 'bold'}).setScrollFactor(0).setDepth(100);
        this.speedText = this.add.text(16, 60, 'Speed Level: 1', {fontSize: '20px', fill: '#ffcc00ff', fontWeight: 'bold'}).setScrollFactor(0).setDepth(100);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys('W,S,A,D');
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.gameOverGroup = this.add.group();
        const bg = this.add.rectangle(this.width/2, this.height/2, 400, 250,colors.gameOverBg);
        bg.setVisible(false).setScrollFactor(0).setDepth(200);
        this.gameOverGroup.add(bg);
        this.gameOverText = this.add.text(this.width/2, (this.height/2)-50, 'Caught!!!', {fontSize: '32px', fill: '#ff1900ff', fontWeight: 'bold'}).setOrigin(0.5).setVisible(false).setScrollFactor(0).setDepth(200);
        this.gameOverGroup.add(this.gameOverText);
        this.finalScoreText = this.add.text(this.width/2, (this.height/2)-10, '', {fontSize: '24px', fill: '#ffffff'}).setOrigin(0.5).setVisible(false).setScrollFactor(0).setDepth(200);
        this.gameOverGroup.add(this.finalScoreText);
        this.finalSpeedText = this.add.text(this.width/2, (this.height/2)+20, '', {fontSize:'24px', fill: '#ffcc00ff'}).setOrigin(0.5).setVisible(false).setScrollFactor(0).setDepth(200);
        this.gameOverGroup.add(this.finalSpeedText);
        this.restartButton = this.add.text(this.width/2, (this.height)/2+60, 'Enter space to restart', {fontSize: '18px', fill: '#3498db'}).setOrigin(0.5).setVisible(false).setScrollFactor(0).setDepth(200);
        this.gameOverGroup.add(this.restartButton);
    }

    update(){
        if(this.gameOver) {
            if(this.spaceKey.isDown){
                this.score = 0;
                this.gameOver = false;
                this.scoreText.setText('Score: 0');
                this.speedText.setText('Speed Level: 1');
                this.lastRoadY = -this.roadHeight;
                this.roads.forEach(road => road.destroy());
                this.pokeballs.forEach(pokeball => pokeball.destroy());
                this.roads = [];
                this.pokeballs = [];

                for(let i = 0; i < 5; i++){
                    const y = -this.roadHeight*(i+1);
                    const road = this.add.rectangle(this.width/2, y, this.width, this.roadHeight-10, colors.road);
                    road.setDepth(0);
                    this.roads.push(road);
                    const total = Math.floor(Math.random()*3)+1;

                    for(let j = 0; j < total; j++){
                        const direction = Math.random() >= 0.5 ? 1 : -1;
                        const roadWidth = this.width+200;
                        const spacing = roadWidth/total;
                        const offset = j*spacing;

                        let x;
                        if(direction > 0) {
                            x = -100-offset-(Math.random()*100);
                        } else {
                            x = this.width+100+offset+(Math.random()*100);
                        }

                        const pokeball = this.add.image(x, y, 'pokeball');
                        pokeball.direction = direction;
                        pokeball.initSpeed = variables.initPokeballSpeed;
                        pokeball.speed = pokeball.initSpeed+ this.score * 10;
                        if(direction < 0) pokeball.setFlipX(true);
                        pokeball.setDepth(2);
                        this.pokeballs.push(pokeball);
                    }
                    this.lastRoadY = y;
                }
                this.player.x = this.width/2;
                this.player.y = 0;
                this.playerStartY = this.player.y;
                this.cameras.main.stopFollow();
                this.cameras.main.scrollY = 0;
                this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
                this.gameOverGroup.children.entries.forEach(child => child.setVisible(false));
            }
            return;
        }
        
        const speed = variables.playerSpeed;
        if(this.cursors.left.isDown || this.wasd.A.isDown){
            this.player.x = this.player.x-speed;
        }
        if(this.cursors.right.isDown || this.wasd.D.isDown){
            this.player.x = this.player.x+speed;
        }
        if(this.cursors.up.isDown || this.wasd.W.isDown){
            this.player.y-=speed;
        }
        if(this.cursors.down.isDown || this.wasd.S.isDown){
            this.player.y = this.player.y+speed;
        }

        const crossed = Math.floor((this.playerStartY-this.player.y)/this.roadHeight);
        if(crossed > this.score) {
            this.score = crossed;
            this.scoreText.setText('Score: ' + this.score);
        }

        const level = Math.floor(this.score/5)+1;
        this.speedText.setText('Speed Level: '+ level);

        const targetSpeed = variables.initPokeballSpeed+this.score*10;
        this.pokeballs.forEach(pokeball =>{
            if(pokeball.speed < targetSpeed){
                pokeball.speed = targetSpeed;
            }
        });

        const moreSpawn = this.player.y-variables.roadDist;

        while(this.lastRoadY > moreSpawn){
            this.lastRoadY-=this.roadHeight;
            const road = this.add.rectangle(this.width/2, this.lastRoadY, this.width, this.roadHeight-10, colors.road);
            road.setDepth(0);
            this.roads.push(road);
            const total = Math.floor(Math.random()*3)+1;

            for(let j = 0; j < total; j++){
                const direction = Math.random() >= 0.5 ? 1 : -1;
                const roadWidth = this.width+200;
                const spacing = roadWidth/total;
                const offset = j*spacing;

                let x;
                if(direction > 0){
                    x = -100-offset;
                } else{
                    x = this.width+100+offset;
                }
                
                const pokeball = this.add.image(x, this.lastRoadY, 'pokeball');
                pokeball.direction = direction;
                pokeball.initSpeed = variables.initPokeballSpeed;
                pokeball.speed = pokeball.initSpeed+ this.score * 10;
                if(direction < 0) pokeball.setFlipX(true);
                pokeball.setDepth(2);
                this.pokeballs.push(pokeball);
            }
        }

        this.pokeballs.forEach(pokeball => {
            pokeball.x += pokeball.direction*pokeball.speed*(1/60);
            if(pokeball.direction > 0 && pokeball.x > this.width+100){
                pokeball.x = -100;
            } else if(pokeball.direction < 0 && pokeball.x < -100){
                pokeball.x = this.width+100;
            }
        });

        this.pokeballs.forEach(pokeball => {
            const dx = pokeball.x-this.player.x;
            const dy = pokeball.y-this.player.y;
            const distance = Math.sqrt(dx*dx+dy*dy);
            if(distance < variables.collision) {
                this.gameOver = true;
                this.gameOverGroup.setVisible(true);
                const level = Math.floor(this.score/5)+1;
                this.finalScoreText.setText(`Score: ${this.score}`);
                this.finalSpeedText.setText(`Speed: ${level}`);
            }
        });
    }
}

const gameConfig = {
    width: variables.width,
    height: variables.height,
    parent: 'gameContainer',
    scene: gameScene,
};

const game = new Phaser.Game(gameConfig);