import React, {useEffect, useState} from 'react';
import s from './planetGarbage.module.scss';
import {getPlanetGarbage} from "../../api/api";

const PlanetGarbage = ({data, currPlanet}) => {
    const [figures, setFigures] = useState([]);
    useEffect(() => {
        setFigures(getPlanetGarbage(data));
    }, [data])

    return(
        <div className={s.contentOuter}>
            <p className={s.info}>
                 Мусор планеты: {currPlanet}
            </p>
            <div className={s.content}>
                {
                    figures.map((currFigure, index) => (
                        <div key={index} className={s.figure}>
                            {
                                currFigure.map((row, index) => (
                                    <div key={index} className={s.row}>
                                        {
                                            row.map((ceil, index) => (
                                                <div key={index} style={{background: ceil}} className={s.item}/>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PlanetGarbage;