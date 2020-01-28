import React from 'react';

export default class ReportContentFooter extends React.Component {
    setVacation = () => { this.props.onSetAllWeekText("Vacation"); }
    setSick = () => { this.props.onSetAllWeekText("Sick leave"); }
    setHoliday = () => { this.props.onSetAllWeekText("Holiday"); }
    setDayoff = () => { this.props.onSetAllWeekText("Day off"); }

    render() {
        return (
            <div className="ReportContentFooter">
                <div className="content-footer-title">
                    Отметить всю неделю:
                </div>
                <ul className="content-footer-menu">
                    <li className="clickable" onClick={this.setVacation}>Отпуск</li>
                    <li className="clickable" onClick={this.setSick}>Болезнь</li>
                    <li className="clickable" onClick={this.setHoliday}>Праздник</li>
                    <li className="clickable" onClick={this.setDayoff}>Отгул</li>
                </ul>
            </div>
        )
    }
}