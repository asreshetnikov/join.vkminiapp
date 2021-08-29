import { Div, Text, View } from '@vkontakte/vkui';
import React from 'react';

import '../css/style.css'

const MatchStatSingleElement = props => {
    const team1ValuePercent = props.team1 * 100 / (props.team1 + props.team2);
    const team2ValuePercent = props.team2 * 100 / (props.team1 + props.team2);
    return (
        <View style={{ display: (props.team1 == 0 || props.team2 == 0) || (props.team1 || props.team2) ? '' : 'none'}}>
            <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 0 }}>
                <Text className='StatLine1' style={{ color: '#999' }}>{props.team1}</Text>
                <Text className='StatLine1'>{props.children}</Text>
                <Text className='StatLine1' style={{ color: '#999' }}>{props.team2}</Text>
            </Div>
            <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 0, paddingBottom: 10 }}>
                {/* <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}> */}
                    <hr color='#f49f31' style={{ width: `${team1ValuePercent}%`, height: 5, borderRadius: '5px 0px 0px 5px' }} /><hr color='#55b34b' style={{ width: `${team2ValuePercent}%`, height: 5, borderRadius: '0px 5px 5px 0px' }} />
                {/* </Div> */}
            </Div>
        </View>
    );
};

export default MatchStatSingleElement;