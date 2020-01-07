var world;
var b2Vec2 = Box2D.Common.Math.b2Vec2
    , b2BodyDef = Box2D.Dynamics.b2BodyDef
    , b2Body = Box2D.Dynamics.b2Body
    , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
    , b2Fixture = Box2D.Dynamics.b2Fixture
    , b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef
    , b2DistanceJoint = Box2D.Dynamics.Joints.b2DistanceJoint
    , b2WeldJointDef = Box2D.Dynamics.Joints.b2WeldJointDef
    , b2WeldJoint = Box2D.Dynamics.Joints.b2WeldJoint
    , b2Joint = Box2D.Dynamics.Joints.b2Joint
    , b2World = Box2D.Dynamics.b2World
    , b2MassData = Box2D.Collision.Shapes.b2MassData
    , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
    , b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
    , b2DebugDraw = Box2D.Dynamics.b2DebugDraw
    ;

//var rocketBase,rocketHead,bridge;
var ctx = document.getElementById("canvas").getContext("2d");
var img = new Image();
img.src = "modulis.png";

function init() {

    world = new b2World(
        new b2Vec2(0, 10)    //gravity
        , true                 //allow sleep

    );

    var fixDef = new b2FixtureDef;
    fixDef.density = 1.0;
    fixDef.friction = 0.5;
    fixDef.restitution = 0.2;

    var bodyDef = new b2BodyDef;

    //create ground
    bodyDef.type = b2Body.b2_staticBody;
    bodyDef.position.x = 10;
    bodyDef.position.y =25;
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(20, 0.5);
    world.CreateBody(bodyDef).CreateFixture(fixDef);
                      
                      var xKoord=Math.random() * 10;
                      var yKoord=Math.random() * 10;
                      
    // create body The Flying Princess Space ship bridge
    bodyDef.type = b2Body.b2_dynamicBody;
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(1, 1);
    bodyDef.position.x = xKoord;
    bodyDef.position.y = yKoord;
    bridge = world.CreateBody(bodyDef);
    bridge.CreateFixture(fixDef);
                      
    //create rocketHead
    bodyDef.type = b2Body.b2_dynamicBody;
    fixDef.shape = new b2PolygonShape;
                        var scale = 1;
                        fixDef.shape.SetAsArray([
                        new b2Vec2(scale*1 , scale*1.5),
                        new b2Vec2(scale*-1, scale*1.5),
                        new b2Vec2(0, scale*-2),
                        ]);
    bodyDef.position.x = xKoord;
    bodyDef.position.y = yKoord - 2;
    rocketHead = world.CreateBody(bodyDef);
    rocketHead.CreateFixture(fixDef);

    //create main engine
    bodyDef.type = b2Body.b2_dynamicBody;
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(0.25, 0.35);
    bodyDef.position.x = xKoord;
    bodyDef.position.y = yKoord+3;
    mainEngine = world.CreateBody(bodyDef);
    mainEngine.CreateFixture(fixDef);

    //create right engine
    bodyDef.type = b2Body.b2_dynamicBody;
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(0.15, 0.35);
    bodyDef.position.x = xKoord + 1;
    bodyDef.position.y = yKoord + 3;
    rightEngine = world.CreateBody(bodyDef);
    rightEngine.CreateFixture(fixDef);
    //create left engine
    bodyDef.type = b2Body.b2_dynamicBody;
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(0.15, 0.35);
    bodyDef.position.x = xKoord - 1;
    bodyDef.position.y = yKoord + 3;
    leftEngine = world.CreateBody(bodyDef);
    leftEngine.CreateFixture(fixDef);

    // Rocket base

    bodyDef.type = b2Body.b2_dynamicBody;
    fixDef.shape = new b2PolygonShape;
                        var scale = 1;
    fixDef.shape.SetAsArray([
                        new b2Vec2(scale*-1.5, scale * 0),
                        new b2Vec2(scale * -1, scale * -2),
                        new b2Vec2(scale* 1, scale*-2),
                        new b2Vec2(scale*1.5, scale*0),
                        ]);
    bodyDef.position.x = xKoord;
    bodyDef.position.y = yKoord+2;
    rocketBase = world.CreateBody(bodyDef);
    rocketBase.CreateFixture(fixDef);

    //savienojums 

    var HeadBridgeJoint = new b2WeldJointDef();
    HeadBridgeJoint.bodyA = bridge;
    HeadBridgeJoint.bodyB = rocketHead;
    HeadBridgeJoint.localAnchorA = new b2Vec2(0, -1);
    HeadBridgeJoint.localAnchorB = new b2Vec2(0, 1.5);
    HeadBridgeJoint.collideConnected = true;
    world.CreateJoint(HeadBridgeJoint);

    var BaseBridgeJoint = new b2WeldJointDef();
    BaseBridgeJoint.bodyA = bridge;
    BaseBridgeJoint.bodyB = rocketBase;
    BaseBridgeJoint.localAnchorA = new b2Vec2(0, 2);
    BaseBridgeJoint.localAnchorB = new b2Vec2(0, -1);
    BaseBridgeJoint.collideConnected = true;
    world.CreateJoint(BaseBridgeJoint);

    var MainEngineJoint = new b2WeldJointDef();
    MainEngineJoint.bodyA = rocketBase;
    MainEngineJoint.bodyB = mainEngine;
    MainEngineJoint.localAnchorA = new b2Vec2(0, 0);
    MainEngineJoint.localAnchorB = new b2Vec2(0, -0.36);
    MainEngineJoint.collideConnected = true;
    world.CreateJoint(MainEngineJoint);

    var RightEngineJoint = new b2WeldJointDef();
    RightEngineJoint.bodyA = rocketBase;
    RightEngineJoint.bodyB = rightEngine;
    RightEngineJoint.localAnchorA = new b2Vec2(1, 0);
    RightEngineJoint.localAnchorB = new b2Vec2(0, -0.36);
    RightEngineJoint.collideConnected = true;
    world.CreateJoint(RightEngineJoint);

    var LeftEngineJoint = new b2WeldJointDef();
    LeftEngineJoint.bodyA = rocketBase;
    LeftEngineJoint.bodyB = leftEngine;
    LeftEngineJoint.localAnchorA = new b2Vec2(-1, 0);
    LeftEngineJoint.localAnchorB = new b2Vec2(0, -0.36);
    LeftEngineJoint.collideConnected = true;
    world.CreateJoint(LeftEngineJoint);

    //setup debug draw
    var debugDraw = new b2DebugDraw();
    debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
    debugDraw.SetDrawScale(30.0);
    debugDraw.SetFillAlpha(0.3);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);

    var b2Listener = Box2D.Dynamics.b2ContactListener;
    var listener = new b2Listener;
    listener.PostSolve = function (contact, impulse) {
        if (contact.GetFixtureA().GetBody() == bridge) {
            console.log(impulse.normalImpulses[0]);
        }
    }
    world.SetContactListener(listener);

    window.setInterval(update, 1000 / 60);
};

var boost;

function update() {
    world.Step(
        1 / 60   //frame-rate
        , 10       //velocity iterations
        , 10       //position iterations
    );
    world.DrawDebugData();
    world.ClearForces();
    if (kreisais_dzinejs)
        rocketBase.ApplyImpulse(
            rocketBase.GetWorldVector(new b2Vec2(0, -1)),
            rocketBase.GetWorldPoint(new b2Vec2(-1.5, -1))
        );
    if (labais_dzinejs)
        rocketBase.ApplyImpulse(
            rocketBase.GetWorldVector(new b2Vec2(0, -1)),
            rocketBase.GetWorldPoint(new b2Vec2(1.5, -1))
        );
    if (galvenais_dzinejs) {
        if (boost > -2) {
            boost = boost - 0.01;
        }
        rocketBase.ApplyImpulse(
            rocketBase.GetWorldVector(new b2Vec2(0, -2+boost)),
            rocketBase.GetWorldCenter()
        );
    }

    if (!galvenais_dzinejs & boost != 0) boost = 0; 

    ctx.save();
    ctx.clearRect(0, 0, 1000, 1000);
    world.DrawDebugData();
    ctx.translate(
        rocketBase.GetPosition().x * 30,
        rocketBase.GetPosition().y * 30,
    );
    ctx.rotate(rocketBase.GetAngle());
    ctx.drawImage(img, -30, -120);

    if (galvenais_dzinejs) {
        var grd = ctx.createRadialGradient(0, 15, 0, 0, 25, 10);
        if (boost < -1) {
            grd.addColorStop(0, "yellow");
        } else {
            grd.addColorStop(0, "red");
        }
        grd.addColorStop(1, "transparent");
        ctx.fillStyle = grd;
        ctx.fillRect(-10, -20, 20, 80);
    }
    if (kreisais_dzinejs) {
        var grd = ctx.createRadialGradient(-30, 25, 0, -30, 30, 5);
        grd.addColorStop(0, "blue");
        grd.addColorStop(1, "transparent");
        ctx.fillStyle = grd;
        ctx.fillRect(-40, 25, 20, 40);
    }
    if (labais_dzinejs) {
        var grd = ctx.createRadialGradient(30, 25, 0, 30, 30, 5);
        grd.addColorStop(0, "blue");
        grd.addColorStop(1, "transparent");
        ctx.fillStyle = grd;
        ctx.fillRect(20, 25, 20, 40);
    }

    ctx.restore();

};

var labais_dzinejs = false;
var kreisais_dzinejs = false;
var galvenais_dzinejs = false;
document.onkeydown = function keyDown(e) {
    e = e || window.event;
    if (e.keyCode == '39') kreisais_dzinejs = true;
    if (e.keyCode == '37') labais_dzinejs = true;
    if (e.keyCode == '38') galvenais_dzinejs = true;
};
document.onkeyup = function keyDown(e) {
    e = e || window.event;
    if (e.keyCode == '39') kreisais_dzinejs = false;
    if (e.keyCode == '37') labais_dzinejs = false;
    if (e.keyCode == '38') galvenais_dzinejs = false;
};