import React from 'react';
import ReportHead from '../ReportHead';
import ReportContent from '../ReportContent';

import './Reports.css';

export default class Reports extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            week: getCurrentWeek(),
            days: [[{}], [{}], [{}], [{}], [{}]]
        };

        this.handlePrevWeek = this.handlePrevWeek.bind(this);
        this.handleNextWeek = this.handleNextWeek.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handlePrevWeek() {
        this.setState((state) => ({
            week: state.week - 1,
            days: [[{}], [{}], [{}], [{}], [{}]],
        }));
    }

    handleNextWeek() {
        this.setState((state) => ({
            week: state.week + 1,
            days: [[{}], [{}], [{}], [{}], [{}]],
        }));
    }

    handleChange(day, row, fieldName, fieldValue) {
        const days = this.state.days.slice();
        if(!days[day])
            days[day] = [];
        if(!days[day][row])
            days[day][row] = {};

        days[day][row][fieldName] = fieldValue;
        
        this.setState({ days });
    }

    render() {
        return (
            <div className='Reports'>
                <ReportHead 
                    week={this.state.week}
                    weekDaysCount={this.state.days.length}
                    onPrevWeek={this.handlePrevWeek}
                    onNextWeek={this.handleNextWeek}
                />
                <ReportContent
                    week={this.state.week}
                    days={this.state.days}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

function getCurrentWeek() {
    const now = Date.now();

    return Math.trunc(now / 1000 / 60 / 60 / 24 / 7);
}