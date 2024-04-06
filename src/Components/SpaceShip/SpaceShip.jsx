import React from "react";
import s from './spaceShip.module.scss';
const SpaceShip = ({dataShip}) => {// массив готовый
    return(
        <div className={s.ship}>
            <p>Грузовой отсек</p>
            {
                dataShip.map((item, index) => (
                    <div className={s.row} key={index}>
                        {
                            item.map((item2, index) =>
                                <div key={index} style={{background: item2}} className={s.item}/>
                            )
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default SpaceShip;