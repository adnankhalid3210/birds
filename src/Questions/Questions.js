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
    useEffect(() => {
        return () => {
            console.log("cleaned up");
        };
    }, []);

    useEffect(() => {
        let prev = sessionStorage.getItem('prev')
        if (prev == 'easy-hard') {
        } else {
            history.push('/easy-hard')
        }
        sessionStorage.removeItem('prev')
        sessionStorage.removeItem('result')

    }, []);

    const [value, setValue] = useState(0);
    const [question, setQuestion] = useState(0)

    const [dataAxios, setdataAxios] = useState(null);
    const [birds, setBirds] = useState(null)
    // let birds = {
    //     bird:
    //     birds: 
    // }
    const [audio, setAudio] = useState(null)
    const [color, setColor] = useState(null)
    const [selection, setSelection] = useState({
        correctIndex: -1,
        choosenIndex: -1
    })
    const [result, setResult] = useState([])
    const [hold, setHold] = useState(false)

    const url = 'https://birds-app.herokuapp.com/api/get-question/';
    const refs = useRef()

    useEffect(() => {
        axios.get(`${url}${question}`)
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
            if (value == 20) {
                refs.current.pause();
            }
            else {
                setValue(++newValue)
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [value])


    const gotoNext = () => {
        setValue(0)

        if (question <= 8) {
            let updatedQuestion = question
            updatedQuestion++;
            setQuestion(updatedQuestion)
            axios.get(`${url}${updatedQuestion}`)
                .then(res => {
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

    const answerChoosen = (adnan, index) => {
        let obj = {
            correct: adnan.correct,
            audio: birds.bird.audio,
            name: adnan.name
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
                            <h1>What is this Birds?</h1>
                            <CircularProgressbar
                                className={QuestionsCss.CircularProgressbar}
                                value={value}
                                maxValue={20}
                                text={`${value}s`} />
                        </div>
                    </div>
                    <div className="row justify-content-center">

                        <div className="col-md-3 mb-3">
                            <button
                                onClick={() => answerChoosen(birds.birds[0], 0)}
                                className={(selection.choosenIndex != -1 && (birds.birds[0].correct || selection.choosenIndex == birds.birds[0].index)) ? (birds.birds[0].correct ? QuestionsCss.greenButton : QuestionsCss.redButton) : QuestionsCss.yellowButton}
                                //     className={color.green? 'greenButton':'yellow-btn'
                                // }
                                style={styled}
                            >
                                {birds.birds[0].name}
                            </button>
                        </div>
                        <div className="col-md-3 mb-3">
                            <button
                                onClick={() => answerChoosen(birds.birds[1], 1)}
                                className={(selection.choosenIndex != -1 && (birds.birds[1].correct || selection.choosenIndex == birds.birds[1].index)) ? (birds.birds[1].correct ? QuestionsCss.greenButton : QuestionsCss.redButton) : QuestionsCss.yellowButton}
                                style={styled}
                            >
                                {birds.birds[1].name}
                            </button>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-3 mb-3">
                            <button
                                type="button"
                                onClick={() => answerChoosen(birds.birds[2], 2)}
                                className={(selection.choosenIndex != -1 && (birds.birds[2].correct || selection.choosenIndex == birds.birds[2].index)) ? (birds.birds[2].correct ? QuestionsCss.greenButton : QuestionsCss.redButton) : QuestionsCss.yellowButton}
                                // className={color.green? 'greenButton':'yellow-btn'}
                                style={styled}
                            >
                                {birds.birds[2].name}
                            </button>
                        </div>
                        <div className="col-md-3 mb-3">
                            <button
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