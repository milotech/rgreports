import React from 'react';
import ReportDay from '../ReportDay';

import './ReportContent.css';

export default function ReportContent({ week, days, onChange }) {
    return (
        <div className='ReportContent'>
            <div className='panel'>
                <div className='report-cols-header'>
                    <div className='report-col col-date'>Дата</div>
                    <div className='report-col col-comp'>Комп</div>
                    <div className='report-col col-mlst'>Млст</div>
                    <div className='report-col col-task'>Таск</div>
                    <div className='report-col col-hours'>Часы</div>
                    <div className='report-col col-work'>Проделанная работа</div>
                </div>
                <div className='report-days'>
                    {Array(5).fill().map((_, i) => 
                        <ReportDay
                            key={i}
                            week={week}
                            dayNum={i}
                            rows={days[i]}
                            onChange={onChange}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}