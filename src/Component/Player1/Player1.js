import React from 'react';

import css from './Player1.module.css';


const Player1 = (props) => {

    // console.log(props);

    let p1Css = [css.Player1]
    let spanActive = [];

    if(props.p1Active){
  
        p1Css.push(css.ActivePlayer);
        spanActive.push(css.Active1)
    }

    return(

        <div className={p1Css.join(' ')}>

            <h1 className={css.P1Winner}>{props.p1Title} 
                <span className={spanActive.join(' ')}></span>
            </h1>
            {/* <div className={css.Active1}>
                aca iria
            </div> */}
            <h2 className={css.PointsPlayer1}>{props.p1Total}</h2>

            <div className={css.CurrentPoints}>

            <p>Current Points</p>

            <p className={css.CurrentPointsPlayer1}>{props.p1Current}</p>

            </div>

        </div>
    )
}

export default Player1;