import React from 'react';
import Input from '../Input';
import ReportDayRowMenu from './ReportDayRowMenu';

export default class ReportDayRow extends React.Component {
    handleFieldChange = (e) => this.props.onFieldChange(this.props.dayNum, this.props.rowIndex, e.target.name, e.target.value);
    handleSetField = (name, value) => this.props.onFieldChange(this.props.dayNum, this.props.rowIndex, name, value);
    handleRemoveRow = () => this.props.onRemoveRow(this.props.dayNum, this.props.rowIndex);

    render() {
        const { component, milestone, task, hours, text } = this.props.data;
        const settings = this.props.settings;

        return (
            <div className="ReportDayRow">
                <div className="col-comp">
                    <Input name="component" value={component || ""} defaultValue={settings.component} onChange={this.handleFieldChange} />
                </div>
                <div className="col-mlst">
                    <Input name="milestone" value={milestone || ""} defaultValue={settings.milestone} onChange={this.handleFieldChange} />
                </div>
                <div className="col-task">
                    <Input name="task" value={task || ""} defaultValue={settings.task} onChange={this.handleFieldChange} />
                </div>
                <div className="col-hours">
                    <Input name="hours" value={hours || ""} defaultValue={settings.hours} onChange={this.handleFieldChange} />
                </div>
                <div className="col-work">
                    <Input name="text" multiline={true} value={text || ""} onChange={this.handleFieldChange} />
                </div>
                <ReportDayRowMenu
                    onSetField={this.handleSetField}
                    onRemoveRow={this.props.rowIndex > 0 ? this.handleRemoveRow : null}
                />
            </div>
        )
    }
}