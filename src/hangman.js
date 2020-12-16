import React, { Component } from 'react';
import { randomWord } from './words.js';

import './hangman.css';

import img0 from './images/0.jpg';
import img1 from './images/1.jpg';
import img2 from './images/2.jpg';
import img3 from './images/3.jpg';
import img4 from './images/4.jpg';
import img5 from './images/5.jpg';
import img6 from './images/6.jpg';

// import { v4 as uuidv4 } from 'uuid';

class Hangman extends Component {
    /** by default, allow 6 guesses and use provided gallows images. */
    static defaultProps = {
        images: [img0, img1, img2, img3, img4, img5, img6],
        maxWrong: 6,
        // test : this.defaultProps.images.length,

    };

    // New way
    state = {
        nWrong: 0, 
        guessed: new Set(), 
        answer: randomWord()
    };

    reset = () => {
        this.setState({
            nWrong: 0,
            guessed: new Set(),
            answer: randomWord(),
        })

    }

    /** guessedWord: show current-state of word:
     * 
     * at start, guessedWord() will be return [_,_,_,_,_];
      if guessed letters are {a,p,e}, show "app_e" for "apple"
    */
    guessedWord() {
        return this.state.answer
            .split("")
            .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
    }

    /** handleGuest: handle a guessed letter:
      - add to guessed letters
      - if not in answer, increase number-wrong guesses
    */
    handleGuess = (evt) => {
        let ltr = evt.target.value;
        this.setState(st => ({
            guessed: st.guessed.add(ltr),
            nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
        }));
    }

    /** generateButtons: return array of letter buttons to render */
    generateButtons() {
        return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
            <button
                key={ltr}
                value={ltr}
                onClick={this.handleGuess}
                disabled={this.state.guessed.has(ltr)}
            >
                {ltr}
            </button>
        ));
    }

    /** render: render game */
    render() {
        const gameOnGoing = this.state.nWrong < this.props.maxWrong;
        const altText = `${this.state.nWrong} / ${this.props.maxWrong} guesses`;
        const isWinner = this.guessedWord().join('') === this.state.answer;
        let gameState = this.generateButtons();
        if (isWinner) gameState = 'You Win! 🥳';
        if (!gameOnGoing) gameState = 'You lose! 😢';
        return (
            <div className='Hangman'>
                <div className='Hangman-title'>
                    <h1>Hangman</h1>
                </div>
                <div className='Hangman-main'>
                <div className ='Hangman-image-section'>
                    <img src={this.props.images[this.state.nWrong]} alt={altText} />
                </div>
                <div className='Hangman-word-and-btns-section'>
                <p className='Hangman-guess-count'>No. of wrong guesses: {this.state.nWrong}</p>
                    <p className='Hangman-word'>
                        {gameOnGoing ? this.guessedWord() : this.state.answer}
                    </p>
                    <p className='Hangman-btns'>
                        {gameState}
                    </p>
                    <button onClick={this.reset} id='reset'> Reset game ?</button>
                </div>
                </div>

            </div>
        );
    }
}

export default Hangman;