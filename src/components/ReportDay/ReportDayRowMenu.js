import React from 'react';

import rowOptionsImage from './images/rowOptions.svg';
import rowOptionsActiveImage from './images/rowOptionsActive.svg';
import rowRemoveImage from './images/rowRemove.svg';

export default class ReportDayRowMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isActive: false
        };

        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.removeRow = this.removeRow.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setRowValues(text) {
        this.props.onSetField("component", "-");
        this.props.onSetField("milestone", "-");
        this.props.onSetField("task", "-");
        this.props.onSetField("hours", "0");
        this.props.onSetField("text", text);
    }

    setVacation = () => { this.setRowValues("Vacation"); }
    setSick = () => { this.setRowValues("Sick leave"); }
    setHoliday = () => { this.setRowValues("Holiday"); }
    setDayoff = () => { this.setRowValues("Day off"); }

    removeRow() {
        this.props.onRemoveRow();
        this.setState({ isActive: false });
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            if(this.state.isActive) {
                this.toggleMenu();
            }
        }
      }

    toggleMenu() {
        this.setState((state) => ({ isActive: !state.isActive }));
    }

    render() {
        const { isActive } = this.state;

        return (
            <div className="ReportDayRowMenu" ref={(node) => this.wrapperRef = node}>
                <div className={"menu-options popup-panel" + (isActive ? " open" : "") }>
                    <ul>
                        <li className="clickable" onClick={this.setVacation}>отпуск</li>
                        <li className="clickable" onClick={this.setSick}>болезнь</li>
                        <li className="clickable" onClick={this.setHoliday}>праздник</li>
                        <li className="clickable" onClick={this.setDayoff}>отгул</li>
                        {
                            this.props.onRemoveRow != null && <li className="row-remove" onClick={this.removeRow}>
                                <img src={rowRemoveImage} alt="remove" />
                                <span>удалить</span>
                            </li>
                        }
                    </ul>
                </div>
                <img 
                    src={isActive ? rowOptionsActiveImage : rowOptionsImage} 
                    className="clickable"
                    alt="options"
                    onClick={this.toggleMenu}
                />
            </div>
        );
    }
}