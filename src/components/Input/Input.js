import React from 'react';

import './Input.css';

export default class Input extends React.Component {
    constructor(props) {
        super(props);
        if(this.props.multiline)
            this.updateTextareaHeight = this.updateTextareaHeight.bind(this);
    }

    componentDidMount() {
        this.updateTextareaHeight();
        if(this.props.multiline)
            window.addEventListener('resize', this.updateTextareaHeight);
    }

    componentDidUpdate() {
        this.updateTextareaHeight();
    }

    componentWillUnmount() {
        if(this.props.multiline)
            window.removeEventListener('resize', this.updateTextareaHeight);
    }

    updateTextareaHeight() {
        if(this.props.multiline) {
            const textarea = this.textareaRef;
            textarea.style.height = "16px";
            textarea.style.height = textarea.scrollHeight+  "px";
        }
    }

    render() {
        const { multiline, name, value, onChange, dropDownValues } = this.props;

        return (
            <div className="Input">
                { multiline 
                    ? <textarea name={name} value={value} onChange={onChange} ref={(node) => this.textareaRef = node} /> 
                    : <input type="text" autoComplete="off" name={name} value={value} onChange={onChange} />
                }
            </div>
        )
    }
}