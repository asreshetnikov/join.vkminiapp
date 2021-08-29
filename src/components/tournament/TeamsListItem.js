import { Div, Text, View } from '@vkontakte/vkui';
import React from 'react';

const TeamsListItem = props => {
    return (
        <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '50%' }}>
            <View className='TableRowItemLogoCircle'>
                <img className='TableRowItemLogo' src={props.team.logo ? `https://st.joinsport.io/team/${props.team.team_id}/logo/${props.team.logo}` : 'https://ttlf.ru/assets/53f437de/football_logo_100x100.png'}/>
            </View>
            <Text style={{ paddingLeft: 5 }}>{props.team.full_name}</Text>
        </Div>
    );
};

export default TeamsListItem;