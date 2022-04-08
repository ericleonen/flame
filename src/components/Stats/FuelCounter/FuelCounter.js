import './FuelCounter.css';

export const FuelCounter = ({ fuelPercent, fuelLevel }) => {
    return (
        <div id="FuelCounter">
            <div id="bar-outer" className={fuelLevel}>
                <div id="bar-inner" className={fuelLevel} style={{width: fuelPercent}}></div>
            </div>
        </div>
    );
}