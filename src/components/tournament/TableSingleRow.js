import { Div, Text, View } from '@vkontakte/vkui';
import React from 'react';

const CategoriesScreen = props => {

    const teamNameFixedLength = (teamName) => {
        console.log(window.innerWidth)
        console.log(teamName.length)
        if (window.innerWidth <= 320 && teamName.length > 10) {
            let cuttedName = teamName.substring(0, 9);
            return cuttedName + '...';
        } else if (window.innerWidth <= 375 && teamName.length > 15) {
            let cuttedName = teamName.substring(0, 14);
            return cuttedName + '...';
        } else if (window.innerWidth <= 414 && teamName.length > 20) {
            let cuttedName = teamName.substring(0, 19);
            return cuttedName + '...';
        } else {
            return teamName;
        }
    }

    return (
        <Div style={{ display: 'flex', flexDirection: 'row', padding: 0, backgroundColor: props.place % 2 === 0 ? '' : '#f8f8f8', borderRadius: props.place % 2 === 0 ? '' : 5, alignItems: 'center' }}>
            <Div style={{ width: '7%', textAlign: 'center', paddingLeft: 0, paddingRight: 0 }}>
                <Text style={tableRowBold}>{props.place}</Text>
            </Div>
            <Div style={{ width: '58%', display: 'flex', flexDirection: 'row', paddingLeft: 0, paddingRight: 0, alignItems: 'center' }}>
                <View className='TableRowItemLogoCircle'>
                    <img className='TableRowItemLogo' src={props.team.logo ? `https://st.joinsport.io/team/${props.team.team_id}/logo/${props.team.logo}` : 'https://ttlf.ru/assets/53f437de/football_logo_100x100.png'}/>
                </View>
                <Text style={{ ...tableRow, paddingLeft: 5 }}>{teamNameFixedLength(props.team.full_name)}</Text>
            </Div>
            <Div style={{ width: '7%', textAlign: 'center', paddingLeft: 0, paddingRight: 0 }}>
                <Text style={tableRow}>{props.games}</Text>
            </Div>
            <Div style={{ width: '7%', textAlign: 'center', paddingLeft: 0, paddingRight: 0 }}>
                <Text style={{...tableRow, color: 'green'}}>{props.wins}</Text>
            </Div>
            <Div style={{ width: '7%', textAlign: 'center', paddingLeft: 0, paddingRight: 0 }}>
                <Text style={{...tableRow, color: 'orange'}}>{props.draws}</Text>
            </Div>
            <Div style={{ width: '7%', textAlign: 'center', paddingLeft: 0, paddingRight: 0 }}>
                <Text style={{...tableRow, color: 'red'}}>{props.losses}</Text>
            </Div>
            <Div style={{ width: '7%', textAlign: 'center', paddingLeft: 0, paddingRight: 0 }}>
                <Text style={tableRowBold}>{props.points}</Text>
            </Div>
        </Div>
    );
};

const tableRow = {
    fontFamily: 'robo-r',
    fontSize: 14
}
const tableRowBold = {
    fontFamily: 'robo-b',
    fontSize: 14
}

export default CategoriesScreen;