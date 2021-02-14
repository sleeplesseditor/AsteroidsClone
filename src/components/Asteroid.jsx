// import Particle from './Particle';
import * as React from 'react';
import { asteroidVertices, randomNumBetween } from '../helpers';
import { gameContext } from '../GameContext';

export const Asteroid = (props) => {
    // const { keys, context } = React.useContext(gameContext);

    let velocity = {
        x: randomNumBetween(-1.5, 1.5),
        y: randomNumBetween(-1.5, 1.5)
    }
    let rotation = 0;
    let rotationSpeed = randomNumBetween(-1, 1)
    let radius = props.size;
    let score = (80/radius)*5;
    let vertices = asteroidVertices(8, props.size)

    const destroy = () => {
        this.delete = true;
        props.addScore(score);

        // Explode
        for (let i = 0; i < this.radius; i++) {
            // const particle = new Particle({
            //     lifeSpan: randomNumBetween(60, 100),
            //     size: randomNumBetween(1, 3),
            //     position: {
            //         x: this.position.x + randomNumBetween(-this.radius/4, this.radius/4),
            //         y: this.position.y + randomNumBetween(-this.radius/4, this.radius/4)
            //     },
            //     velocity: {
            //         x: randomNumBetween(-1.5, 1.5),
            //         y: randomNumBetween(-1.5, 1.5)
            //     }
            // });
            // create(particle, 'particles');
        }

        // Break into smaller asteroids
        if(this.radius > 10){
            for (let i = 0; i < 2; i++) {
            let asteroid = new Asteroid({

                size: this.radius/2,
                position: {
                x: randomNumBetween(-10, 20)+this.position.x,
                y: randomNumBetween(-10, 20)+this.position.y
                },
                create: this.create.bind(this),
                addScore: this.addScore.bind(this)
            });
            this.create(asteroid, 'asteroids');
            }
        }
    }

    // Move
    props.position.x += velocity.x;
    props.position.y += velocity.y;

    // Rotation
    rotation += rotationSpeed;
    if (rotation >= 360) {
        rotation -= 360;
    }
    if (rotation < 0) {
        rotation += 360;
    }

    // Screen edges
    if(props.position.x > window.innerWidth + radius) props.position.x = - radius;
    else if(props.position.x < - radius) props.position.x = window.innerWidth + radius;
    if(props.position.y > window.innerHeight + radius) props.position.y = - radius;
    else if(props.position.y < - radius) props.position.y = window.innerHeight + radius;

    // Draw
    const drawContext = props.context;
    drawContext.save();
    drawContext.translate(props.position.x, props.position.y);
    drawContext.rotate(rotation * Math.PI / 180);
    drawContext.strokeStyle = '#FFF';
    drawContext.lineWidth = 2;
    drawContext.beginPath();
    drawContext.moveTo(0, - radius);
    for (let i = 1; i < vertices.length; i++) {
        drawContext.lineTo(vertices[i].x, vertices[i].y);
    }
    drawContext.closePath();
    drawContext.stroke();
    drawContext.restore();
}
