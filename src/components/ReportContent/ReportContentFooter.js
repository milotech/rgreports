import React from 'react';

export default function ReportContentFooter({ onChange }) {
    return (
        <div className="ReportContentFooter">
            <div className="content-footer-title">
                Отметить всю неделю:
            </div>
            <ul className="content-footer-menu">
                <li className="clickable">Отпуск</li>
                <li className="clickable">Болезнь</li>
                <li className="clickable">Праздник</li>
                <li className="clickable">Отгул</li>
            </ul>
        </div>
    )
}