import { View, Text, PanelHeader } from '@vkontakte/vkui';
import React from 'react';

const HeaderTitleFixedLenght = props => {

    const headerTitleHandler = (text) => {
        if (text.length < 25) {
            return text;
        } else {
            let cuttedName = text.substring(0, 22);
            return cuttedName + '...';
        }
    }

    return (
        <Text id='customHeader' style={{ fontSize: 18, fontFamily: 'robo-b' }}>{headerTitleHandler(props.children)}</Text>
    );
};

export default HeaderTitleFixedLenght;