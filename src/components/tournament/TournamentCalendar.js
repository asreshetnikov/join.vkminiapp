import { Div, Text, HorizontalScroll, View, ScreenSpinner } from '@vkontakte/vkui';
import React, { useState, useEffect } from 'react';

import { useQuery, useLazyQuery, useApolloClient } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import moment from 'moment';

import * as queries from '../../constants/queries';
import MatchCenterMatchItem from '../MatchCenterMatchItem';

const apolloClient = new ApolloClient({
	uri: 'https://api.joinsport.io/graphql'
});

const TournamentCalendar = props => {

    let prevMatchesArray = [];
    const [prevMatches, setPrevMatches] = useState([]);
    let futMatchesArray = [];
    const [futMatches, setFutMatches] = useState([]);

    const tournament = props.tournament;
    const hasMultipleRounds = props.tournament && props.tournament.rounds.length > 1;
    console.log(props.tournament ? props.tournament.rounds.length : '');

    let actualDateToRequest = moment(new Date());

    const [roundFilter, setRoundFilter] = useState(hasMultipleRounds ? props.tournament.rounds[0].round_id : 0);
    const [requestFrom, setRequestFrom] = useState(actualDateToRequest.format('YYYY-MM-DD'));
    const [loadSuccessCounter, setLoadSuccessCounter] = useState(0);

    const { loading, error, data, refetch } = useQuery(queries.TOURNAMENTCALENDAR(props.tournamentId), {
        context: {
            uri: 'https://api.joinsport.io/graphql',
            headers: {
                'Api-Key': `zznXBNAxsJCKA2Tt9yB3YLcLdR44XpBgxqhR6xyaNjDZPN6C6xh3tM7azUFKuh34`
            },
        },
        client: apolloClient
    });

    useEffect(() => {
        let element = document.getElementById('futureMatches');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            // element.scrollTop = 200;
            window.scrollTo(0, element.offsetTop - 100);
            // console.log('scroltopT', element.offsetTop)
            // console.log('scroltopP', element.offsetParent)
            // console.log('scroltopH', element.offsetHeight)
            // console.log('scroltopD', document.scrollTop)
            // console.log('scroltopW', window.scrollTop)
        }
    }, [roundFilter])

    if (loading) {
        return (
            <Div style={{ 
                // paddingTop: 280 
                }}>
                <ScreenSpinner/>
            </Div>
        )
    }

    const splitMatchesHandler = (roundId) => {
        setRoundFilter(roundId);
        prevMatchesArray = [];
        data.calendar.data.filter(m => parseInt(roundFilter) === m.round_id && (m.team1 && m.team2)).filter(m => moment(m.start_dt).isBefore(moment())).forEach(item => {
            prevMatchesArray.push(<MatchCenterMatchItem key={item.match_id} match={item} />)
        });
        setPrevMatches(prevMatchesArray);
        futMatchesArray = [];
        data.calendar.data.filter(m => parseInt(roundFilter) === m.round_id && (m.team1 && m.team2)).filter(m => moment(m.start_dt).isAfter(moment())).forEach(item => {
            futMatchesArray.push(<MatchCenterMatchItem key={item.match_id} match={item} />)
        });
        setFutMatches(futMatchesArray);
        console.log('prev', prevMatchesArray);
        console.log('fut', futMatchesArray);
    }

    console.log(data);
    console.log(roundFilter);

    return (
        <Div style={{ 
            // paddingTop: 280 
            }}>
            {hasMultipleRounds && props.tournament.rounds ? (
                <Div style={{ padding: 0 }}>
                    <HorizontalScroll showArrows getScrollToLeft={i => i - 120} getScrollToRight={i => i + 120}>
                        <div style={{ display: 'flex' }}>
                            {props.tournament.rounds.map((item, key) => {
                                return (
                                    <Div key={key} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} className={roundFilter === item.round_id ? 'ButtonBorderLightGraySelected' : 'ButtonBorderLightGrayNotSelected'} onClick={() => { setRoundFilter(item.round_id); }}>
                                        <Text style={{ paddingLeft: 5, color: roundFilter === item.round_id ? '#6699ff' : '', fontFamily: 'robo-r' }}>{item.name}</Text>
                                    </Div>
                                )
                            })}
                        </div>
                    </HorizontalScroll>
                    {/* {prevMatches} */}
                    {data ?
                        data.calendar.data.filter(m => parseInt(roundFilter) === m.round_id && (m.team1 && m.team2)).filter(m => moment(m.start_dt).isBefore(moment())).map((item, key) => {
                            return (<View onClick={props.matchInfoHandler} data-to="matchInfo" data-id={item.match_id} data-backtournament='true'  key={key}><MatchCenterMatchItem match={item}/></View>);
                    }) : ''}
                    {data.calendar.data.filter(m => parseInt(roundFilter) === m.round_id && (m.team1 && m.team2)).filter(m => moment(m.start_dt).isAfter(moment())).length > 0 ? (
                        <Div id="futureMatches"><Text>Предстоящие матчи</Text></Div>
                    ) : ('')}
                    {data ?
                        data.calendar.data.filter(m => parseInt(roundFilter) === m.round_id && (m.team1 && m.team2)).filter(m => moment(m.start_dt).isAfter(moment())).map((item, key) => {
                            return (<View onClick={props.matchInfoHandler} data-to="matchInfo" data-id={item.match_id} data-backtournament='true'  key={key}><MatchCenterMatchItem match={item}/></View>);
                    }) : ''}
                    {/* {futMatches} */}
                </Div>
            ) : (
                data ?
                (<Div style={{ padding: 0 }}>
                    {data.calendar.data.filter(m => moment(m.start_dt).isBefore(moment()) && (m.team1 && m.team2)).sort((a, b) => {
                        if (moment(a.start_dt).isBefore(moment(b.start_dt))) {
                            return -1;
                        } else if (moment(a.start_dt).isAfter(moment(b.start_dt))) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }).map((item, key) => {
                        return (<View onClick={props.matchInfoHandler} data-to="matchInfo" data-id={item.match_id} data-backtournament='true' key={key}><MatchCenterMatchItem match={item}/></View>);
                    })}
                    {data.calendar.data.filter(m => moment(m.start_dt).isAfter(moment()) && (m.team1 && m.team2)).length > 0 ? (
                        <Div id="futureMatches"><Text>Предстоящие матчи</Text></Div>
                    ) : ('')}
                    {data.calendar.data.filter(m => moment(m.start_dt).isAfter(moment()) && (m.team1 && m.team2)).sort((a, b) => {
                        if (moment(a.start_dt).isBefore(moment(b.start_dt))) {
                            return -1;
                        } else if (moment(a.start_dt).isAfter(moment(b.start_dt))) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }).map((item, key) => {
                        return (<View onClick={props.matchInfoHandler} data-to="matchInfo" data-id={item.match_id} data-backtournament='true' key={key}><MatchCenterMatchItem match={item}/></View>);
                    })}
                </Div>) : ''
            )}
        </Div>
    );
};

export default TournamentCalendar;