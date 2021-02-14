import * as React from 'react';
import { gameContext } from '../GameContext';
import { Asteroid } from './Asteroid';
import { keyset, randomNumBetweenExcluding } from '../helpers';

export const Game =  () => {
    const [currentScore, setCurrentScore] = React.useState(0);
    const [topScore, setTopScore] = React.useState(localStorage['topscore'] || 0);
    const [ratio, setRatio] = React.useState(window.devicePixelRatio || 1);
    const [asteroidCount, setAsteroidCount] = React.useState(3);
    const [inGame, setInGame] = React.useState(true);
    // const [asteroids, setAsteroids] = React.useState([])
    const { keys, context, setContext, setKeys, screenHeight, screenWidth } = React.useContext(gameContext);

    const asteroids = [];
    let ship = [];
    let endgame = 'Herp';

    const createObject = (item, group) => {
        [group].push(item);
    }

    const handleResize = (value, e) => {
        // this.setState({
        //   screen : {
        //     width: window.innerWidth,
        //     height: window.innerHeight,
        //     ratio: window.devicePixelRatio || 1,
        //   }
        // });
    }

    // const handleKeys = (value, e) => {
    //     let startingKeys = keys;
    //     if(e.keyCode === keyset.LEFT   || e.keyCode === keyset.A) startingKeys.left  = value;
    //     if(e.keyCode === keyset.RIGHT  || e.keyCode === keyset.D) startingKeys.right = value;
    //     if(e.keyCode === keyset.UP     || e.keyCode === keyset.W) startingKeys.up    = value;
    //     if(e.keyCode === keyset.SPACE) startingKeys.space = value;
    //     setKeys(startingKeys)
    // }

    const updateObjects = (items, group) => {
        let index = 0;
        for (let item of items) {
            if (item.delete) {
                [group].splice(index, 1);
            } else {
                items[index].render();
            }
            index++;
        }
      }
    
    const checkCollisionsWith = (items1, items2) => {
        var a = items1.length - 1;
        var b;
        for(a; a > -1; --a){
            b = items2.length - 1;
            for(b; b > -1; --b){
                var item1 = items1[a];
                var item2 = items2[b];
                if(checkCollision(item1, item2)){
                    item1.destroy();
                    item2.destroy();
                }
            }
        }
    }

    const checkCollision = (obj1, obj2) => {
        var vx = obj1.position.x - obj2.position.x;
        var vy = obj1.position.y - obj2.position.y;
        var length = Math.sqrt(vx * vx + vy * vy);
        if(length < obj1.radius + obj2.radius){
            return true;
        }
        return false;
    }

    const generateAsteroids = (query) => {
        let shipPos = ship[0];
        for (let i = 0; i < query; i++) {
            const asteroid = Asteroid({
                context: context,
                size: 80,
                position: {
                    x: randomNumBetweenExcluding(0, window.innerWidth, window.innerWidth / 2 -60, window.innerWidth / 2 +60),
                    y: randomNumBetweenExcluding(0, window.innerHeight, window.innerHeight / 2 -60, window.innerHeight / 2 +60)
                },
                create: createObject(),
                // addScore: addScore()
            });
          createObject(asteroid, 'asteroids');
        //   setAsteroids(asteroids => [...asteroids, asteroid])
        }
    }

    const gameOver = () => {
        setInGame(false)
    
        // Replace top score
        if(currentScore > topScore){
            setTopScore(currentScore)
            localStorage['topscore'] = currentScore;
        }
    }

    const update = () => {
        if(context) {
            const updateContext = context;
            const updateKeys = keys;
            const updateShip = ship[0];

            updateContext.save();
            updateContext.scale(ratio, ratio);
        
            // Motion trail
            updateContext.fillStyle = '#000';
            updateContext.globalAlpha = 0.4;
            updateContext.fillRect(0, 0, window.innerWidth, window.innerHeight);
            updateContext.globalAlpha = 1;
        
            // Next set of asteroids
            if(!asteroids.length){
                let count = asteroidCount + 1;
                // setAsteroidCount(count)
                generateAsteroids(count)
            }
        
            // Check for colisions
            // checkCollisionsWith(bullets, asteroids);
            checkCollisionsWith(ship, asteroids);
        
            // Remove or render
            // updateObjects(particles, 'particles')
            updateObjects(asteroids, 'asteroids')
            // updateObjects(bullets, 'bullets')
            updateObjects(ship, 'ship')
        
            updateContext.restore();
        
            // Next frame
            // requestAnimationFrame(() => {update()});
        }
    }

    const startGame = () => {
        setInGame(true);
        setCurrentScore(0);
    
        // Make asteroids
        if(context) {
            generateAsteroids(3)
        }
    }

    React.useEffect(() => {
        // window.addEventListener('keyup',   handleKeys(this, false));
        // window.addEventListener('keydown', handleKeys(this, true));
        // window.addEventListener('resize',  handleResize(this, false));

        const contextEl = document.querySelector('#asteroid-canvas');
        const canvasContext = contextEl.getContext('2d');
        setContext(canvasContext);
        startGame();
        // requestAnimationFrame(() => {update()});
    }, [context])

    return (
        <div>
            { endgame }
            <span className="score current-score">Score: {currentScore}</span>
            <span className="score top-score">Top Score: {topScore}</span>
            <span className="controls">
                Use [A][S][W][D] or [←][↑][↓][→] to MOVE<br/>
                Use [SPACE] to SHOOT
            </span>
            <canvas
                id="asteroid-canvas"
                width={window.innerWidth * ratio}
                height={window.innerHeight * ratio}
            />
        </div>
    );
};