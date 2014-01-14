
/**
 * This module encapsulates the Box2D-Libraries and provides some convenience
 * functions and shortcuts. It decides whether to use cocoon js native bindings
 * or box2dweb. Later on we may also add some native bindings for other OS-Types,
 * too.
 * You should use this module instead of directly using box2d or box2d-cocoon
 */ 
define(
    [navigator.isCocoonJS ? 'box2d-cocoon' : 'box2d'], 
    function (Box2D) {

        //just add some shortcuts
        Box2D.b2Vec2 = Box2D.Common.Math.b2Vec2;
        Box2D.b2AABB = Box2D.Collision.b2AABB;
        Box2D.b2BodyDef = Box2D.Dynamics.b2BodyDef;
        
        //add some cocoon specific stuff
        if (navigator.isCocoonJS) {
            
            //this method is named the old way in cocoon js bindings - add a convenience shortcut
            Box2D.Dynamics.b2Body.prototype.ApplyForce = Box2D.Dynamics.b2Body.prototype.ApplyForceToCenter;
            
            
            //add support for orientedBox in cocoon bindings:
            Box2D.Collision.Shapes.b2PolygonShape.prototype.SetAsOrientedBox = function (hx, hy, center, angle) {
                if (hx === undefined) hx = 0;
                if (hy === undefined) hy = 0;
                if (center === undefined) center = null;
                if (angle === undefined) angle = 0.0;

                var vertices = [];
                vertices.push(new Box2D.b2Vec2(-hx, -hy));
                vertices.push(new Box2D.b2Vec2(hx, -hy));
                vertices.push(new Box2D.b2Vec2(hx, hy));
                vertices.push(new Box2D.b2Vec2(-hx, hy));

                var xf = new Box2D.Common.Math.b2Transform();
                xf.position = center;
                xf.R.Set(angle);
                for (var i = 0; i < 4; ++i) {
                    vertices[i] = Box2D.Common.Math.b2Math.MulX(xf, vertices[i]);
                }
                
                this.SetAsArray(vertices, 4);
            };
        }
        
    
        
        //more shortcuts
        Box2D.b2Body = Box2D.Dynamics.b2Body;
        Box2D.b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
        Box2D.b2Fixture = Box2D.Dynamics.b2Fixture;
        Box2D.b2World = Box2D.Dynamics.b2World;
        Box2D.b2MassData = Box2D.Collision.Shapes.b2MassData;
        Box2D.b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
        Box2D.b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
        Box2D.b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
        Box2D.b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef;
          
        return Box2D;
    }
);