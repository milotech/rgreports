import React from 'react';


import copyImage from './images/copy.svg';

export default class CopyButton extends React.Component {
    copy = () => {
        let value = this.props.onGetValue ? this.props.onGetValue() : this.props.value;
        copyToClipboard(value);
    }

    render() {
        return (
            <div className="CopyButton clickable" onClick={this.copy}>
                <img src={copyImage} alt="copy" />
            </div>
        )
    }
}

const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };