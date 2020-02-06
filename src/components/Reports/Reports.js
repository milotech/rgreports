import React from 'react';
import ReportHead from '../ReportHead';
import ReportContent from '../ReportContent';
import ReportSettings from '../ReportSettings';

import './Reports.css';

export default class Reports extends React.Component {
    constructor(props) {
        super(props);

        const week = getCurrentWeek();
        this.state = {
            week: week,
            days: loadWeekDays(week),
            settings: loadSettings()
        };

        this.handleChangeWeek = this.handleChangeWeek.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleAddRow = this.handleAddRow.bind(this);
        this.handleRemoveRow = this.handleRemoveRow.bind(this);
        this.handleSetAllWeekText = this.handleSetAllWeekText.bind(this);
        this.saveDays = this.saveDays.bind(this);
        
        this.handleChangeSettings = this.handleChangeSettings.bind(this);
        this.saveSettings = this.saveSettings.bind(this);
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
        this.saveDays(days);
    }

    handleAddRow(day) {
        const days = this.state.days.slice();
        const dayHours = days[day].reduce((prev, curr) => prev + (+curr.hours || 0), 0);
        let newRowHours = undefined;
        if(dayHours < 8)
            newRowHours = Math.round((8 - dayHours) * 100) / 100;
        days[day].push({ hours: newRowHours });
        
        this.setState({ days });
        this.saveDays(days);
    }

    handleRemoveRow(day, rowIndex) {
        if(rowIndex <= 0)
            return;

        const days = this.state.days.slice();
        days[day].splice(rowIndex, 1);
        
        this.setState({ days });
        this.saveDays(days);
    }

    handleSetAllWeekText(text) {
        if(window.confirm('Все данные за неделю будут стёрты. Уверены?')) {
            const daysCount = this.state.days.length;
            const days = Array(daysCount).fill().map(() => [{ 
                component: "-",
                milestone: "-",
                task: "-",
                hours: "0",
                text
            }]);

            this.setState({ days });
            this.saveDays(days);
        }
    }

    saveDays(days) {
        if(this.saveDaysTimeout)
            clearTimeout(this.saveDaysTimeout);

        const week = this.state.week;
        this.saveDaysTimeout = setTimeout(() => {
            saveWeekDays(week, days);
        }, 1000);
    }

    handleChangeSettings(settingName, settingValue) {
        let settings = { ...this.state.settings };
        settings[settingName] = settingValue;

        this.setState({ settings });
        this.saveSettings(settings);
    }

    saveSettings(settings) {
        if(this.saveSettingsTimeout)
            clearTimeout(this.saveSettingsTimeout);

        this.saveSettingsTimeout = setTimeout(() => {
            saveSettings(settings);
        }, 500);
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
                    onSetAllWeekText={this.handleSetAllWeekText}
                    settings={this.state.settings}
                />
                <ReportSettings settings={this.state.settings} onChange={this.handleChangeSettings} />
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
    return Array(5).fill().map(() => [{ }]);
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

function loadSettings() {
    const jsonValue = localStorage.getItem('settings');
    return jsonValue ? JSON.parse(jsonValue) : { component: '', milestone: '4.7', task: '', hours: '8', fullView: false };
}

function saveSettings(settings) {
    const key = 'settings';
    const value = JSON.stringify(settings);
    localStorage.setItem(key, value);
}