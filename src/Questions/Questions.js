import react, { Fragment, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
    CircularProgressbar,
    // CircularProgressbarWithChildren,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import QuestionsCss from '../Questions/Questions.module.css';
import { useLocation } from "react-router-dom";

import {
    Link
} from "react-router-dom";
import { useHistory } from "react-router-dom";
import rightSound from '../good-sound.wav';
import wrongSound from '../wrong-sound.wav';

function Questions(props) {
    let history = useHistory();
    const location = useLocation();

    const randomGenerator = (randomIndexes, length) => {
        let random = Math.floor(Math.random() * (length - 1) + 0);
        if (randomIndexes.includes(random)) {
            randomGenerator(randomIndexes, length);
        } else {
            randomIndexes.push(random)
        }
    }

    useEffect(() => {
        let prev = sessionStorage.getItem('prev')
        if (prev == 'easy-hard') {
        } else {
            history.push('/easy-hard')
        }
        sessionStorage.removeItem('prev')
        sessionStorage.removeItem('result')

    }, []);

    const [value, setValue] = useState(20);
    const [question, setQuestion] = useState(0)
    const [birds, setBirds] = useState(null)
    const [audio, setAudio] = useState(null)
    const [isDisabled, setIsDisabled] = useState(false)


    const [selection, setSelection] = useState({
        correctIndex: -1,
        choosenIndex: -1
    })

    const [result, setResult] = useState([])
    const [hold, setHold] = useState(false)
    const [randomIndexes, setRandomIndexes] = useState('')


    // const url = 'https://birds-app.herokuapp.com/api/';
    // const url = '/api/';
    // const url = 'http://localhost:3002/api/';
    const url = process.env.REACT_APP_URL ? process.env.REACT_APP_URL : 'http://109.106.244.123:8080/api/';


    const refs = useRef()

    useEffect(() => {
        let length = localStorage.getItem('length')
        let randomIndexes = [];
        for (let i = 0; i <= 9; i++) {
            randomGenerator(randomIndexes, length ? length : 20);
        }
        console.log(randomIndexes)
        setRandomIndexes(randomIndexes)
        axios.get(`${url}get-question/${randomIndexes[question]}`)
            .then(res => {
                setBirds({
                    bird: res.data.data.question,
                    birds: res.data.data.options
                })
                onTrackChange(res.data.data.question.audio)
            })
    }, [])

    useEffect(() => {
        console.log(value)
        let timer = setTimeout(() => {
            let newValue = value;
            if (value == 0) {
                // refs.current.pause();
                let obj = {
                    correct: false,
                    audio: birds.bird.audio,
                    name: birds.bird.name
                }
                let array = JSON.parse(sessionStorage.getItem('result'))
                if (array) {
                    array[question] = obj;
                    sessionStorage.setItem('result', JSON.stringify(array))
                } else {
                    let newArray = [obj]
                    sessionStorage.setItem('result', JSON.stringify(newArray))
                }
                gotoNext();
            }
            else {
                setValue(--newValue)
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [value])


    const gotoNext = () => {
        setValue(20)
        if (question <= 8) {
            let updatedQuestion = question
            updatedQuestion++;
            setQuestion(updatedQuestion)
            axios.get(`${url}get-question/${randomIndexes[updatedQuestion]}`)
                .then(res => {
                    setIsDisabled(false)
                    setSelection({
                        correctIndex: -1,
                        choosenIndex: -1
                    })
                    setBirds({
                        bird: res.data.data.question,
                        birds: res.data.data.options
                    }
                    )

                    onTrackChange(res.data.data.question.audio)
                })
        } else {
            history.push('/result')
        }
    }

    const styled = {
        textTransform: 'uppercase',
        width: '100%',
        minHeight: '70px',
        fontWeight: 'bold',
    }

    const onTrackChange = (source) => {
        setAudio(source)
        console.log(refs.current)
        if (refs.current) {
            refs.current.pause();
            refs.current.load();
            refs.current.play();
        }
    }

    const answerChoosen = (adnan) => {
        setIsDisabled(true)
        let obj = {
            correct: adnan.correct,
            audio: birds.bird.audio,
            name: birds.bird.name
        }
        let array = JSON.parse(sessionStorage.getItem('result'))
        if (array) {
            array[question] = obj;
            sessionStorage.setItem('result', JSON.stringify(array))
        } else {
            let newArray = [obj]
            sessionStorage.setItem('result', JSON.stringify(newArray))
        }
        setSelection({
            correctIndex: question.index,
            choosenIndex: adnan.index
        })
        if (adnan.correct) {
            onTrackChange(rightSound)
            setTimeout(() => {
                gotoNext();
            }, 2000);
        } else {
            onTrackChange(wrongSound)
            setTimeout(() => {
                gotoNext();
            }, 2000);
        }
    }

    const audioStyle = {
        display: 'none'
    }

    return (
        <div className="Questions-game-bg">
            {audio ? <Fragment> <audio controls autoplay="true" allow="autoplay" ref={refs} style={audioStyle} >
                <source src={audio} type="audio/mp3" />
                {/* <source src={audio} type="audio/wav" /> */}
            </audio>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <h1>Quel-est cet oiseau ?</h1>
                            <CircularProgressbar
                                className={QuestionsCss.CircularProgressbar}
                                value={value}
                                maxValue={20}
                                text={`${value}s`} />
                        </div>
                    </div>
                    <div className="row justify-content-center">

                        <div className="col-md-6 col-lg-3 mb-3">
                            <button
                                disabled={isDisabled}
                                onClick={() => answerChoosen(birds.birds[0], 0)}
                                className={(selection.choosenIndex != -1 && (birds.birds[0].correct || selection.choosenIndex == birds.birds[0].index)) ? (birds.birds[0].correct ? QuestionsCss.greenButton : QuestionsCss.redButton) : QuestionsCss.yellowButton}
                                //     className={color.green? 'greenButton':'yellow-btn'
                                // }
                                style={styled}
                            >
                                {birds.birds[0].name}
                            </button>
                        </div>
                        <div className="col-md-6 col-lg-3 mb-3">
                            <button
                                disabled={isDisabled}

                                onClick={() => answerChoosen(birds.birds[1], 1)}
                                className={(selection.choosenIndex != -1 && (birds.birds[1].correct || selection.choosenIndex == birds.birds[1].index)) ? (birds.birds[1].correct ? QuestionsCss.greenButton : QuestionsCss.redButton) : QuestionsCss.yellowButton}
                                style={styled}
                            >
                                {birds.birds[1].name}
                            </button>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-3 mb-3">
                            <button
                                disabled={isDisabled}

                                type="button"
                                onClick={() => answerChoosen(birds.birds[2], 2)}
                                className={(selection.choosenIndex != -1 && (birds.birds[2].correct || selection.choosenIndex == birds.birds[2].index)) ? (birds.birds[2].correct ? QuestionsCss.greenButton : QuestionsCss.redButton) : QuestionsCss.yellowButton}
                                // className={color.green? 'greenButton':'yellow-btn'}
                                style={styled}
                            >
                                {birds.birds[2].name}
                            </button>
                        </div>
                        <div className="col-md-6 col-lg-3 mb-3">
                            <button
                                disabled={isDisabled}

                                type="button"

                                onClick={() => answerChoosen(birds.birds[3], 3)}
                                className={(selection.choosenIndex != -1 && (birds.birds[3].correct || selection.choosenIndex == birds.birds[3].index)) ? (birds.birds[3].correct ? QuestionsCss.greenButton : QuestionsCss.redButton) : QuestionsCss.yellowButton}
                                style={styled}
                            >
                                {birds.birds[3].name}
                            </button>
                        </div>
                    </div>
                </div>
            </Fragment> : null} </div>
    );
}

export default Questions;