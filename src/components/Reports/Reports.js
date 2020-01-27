import React from 'react';
import ReportHead from '../ReportHead';
import ReportContent from '../ReportContent';

import './Reports.css';

export default class Reports extends React.Component {
    constructor(props) {
        super(props);

        const week = getCurrentWeek();
        this.state = {
            week: week,
            days: loadWeekDays(week)
        };

        this.handleChangeWeek = this.handleChangeWeek.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleAddRow = this.handleAddRow.bind(this);
        this.handleRemoveRow = this.handleRemoveRow.bind(this);
        this.save = this.save.bind(this);
    }

    handleChangeWeek(offset) {
        this.setState((state) => {
            const week = state.week + offset;
            const days = loadWeekDays(week);
            return { week , days}
        });
    }

    handleFieldChange(day, row, fieldName, fieldValue) {
        if(fieldName === 'hours')
            if(isNaN(fieldValue))
                return;

        const days = this.state.days.slice();
        days[day][row][fieldName] = fieldValue;
        
        this.setState({ days });

        this.save(days);
    }

    handleAddRow(day) {
        const days = this.state.days.slice();
        const dayHours = days[day].reduce((prev, curr) => prev + (+curr.hours || 0), 0);
        let newRowHours = undefined;
        if(dayHours < 8)
            newRowHours = Math.round((8 - dayHours) * 100) / 100;
        days[day].push({ hours: newRowHours });
        
        this.setState({ days });

        this.save(days);
    }

    handleRemoveRow(day, rowIndex) {
        if(rowIndex <= 0)
            return;

        const days = this.state.days.slice();
        days[day].splice(rowIndex, 1);
        
        this.setState({ days });

        this.save(days);
    }

    save(days) {
        if(this.saveTimeout)
        clearTimeout(this.saveTimeout);

        const week = this.state.week;
        this.saveTimeout = setTimeout(() => {
            saveWeekDays(week, days);
        }, 1000);
    }

    render() {
        return (
            <div className='Reports'>
                <ReportHead 
                    week={this.state.week}
                    weekDaysCount={this.state.days.length}
                    onChangeWeek={this.handleChangeWeek}
                />
                <ReportContent
                    week={this.state.week}
                    days={this.state.days}
                    onFieldChange={this.handleFieldChange}
                    onAddRow={this.handleAddRow}
                    onRemoveRow={this.handleRemoveRow}
                />
            </div>
        );
    }
}

const DAYMILLISECONDS = 86400000;

function getCurrentWeek() {
    const milliseconds = Date.now(); // Date.now returns milliseconds from thursday, 01/01/1970
    const millisecondsFromMonday = milliseconds + 3 * DAYMILLISECONDS;

    return Math.trunc(millisecondsFromMonday / 1000 / 60 / 60 / 24 / 7);
}

function getEmptyDays() {
    return Array(5).fill().map(() => [{ hours: 8}]);
}

function loadWeekDays(week) {
    const jsonValue = localStorage.getItem('week' + week);
    return jsonValue ? JSON.parse(jsonValue) : getEmptyDays();
}

function saveWeekDays(week, days) {
    const key = 'week' + week;
    const value = JSON.stringify(days);
    localStorage.setItem(key, value);
}