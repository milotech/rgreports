import React from 'react';
import ReportDay from '../ReportDay';
import ReportContentFooter from './ReportContentFooter';
import CopyButton from '../CopyButton';

import Day from '../../core/Day';

import './ReportContent.css';

export default class ReportContent extends React.Component {
    buildTextContent = () => {
        const week = this.props.week;
        const fullView = this.props.settings.fullView;

        const rowMapper = fullView ? 
            row => `${row.component || this.props.settings.component || ""}\t${row.milestone || this.props.settings.milestone || ""}\t${row.task || this.props.settings.task || ""}\t${row.hours || this.props.settings.hours || ""}\t${(row.text || "").split('\n').join(' ')}`:
            row => `${row.component || this.props.settings.component || ""}\t${row.hours || this.props.settings.hours || ""}\t${(row.text || "").split('\n').join(' ')}`;

        return this.props.days.map(
            (dayRows, dayNum) => {
                const dayString = Day.createDay(week, dayNum).toString();
                return dayRows
                    .map(row => `${dayString}       ${rowMapper(row)}`)
                    .join('\r\n');
            }
        ).join('\r\n\r\n');
    }

    render() {
        const { week, days, onFieldChange, onAddRow, onRemoveRow, onSetAllWeekText, settings } = this.props;

        return (
            <div className='ReportContent'>
                <div className='panel'>
                    <div className='report-cols-header'>
                        <div className='report-col col-date'>Дата</div>
                        <div className='report-col col-comp'>Комп</div>
                        {
                            this.props.settings.fullView &&
                            (
                                <React.Fragment>
                                    <div className='report-col col-mlst'>Млст</div>
                                    <div className='report-col col-task'>Таск</div>
                                </React.Fragment>
                            )
                        }
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
                                settings={settings}
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