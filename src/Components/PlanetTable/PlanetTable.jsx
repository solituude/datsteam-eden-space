import React from "react";
import s from './planetTable.module.scss';

const PlanetTable = ({planetArray}) => {
    return(
        <div className={s.content}>
            <p><b>Вселенная</b></p>
            <table>
                <thead>
                <tr><td>Планета отправления</td><td>Планета прибытия</td><td>Стоимость</td></tr>
                </thead>
                <tbody>
                {
                    planetArray.map((item, index) => (
                        <tr key={index}>
                            <td>{item[0]}</td>
                            <td>{item[1]}</td>
                            <td>{item[2]}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default PlanetTable;