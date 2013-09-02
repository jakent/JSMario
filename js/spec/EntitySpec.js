describe("Entity2d", function () {
    var background;
    var mario;
    var spyMario;
    var position;
    var mario_sprite;
    var background_sprite;
    var spyBackground;
    var spyBackground2;
    var scene;

    beforeEach(function () {
        position = jasmine.createSpyObj('vector2d', ['getX', 'getY', 'addX', 'addY']);
        mario_sprite = jasmine.createSpyObj('sprite', ['draw', 'flipImage']);
        background_sprite = jasmine.createSpyObj('sprite', ['draw']);
        mario = new Actor(position, mario_sprite);
        spyMario = jasmine.createSpyObj('actor', ['moveLeft', 'moveRight', 'draw']);
        background = new Background(position, background_sprite);
        spyBackground = jasmine.createSpyObj('background', ['moveRight']);
        spyBackground2 = jasmine.createSpyObj('background', ['moveRight']);
        spyBackground.sprite = background_sprite;
        spyBackground.position = position;
        spyBackground2.sprite = background_sprite;
        spyBackground2.position = position;
        scene = new Scene([spyBackground, spyBackground2], mario);
    });

    describe("Actor", function () {
       
        it("should draw its sprite", function () {
            mario.draw();
            expect(mario_sprite.draw).toHaveBeenCalledWith(position);
        });
    
        it("should not go underground", function() {
            mario = new Actor(new Vector2d(200, 100), mario_sprite);
            mario.draw();
            for(var i = 0; i < 100; i++){
                mario.moveDown();
            }
            expect(mario.getY()).toBeLessThan(401);
        });

        it("should not get too high", function(){
            mario = new Actor(new Vector2d(200, 100), mario_sprite);
            mario.draw();
            for(var i = 0; i < 100; i++){
                mario.moveUp();
            }
            expect(mario.getY()).toBeGreaterThan(-1);
        });
    
        it("should flip when walks left", function(){
            scene.drawScene();
            scene.keypress({which: 37});
            expect(mario_sprite.flipImage).toHaveBeenCalled();
        });
    });
    
  
    describe("Background", function () {

        it("should draw background", function() {
            background = new Background(position, background_sprite);
            background.draw();
            expect(background_sprite.draw).toHaveBeenCalledWith(position);
        });

        it("should rotate back into view", function() {
            background = new Background(new Vector2d(-795, 0), background_sprite);
            background.moveLeft();
            expect(background.getX()).toBeGreaterThan(799);
        });

        it("should scroll two images at once", function() {
            scene = new Scene([spyBackground, spyBackground2], mario);
            scene.drawScene();
            scene.keypress({which: 39});
            expect(spyBackground.position.addX).toHaveBeenCalled();
            expect(spyBackground2.position.addX).toHaveBeenCalled();
        });

    });

});
