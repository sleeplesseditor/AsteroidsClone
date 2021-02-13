import * as React from 'react';
import { gameContext } from '../GameContext';

export const Game =  () => {
    const [currentScore, setCurrentScore] = React.useState(0);
    const [topScore, setTopScore] = React.useState(localStorage['topscore'] || 0);
    const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
    const [screenHeight, setScreenHeight] = React.useState(window.innerHeight);
    const [ratio, setRatio] = React.useState(window.devicePixelRatio || 1);
    const [asteroidCount, setAsteroidCount] = React.useState(3);
    const [inGame, setInGame] = React.useState(false);
    const { keys, context } = React.useContext(gameContext);

    let endgame = 'Herp'

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
                width={screenWidth * ratio}
                height={screenHeight * ratio}
            />
        </div>
    );
};