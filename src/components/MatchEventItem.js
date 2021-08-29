import { View, Div, Text } from '@vkontakte/vkui';
import React, { useState } from 'react';

import goal from '../assets/img/matchevents/goal.svg';
import penalty from '../assets/img/matchevents/penalty.svg';
import penaltyno from '../assets/img/matchevents/penaltyno.svg';
import autogoal from '../assets/img/matchevents/autogoal.svg';
import yellowcard from '../assets/img/matchevents/yellowcard.svg';
import redcard from '../assets/img/matchevents/redcard.svg';
import sub from '../assets/img/matchevents/sub.svg';

import '../css/style.css'
import sprite from '../img/icons.svg'

const MatchEventItem = props => {
    console.log(props.hostTeamId)
    console.log(props.event.team_id)

    let eventColor = '';
    if (props.event.__typename === 'Goal') {
        eventColor = 'green';
    } else if (props.event.__typename === 'YellowCard') {
        eventColor = 'yellow';
    } else if (props.event.__typename === 'RedCard') {
        eventColor = 'red';
    }

    const eventSpriteHandler = () => {
        if (props.event.__typename === 'Goal') {
            if (props.event.situation === 'SITUATION_GAME') {
                return (<img src={goal} width="28" height="28"/>);
            } else if (props.event.situation === 'SITUATION_PENALTY') {
                return (<img src={penalty} width="28" height="28"/>);
            } else if (props.event.situation === 'SITUATION_MISSED_PENALTY_GK') {
                return (<img src={penaltyno} width="28" height="28"/>);
            } else if (props.event.situation === 'SITUATION_AUTOGOAL') {
                return (<img src={autogoal} width="28" height="28"/>);
            }
            return (<img src={goal} width="28" height="28"/>);
        } else if (props.event.__typename === 'YellowCard') {
            return (<img src={yellowcard} width="28" height="28"/>);
        } else if (props.event.__typename === 'RedCard') {
            return (<img src={redcard} width="28" height="28"/>);
        } else if (props.event.__typename === 'Substitution') {
            return (<img src={sub} width="28" height="28"/>);
        }
    }
    return (
        <Div className="MatchEventItem" style={{ height: 40 }}>
            {parseInt(props.hostTeamId) === props.event.team_id || (props.event.situation && props.event.situation === 'SITUATION_AUTOGOAL' && parseInt(props.hostTeamId) != props.event.team_id) ? (
                <Div className="MatchEventItemRow Guest">
                    <Div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', flexDirection: 'column', paddingRight: 5, paddingLeft: 0, paddingTop: 5, paddingBottom: 5  }}>
                        <Text style={{ paddingRight: 5, textAlign: 'end', fontFamily: 'robo-r', fontSize: 14, height: props.event.assistant || props.event.reason || props.event.playerIn ? 14 : '' }}>
                            {props.event.player ? props.event.player.last_name : props.event.playerIn.last_name}
                        </Text>
                        {props.event.assistant || props.event.reason || props.event.playerOut ? (
                        <Text style={{ paddingRight: 5, textAlign: 'end', fontFamily: 'robo-r', fontSize: 12, color: '#ccc', height: 15, lineHeight: '1.2em', margin: '0.2em 0' }}>
                            {props.event.assistant ? props.event.assistant.last_name : ''}{props.event.reason ? props.event.reason : ''}{props.event.playerOut ? props.event.playerOut.last_name : ''}
                        </Text>
                        ) : ''}
                    </Div>
                    <Div style={{ padding: 0, background: 'white', height: 28 }}>
                        {eventSpriteHandler()}
                    </Div>
                    <Div style={{ display: 'flex', flex: 1, justifyContent: 'flex-start', paddingLeft: 5, paddingRight: 0, paddingTop: 5, paddingBottom: 5  }}>
                        <Text style={{ paddingLeft: 5, textAlign: 'start', fontFamily: 'robo-r', fontSize: 16 }}>
                            {props.event.minute}'{props.event.second ? props.event.second + '\'\'' : ''}
                        </Text>
                    </Div>
                </Div>
            ) : (
                <Div className="MatchEventItemRow Host">
                    <Div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', paddingLeft: 0, paddingRight: 5, paddingTop: 5, paddingBottom: 5  }}>
                        <Text style={{ paddingRight: 5, textAlign: 'end', fontFamily: 'robo-r', fontSize: 16 }}>
                            {props.event.minute}'{props.event.second ? props.event.second + '\'\'' : ''}
                        </Text>
                    </Div>
                    <Div style={{ alignItems: 'center', justifyContent: 'center', padding: 0, background: 'white', height: 28 }}>
                        {eventSpriteHandler()}
                    </Div>
                    <Div style={{ display: 'flex', flex: 1, justifyContent: 'flex-start', flexDirection: 'column', paddingLeft: 5, paddingRight: 0, paddingTop: 5, paddingBottom: 5 }}>
                        <Text style={{ paddingLeft: 5, textAlign: 'start', fontFamily: 'robo-r', fontSize: 14, height: props.event.assistant || props.event.reason || props.event.playerIn ? 14 : '' }}>
                            {props.event.player ? props.event.player.last_name : props.event.playerIn.last_name}
                        </Text>
                        {props.event.assistant || props.event.reason || props.event.playerOut ? (
                        <Text style={{ paddingLeft: 5, textAlign: 'start', fontFamily: 'robo-r', fontSize: 12, color: '#ccc', height: 15, lineHeight: '1.2em', margin: '0.2em 0' }}>
                            {props.event.assistant ? props.event.assistant.last_name : ''}{props.event.reason ? props.event.reason : ''}{props.event.playerOut ? props.event.playerOut.last_name : ''}
                        </Text>
                        ) : ''}
                    </Div>
                </Div>
            )}
        </Div>
    );
};

export default MatchEventItem;