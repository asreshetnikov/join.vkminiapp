import { Div, Text } from '@vkontakte/vkui';
import React from 'react';
import PlayerRowItem from './PlayerRowItem';

const SquadList = props => {

    const players = props.players;

    return (
        <Div>
            {players.sort((p1, p2) => {
                if (p1.last_name < p2.last_name) {
                    return -1;
                } else if (p1.last_name > p2.last_name) {
                    return 1;
                } else {
                    return 0;
                }
            }).map((item, key) => {
                return (<PlayerRowItem key={key} player={item} />)
            })}
        </Div>
    );
};

export default SquadList;