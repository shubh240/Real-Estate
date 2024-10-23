import React from 'react';
import './WhatsAppWeb.css';
import { PUBLICURL } from '../../utils/common.service';

export const WhatsAppWeb = () => {
    return (
        <div className="whatsapp-web-container">
            <div className="whatsapp-web-content">
                <div className="whatsapp-web-image">
                    <img src={PUBLICURL + `/assets/imges/icons/boyo-logo.svg`} alt="WhatsApp Web Illustration" />
                </div>
                <div className="whatsapp-web-text">
                    <h1>Bboyo Web Chat</h1>
                    <p>Send and receive messages without keeping your phone online.</p>
                </div>
            </div>
        </div>
    );
};
