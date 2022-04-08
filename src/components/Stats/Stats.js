import './Stats.css';

import { Flame } from '../Flame/Flame';
import { FuelCounter } from './FuelCounter/FuelCounter';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { useDispatch } from 'react-redux';
import { toggleCreate } from '../../features/generalSlice';
import { useEffect, useState } from 'react';

export const Stats = ({ user }) => {

    let name = (user) ? user.name : '...';
    let fuel = (user) ? user.fuel : 0;

    const [stats, setStats] = useState({
        level: 'Dead',
        showLevelPoints: false,
        levelPointsTotal: 0,
        levelPointsNow: 0,
        fuelPercent: '0%'
    });

    const computeFlameStats = (fuel) => {
        if (fuel === 0 || fuel === null) {
            setStats({
                level: 'Dead',
                showLevelPoints: false,
                levelPointsTotal: 0,
                levelPointsNow: 0,
                fuelPercent: '0%'
            });
        }
        else if (fuel < 1000) {
            setStats({
                level: 'Kindle',
                showLevelPoints: true,
                levelPointsTotal: 1000,
                levelPointsNow: fuel,
                fuelPercent: fuel / 10 + '%'
            });
        }
        else if (fuel < 4000) {
            setStats({
                level: 'Flare',
                showLevelPoints: true,
                levelPointsTotal: 3000,
                levelPointsNow: fuel - 1000,
                fuelPercent: (fuel - 1000) / 30 + '%'
            });
        }
        else if (fuel < 10000) {
            setStats({
                level: 'Flame',
                showLevelPoints: true,
                levelPointsTotal: 6000,
                levelPointsNow: fuel - 4000,
                fuelPercent: (fuel - 4000) / 60 + '%'
            });
        }
        else if (fuel < 20000) {
            setStats({
                level: 'Blaze',
                showLevelPoints: true,
                levelPointsTotal: 10000,
                levelPointsNow: fuel - 10000,
                fuelPercent: (fuel - 10000) / 100 + '%'
            });
        }
        else {
            setStats({
                level: 'Inferno',
                showLevelPoints: true,
                levelPointsTotal: '∞',
                levelPointsNow: fuel - 20000,
                fuelPercent: '100%'
            });
        }
    }

    useEffect(() => computeFlameStats(fuel), [fuel]);

    const formatFlameStats = (fuel) => {
        if (stats?.showLevelPoints) {
            return `Level ${stats?.level} (${stats?.levelPointsNow}/${stats?.levelPointsTotal})`;
        }
        else {
            return `Level ${stats?.level}`;
        }
    }

    const dispatch = useDispatch();

    return (
        <div id="Stats">
            <div id="flame-container">
                <Flame level={stats?.level.toLowerCase()}/>
            </div>
            <div id="stats-container">
                <h2 id="label-username">{name}</h2>
                <div id="label-level">
                    { formatFlameStats() }
                    <span id="questions-level">?</span>
                </div>
                <FuelCounter fuelPercent={stats.fuelPercent} fuelLevel={stats.level.toLowerCase()}/>
            </div>
            <button id="btn-add" onClick={() => dispatch(toggleCreate())}>
                <FontAwesomeIcon icon={faPlus} id="icon-add"/>
            </button>
        </div>
    );
}