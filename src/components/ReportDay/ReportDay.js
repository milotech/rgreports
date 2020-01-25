import React from 'react';
import ReportDayRow from './ReportDayRow';
import Day from '../../core/Day';

import './ReportDay.css';

export default function ReportDay({ week, dayNum, rows, onChange}) {
    const day = Day.createDay(week, dayNum);

    return (
        <div className="ReportDay">
            <div className="col-date">{day.toString()}</div>
            <div className="report-day-rows">
                { rows.map((row, rowIndex) => (
                    <ReportDayRow 
                        key={rowIndex}
                        dayNum={dayNum}
                        rowData={row}
                        rowIndex={rowIndex}
                        onChange={onChange}
                    />
                ))}
            </div>
        </div>
    )
}