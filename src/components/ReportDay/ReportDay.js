import React from 'react';
import ReportDayRow from './ReportDayRow';
import Day from '../../core/Day';

import addRowImage from './images/addRow.png';

import './ReportDay.css';

export default function ReportDay({ week, dayNum, rows, onFieldChange, onAddRow, onRemoveRow, settings}) {
    const day = Day.createDay(week, dayNum);

    return (
        <div className="ReportDay">
            <div className="add-row" onClick={() => onAddRow(dayNum)}>
                <img src={addRowImage} alt="add row" className="clickable" />
            </div>
            <div className="col-date">{day.toString()}</div>
            <div className="report-day-rows">
                { rows.map((rowData, rowIndex) => (
                    <ReportDayRow 
                        key={rowIndex}
                        dayNum={dayNum}
                        rowIndex={rowIndex}
                        data={rowData}
                        onFieldChange={onFieldChange}
                        onRemoveRow={onRemoveRow}
                        settings={settings}
                    />
                ))}
            </div>
        </div>
    )
}