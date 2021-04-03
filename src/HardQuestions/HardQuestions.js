import react, { Fragment, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
    CircularProgressbar,
    // CircularProgressbarWithChildren,
    buildStyles
} from "react-circular-progressbar";
import HardQuestionsCss from '../HardQuestions/HardQuestions.css'
import "react-circular-progressbar/dist/styles.css";
import { useHistory } from "react-router-dom";
import rightSound from '../good-sound.wav';
import wrongSound from '../wrong-sound.wav';

function HardQuestions() {

    let history = useHistory();
    const [value, setValue] = useState(0);
    const [name, setName] = useState('');
    const [birds, setBirds] = useState(null)
    const [audio, setAudio] = useState(null)
    const [question, setQuestion] = useState(0)
    const [hold, setHold] = useState(false)
    const [isCorrect, setIsCorrect] = useState('')

    const [selection, setSelection] = useState({
        correctIndex: -1,
        choosenIndex: -1
    })
    const [randomIndexes, setRandomIndexes] = useState('')


    const randomGenerator = (randomIndexes) => {
        let random = Math.floor(Math.random() * (19 - 0) + 0);
        if (randomIndexes.includes(random)) {
            randomGenerator(randomIndexes);
        } else {
            randomIndexes.push(random)
        }
    }

    const url = 'https://birds-app.herokuapp.com/api/get-question/';
    const refs = useRef()

    useEffect(() => {
        console.log(value)
        let timer = setTimeout(() => {
            let newValue = value;
            if (value == 20) {
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
                setValue(++newValue)
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [value])

    useEffect(() => {
        let prev = sessionStorage.getItem('prev')
        if (prev == 'easy-hard') {
        } else {
            history.push('/easy-hard')
        }
        sessionStorage.removeItem('prev')
        sessionStorage.removeItem('result')

    }, []);

    useEffect(() => {
        let randomIndexes = [];
        for (let i = 0; i <= 9; i++) {
            randomGenerator(randomIndexes);
        }
        console.log(randomIndexes)
        setRandomIndexes(randomIndexes)
        axios.get(`${url}${randomIndexes[question]}`)
            .then(res => {
                setBirds({
                    bird: res.data.data.question,
                    birds: res.data.data.options
                })
                onTrackChange(res.data.data.question.audio)


            })
    }, [])

    const gotoNext = () => {
        setValue(0)

        if (question <= 8) {
            let updatedQuestion = question
            updatedQuestion++;
            setQuestion(updatedQuestion)
            axios.get(`${url}${randomIndexes[updatedQuestion]}`)
                .then(res => {
                    setBirds({
                        bird: res.data.data.question,
                        birds: res.data.data.options
                    }
                    )
                    onTrackChange(res.data.data.question.audio)
                    setIsCorrect('')
                })
        } else {
            history.push('/result')
        }
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


    const changeHandler = (event) => {
        setName(event.target.value)
    }

    const clickHandler = () => {
        let obj = {
            correct: birds.bird.name.toLowerCase() == name.toLowerCase(),
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
        setName('')
        if (birds.bird.name.toLowerCase() == name.toLowerCase()) {
            setTimeout(() => {
                gotoNext();
            }, 2000);
            onTrackChange(rightSound)
        } else {
            setTimeout(() => {
                gotoNext();
            }, 2000);
            onTrackChange(wrongSound)
        }
    }

    const audioStyle = {
        display: 'none'
    }

    return (
        <div className="HardQuestions-game-bg">
            {audio ? <Fragment> <audio controls autoplay="true" allow="autoplay" ref={refs} style={audioStyle}>
                <source src={audio} type="audio/mp3" />
                {/* <source src={audio} type="audio/wav" /> */}
            </audio>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <h1>What is this Birds?</h1>
                            <CircularProgressbar
                                value={value}
                                maxValue={20}
                                text={`${value}s`} />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <input type="text" name='name' value={name} onChange={changeHandler} className="input-field" />
                            <button type="submit" className="yellow-btn mt-4" onClick={() => clickHandler()}>Next</button>
                        </div>
                        <div className="col-lg-12 mt-3">
                        </div>
                    </div>
                </div>
            </Fragment> : null}
        </div>
    );
}

export default HardQuestions;