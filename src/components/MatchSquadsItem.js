import React from 'react';
import { Panel, PanelHeader, PanelHeaderBack, ScreenSpinner, View, Div, Epic, TabbarItem, Tabbar, Text } from '@vkontakte/vkui';

const MatchSquadsItem = props => {
    const match = props.match;
    console.log(match.players)
    console.log(props.filter)
    console.log(+match.team1.team_id)

    const resolverPositionShort = (positionId) => {
        if (positionId === 1) {
            return 'ВР';
        } else if (positionId === 2) {
            return 'ЗЩ';
        } else if (positionId === 3) {
            return 'ПЗ';
        } else if (positionId === 4) {
            return 'НП';
        } else if (positionId === 5) {
            return 'УН';
        } else {
            return '';
        }
    }

    return (
        <Div style={{ paddingLeft: 0 }}>
            {match.players.filter(pl => props.filter === 'host' ? pl.team_id === +match.team1.team_id : pl.team_id === +match.team2.team_id)
            .map((item, key) => {
                return (
                    <Div key={key} style={{ display: 'flex', flexDirection: 'row', paddingLeft: 0, paddingTop: 0 }}>
                        <div style={{ width: 30, textAlign: 'end', paddingRight: 5 }}>
                        <Text style={fadedParam}>{item.number ? item.number : ''}</Text>
                        </div>
                        <div>
                        <Text style={nameParam}>{item.player.last_name} {item.player.first_name}</Text>
                        </div>
                        <div>
                        <Text style={fadedParam}>{item.player.position_id ? resolverPositionShort(item.player.position_id) : ''}</Text>
                        </div>
                        {/* <Text style={fadedParam}>{item.goalkeeper ? 'ВР' : ''}</Text> */}
                        <div>
                        <Text style={fadedParam}>{item.captain ? 'К' : ''}</Text>
                        </div>
                    </Div>
                );
            })}
        </Div>
    );
};

const fadedParam = {
    paddingLeft: 5,
    color: '#999',
    fontFamily: 'robo-r'
}
const nameParam = {
    fontFamily: 'robo-r'
}

export default MatchSquadsItem;