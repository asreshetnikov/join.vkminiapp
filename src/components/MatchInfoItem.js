import React, { useState } from 'react';
import { View, Text, Div, Separator, Button, HorizontalScroll, CellButton } from '@vkontakte/vkui';
import moment from 'moment';

import TeamsScreen from '../screens/TeamsScreen';

import '../css/style.css'

const MatchInfoItem = props => {

    const [activePanel, setActivePanel] = useState('');

    let actualDate = moment(new Date());

    // console.log('inside match');

    const match = props.match;
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
                return matchDateMoment.format('- : -');
            } else {
                return matchDateMoment.format('- : -');
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
        if (window.innerWidth <= 320 && teamName.length > 8) {
            let cuttedName = teamName.substring(0, 8);
            return cuttedName + '...';
        } else if (window.innerWidth <= 375 && teamName.length > 10) {
            let cuttedName = teamName.substring(0, 10);
            return cuttedName + '...';
        } else if (window.innerWidth <= 414 && teamName.length > 14) {
            let cuttedName = teamName.substring(0, 14);
            return cuttedName + '...';
        } else {
            return teamName;
        }
    }

    console.log('asd', match.match_id);

    return (
        <Div style={{ padding: 0 }}>
            <Div className='MatchInfoDate'><Text style={(match.gf || match.ga) || match.gf === 0 && match.ga === 0 ? macthHasResult : matchNoResult}>{moment(match.start_dt).format('DD MMMM, HH-mm')}</Text></Div>
            <Div style={{ flexDirection: 'row' }} className='MatchInfo'>
                <Div className='MatchInfoTeamBlock Host' onClick={props.go} data-to="teamInfo" data-teamid={match.team1.team_id} data-id={match.match_id}>
                    <View className='MatchInfoLogoCircle'>
                        <img className='MatchInfoLogo' src={match.team1.logo ? `https://st.joinsport.io/team/${match.team1.team_id}/logo/${match.team1.logo}` : 'https://ttlf.ru/assets/53f437de/football_logo_100x100.png'}/>
                    </View>
                    <View style={{ paddingTop: 10 }}>
                        <Text style={{ textAlign: 'center', fontFamily: 'robo-r' }}>
                            {teamNameFixedLength(match.team1.full_name)}
                        </Text>
                    </View>
                    {/* <Text style={{ paddingLeft: 10 }}>
                        {match.gf}
                    </Text> */}
                </Div>
                <Div>
                    <Text style={{ fontSize: 26, fontWeight: 'bold', fontFamily: 'robo-r', textAlign: 'center' }}>{showScoreOrDateHandler(match.start_dt)}</Text>
                    <Text style={{ fontSize: 12, color: '#999', textAlign: 'center', fontFamily: 'robo-r', paddingTop: 5 }}>{matchAdditionalInfoResolver()}</Text>
                </Div>
                <Div className='MatchInfoTeamBlock Guest' onClick={props.go} data-to="teamInfo" data-teamid={match.team2.team_id} data-id={match.match_id}>
                    {/* <Text style={{ paddingRight: 10 }}>
                        {match.ga}
                    </Text> */}
                    <View className='MatchInfoLogoCircle'>
                        <img className='MatchInfoLogo' src={match.team2.logo ? `https://st.joinsport.io/team/${match.team2.team_id}/logo/${match.team2.logo}` : 'https://ttlf.ru/assets/53f437de/football_logo_100x100.png'}/>
                    </View>
                    <View style={{ paddingTop: 10 }}>
                        <Text style={{ textAlign: 'center', fontFamily: 'robo-r' }}>
                            {teamNameFixedLength(match.team2.full_name)}
                        </Text>
                    </View>
                </Div>
            </Div>
            <Div className='MatchInfoDetails'>
            <HorizontalScroll showArrows getScrollToLeft={i => i - 120} getScrollToRight={i => i + 120}>
                <div style={{ display: 'flex' }}>
                    {/* <View className="ButtonBorderLightGray"> */}
                    <Text className="ButtonBorderLightGray" onClick={props.go} data-to="tournamentInfo" data-tournamentid={match.tournament.tournament_id} data-id={match.match_id}>{match.tournament.short_name}</Text>
                    {/* </View> */}
                    {match.stadium ? (
                        <Text className="ButtonBorderLightGray">{match.stadium.name}</Text>
                    ) : (<Text></Text>)}
                    {match.referee ? (
                        <Text className="ButtonBorderLightGray">{match.referee.last_name} {match.referee.first_name.substring(0, 1) + '.'}</Text>
                    ) : (<Text></Text>)}
                    
                </div>
            </HorizontalScroll>
            </Div>
        </Div>
    );
};

const matchNoResult = {
    fontSize: 20, 
    color: '#444', 
    fontFamily: 'robo-b'
}
const macthHasResult = {
    fontSize: 15, 
    color: '#999', 
    fontFamily: 'robo-r'
}

// const styles = StyleSheet.create({

// });

export default MatchInfoItem;