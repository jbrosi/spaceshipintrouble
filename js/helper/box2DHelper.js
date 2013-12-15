

define(['box2d'], function (Box2D) {
    
    //just add some shortcuts
    Box2D.b2Vec2 = Box2D.Common.Math.b2Vec2;
    Box2D.b2AABB = Box2D.Collision.b2AABB;
    Box2D.b2BodyDef = Box2D.Dynamics.b2BodyDef;
    Box2D.b2Body = Box2D.Dynamics.b2Body;
    Box2D.b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    Box2D.b2Fixture = Box2D.Dynamics.b2Fixture;
    Box2D.b2World = Box2D.Dynamics.b2World;
    Box2D.b2MassData = Box2D.Collision.Shapes.b2MassData;
    Box2D.b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    Box2D.b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    Box2D.b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
    Box2D.b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef;
      
      
    //missing functions in box2dweb
    Box2D.b2Body.prototype.ApplyAngularImpulse = function(impulse) {
        if (this.IsAwake() == false) {
            this.SetAwake(true);
        }
        this.m_angularVelocity += this.m_invI * impulse;
    };
    return Box2D;
});