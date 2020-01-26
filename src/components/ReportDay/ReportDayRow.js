import React from 'react';
import Input from '../Input';
import ReportDayRowMenu from './ReportDayRowMenu';

export default function ReportDayRow({ dayNum, rowData, rowIndex, onChange, onRemoveRow }) {
    const handleChange = (e) => onChange(dayNum, rowIndex, e.target.name, e.target.value);

    const { component, milestone, task, hours, text} = rowData;

    return (
        <div className="ReportDayRow">
            <div className="col-comp">
                <Input name="component" value={component || ""} onChange={handleChange} />
            </div>
            <div className="col-mlst">
                <Input name="milestone" value={milestone || ""} onChange={handleChange} />
            </div>
            <div className="col-task">
                <Input name="task" value={task || ""} onChange={handleChange} />
            </div>
            <div className="col-hours">
                <Input name="hours" value={hours || ""} onChange={handleChange} />
            </div>
            <div className="col-work">
                <Input name="text" value={text || ""} onChange={handleChange} />
            </div>
            <ReportDayRowMenu 
                dayNum={dayNum} 
                rowIndex={rowIndex}
                onChange={onChange}
                onRemoveRow={onRemoveRow}
            />
        </div>
    )
}