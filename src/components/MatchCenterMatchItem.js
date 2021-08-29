import React, { useState } from 'react';
import { View, Text, Div, Separator } from '@vkontakte/vkui';
import moment from 'moment';

import TeamsScreen from '../screens/TeamsScreen';

import '../css/style.css'

const MatchCenterMatchItem = props => {

    const [activePanel, setActivePanel] = useState('');

    let actualDate = moment(new Date());

    // console.log('inside match');

    const match = props.match;
    // console.log('match', match);
    // console.log(match.match_id);
    // console.log(match.gf + ':' + match.ga);

    // console.log(`https://st.joinsport.io/team/${match.team1.team_id}/logo/${match.team1.logo}`);

    const showScoreOrDateHandler = (matchDate) => {
        const matchDateMoment = moment(matchDate);
        // console.log(matchDateMoment.format('YYYY-MM-DD'));
        // console.log(actualDate.format('YYYY-MM-DD'));
        const actualDateMomentString = actualDate.format('YYYY-MM-DD');
        const matchDateMomentString = matchDateMoment.format('YYYY-MM-DD');
        const tomorrowMatchDateMomentString = actualDate.add(1, 'days').format('YYYY-MM-DD');
        if ((match.gf || match.ga) || match.gf === 0 && match.ga === 0) {
            return match.gf + ':' + match.ga;
        } else {
            if (matchDateMomentString === actualDateMomentString || matchDateMomentString === tomorrowMatchDateMomentString) {
                return matchDateMoment.format('HH-mm');
            } else {
                return matchDateMoment.format('DD.MM');
            }
        }
    }

    const matchAdditionalInfoResolver = () => {
        if (match.technical) {
            return '(ТП)';
        } else if ((match.gfp || match.gap) || match.gfp === 0 && match.gap === 0) {
            return '(' + match.gfp + ':' + match.gap + ')';
        } else {
            return '';
        }
    }

    const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

    const teamNameFixedLength = (teamName) => {
        console.log(window.innerWidth)
        console.log(teamName.length)
        if (teamName) {
            if (window.innerWidth <= 320 && teamName.length > 4) {
                let cuttedName = teamName.substring(0, 3);
                return cuttedName + '...';
            } else if (window.innerWidth <= 375 && teamName.length > 8) {
                let cuttedName = teamName.substring(0, 7);
                return cuttedName + '...';
            } else if (window.innerWidth <= 414 && teamName.length > 10) {
                let cuttedName = teamName.substring(0, 9);
                return cuttedName + '...';
            } else {
                return teamName;
            }
        } else {
            return '';
        }
    }

    return (
        <Div style={{ padding: 0 }}>
            <Div style={{ flexDirection: 'row' }} className='MatchItem'>
                <Div className='MatchItemTeamBlock Host'>
                    <Text style={{ paddingRight: 10, textAlign: 'end', fontFamily: 'robo-r' }}>
                        {match.team1 ? teamNameFixedLength(match.team1.full_name) : ''}
                    </Text>
                    <View className='MatchItemLogoCircle'>
                        <img className='MatchItemLogo' src={match.team1 && match.team1.logo ? `https://st.joinsport.io/team/${match.team1.team_id}/logo/${match.team1.logo}` : 'https://ttlf.ru/assets/53f437de/football_logo_100x100.png'}/>
                    </View>
                    {/* <Text style={{ paddingLeft: 10 }}>
                        {match.gf}
                    </Text> */}
                </Div>
                <Div>
                    <Text style={{ fontWeight: 'bold', fontFamily: 'robo-r', textAlign: 'center' }}>{showScoreOrDateHandler(match.start_dt)}</Text>
                    <Text style={{ fontSize: 12, color: '#999', textAlign: 'center', fontFamily: 'robo-r' }}>{matchAdditionalInfoResolver()}</Text>
                </Div>
                <Div className='MatchItemTeamBlock Guest'>
                    {/* <Text style={{ paddingRight: 10 }}>
                        {match.ga}
                    </Text> */}
                    <View className='MatchItemLogoCircle'>
                        <img className='MatchItemLogo' src={match.team2 && match.team2.logo ? `https://st.joinsport.io/team/${match.team2.team_id}/logo/${match.team2.logo}` : 'https://ttlf.ru/assets/53f437de/football_logo_100x100.png'}/>
                    </View>
                    <Text style={{ paddingLeft: 10, textAlign: 'start', fontFamily: 'robo-r' }}>
                        {match.team2 ? teamNameFixedLength(match.team2.full_name) : ''}
                    </Text>
                </Div>
            </Div>
            <Div className='MatchItemDate'><Text style={{ fontSize: 14, color: '#999', fontFamily: 'robo-r', textAlign: 'center' }}>{moment(match.start_dt).format('DD MMM, HH-mm')} {match.stadium ? '| ' + match.stadium.name : ''} {match.referee ? '| ' + match.referee.last_name + ' ' + match.referee.first_name.substring(0, 1) + '.' : ''}</Text></Div>
            <Separator/>
        </Div>
    );
};

// const styles = StyleSheet.create({

// });

export default MatchCenterMatchItem;