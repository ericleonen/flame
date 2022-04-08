import './Flame.css';

export const Flame = ({ level }) => {
    return (
        <div id='Fire'>
            <div id='flames' className={level}>
                <div className='fire'></div>
                <div className='fire'></div>
                <div className='fire'></div>
                <div className='fire'></div>
            </div>
        </div>
    );
}