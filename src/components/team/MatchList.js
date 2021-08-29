import { Div, Text, ScreenSpinner, View } from '@vkontakte/vkui';
import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { useQuery, useLazyQuery, useApolloClient, rewriteURIForGET } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import * as queries from '../../constants/queries';
import MatchCenterMatchItem from '../MatchCenterMatchItem';

const apolloClient = new ApolloClient({
	uri: 'https://api.joinsport.io/graphql'
});

const MatchList = props => {

    const [matchFilter, setMatchFilter] = useState('prev');

    let currentSeason = '';
    const actualDate = moment(new Date());

    const { loading: loadingS, error: errorS, data: dataS } = useQuery(queries.SEASONS(), {
        context: {
            uri: 'https://api.joinsport.io/graphql',
            headers: {
                'Api-Key': `zznXBNAxsJCKA2Tt9yB3YLcLdR44XpBgxqhR6xyaNjDZPN6C6xh3tM7azUFKuh34`
            },
        },
        client: apolloClient
    });

    console.log('dataS', dataS);

    if (dataS) {
        currentSeason = dataS.seasons.filter(s => actualDate.isAfter(moment(s.start_dt)) && actualDate.isBefore(moment(s.end_dt)))
        .sort((s1, s2) => {
            if (s1.start_dt > s2.start_dt) {
                return -1;
            } else if (s1.start_dt < s2.start_dt) {
                return 1;
            } else {
                if (s1.season_id > s2.season_id) {
                    return -1;
                } else if (s1.season_id < s2.season_id) {
                    return 1;
                } else {
                    return 0;
                }
            }
        })[0];
    }

    console.log('currentSeason', currentSeason);

    // getCalendar(({ variables: { from: currentSeason.start_dt, to: currentSeason.end_dt, teamId: props.teamId } }));
    const { loading: loadingM, error: errorM, data: dataM, refetch } = useQuery(queries.CALENDARPERIODFORTEAM(currentSeason.start_dt, currentSeason.end_dt, props.teamId, currentSeason.season_id), {
        context: {
            uri: 'https://api.joinsport.io/graphql',
            headers: {
                'Api-Key': `zznXBNAxsJCKA2Tt9yB3YLcLdR44XpBgxqhR6xyaNjDZPN6C6xh3tM7azUFKuh34`
            },
        },
        client: apolloClient
    });

    useEffect(() => {
        if (dataM) {
            dataM.calendar.data.filter(m => actualDate.isAfter(moment(m.start_dt))).length > 0 ? setMatchFilter('prev') : setMatchFilter('fut');
            console.log(dataM.calendar.data.filter(m => actualDate.isAfter(moment(m.start_dt))).length)
        }
    }, [loadingM])

    if (loadingS || loadingM) {
        return (
            <Div>
                <ScreenSpinner/>
            </Div>
        );
    }

    refetch();

    console.log('currentSeasonMatches', dataM);

    const getMatchesBasedOnFilter = () => {
        if (matchFilter === 'prev') {
            return dataM.calendar.data.filter(m => actualDate.isAfter(moment(m.start_dt)));
        } else if (matchFilter === 'fut') {
            return dataM.calendar.data.filter(m => !actualDate.isAfter(moment(m.start_dt)) && (m.team1 && m.team2));
        }
    }

    return (
        <Div style={{ paddingLeft: 0, paddingRight: 0 }}>
            <div style={{ display: 'flex', padding: 12, justifyContent: 'space-around' }}>
                <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} className={matchFilter === 'prev' ? 'ButtonBorderLightGraySelected' : 'ButtonBorderLightGrayNotSelected'} onClick={() => { setMatchFilter('prev') }}>
                    {/* <img className='MatchSquadTeamButtonLogo' src={data.match.team1.logo ? `https://st.joinsport.io/team/${data.match.team1.team_id}/logo/${data.match.team1.logo}` : 'https://nflperm.ru/assets/f36506f5/football_logo_100x100.png'}/> */}
                    <Text style={{ paddingLeft: 5, paddingRight: 5, color: matchFilter === 'prev' ? '#6699ff' : '', fontFamily: 'robo-r' }}>Прошедшие</Text>
                </Div>
                <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} className={matchFilter === 'fut' ? 'ButtonBorderLightGraySelected' : 'ButtonBorderLightGrayNotSelected'} onClick={() => { setMatchFilter('fut') }}>
                    {/* <img className='MatchSquadTeamButtonLogo' src={data.match.team2.logo ? `https://st.joinsport.io/team/${data.match.team2.team_id}/logo/${data.match.team2.logo}` : 'https://nflperm.ru/assets/f36506f5/football_logo_100x100.png'}/> */}
                    <Text style={{ paddingLeft: 5, paddingRight: 5, color: matchFilter === 'fut' ? '#6699ff' : '', fontFamily: 'robo-r' }}>Будущие</Text>
                </Div>
            </div>
            {getMatchesBasedOnFilter().map((item, key) => {
                return (<View onClick={props.go} data-to="matchInfo" data-id={item.match_id} data-teamid={props.teamId} data-backteam='true' key={key}><MatchCenterMatchItem match={item} /></View>)
            })}
        </Div>
    );
};

export default MatchList;