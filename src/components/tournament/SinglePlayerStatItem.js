import { Div, Text, View } from '@vkontakte/vkui';
import React from 'react';

import football_photo_thumb from '../../assets/img/football_photo_thumb.png';

const SinglePlayerStatItem = props => {

    const getValueBasedOnFilter = () => {
        if (props.filter === 'goals') {
            return props.item.goals;
        } else if (props.filter === 'assists') {
            return props.item.assists;
        } else if (props.filter === 'points') {
            return props.item.points;
        } else if (props.filter === 'fouls') {
            return props.item.discipline;
        }
    }

    const getValueColumnsBasedOnFilter = () => {
        if (props.filter === 'goals') {
            return (
                <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 0 }}>
                    <Div style={{ width: '5%', paddingBottom: 0, paddingRight: 0 }}>
                        <Text style={{ fontFamily: 'robo-b', fontSize: 14 }}>{props.place}</Text>
                    </Div>
                    <Div style={{ width: '15%', paddingBottom: 0, paddingLeft: 10, paddingRight: 0 }}>
                        <View className='TableRowItemLogoCircle' style={{ width: '100%' }}>
                            <img className='TableRowItemLogo' src={props.item.player.photo ? `https://st.joinsport.io/player/${props.item.player.player_id}/photo/${props.item.player.photo}` : football_photo_thumb}/>
                        </View>
                    </Div>
                    <Div style={{ width: '70%', paddingBottom: 0, paddingLeft: 0, paddingRight: 0 }}>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 14 }}>{props.item.player.first_name} {props.item.player.last_name}</Text>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 12, color: '#ccc' }}>{props.item.team.full_name}</Text>
                    </Div>
                    <Div style={{ width: '5%', paddingBottom: 0 }}>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 14 }}>{props.item.games}</Text>
                    </Div>
                    <Div style={{ width: '5%', paddingBottom: 0 }}>
                        <Text style={{ fontFamily: 'robo-b', fontSize: 14 }}>{props.item.goals}</Text>
                    </Div>
                </Div>
            );
        } else if (props.filter === 'assists') {
            return (
                <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 0 }}>
                    <Div style={{ width: '5%', paddingBottom: 0, paddingRight: 0 }}>
                        <Text style={{ fontFamily: 'robo-b', fontSize: 14 }}>{props.place}</Text>
                    </Div>
                    <Div style={{ width: '15%', paddingBottom: 0, paddingLeft: 10, paddingRight: 0 }}>
                        <View className='TableRowItemLogoCircle' style={{ width: '100%' }}>
                            <img className='TableRowItemLogo' src={props.item.player.photo ? `https://st.joinsport.io/player/${props.item.player.player_id}/photo/${props.item.player.photo}` : football_photo_thumb}/>
                        </View>
                    </Div>
                    <Div style={{ width: '70%', paddingBottom: 0, paddingLeft: 0, paddingRight: 0 }}>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 14 }}>{props.item.player.first_name} {props.item.player.last_name}</Text>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 12, color: '#ccc' }}>{props.item.team.full_name}</Text>
                    </Div>
                    <Div style={{ width: '5%', paddingBottom: 0 }}>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 14 }}>{props.item.games}</Text>
                    </Div>
                    <Div style={{ width: '5%', paddingBottom: 0 }}>
                        <Text style={{ fontFamily: 'robo-b', fontSize: 14 }}>{props.item.assists}</Text>
                    </Div>
                </Div>
            );
        } else if (props.filter === 'points') {
            return (
                <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 0 }}>
                    <Div style={{ width: '5%', paddingBottom: 0, paddingRight: 0 }}>
                        <Text style={{ fontFamily: 'robo-b', fontSize: 14 }}>{props.place}</Text>
                    </Div>
                    <Div style={{ width: '15%', paddingBottom: 0, paddingLeft: 10, paddingRight: 0 }}>
                        <View className='TableRowItemLogoCircle' style={{ width: '100%' }}>
                            <img className='TableRowItemLogo' src={props.item.player.photo ? `https://st.joinsport.io/player/${props.item.player.player_id}/photo/${props.item.player.photo}` : football_photo_thumb}/>
                        </View>
                    </Div>
                    <Div style={{ width: '70%', paddingBottom: 0, paddingLeft: 0, paddingRight: 0 }}>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 14 }}>{props.item.player.first_name} {props.item.player.last_name}</Text>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 12, color: '#ccc' }}>{props.item.team.full_name}</Text>
                    </Div>
                    <Div style={{ width: '5%', paddingBottom: 0 }}>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 14 }}>{props.item.games}</Text>
                    </Div>
                    <Div style={{ width: '5.5%', paddingBottom: 0 }}>
                        <Text style={{ fontFamily: 'robo-b', fontSize: 14 }}>{props.item.points}</Text>
                    </Div>
                </Div>
            );
        } else if (props.filter === 'fouls') {
            return (
                <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 0 }}>
                    <Div style={{ width: '5%', paddingBottom: 0, paddingRight: 0 }}>
                        <Text style={{ fontFamily: 'robo-b', fontSize: 14 }}>{props.place}</Text>
                    </Div>
                    <Div style={{ width: '15%', paddingBottom: 0, paddingLeft: 10, paddingRight: 5 }}>
                        <View className='TableRowItemLogoCircle' style={{ width: '100%' }}>
                            <img className='TableRowItemLogo' src={props.item.player.photo ? `https://st.joinsport.io/player/${props.item.player.player_id}/photo/${props.item.player.photo}` : football_photo_thumb}/>
                        </View>
                    </Div>
                    <Div style={{ width: '65%', paddingBottom: 0, paddingLeft: 0, paddingRight: 0 }}>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 14 }}>{props.item.player.first_name} {props.item.player.last_name}</Text>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 12, color: '#ccc' }}>{props.item.team.full_name}</Text>
                    </Div>
                    <Div style={{ width: '5%', paddingBottom: 0, paddingLeft: 0 }}>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 14 }}>{props.item.games}</Text>
                    </Div>
                    <Div style={{ width: '5%', paddingBottom: 0 }}>
                        <Text style={{ fontFamily: 'robo-b', fontSize: 14, textAlign: 'center' }}>{props.item.yellow_cards}</Text>
                    </Div>
                    <Div style={{ width: '5%', paddingBottom: 0 }}>
                        <Text style={{ fontFamily: 'robo-b', fontSize: 14, textAlign: 'center' }}>{props.item.red_cards}</Text>
                    </Div>
                </Div>
            );
        } else if (props.filter === 'gk') {
            return (
                <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 0 }}>
                    <Div style={{ width: '5%', paddingBottom: 0, paddingRight: 0 }}>
                        <Text style={{ fontFamily: 'robo-b', fontSize: 14 }}>{props.place}</Text>
                    </Div>
                    <Div style={{ width: '15%', paddingBottom: 0, paddingLeft: 10, paddingRight: 0 }}>
                        <View className='TableRowItemLogoCircle' style={{ width: '100%' }}>
                            <img className='TableRowItemLogo' src={props.item.player.photo ? `https://st.joinsport.io/player/${props.item.player.player_id}/photo/${props.item.player.photo}` : football_photo_thumb}/>
                        </View>
                    </Div>
                    <Div style={{ width: '70%', paddingBottom: 0, paddingLeft: 0, paddingRight: 0 }}>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 14 }}>{props.item.player.first_name} {props.item.player.last_name}</Text>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 12, color: '#ccc' }}>{props.item.team.full_name}</Text>
                    </Div>
                    <Div style={{ width: '5%', paddingBottom: 0 }}>
                        <Text style={{ fontFamily: 'robo-b', fontSize: 14, textAlign: 'center' }}>{props.item.gk_games}</Text>
                    </Div>
                    <Div style={{ width: '5%', paddingBottom: 0 }}>
                        <Text style={{ fontFamily: 'robo-b', fontSize: 14, textAlign: 'center' }}>{props.item.missed_goals}</Text>
                    </Div>
                </Div>
            );
        } else if (props.filter === 'team') {
            return (
                <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 0 }}>
                    <Div style={{ width: '5%', paddingBottom: 0, paddingRight: 0 }}>
                        <Text style={{ fontFamily: 'robo-b', fontSize: 14 }}>{props.place}</Text>
                    </Div>
                    <Div style={{ width: '15%', paddingBottom: 0, paddingLeft: 10, paddingRight: 5 }}>
                        <View className='TableRowItemLogoCircle' style={{ width: '100%' }}>
                            <img className='TableRowItemLogo' src={props.item.team.logo ? `https://st.joinsport.io/team/${props.item.team.team_id}/logo/${props.item.team.logo}` : football_photo_thumb}/>
                        </View>
                    </Div>
                    <Div style={{ width: '65%', paddingBottom: 0, paddingLeft: 0, paddingRight: 0 }}>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 14 }}>{props.item.team.full_name}</Text>
                        {/* <Text style={{ fontFamily: 'robo-r', fontSize: 12, color: '#ccc' }}>{props.item.team.full_name}</Text> */}
                    </Div>
                    <Div style={{ width: '5%', paddingBottom: 0, paddingLeft: 0 }}>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 14 }}>{props.item.games}</Text>
                    </Div>
                    <Div style={{ width: '5%', paddingBottom: 0 }}>
                        <Text style={{ fontFamily: 'robo-b', fontSize: 14, textAlign: 'center' }}>{props.item.gf}</Text>
                    </Div>
                    <Div style={{ width: '5%', paddingBottom: 0 }}>
                        <Text style={{ fontFamily: 'robo-b', fontSize: 14, textAlign: 'center' }}>{props.item.ga}</Text>
                    </Div>
                </Div>
            );
        }
    }

    return (
        getValueColumnsBasedOnFilter()
    );
};

export default SinglePlayerStatItem;