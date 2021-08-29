import { Div, Text, View } from '@vkontakte/vkui';
import React from 'react';

import football_photo_thumb from '../../assets/img/football_photo_thumb.png';

const PlayerRowItem = props => {

    const player = props.player;

    return (
        <Div style={{ display: 'flex', flexDirection: 'row', padding: 0, height: 55, alignItems: 'center' }}>
            <View className='TableRowItemLogoCircle'>
                <img className='TableRowItemLogo' src={player.photo ? `https://st.joinsport.io/player/${player.player_id}/photo/${player.photo}` : football_photo_thumb}/>
            </View>
            <Div>
                <Text style={{ fontFamily: 'robo-r', fontSize: 14 }} >{player.last_name}</Text>
                <Text style={{ fontFamily: 'robo-r', fontSize: 12, color: '#999' }}>{player.first_name} {player.middle_name}</Text>
            </Div>
        </Div>
    );
};

export default PlayerRowItem;