import React from 'react';

import css from './Player2.module.css';

const Player2 = (props) => {

    // console.log(props);

    let p2Css = [css.Player2]
    let spanActive = [];

    if(props.p2Active){
  
        p2Css.push(css.ActivePlayer);
        spanActive.push(css.Active2)
    }

    return(
        <div className={p2Css.join(' ')}>

            <h1 className={css.P2winner}>{props.p2Title}
                <span className={spanActive.join(' ')}></span>
            </h1>
            {/* <div className={css.Active2}>

            </div> */}
            <h2 className={css.PointsPlayer2}>{props.p2Total}</h2>

            <div className={css.CurrentPoints}>
            <p>Current Points</p>
            <p className={css.CurrentPointsPlayer2}>{props.p2Current}</p>

            </div>  
      </div>
    )
}

export default Player2;