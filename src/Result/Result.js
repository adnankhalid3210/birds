import react, { useEffect, useState } from 'react';
import ResultCss from '../Result/Result.module.css'
import {
    Link
  } from "react-router-dom";

function Result() {
    const [recieveItems, setRecievceItems] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState(0)

    useEffect(() => {
        let result = JSON.parse(sessionStorage.getItem('result'))
        let correct = 0;
        result.map(x => {
            if(x.correct) {
                correct++;
            }
        })
        setCorrectAnswers(correct)
        setRecievceItems(result)
    }, [])


    return (
        <div className={ResultCss.resultGameBg}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <h1 className={ResultCss.h1}>Result</h1>
                        <h4 className={ResultCss.h4}>{recieveItems.name}{correctAnswers}/10</h4>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-8 mt-4">
                        <div className={ResultCss.resultInnerBg}>
                            {recieveItems && recieveItems.map((item, i) => <div className="row mb-2">
                                <div className="col-12 col-lg-6">
                                    <div className={ResultCss.countingNumber}>
                                        <span className={ResultCss.span}>{i + 1}</span>
                                        <audio className={ResultCss.audio} controls >
                                            <source src={item.audio} type="audio/mp3" />
                                        </audio>
                                        {/* <div className={ResultCss.playArea}>
                                            &#9658;
                                                </div> */}
                                    </div>
                                </div>
                                <div className="col-lg-6 my-auto">
                                    <h5 className={item.correct == true ? ResultCss.greenColor : ResultCss.redColor}>{item.name}</h5>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                    
                </div>
                <div className="row justify-content-center">
                <div className="col-md-3 mt-5">
                        <Link to="/" className="yellow-btn">
                                     Restart           
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Result;