import React from 'react';

import './ReportSettings.css';

export default class ReportSettings extends React.Component {
    handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.props.onChange(e.target.name, value);
    }

    render() {
        let { component, milestone, task, hours, fullView } = this.props.settings;
        if(isNaN(hours))
            hours = 8;

        return (
            <div className="ReportSettings"> 
                <div className="full-view-setting">
                    <label>
                        Расширенный вариант
                        <input type="checkbox" name="fullView" checked={fullView} onChange={this.handleChange} />
                    </label>
                </div>
                <div>
                    <header>Значения по умолчанию:</header>
                    <div className="default-settings">
                        <label className="setting">
                            Компонент:
                            <input type="text" name="component" value={component} onChange={this.handleChange} style={{width: '36px'}} />
                        </label>
                        {
                            fullView && (
                                <React.Fragment>
                                    <label className="setting">
                                        Майлстоун:
                                        <input type="text" name="milestone" value={milestone} onChange={this.handleChange} style={{width: '36px'}} />
                                    </label>
                                    <label className="setting">
                                        Таск:
                                        <input type="text" name="task" value={task} onChange={this.handleChange}  style={{width: '70px'}}/>
                                    </label>
                                </React.Fragment>
                            )
                        }
                        <label className="setting">
                            Часы:
                            <input type="text" name="hours" value={hours} onChange={this.handleChange}  style={{width: '30px'}}/>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}