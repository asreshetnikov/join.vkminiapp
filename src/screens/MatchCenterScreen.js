import React, { useState, useEffect } from 'react';
import { Panel, PanelHeader, PanelHeaderBack, ScreenSpinner, View, Div, Epic, HorizontalScroll, Text, HorizontalCell, Tabbar, TabbarItem } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import MatchItem from '../components/MatchCenterMatchItem';
import HeaderTitleFixedLenght from '../components/HeaderTitleFixedLenght';

import { gql } from 'apollo-boost';

import { useQuery, useLazyQuery, useApolloClient } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import moment from 'moment';

import matchcenterTournament from '../assets/img/common/matchcenter-tournament.svg';
import sprite from '../assets/img/icons.svg';
import * as queries from '../constants/queries';

import { Icon28BasketballBallOutline, Icon28Users3Outline, Icon28SneakerOutline } from '@vkontakte/icons';
import { Icon24CupOutline } from '@vkontakte/icons';
import { Icon24UsersOutline } from '@vkontakte/icons';
import { Icon24BallOutline } from '@vkontakte/icons';
import EmptyTabBarElementSpace from '../components/EmptyTabBarElementSpace';


// import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
// import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
// import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';

const apolloClient = new ApolloClient({
	uri: 'https://api.joinsport.io/graphql'
});

const TODAY_FILTER = 0;
const YESTERDAY_FILTER = -1;
const WEEKMINUS_FILTER = -2;
const MONTHMINUS_FILTER = -3;
const TOMORROW_FILTER = 1;
const WEEKPLUS_FILTER = 2;
const MONTHPLUS_FILTER = 3;

const MatchCenterScreen = props => {
    let actualDateToRequest = moment(new Date());

    const [requestFrom, setRequestFrom] = useState(actualDateToRequest.format('YYYY-MM-DD'));
    const [requestTo, setRequestTo] = useState(actualDateToRequest.format('YYYY-MM-DD'));
    const [filterSelected, setFilterSelected] = useState(TODAY_FILTER);

    const [moveX, setMoveX] = useState(0);

    let requestDateFrom = actualDateToRequest.subtract(1, 'months').format('YYYY-MM-DD');
    let requestDateTo = actualDateToRequest.add(1, 'months').format('YYYY-MM-DD');

    const gqlQ = gql`
    {
        calendar(first: 500, filters: {start_date_range: {from: "${requestFrom}", to: "${requestTo}"}}){
            data{
                tournament_id
                match_id
                gf
                ga
                team1{
                    team_id
                    logo
                    full_name
                }
                team2{
                    team_id
                    logo
                    full_name
                }
                start_dt
            }
        }
    }
    `;

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

    // 'Api-Key': `VJGPfCwBeCxhs25uegPsajabwm8DbzKte4W47fDZQ2Wxm5D28tWVr2WX8rmHgwhb`
    const { loading: loadingM, error: errorM, data: dataM, refetch } = useQuery(queries.CALENDARPERIOD(requestFrom, requestTo, currentSeason ? currentSeason.season_id : -1), {
        context: {
            uri: 'https://api.joinsport.io/graphql',
            headers: {
                'Api-Key': `zznXBNAxsJCKA2Tt9yB3YLcLdR44XpBgxqhR6xyaNjDZPN6C6xh3tM7azUFKuh34`
            },
        },
        client: apolloClient
    });

    useEffect(() => {
        let element = document.getElementById('horizontalCalendarScrollDiv');
        if (element) {
            if (filterSelected === TODAY_FILTER) {
                element.scrollLeft = 0;
                element.scrollLeft += 50;
            } else if (filterSelected < TODAY_FILTER) {
                element.scrollLeft = 0;
            } else {
                element.scrollLeft = 100;
            }
        }
        refetch();
    })

    useEffect(() => {
        refetch();
    }, [filterSelected])

    if (loadingM || loadingS) {
        return (
            <Panel id={props.id}>
                <PanelHeader
                    // left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
                >
                    <HeaderTitleFixedLenght>ТТЛФ Рязань</HeaderTitleFixedLenght>
                </PanelHeader>
                <div id='horizontalCalendarScrollDiv' className="wrapper">
                    <div className='content'>
                    {/* <View style={{ flexDirection: 'row', padding: 5 }}> */}
                        <Text style={filterSelected === MONTHMINUS_FILTER ? udnderlinedStyle : nonUdnderlinedStyle} onClick={() => {
                            changeCalendarFilterHandler(MONTHMINUS_FILTER);
                        }}>Месяц</Text>
                        <Text style={filterSelected === WEEKMINUS_FILTER ? udnderlinedStyle : nonUdnderlinedStyle} onClick={() => {
                            changeCalendarFilterHandler(WEEKMINUS_FILTER);
                        }}>Неделя</Text>
                        <Text style={filterSelected === YESTERDAY_FILTER ? udnderlinedStyle : nonUdnderlinedStyle} onClick={() => {
                            changeCalendarFilterHandler(YESTERDAY_FILTER);
                        }}>Вчера</Text>
                        <Text style={filterSelected === TODAY_FILTER ? udnderlinedStyle : nonUdnderlinedStyle} onClick={() => {
                            changeCalendarFilterHandler(TODAY_FILTER);
                        }}>Сегодня</Text>
                        <Text style={filterSelected === TOMORROW_FILTER ? udnderlinedStyle : nonUdnderlinedStyle} onClick={() => {
                            changeCalendarFilterHandler(TOMORROW_FILTER);
                        }}>Завтра</Text>
                        <Text style={filterSelected === WEEKPLUS_FILTER ? udnderlinedStyle : nonUdnderlinedStyle} onClick={() => {
                            changeCalendarFilterHandler(WEEKPLUS_FILTER);
                        }}>Неделя</Text>
                        <Text style={filterSelected === MONTHPLUS_FILTER ? udnderlinedStyle : nonUdnderlinedStyle} onClick={() => {
                            changeCalendarFilterHandler(MONTHPLUS_FILTER);
                        }}>Месяц</Text>
                    {/* </View> */}
                    </div>
                </div>
                <Div>
                    <ScreenSpinner />
                </Div>
            </Panel>
        )
    }

    const tourneyIds = new Set();
    if (dataM) {
        dataM.calendar.data.filter(m => m.team1 && m.team2).sort((o1, o2) => o1.tournament_id - o2.tournament_id).forEach(element => tourneyIds.add(element.tournament_id));
    }
    const idsArray = [...tourneyIds.values()];
    const tourneyMatches = new Map();
    idsArray.forEach(value => {
        const matches = [];
        tourneyMatches.set(value, matches);
    });
    // console.log(tourneyMatches);
    for (const k in dataM.calendar.data) {
        if (dataM.calendar.data[k].team1 && dataM.calendar.data[k].team2) {
            const array = tourneyMatches.get(dataM.calendar.data[k].tournament_id)
            array.push(dataM.calendar.data[k]);
        }
    }

    // console.log(tourneyMatches);

    const changeCalendarFilterHandler = (filter) => {
        console.log('filter passed', filter)
        actualDateToRequest = moment(new Date());
        switch (filter) {
            case YESTERDAY_FILTER:
                setFilterSelected(YESTERDAY_FILTER);
                setRequestFrom(actualDateToRequest.subtract(1, 'days').format('YYYY-MM-DD'));
                setRequestTo(actualDateToRequest.format('YYYY-MM-DD'));
                // refetchM();
                break;
            case WEEKMINUS_FILTER:
                setFilterSelected(WEEKMINUS_FILTER);
                setRequestTo(actualDateToRequest.subtract(1, 'days').format('YYYY-MM-DD'));
                setRequestFrom(actualDateToRequest.subtract(1, 'weeks').format('YYYY-MM-DD'));
                // refetchM();
                break;
            case MONTHMINUS_FILTER:
                setFilterSelected(MONTHMINUS_FILTER);
                setRequestTo(actualDateToRequest.subtract(1, 'days').format('YYYY-MM-DD'));
                setRequestFrom(actualDateToRequest.subtract(1, 'months').format('YYYY-MM-DD'));
                // refetchM();
                break;
            case TOMORROW_FILTER:
                setFilterSelected(TOMORROW_FILTER);
                setRequestFrom(actualDateToRequest.add(1, 'days').format('YYYY-MM-DD'));
                setRequestTo(actualDateToRequest.format('YYYY-MM-DD'));
                // refetchM();
                break;
            case WEEKPLUS_FILTER:
                setFilterSelected(WEEKPLUS_FILTER);
                setRequestFrom(actualDateToRequest.add(1, 'days').format('YYYY-MM-DD'));
                setRequestTo(actualDateToRequest.add(1, 'weeks').format('YYYY-MM-DD'));
                // refetchM();
                break;
            case MONTHPLUS_FILTER:
                setFilterSelected(MONTHPLUS_FILTER);
                setRequestFrom(actualDateToRequest.add(1, 'days').format('YYYY-MM-DD'));
                setRequestTo(actualDateToRequest.add(1, 'months').format('YYYY-MM-DD'));
                // refetchM();
                break;
            case TODAY_FILTER:
                setFilterSelected(TODAY_FILTER);
                setRequestFrom(actualDateToRequest.format('YYYY-MM-DD'));
                setRequestTo(actualDateToRequest.format('YYYY-MM-DD'));
                // refetchM();
                break;
            default:
                setFilterSelected(TODAY_FILTER);
                setRequestFrom(actualDateToRequest.format('YYYY-MM-DD'));
                setRequestTo(actualDateToRequest.format('YYYY-MM-DD'));
        }
    }

    const headerTitleHandler = (text) => {
        if (text.length < 20) {
            return text;
        } else {
            let cuttedName = text.substring(0, 20);
            return cuttedName + '...';
        }
    }

    console.log('filter', filterSelected);
    console.log('from', requestFrom);
    console.log('to', requestTo);
    console.log('actual', actualDateToRequest);

    let posStart = 0;
    let posEnd = 0;
    const handleSwipeStart = (touchStartEvent) => {
        posStart = touchStartEvent.targetTouches[0].clientX;
        posEnd = touchStartEvent.targetTouches[0].clientX;
        console.log('start', touchStartEvent.targetTouches[0].clientX)
        console.log('end', touchStartEvent.targetTouches[0].clientX)
    }
    const handleSwipeEnd = () => {
        console.log('swiped ' + (posStart > posEnd ? 'left' : 'right'))
        console.log('filter before', filterSelected);
        console.log('start, end', posStart, posEnd)
        if (posStart - posEnd > 150 || posStart - posEnd < -150) {
            if (posStart > posEnd) {
                changeCalendarFilterHandler(filterSelected + 1 > MONTHPLUS_FILTER ? MONTHPLUS_FILTER : filterSelected + 1);
            }
            if (posStart < posEnd) {
                changeCalendarFilterHandler(filterSelected - 1 < MONTHMINUS_FILTER ? MONTHMINUS_FILTER : filterSelected - 1);
            }
        }
        console.log('filter after', filterSelected);
        // changeCalendarFilterHandler(filterSelected);
    }
    const handleSwipeMove = (touchMoveEvent) => {
        posEnd = touchMoveEvent.targetTouches[0].clientX;
        console.log('end', touchMoveEvent.targetTouches[0].clientX)
        // setMoveX(touchMoveEvent.targetTouches[0].clientX);
        // console.log('move', touchMoveEvent.targetTouches[0].clientX)
    }

    return (
    <Panel id={props.id}>
		<PanelHeader
			// left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
		>
			<HeaderTitleFixedLenght>ТТЛФ Рязань</HeaderTitleFixedLenght>
		</PanelHeader>
        {/* <HorizontalScroll id='horizontalCalendarScroll' showArrows getScrollToLeft={i => i + 50}> */}
        {/* <div id='horizontalCalendarScrollDiv' style={{display: 'flex'}}>
            {/* <View style={{ flexDirection: 'row', padding: 5 }}> */}
                {/* <Text style={{ padding: 5, paddingLeft: 10, paddingRight: 10, width: 50 }}>Месяц</Text>
                <Text style={{ padding: 5, paddingLeft: 10, paddingRight: 10, width: 50 }}>Неделя</Text>
                <Text style={{ padding: 5, paddingLeft: 10, paddingRight: 10, width: 50 }}>Вчера</Text>
                <Text style={{ padding: 5, paddingLeft: 10, paddingRight: 10, width: 50, textDecoration: 'underline', textUnderlineOffset: 5 }}>Сегодня</Text>
                <Text style={{ padding: 5, paddingLeft: 10, paddingRight: 10, width: 50 }}>Завтра</Text>
                <Text style={{ padding: 5, paddingLeft: 10, paddingRight: 10, width: 50 }}>Неделя</Text>
                <Text style={{ padding: 5, paddingLeft: 10, paddingRight: 10, width: 50 }}>Месяц</Text> */}
            {/* </View> */}
        {/* </div> */}
        {/* </HorizontalScroll> */}
        <div id='horizontalCalendarScrollDiv' className="wrapper">
            <div className='content'>
            {/* <View style={{ flexDirection: 'row', padding: 5 }}> */}
                <Text style={filterSelected === MONTHMINUS_FILTER ? udnderlinedStyle : nonUdnderlinedStyle} onClick={() => {
                    changeCalendarFilterHandler(MONTHMINUS_FILTER);
                }}>Месяц</Text>
                <Text style={filterSelected === WEEKMINUS_FILTER ? udnderlinedStyle : nonUdnderlinedStyle} onClick={() => {
                    changeCalendarFilterHandler(WEEKMINUS_FILTER);
                }}>Неделя</Text>
                <Text style={filterSelected === YESTERDAY_FILTER ? udnderlinedStyle : nonUdnderlinedStyle} onClick={() => {
                    changeCalendarFilterHandler(YESTERDAY_FILTER);
                }}>Вчера</Text>
                <Text style={filterSelected === TODAY_FILTER ? udnderlinedStyle : nonUdnderlinedStyle} onClick={() => {
                    changeCalendarFilterHandler(TODAY_FILTER);
                }}>Сегодня</Text>
                <Text style={filterSelected === TOMORROW_FILTER ? udnderlinedStyle : nonUdnderlinedStyle} onClick={() => {
                    changeCalendarFilterHandler(TOMORROW_FILTER);
                }}>Завтра</Text>
                <Text style={filterSelected === WEEKPLUS_FILTER ? udnderlinedStyle : nonUdnderlinedStyle} onClick={() => {
                    changeCalendarFilterHandler(WEEKPLUS_FILTER);
                }}>Неделя</Text>
                <Text style={filterSelected === MONTHPLUS_FILTER ? udnderlinedStyle : nonUdnderlinedStyle} onClick={() => {
                    changeCalendarFilterHandler(MONTHPLUS_FILTER);
                }}>Месяц</Text>
            {/* </View> */}
            </div>
        </div>
        {/* <Div>
            matches size: {dataM.calendar.data.length}
        </Div> */}
        {
        // idsArray.map((tournamentId) => {
        //     console.log(tournamentId);
        Array.from(tourneyMatches).map(([key, value]) => {
            const tourneyName = value[0].tournament.short_name
            const tournamentObj = value[0].tournament_id;
            const arr = [];
            arr.push(
            value.map((i, k) => {
                console.log('k', i.match_id);
                return (
                    <Div onClick={props.go} data-to="matchInfo" data-id={i.match_id} key={k} style={{ padding: 0 }}>
                        <MatchItem match={i} />
                    </Div>
                );
            })
            )
            console.log('key', key);
            return (
                <Div id="calendarContainer" key={key} style={{ width: '100%', padding: 0 }} onTouchMove={touchMoveEvent => handleSwipeMove(touchMoveEvent)} onTouchEnd={() => { handleSwipeEnd() }} onTouchStart={touchStartEvent => handleSwipeStart(touchStartEvent)}>
                    <Div className="Tournament-Calendar-Header">
                        <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingBottom: 0 }}>
                            <img src={matchcenterTournament} width="15" height="15"/>
                            <Text weight='semibold' style={{ padding: 10, fontFamily: 'robo-r', color: '#999' }}  onClick={props.go} data-to="tournamentInfo" data-tournamentid={tournamentObj} data-id={-1}>{tourneyName}</Text>
                        </Div>
                    </Div>
                    {arr}
                </Div>
            );
            // console.log(value);
        })
            // tourneyMatches.forEach((key) => {
            //     const array = key;
            //     console.log(array);
            //     key.map((i, k) => {
            //         console.log(i);
            //         return (
            //                 <MatchItem key={k} match={i} />
            //             );
            //     })
            // })
            //     console.log('here');
                // return (
                //     <MatchItem key={item.match_id} match={item} />
                // );
            // })
            // let isFirstMatch = true;
            // dataM.calendar.data.map((item, key) => {
            //     // if (tournamentId === item.tournament_id) {
            //         console.log('here');
            //         console.log(item);
            //         // if (isFirstMatch) {
            //         //     isFirstMatch = false;
            //         //     return (
            //         //         <MatchItem key={key} match={item} />
            //         //     );
            //         // } else {
            //             return (
            //                 <MatchItem key={key} match={item} />
            //             );
            //         // }
            //     // }
            // })
        }
        {tourneyMatches.size > 0 ? '' : <Div style={{ height: 500 }} onTouchMove={touchMoveEvent => handleSwipeMove(touchMoveEvent)} onTouchEnd={() => { handleSwipeEnd() }} onTouchStart={touchStartEvent => handleSwipeStart(touchStartEvent)}><Text style={ emptyMatchListMessage }>матчей нет</Text></Div>}
        <EmptyTabBarElementSpace/>
        {/* <MatchCenterScreen id='matchCenter' go={go} />
        <TeamsScreen id='teams' go={go} />
        <TournamentsScreen id='tournaments' go={go} /> */}
        {/* <Tabbar>
            <TabbarItem text="Матч-центр" onClick={props.go} data-to="matchCenter"><Icon24BallOutline fill={'#6699ff'}/></TabbarItem>
            <TabbarItem text="Команды" onClick={props.go} data-to="teams"><Icon24UsersOutline fill={''}/></TabbarItem>
            <TabbarItem text="Турниры" onClick={props.go} data-to="tournaments"><Icon24CupOutline fill={''}/></TabbarItem>
        </Tabbar> */}
	</Panel>
)};

const udnderlinedStyle = {
    padding: 5, 
    paddingLeft: 10, 
    paddingRight: 10, 
    width: 200, 
    textDecoration: 'underline', 
    textDecorationThickness: 3,
    textUnderlineOffset: 5,
    textDecorationColor: '#6699ff',
    color: '#6699ff',
    fontFamily: 'robo-r'
}

const nonUdnderlinedStyle = {
    padding: 5, 
    paddingLeft: 10, 
    paddingRight: 10, 
    width: 200,
    color: '#999', 
    fontFamily: 'robo-r'
}

const emptyMatchListMessage = {
    padding: 20, 
    paddingLeft: 10, 
    paddingRight: 10, 
    // width: 200,
    color: '#999', 
    fontFamily: 'robo-r',
    textAlign: 'center'
}

MatchCenterScreen.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default MatchCenterScreen;