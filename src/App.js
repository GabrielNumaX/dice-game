import React, {Component} from 'react';
import css from './App.module.css';

import { BrowserRouter } from 'react-router-dom';

import Player1 from './Component/Player1/Player1';
import Player2 from './Component/Player2/Player2';

import img01 from './Utils/01.png';
import img02 from './Utils/02.png';
import img03 from './Utils/03.png';
import img04 from './Utils/04.png';
import img05 from './Utils/05.png';
import img06 from './Utils/06.png';


class App extends Component {

  state = {
    player1Title: 'Player 1',
    player2Title: 'Player 2',
    player1Total: 0,
    player2Total: 0,
    player1Current: 0,
    player2Current: 0,
    player1Active: true,
    player2Active: false,
    diceArr: [img01, img02, img03, img04, img05, img06], 
    dice: '',
    gameOn: false,
  }

  componentDidMount() {

    const arrPos = Math.floor(Math.random() * (6 - 1 + 1) + 1);

    this.setState({
      dice: this.state.diceArr[arrPos-1],
      gameOn: true,
    });
  }

  componentDidUpdate(prevProps, prevState) {

    // para manejar los setState estan las siguientes condiciones
    //que va cambiando los estados segun la condicion
    //por ejemplo gameOn cambia en dos condiciones porque sino habia que apretar
    //dos veces newGame para que vuelva a cero
    //no es lo ideal pero FUNCIONA

    //prestar ATENCION A ESTAS CONDICIONES QUE SON LAS QUE EVITAN EL INFINITE LOOP DE RE RENDERS
    // prevState.player1Current !== this.state.player1Current... etc

    if((prevState.player1Total + this.state.player1Current) >= 60 && prevState.player1Current !== this.state.player1Current){

      this.setState({
        player1Title: 'Winner!!!',
        player1Total: prevState.player1Total + this.state.player1Current,
        gameOn: false
      })

    }
    else if((prevState.player2Total + this.state.player2Current) >= 60 && prevState.player2Current !== this.state.player2Current){

      this.setState({
        player2Title: 'Winner!!!',
        player2Total: prevState.player2Total + this.state.player2Current,
        gameOn: false
      })
    }

    if(prevState.gameOn === false && this.state.gameOn === true){

      if((prevState.player1Title !== this.state.player1Title) || (prevState.player2Title !== this.state.player2Title))

      this.setState({
        player1Title: 'Player1',
        player2Title: 'Player2',
        player1Total: 0,
        player2Total: 0,
        gameOn: true
      });
    }
  } //end didUpdate

  rollDice = () => {

    if(this.state.gameOn){

      const arrPos = Math.floor(Math.random() * (6 - 1 + 1) + 1);

      this.setState({
        dice: this.state.diceArr[arrPos-1],
      });

      // check if Player1 Active
      if(this.state.player1Active){

        // sets dice
        this.setState({
          player1Current: arrPos
        });

        //if dice = 1
        if(arrPos === 1){

          // clears current points
          // switches players
          this.setState({
            player1Current: 0,
            player1Active: !this.state.player1Active,
            player2Active: !this.state.player2Active
          })     
        }
        // else adds points to current
        else {

          this.setState({
                player1Current: this.state.player1Current + arrPos,
          });
        }
      }

      // this is IF player2 is active
      else {
        this.setState({
          player2Current: arrPos
        })

        // sets dice
        this.setState({
          play2Current: arrPos
        })

        //if dice = 1
        if(arrPos === 1){

          // clears current points
          // switches players
          this.setState({
            player2Current: 0,
            player2Active: !this.state.player2Active,
            player1Active: !this.state.player1Active
          })     
        }
        // else adds points to current
        else {

          this.setState({
            player2Current: this.state.player2Current + arrPos,
          })
        }
      }
    } //if gameOn
    else {
      return;
    } 
  } //end rollDice


  hold = () => {

    // check if Player1 active
    // sets total points
    // switches players
    if(this.state.player1Active && this.state.gameOn) {

        this.setState({
          player1Total: this.state.player1Total + this.state.player1Current,
          player1Current: 0,
          player1Active: !this.state.player1Active,
          player2Active: !this.state.player2Active
        })
      // }
    }
    // else if does the opposite

    else if(this.state.player2Active && this.state.gameOn){

        this.setState({
          player2Total: this.state.player2Total + this.state.player2Current,
          player2Current: 0,
          player2Active: !this.state.player2Active,
          player1Active: !this.state.player1Active
        })
    }
  }


  newGame = () => {

    this.setState({
      player1Total: 0,
      player1Current: 0,
      player1Title: 'Player1',
      player2Total: 0,
      player2Current: 0,
      player2Title: 'Player2',
      player1Active: true,
      player2Active: false,
      gameOn: true
    })
  }



  render() {
    
    return (

      <BrowserRouter basename={process.env.PUBLIC_URL}>
      
        <div className={css.App}>
              
          <Player1  p1Title={this.state.player1Title}
                    p1Total={this.state.player1Total}
                    p1Current={this.state.player1Current} 
                    p1Active={this.state.player1Active}>
                      
            </Player1>

              
            <Player2  p2Title={this.state.player2Title}
                      p2Total={this.state.player2Total}
                      p2Current={this.state.player2Current}
                      p2Active={this.state.player2Active}></Player2>

            <div className={css.Controls}>
              <div> 
                <h4 className={css.NewGame} onClick={this.newGame}>New Game</h4>
                <h4 className={css.RollDice} 
                    onClick={this.rollDice}>
                      Roll Dice
                </h4>
                <h4 className={css.Hold} onClick={this.hold}>Hold</h4>            
              </div>
              

              <div className={css.DiceContainer}>
                <img className={css.Dice}
                  src={this.state.dice}
                  alt="dice"></img>
              </div>  

            </div> 
          
        </div>  
      
      </BrowserRouter>
      
    );  
  }
}

export default App;
