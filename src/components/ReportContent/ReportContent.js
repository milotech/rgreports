import React from 'react';
import ReportDay from '../ReportDay';
import ReportContentFooter from './ReportContentFooter';
import CopyButton from '../CopyButton';

import Day from '../../core/Day';

import './ReportContent.css';

export default class ReportContent extends React.Component {
    buildTextContent = () => {
        const week = this.props.week;
        return this.props.days.map(
            (dayRows, dayNum) => {
                const dayString = Day.createDay(week, dayNum).toString();
                return dayRows
                    .map(row => `${dayString}    ${row.component}    ${row.milestone}    ${row.task}    ${row.hours}    ${row.text.split('\n').join(' ')}`)
                    .join('\r\n');
            }
        ).join('\r\n\r\n');
    }

    render() {
        const { week, days, onFieldChange, onAddRow, onRemoveRow, onSetAllWeekText } = this.props;

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
                                onFieldChange={onFieldChange}
                                onAddRow={onAddRow}
                                onRemoveRow={onRemoveRow}
                            />
                        )}
                    </div>
                    <ReportContentFooter onSetAllWeekText={onSetAllWeekText} />
                    <CopyButton onGetValue={this.buildTextContent} />
                </div>
            </div>
        );
    }
}