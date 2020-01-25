import React from 'react';
import CopyButton from '../CopyButton';
import Day from '../../core/Day';

import prevImage from './images/prev.png';
import nextImage from './images/next.png';

import './ReportHead.css';

export default function ReportHead({ week, weekDaysCount, onPrevWeek, onNextWeek }) {
    const firstDay = Day.createDay(week, 0);
    const lastDay = Day.createDay(week, weekDaysCount - 1);
    const title = getTitleString(firstDay, lastDay);

    return (
        <div className='ReportHead'>
            <div className='week-prev'>
                <img src={prevImage} alt='prev week' onClick={onPrevWeek} />
            </div>
            <div className='week-title panel'>
                {title}
                <CopyButton value={title} />
            </div>
            <div className='week-next'>
                <img src={nextImage} alt='next week' onClick={onNextWeek} />
            </div>
        </div>
    );
}

function getTitleString(firstDay, lastDay) {
    if(firstDay.year !== lastDay.year) {
        return `${firstDay.month}.${firstDay.day}.${firstDay.year}-${lastDay.month}.${lastDay.day}.${lastDay.year} Report`;
    } else if(firstDay.month !== lastDay.month) {
        return `${firstDay.month}.${firstDay.day}-${lastDay.month}.${lastDay.day}.${lastDay.year} Report`;
    } else {
        return `${firstDay.month}.${firstDay.day}-${lastDay.day}.${lastDay.year} Report`
    }
}
