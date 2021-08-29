import React, { useEffect, useState } from 'react';
import { Panel, PanelHeader, PanelHeaderBack, ScreenSpinner, View, Div, Epic, Text, Separator, HorizontalScroll } from '@vkontakte/vkui';
import PropTypes from 'prop-types';

import { gql } from 'apollo-boost';

import { useQuery, useLazyQuery, useApolloClient, rewriteURIForGET } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import moment from 'moment';

import * as queries from '../../constants/queries';
import MatchHeader from '../../components/MatchInfoItem';
import MatchEventItem from '../../components/MatchEventItem';
import HeaderTitleFixedLenght from '../../components/HeaderTitleFixedLenght';
import EmptyTabBarElementSpace from '../../components/EmptyTabBarElementSpace';
import MatchSquadsItem from '../../components/MatchSquadsItem';
import MatchStatsView from '../../components/MatchStatsView';

// import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
// import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
// import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';

const apolloClient = new ApolloClient({
	uri: 'https://api.joinsport.io/graphql'
});

const MatchInfoScreen = props => {

    console.log('matchid', props.matchId)

    const [matchInfoTabFilter, setMatchInfoTabFilter] = useState('events');
    const [squadFilter, setSquadFilter] = useState('host');

    let matchId = props.matchId ? props.matchId : 0;
    // let matchId = 2132951;

    const matchEventsArray = [];

    const { loading, error, data, refetch } = useQuery(queries.MATCHINFO(matchId), {
        context: {
            uri: 'https://api.joinsport.io/graphql',
            headers: {
                'Api-Key': `zznXBNAxsJCKA2Tt9yB3YLcLdR44XpBgxqhR6xyaNjDZPN6C6xh3tM7azUFKuh34`
            },
        },
        client: apolloClient
    });

    useEffect(() => {
        let element = document.getElementById('root');
        window.scrollTo(0, 0);
        if (element) {
            // console.log(element);
            // console.log(element.scrollTop);
            element.scrollTop += 50;
            // console.log(element.scrollTop);
        }
    })

    if (loading) {
        return (
            <Panel id={props.id}>
                <PanelHeader
                    // left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
                >
                    <HeaderTitleFixedLenght>ТТЛФ Рязань</HeaderTitleFixedLenght>
                </PanelHeader>
                <Div>
                    <ScreenSpinner />
                </Div>
            </Panel>
        )
    }

    if (!data || !data.match) {
        return (
            <Panel id={props.id}>
                <PanelHeader
                    // left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
                >
                    <HeaderTitleFixedLenght>ТТЛФ Рязань</HeaderTitleFixedLenght>
                </PanelHeader>
                <Div>
                    Не удалось загрузить данные с сервера
                </Div>
            </Panel>
        )
    }

    if (data.match) {
        let obj = null;
        for (let key in data.match.goals) {
            obj = {...data.match.goals[key], type: 'goal'}
            matchEventsArray.push(data.match.goals[key]);
        }
        for (let key in data.match.yellowCards) {
            obj = {...data.match.yellowCards[key], type: 'yc'}
            matchEventsArray.push(data.match.yellowCards[key]);
        }
        for (let key in data.match.redCards) {
            obj = {...data.match.redCards[key], type: 'rc'}
            matchEventsArray.push(data.match.redCards[key]);
        }
        for (let key in data.match.substitutions) {
            obj = {...data.match.substitutions[key], type: 'sub'}
            matchEventsArray.push(data.match.substitutions[key]);
        }
        matchEventsArray.sort(function(o1, o2) {
            if (o1.minute < o2.minute) {
                return -1;
            } else if (o1.minute > o2.minute) {
                return 1;
            } else {
                if (o1.second < o2.second) {
                    return -1;
                } else if (o1.second > o2.second) {
                    return 1;
                } else {
                    return 0;
                }
            }
        })
    }

    console.log(matchId)
    // console.log('length', data.match.stat1.length);
    console.log('obj', data.match.stat1);

    const changeMatchInfoTabFilter = (filter) => {
        setMatchInfoTabFilter(filter);
    }

    const changeTabDataHandler = () => {
        if (matchInfoTabFilter === 'events') {
            if (matchEventsArray.length > 0) {
                let array = [];
                let elementsToDisplay = 0;
                array.push(matchEventsArray.filter(e => e.minute).map((item, key) => {
                    elementsToDisplay++;
                    return (<MatchEventItem event={item} key={key} hostTeamId={data.match.team1.team_id}/>);
                }));
                let hrHeight = elementsToDisplay * 44;
                console.log('abra', hrHeight);
                console.log('abra', elementsToDisplay);
                return (
                <Div>
                    <Div className='VerticalLine' style={{ position: 'absolute', left: window.innerWidth / 2, zIndex: -1, padding: 0, height: hrHeight }}>
                        {/* <hr style={{ width: 0.5, height: hrHeight, padding: 0, margin: 0 }} color='red'/> */}
                    </Div>
                    {array}
                </Div>
                );
            } else {
                return (<Text style={ emptyMatchListMessage }>событий нет</Text>);
            }
        } else if (matchInfoTabFilter === 'stats') {
            if (!data.match.stats1 || !data.match.stats2) {
                return (<Text style={ emptyMatchListMessage }>статистики нет</Text>);
            }
            return (<MatchStatsView stat1={data.match.stats1} stat2={data.match.stats2} />);
        } else if (matchInfoTabFilter === 'squads') {
            return (
            // <Text style={ emptyMatchListMessage }>составов нет</Text>
                <Div>
                    <HorizontalScroll showArrows getScrollToLeft={i => i - 120} getScrollToRight={i => i + 120}>
                        <div style={{ display: 'flex' }}>
                            <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} className={squadFilter === 'host' ? 'ButtonBorderLightGraySelected' : 'ButtonBorderLightGrayNotSelected'} onClick={() => { setSquadFilter('host') }}>
                                <img className='MatchSquadTeamButtonLogo' src={data.match.team1.logo ? `https://st.joinsport.io/team/${data.match.team1.team_id}/logo/${data.match.team1.logo}` : 'https://ttlf.ru/assets/53f437de/football_logo_100x100.png'}/>
                                <Text style={{ paddingLeft: 5, color: squadFilter === 'host' ? '#6699ff' : '', fontFamily: 'robo-r' }}>{data.match.team1.full_name}</Text>
                            </Div>
                            <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} className={squadFilter === 'guest' ? 'ButtonBorderLightGraySelected' : 'ButtonBorderLightGrayNotSelected'} onClick={() => { setSquadFilter('guest') }}>
                                <img className='MatchSquadTeamButtonLogo' src={data.match.team2.logo ? `https://st.joinsport.io/team/${data.match.team2.team_id}/logo/${data.match.team2.logo}` : 'https://ttlf.ru/assets/53f437de/football_logo_100x100.png'}/>
                                <Text style={{ paddingLeft: 5, color: squadFilter === 'guest' ? '#6699ff' : '', fontFamily: 'robo-r' }}>{data.match.team2.full_name}</Text>
                            </Div>
                        </div>
                    </HorizontalScroll>
                    <Div style={{ paddingLeft: 0 }}>
                        <MatchSquadsItem match={data.match} filter={squadFilter} />
                    </Div>
                    {data.match.players.length == 0 ? <Text style={ emptyMatchListMessage }>составов нет</Text> : ''}
                </Div>
            );
        }
    }

    return (
    <Panel id={props.id}>
        <div id="verticalMatchInfoScrollDiv">
		<PanelHeader
			left={<PanelHeaderBack onClick={props.go} data-to={props.isBackToTourney ? 'tournamentInfo' : props.isBackToTeam ? 'teamInfo' : 'matchCenter'} data-tournamentid={data.match.tournament.tournament_id} data-id={data.match.match_id} data-teamid={props.teamId}/>}
		>
			<HeaderTitleFixedLenght>ТТЛФ Рязань</HeaderTitleFixedLenght>
		</PanelHeader>
        {/* <Div>
            {matchId}
        </Div> */}
        {data.match ? (
        <Div style={{ padding: 0 }}>
            <div style={{ backgroundColor: '#f8f8f8', paddingTop: 10 }}>
            <MatchHeader match={data.match} go={props.go}></MatchHeader>
            {/* <View style={{ height: 10, width: window.innerWidth, position: 'absolute', flex: 1, backgroundColor: '#ccc', marginLeft: -12 }}><Text></Text></View> */}
            <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, paddingBottom: 20 }}>
                <Text style={matchInfoTabFilter === 'events' ? udnderlinedStyle : nonUdnderlinedStyle} onClick={() => { changeMatchInfoTabFilter('events'); }}>События</Text>
                <Text style={matchInfoTabFilter === 'stats' ? udnderlinedStyle : nonUdnderlinedStyle} onClick={() => { changeMatchInfoTabFilter('stats'); }}>Статистика</Text>
                <Text style={matchInfoTabFilter === 'squads' ? udnderlinedStyle : nonUdnderlinedStyle} onClick={() => { changeMatchInfoTabFilter('squads'); }}>Составы</Text>
            </Div>
            <Separator/>
            </div>
            <Div>
                {/* {matchEventsArray.length > 0 ? matchEventsArray.map((item, key) => {
                    return (
                        <MatchEventItem event={item} key={key} hostTeamId={data.match.team1.team_id}/>
                    );
                }) : <Text style={ emptyMatchListMessage }>событий нет</Text>} */}
                {changeTabDataHandler()}
            </Div>
        </Div>
        ) : (<Div><Text></Text></Div>)}
        {/* {dataM.calendar.data.map((item, key) => {
            return (
                <Div key={key}>
                    {item.start_dt} {item.team1.full_name} - {item.team2.full_name}
                </Div>
            );
        })} */}
	    </div>
        <EmptyTabBarElementSpace/>
    </Panel>
)};

const emptyMatchListMessage = {
    padding: 20, 
    paddingLeft: 10, 
    paddingRight: 10, 
    // width: 200,
    color: '#999', 
    fontFamily: 'robo-r',
    textAlign: 'center'
}
const nonUdnderlinedStyle = {
    // padding: 5, 
    // paddingLeft: 10, 
    // paddingRight: 10, 
    // width: 200,
    color: '#999', 
    fontFamily: 'robo-r',
    fontSize: 16
}
const udnderlinedStyle = {
    // padding: 5, 
    // paddingLeft: 10, 
    // paddingRight: 10, 
    // width: 200, 
    textDecoration: 'underline', 
    textDecorationThickness: 3,
    textUnderlineOffset: 5,
    textDecorationColor: '#6699ff',
    color: '#6699ff',
    fontFamily: 'robo-r',
    fontSize: 16
}

MatchInfoScreen.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default MatchInfoScreen;