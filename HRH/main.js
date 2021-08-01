"use strict";
var HRH;
(function (HRH) {
    var fc = FudgeCore;
    HRH.gamestate = HRH.Gamestates.EDIT;
    window.addEventListener("load", init);
    let nodeRoot = new fc.Node("Root");
    let viewport = new fc.Viewport();
    let allLevels = [];
    let currentLevel = 0;
    let soundManager = new HRH.SfxManager();
    let soundtrackPlay = false;
    //Create Inventory | each tile is 32x32 pixels, World is 7 tiles wide and 18 tiles high
    let nodeInventory = new fc.Node("Inventory");
    let nodeInventoryBackground = new HRH.Background(new fc.Vector2(-3.5, 9), new fc.Vector2(7, 18), "./textures/InventoryBackground.png");
    nodeInventory.appendChild(nodeInventoryBackground);
    let nodeLeftTile = new HRH.LeftTile();
    nodeInventory.appendChild(nodeLeftTile);
    let nodeRightTile = new HRH.RightTile();
    nodeInventory.appendChild(nodeRightTile);
    let nodeUpTile = new HRH.UpTile();
    nodeInventory.appendChild(nodeUpTile);
    let nodeDownTile = new HRH.DownTile();
    nodeInventory.appendChild(nodeDownTile);
    nodeRoot.appendChild(nodeInventory);
    //Create Gameworld | each tile is 32x32 pixels, World is 17 tiles wide and 18 tiles high
    let nodeWorld = new fc.Node("World");
    let nodeWorldBackground = new HRH.Background(new fc.Vector2(8.5, 9), new fc.Vector2(17, 18), "./textures/WorldBackground.png");
    nodeWorld.appendChild(nodeWorldBackground);
    let nodeWalls = new fc.Node("Walls");
    //Create World Walls Top and Bottom Row
    for (let x = 0; x <= 16; x++) {
        nodeWalls.appendChild(new HRH.WallTile(new fc.Vector2(x, 0)));
        nodeWalls.appendChild(new HRH.WallTile(new fc.Vector2(x, 17)));
    }
    //Create World Walls Left and Right Collumn
    for (let y = 1; y <= 16; y++) {
        nodeWalls.appendChild(new HRH.WallTile(new fc.Vector2(0, y)));
        nodeWalls.appendChild(new HRH.WallTile(new fc.Vector2(16, y)));
    }
    nodeWorld.appendChild(nodeWalls);
    //Create ObstacleNode
    let nodeObstacles = new fc.Node("Obstacles");
    nodeWorld.appendChild(nodeObstacles);
    //Create GoalNode
    let nodeGoal = new fc.Node("GoalManager");
    nodeWorld.appendChild(nodeGoal);
    nodeRoot.appendChild(nodeWorld);
    //Create character
    let character = new HRH.PlayerCharacter(new fc.Vector2(1, 1));
    let nodeCharacter = new fc.Node("CharacterManager");
    nodeCharacter.appendChild(character);
    nodeWorld.appendChild(nodeCharacter);
    let characterMoveDirection = HRH.MovementDirections.UP;
    let characterMovementMax = 8;
    let characterMovement = characterMovementMax;
    //Create Cursor
    let playerCursor = HRH.Cursor.getInstance();
    nodeRoot.appendChild(playerCursor);
    let curserMovementMax = 4;
    let cursorMovement = curserMovementMax;
    let placeable = false;
    let nodePlacedTiles = new fc.Node("Placed Tiles");
    nodeWorld.appendChild(nodePlacedTiles);
    async function init(_event) {
        await loadLevels();
        const canvas = document.querySelector("canvas");
        //Start Soundtrack
        soundManager.soundTrack(soundtrackPlay);
        //Create Camera
        let camera = new fc.ComponentCamera();
        camera.mtxPivot.translateX(5);
        camera.mtxPivot.translateY(9);
        camera.mtxPivot.translateZ(25);
        camera.mtxPivot.rotateY(180);
        buildLevel();
        //Initialize and draw scene 0
        viewport.initialize("Viewport", nodeRoot, camera, canvas);
        viewport.draw();
        fc.Loop.start(fc.LOOP_MODE.TIME_REAL, 30);
        fc.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
    }
    function update(_event) {
        //Player Controls
        if (fc.Keyboard.isPressedOne([fc.KEYBOARD_CODE.M]) && cursorMovement == curserMovementMax) {
            soundtrackPlay = !soundtrackPlay;
            soundManager.soundTrack(soundtrackPlay);
            cursorMovement = 0;
        }
        if (fc.Keyboard.isPressedOne([fc.KEYBOARD_CODE.P])) {
            HRH.gamestate = HRH.Gamestates.PLAY;
        }
        if (fc.Keyboard.isPressedOne([fc.KEYBOARD_CODE.R])) {
            resetLevel();
        }
        if (fc.Keyboard.isPressedOne([fc.KEYBOARD_CODE.SHIFT_LEFT]) && cursorMovement == curserMovementMax) {
            playerCursor.switchState();
            cursorMovement = 0;
        }
        if (playerCursor.state === "world" && cursorMovement == curserMovementMax) {
            if (playerCursor.mtxLocal.translation.x < 15 && fc.Keyboard.isPressedOne([fc.KEYBOARD_CODE.D, fc.KEYBOARD_CODE.ARROW_RIGHT])) {
                playerCursor.mtxLocal.translateX(1);
                cursorMovement = 0;
            }
            if (playerCursor.mtxLocal.translation.x > 2 && fc.Keyboard.isPressedOne([fc.KEYBOARD_CODE.A, fc.KEYBOARD_CODE.ARROW_LEFT])) {
                playerCursor.mtxLocal.translateX(-1);
                cursorMovement = 0;
            }
            if (playerCursor.mtxLocal.translation.y < 16 && fc.Keyboard.isPressedOne([fc.KEYBOARD_CODE.W, fc.KEYBOARD_CODE.ARROW_UP])) {
                playerCursor.mtxLocal.translateY(1);
                cursorMovement = 0;
            }
            if (playerCursor.mtxLocal.translation.y > 2 && fc.Keyboard.isPressedOne([fc.KEYBOARD_CODE.S, fc.KEYBOARD_CODE.ARROW_DOWN])) {
                playerCursor.mtxLocal.translateY(-1);
                cursorMovement = 0;
            }
        }
        if (playerCursor.state === "inventory" && cursorMovement == curserMovementMax) {
            if (playerCursor.mtxLocal.translation.x < -2 && fc.Keyboard.isPressedOne([fc.KEYBOARD_CODE.D, fc.KEYBOARD_CODE.ARROW_RIGHT])) {
                playerCursor.mtxLocal.translateX(1);
                cursorMovement = 0;
            }
            if (playerCursor.mtxLocal.translation.x > -5 && fc.Keyboard.isPressedOne([fc.KEYBOARD_CODE.A, fc.KEYBOARD_CODE.ARROW_LEFT])) {
                playerCursor.mtxLocal.translateX(-1);
                cursorMovement = 0;
            }
            if (playerCursor.mtxLocal.translation.y < 11 && fc.Keyboard.isPressedOne([fc.KEYBOARD_CODE.W, fc.KEYBOARD_CODE.ARROW_UP])) {
                playerCursor.mtxLocal.translateY(1);
                cursorMovement = 0;
            }
            if (playerCursor.mtxLocal.translation.y > 8 && fc.Keyboard.isPressedOne([fc.KEYBOARD_CODE.S, fc.KEYBOARD_CODE.ARROW_DOWN])) {
                playerCursor.mtxLocal.translateY(-1);
                cursorMovement = 0;
            }
        }
        if (fc.Keyboard.isPressedOne([fc.KEYBOARD_CODE.SPACE]) && cursorMovement == curserMovementMax) {
            handleTilePlacement();
            cursorMovement = 0;
        }
        if (cursorMovement != curserMovementMax) {
            cursorMovement++;
        }
        if (characterMovement != characterMovementMax) {
            characterMovement++;
        }
        playerCursor.setRectPosition();
        //Move Character
        if (HRH.gamestate === HRH.Gamestates.PLAY && characterMovement == characterMovementMax) {
            movePlayer();
            characterMovement = 0;
        }
        viewport.draw();
    }
    function handleTilePlacement() {
        if (playerCursor.checkCollision(nodeLeftTile) && placeable == false && playerCursor.state === "inventory") {
            playerCursor.selected = new HRH.LeftTile();
            placeable = true;
        }
        else if (playerCursor.checkCollision(nodeRightTile) && placeable == false && playerCursor.state === "inventory") {
            playerCursor.selected = new HRH.RightTile();
            placeable = true;
        }
        else if (playerCursor.checkCollision(nodeUpTile) && placeable == false && playerCursor.state === "inventory") {
            playerCursor.selected = new HRH.UpTile();
            placeable = true;
        }
        else if (playerCursor.checkCollision(nodeDownTile) && placeable == false && playerCursor.state === "inventory") {
            playerCursor.selected = new HRH.DownTile();
            placeable = true;
        }
        else if (placeable == true && playerCursor.state === "world") {
            playerCursor.selected.mtxLocal.translation = playerCursor.mtxLocal.translation;
            playerCursor.selected.setRectPosition();
            nodePlacedTiles.appendChild(playerCursor.selected);
            placeable = false;
        }
    }
    function movePlayer() {
        let canMove = true;
        for (let wall of nodeWalls.getChildren()) {
            if (character.checkCollision(wall)) {
                characterMoveDirection = HRH.MovementDirections.NONE;
                canMove = false;
            }
        }
        for (let obstacle of nodeObstacles.getChildren()) {
            if (character.checkCollision(obstacle)) {
                canMove = false;
                resetLevel();
            }
        }
        for (let goal of nodeGoal.getChildren()) {
            if (character.checkCollision(goal)) {
                canMove = false;
                soundManager.playSFX(HRH.AllSfx.GOAL_SOUND);
                if (currentLevel < allLevels.length - 1) {
                    currentLevel++;
                }
                else {
                    currentLevel = 0;
                }
                resetLevel();
            }
        }
        for (let placedTile of nodePlacedTiles.getChildren()) {
            if (character.checkCollision(placedTile)) {
                if (placedTile.getType() === "left") {
                    characterMoveDirection = HRH.MovementDirections.LEFT;
                }
                if (placedTile.getType() === "right") {
                    characterMoveDirection = HRH.MovementDirections.RIGHT;
                }
                if (placedTile.getType() === "up") {
                    characterMoveDirection = HRH.MovementDirections.UP;
                }
                if (placedTile.getType() === "down") {
                    characterMoveDirection = HRH.MovementDirections.DOWN;
                }
            }
        }
        if (canMove) {
            soundManager.playSFX(HRH.AllSfx.WALK_SOUND);
            character.move(characterMoveDirection, 1);
        }
    }
    async function loadLevels() {
        let obj = await (await fetch("./data/data.json")).json();
        for (let i = 0; i < obj.level.length; i++) {
            allLevels.push(obj.level[i][i + 1]);
        }
    }
    function buildLevel() {
        //Clear all Obstacles
        nodeObstacles.removeAllChildren();
        nodeGoal.removeAllChildren();
        for (let y = 1; y <= allLevels[currentLevel].length; y++) {
            for (let x = 1; x <= allLevels[currentLevel][y - 1].length; x++) {
                let value = allLevels[currentLevel][y - 1][x - 1];
                switch (value) {
                    case 1: {
                        nodeObstacles.appendChild(new HRH.LavaTile(new fc.Vector2(x, y)));
                        break;
                    }
                    case 2: {
                        character.mtxLocal.translateX(x - 1);
                        character.mtxLocal.translateY(y - 1);
                        break;
                    }
                    case 3: {
                        nodeGoal.appendChild(new HRH.GoalTile(new fc.Vector2(x, y)));
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
        }
    }
    function resetLevel() {
        soundManager.playSFX(HRH.AllSfx.RESET_SOUND);
        HRH.gamestate = HRH.Gamestates.EDIT;
        characterMoveDirection = HRH.MovementDirections.UP;
        nodePlacedTiles.removeAllChildren();
        character = new HRH.PlayerCharacter(new fc.Vector2(1, 1));
        nodeCharacter.removeAllChildren();
        nodeCharacter.appendChild(character);
        buildLevel();
    }
})(HRH || (HRH = {}));
//# sourceMappingURL=main.js.map