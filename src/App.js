import React, {Component} from 'react';
import css from './App.module.css';

// import p1Css from './Component/Player1/Player1.module.css';

import Player1 from './Component/Player1/Player1';
import Player2 from './Component/Player2/Player2';

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
    diceArr: ['https://i.imgur.com/m9mb3cx.png',
             'https://i.imgur.com/EA2qvGZ.png',
             'https://i.imgur.com/qaekzKO.png',
             'https://i.imgur.com/qbqvQvB.png', 
             'https://i.imgur.com/eeBcrqU.png', 
             'https://i.imgur.com/vzksTKQ.png'],

    dice: null,
    point: null,
  }

  componentDidMount() {


    this.rollDice();

    this.setState({
      player1Current: 0
    })
  }

  // componentDidUpdate(prevProps, prevState) {

  //   // console.log('prev');
  //   console.log(prevState.player1Current);
  //   console.log(prevState.player1Total);
  //   // console.log('state');
  //   // console.log(this.state.player1Current);
  //   // console.log(this.state.player1Total);

  //   console.log(prevState.player1Total + prevState.player1Current);

  //   if((prevState.player1Total + this.state.player1Current) >= 60){

  //     this.winner(prevState.player1Active, prevState.player2Active);
  //   }
  //   else if((prevState.player2Total + this.state.player2Current) >= 60){

  //     this.winner(prevState.player1Active, prevState.player2Active);
  //   }
  // }

  shouldComponentUpdate(nextProps, nextState) {

    console.log('shouldUp');
    console.log(nextState.player1Current);
    console.log(nextState.player1Total);
    
    console.log('suma')
    console.log(nextState.player1Total + nextState.player1Current);

    // no anda la foto por las llamadas
    // si no anda esto meto redux ya foe

    if((nextState.player1Total + nextState.player1Current) >= 60) {

      this.winner(this.state.player1Active, this.state.player2Active);

      return true;
    }
    else{
      return false;
    }

    // return true;

  }

  winner = (p1, p2) => {


    if(p1){

      console.log('winner 1  if');

      this.setState({
        player1Title: 'Winner!!!'
      })
    }
    
    else if(p2){

      this.setState({
        player2Title: 'Winner!!!'
      })
    }
  }

  rollDice = () => {
    
    const arrPos = Math.floor(Math.random() * (6 - 1 + 1) + 1);

    this.setState({
      dice: this.state.diceArr[arrPos-1],
    });

    // check if Player1 Active
    if(this.state.player1Active){

      // sets dice
      this.setState({
        player1Current: arrPos
      })

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
            })

        console.log(this.state.player1Total + this.state.player1Current);
        //  check if >= 60, sets winner and resets counters
        if((this.state.player1Current + this.state.player1Total) >= 60){

          console.log('plus 60');

          // console.log(this.state.player1Total + this.state.player1Current);

          this.setState({
            player1Title: 'Winner!!!',
          })

          return null;
        }
        else {

          this.setState({
            player1Current: this.state.player1Current + arrPos
          })
        }
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
          player1Total: this.state.player1Current + this.state.player1Total
        })

        // // check if >= 60, sets winner and resets counters
        // if((this.state.player2Current + this.state.player2Total) >= 60){

        //   this.setState({
        //     player2Title: 'Winner!!!',
        //   })

        //   return null;
        // }
      }
    }
  } //end rollDice


  hold = () => {

    // check if Player1 active
    // sets total points
    // switches players
    if(this.state.player1Active) {

      // if((this.state.player1Current + this.state.player1Total) >= 60){

      //   this.setState({
      //     player1Title: 'Winner!!!',
      //   })

      //   return null;
      // }
      // else {

        this.setState({
          player1Total: this.state.player1Total + this.state.player1Current,
          player1Current: 0,
          player1Active: !this.state.player1Active,
          player2Active: !this.state.player2Active
        })
      // }
    }
    // else does the opposite

    else {

      // if((this.state.player2Current + this.state.player2Total) >= 60){

      //   this.setState({
      //     player2Title: 'Winner!!!',
      //   })

      //   return null;
      // }     
      // else { 

        this.setState({
          player2Total: this.state.player2Total + this.state.player2Current,
          player2Current: 0,
          player2Active: !this.state.player2Active,
          player1Active: !this.state.player1Active
        })
    //  }
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
      player2Active: false
    })
  }



  render() {
    
    return (
      <div className={css.App}>


        {/* <div className={css.Container}> */}
            
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
                  // onClick={() => {this.rollDice(); this.winner()}}>
                  onClick={this.rollDice}>
                    Roll Dice
              </h4>
              <h4 className={css.Hold} onClick={this.hold}>Hold</h4>            
            </div>
            

            <div className={css.DiceContainer}>
              <img className={css.Dice}
                // src="https://i.imgur.com/EA2qvGZ.png"
                src={this.state.dice}  
                alt="dice"></img>
            </div>  

          </div> 
        {/* </div> */}
      </div>
      
    );  
  }
}

export default App;
