import { Div, Text, HorizontalScroll, ScreenSpinner } from '@vkontakte/vkui';
import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery, useApolloClient } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import * as queries from '../../constants/queries';
import SinglePlayerStatItem from './SinglePlayerStatItem';

const apolloClient = new ApolloClient({
	uri: 'https://api.joinsport.io/graphql'
});

const TournamentStats = props => {

    const [statFilter, setStatFilter] = useState('goals');
    const [sorters, setSorters] = useState('');

    // let { loading, error, data, refetch } = getStatQuery(statFilter);
    // useQuery(queries.TOURNAMENTSTATS(props.tournamentId, sorters), {
    //     context: {
    //         uri: 'https://api.joinsport.io/graphql',
    //         headers: {
    //             'Api-Key': `VJGPfCwBeCxhs25uegPsajabwm8DbzKte4W47fDZQ2Wxm5D28tWVr2WX8rmHgwhb`
    //         },
    //     },
    //     client: apolloClient
    // });

    const getStatQuery = (filter) => {
        // setStatFilter(filter);
        let sorter = '';
        if (filter === 'goals') {
            sorter = '[{column: GOALS, order: DESC}]';
        } else if (filter === 'assists') {
            sorter = '[{column: ASSISTS, order: DESC}]';
        } else if (filter === 'points') {
            sorter = '[{column: POINTS, order: DESC}, {column: GOALS, order: DESC}]';
        } else if (filter === 'fouls') {
            sorter = '[{column: DISCIPLINE, order: DESC}, {column: RED_CARDS, order: DESC}]';
        } else if (filter === 'gk') {
            sorter = '[{column: MISSED_GOALS, order: DESC}, {column: GK_GAMES, order: ASC}]';
        } else if (filter === 'team') {
            return useQuery(queries.TOURNAMENTTEAMSTATS(props.tournamentId), {
                context: {
                    uri: 'https://api.joinsport.io/graphql',
                    headers: {
                        'Api-Key': `zznXBNAxsJCKA2Tt9yB3YLcLdR44XpBgxqhR6xyaNjDZPN6C6xh3tM7azUFKuh34`
                    },
                },
                client: apolloClient
            });
        }
        // setSorters(sorter);
        // refetch();
        return useQuery(queries.TOURNAMENTSTATS(props.tournamentId, sorter), {
            context: {
                uri: 'https://api.joinsport.io/graphql',
                headers: {
                    'Api-Key': `zznXBNAxsJCKA2Tt9yB3YLcLdR44XpBgxqhR6xyaNjDZPN6C6xh3tM7azUFKuh34`
                },
            },
            client: apolloClient
        });
    }

    let { loading, error, data, refetch } = getStatQuery(statFilter);

    useEffect(() => {
        let elmnt = document.getElementById('filterScrollHrz');
        if (elmnt) {
            if (statFilter === 'team') {
                console.log('elmnt', elmnt.scrollLeft)
                elmnt.scrollLeft = 100;
                console.log('scrolled', elmnt.scrollLeft)
            }
        }
    }, [statFilter])

    if (loading) {
        return (
            <Div style={{ 
                // paddingTop: props.tabPadding + 20 
                }}>
                <HorizontalScroll showArrows getScrollToLeft={i => i - 120} getScrollToRight={i => i + 120}>
                <div style={{ display: 'flex' }}>
                    <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} className={statFilter === 'goals' ? 'StatButtonBorderLightGraySelected' : 'StatButtonBorderLightGrayNotSelected'} onClick={() => { setStatFilter('goals') }}>
                        {/* <img className='MatchSquadTeamButtonLogo' src={data.match.team1.logo ? `https://st.joinsport.io/team/${data.match.team1.team_id}/logo/${data.match.team1.logo}` : 'https://nflperm.ru/assets/f36506f5/football_logo_100x100.png'}/> */}
                        <Text style={{ paddingLeft: 5, paddingRight: 5, color: statFilter === 'goals' ? '#6699ff' : '', fontFamily: 'robo-r' }}>Голы</Text>
                    </Div>
                    <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} className={statFilter === 'assists' ? 'StatButtonBorderLightGraySelected' : 'StatButtonBorderLightGrayNotSelected'} onClick={() => { setStatFilter('assists') }}>
                        {/* <img className='MatchSquadTeamButtonLogo' src={data.match.team2.logo ? `https://st.joinsport.io/team/${data.match.team2.team_id}/logo/${data.match.team2.logo}` : 'https://nflperm.ru/assets/f36506f5/football_logo_100x100.png'}/> */}
                        <Text style={{ paddingLeft: 5, paddingRight: 5, color: statFilter === 'assists' ? '#6699ff' : '', fontFamily: 'robo-r' }}>Пасы</Text>
                    </Div>
                    <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} className={statFilter === 'points' ? 'StatButtonBorderLightGraySelected' : 'StatButtonBorderLightGrayNotSelected'} onClick={() => { setStatFilter('points') }}>
                        {/* <img className='MatchSquadTeamButtonLogo' src={data.match.team2.logo ? `https://st.joinsport.io/team/${data.match.team2.team_id}/logo/${data.match.team2.logo}` : 'https://nflperm.ru/assets/f36506f5/football_logo_100x100.png'}/> */}
                        <Text style={{ paddingLeft: 5, paddingRight: 5, color: statFilter === 'points' ? '#6699ff' : '', fontFamily: 'robo-r' }}>Гол + пас</Text>
                    </Div>
                    <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} className={statFilter === 'fouls' ? 'StatButtonBorderLightGraySelected' : 'StatButtonBorderLightGrayNotSelected'} onClick={() => { setStatFilter('fouls') }}>
                        {/* <img className='MatchSquadTeamButtonLogo' src={data.match.team2.logo ? `https://st.joinsport.io/team/${data.match.team2.team_id}/logo/${data.match.team2.logo}` : 'https://nflperm.ru/assets/f36506f5/football_logo_100x100.png'}/> */}
                        <Text style={{ paddingLeft: 5, paddingRight: 5, color: statFilter === 'fouls' ? '#6699ff' : '', fontFamily: 'robo-r' }}>Карточки</Text>
                    </Div>
                    <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} className={statFilter === 'gk' ? 'StatButtonBorderLightGraySelected' : 'StatButtonBorderLightGrayNotSelected'} onClick={() => { setStatFilter('gk') }}>
                        {/* <img className='MatchSquadTeamButtonLogo' src={data.match.team2.logo ? `https://st.joinsport.io/team/${data.match.team2.team_id}/logo/${data.match.team2.logo}` : 'https://nflperm.ru/assets/f36506f5/football_logo_100x100.png'}/> */}
                        <Text style={{ paddingLeft: 5, paddingRight: 5, color: statFilter === 'gk' ? '#6699ff' : '', fontFamily: 'robo-r' }}>Вратари</Text>
                    </Div>
                    <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} className={statFilter === 'team' ? 'StatButtonBorderLightGraySelected' : 'StatButtonBorderLightGrayNotSelected'} onClick={() => { setStatFilter('team') }}>
                        {/* <img className='MatchSquadTeamButtonLogo' src={data.match.team2.logo ? `https://st.joinsport.io/team/${data.match.team2.team_id}/logo/${data.match.team2.logo}` : 'https://nflperm.ru/assets/f36506f5/football_logo_100x100.png'}/> */}
                        <Text style={{ paddingLeft: 5, paddingRight: 5, color: statFilter === 'team' ? '#6699ff' : '', fontFamily: 'robo-r' }}>Команды</Text>
                    </Div>
                </div>
            </HorizontalScroll>
            <ScreenSpinner />
            </Div>
        )
    }

    const setStatFilterHandler = (filter) => {

        // setStatFilter(filter);
        // let sorter = '';
        // if (filter === 'goals') {
        //     sorter = '[{column: GOALS, order: DESC}]';
        // } else if (filter === 'assists') {
        //     sorter = '[{column: ASSISTS, order: DESC}]';
        // } else if (filter === 'points') {
        //     sorter = '[{column: POINTS, order: DESC}, {column: GOALS, order: DESC}]';
        // } else if (filter === 'fouls') {
        //     sorter = '[{column: DISCIPLINE, order: DESC}, {column: RED_CARDS, order: DESC}]';
        // }
        // setSorters(sorter);
        // refetch();
    }

    console.log('stat data', data);

    const getDataBasedOnFilter = () => {
        if (data) {
            if (statFilter === 'goals') {
                return data.stats.data.filter(item => item.goals > 0);
            } else if (statFilter === 'assists') {
                return data.stats.data.filter(item => item.assists > 0);
            } else if (statFilter === 'points') {
                return data.stats.data.filter(item => item.points > 0);
            } else if (statFilter === 'fouls') {
                return data.stats.data.filter(item => item.discipline > 0);
            } else if (statFilter === 'gk') {
                return data.stats.data.filter(item => item.gk_games > 0);
            } else if (statFilter === 'team') {
                return data.teamsStats.data.filter(item => item.games > 0);
            }
        } else {
            return [];
        }
    }

    const getParamBasedOnFilter = () => {
        if (statFilter === 'goals') {
            return 'г';
        } else if (statFilter === 'assists') {
            return 'п';
        } else if (statFilter === 'points') {
            return 'о';
        } else if (statFilter === 'fouls') {
            return 'к';
        }
    }

    const getColumnsBasedOnFilter = () => {
        if (statFilter === 'goals') {
            return (
                <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 0 }}>
                    <Div style={{ width: '90%', paddingBottom: 0 }}>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 12, color: '#ccc' }}></Text>
                    </Div>
                    <Div style={{ width: '5%', paddingBottom: 0 }}>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 12, color: '#ccc' }}>и</Text>
                    </Div>
                    <Div style={{ width: '5%', paddingBottom: 0 }}>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 12, color: '#ccc' }}>г</Text>
                    </Div>
                </Div>
            );
        } else if (statFilter === 'assists') {
            return (
                <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 0 }}>
                    <Div style={{ width: '90%', paddingBottom: 0 }}>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 12, color: '#ccc' }}></Text>
                    </Div>
                    <Div style={{ width: '5%', paddingBottom: 0 }}>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 12, color: '#ccc' }}>и</Text>
                    </Div>
                    <Div style={{ width: '5%', paddingBottom: 0 }}>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 12, color: '#ccc' }}>п</Text>
                    </Div>
                </Div>
            );
        } else if (statFilter === 'points') {
            return (
                <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 0 }}>
                    <Div style={{ width: '90%', paddingBottom: 0 }}>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 12, color: '#ccc' }}></Text>
                    </Div>
                    <Div style={{ width: '5%', paddingBottom: 0 }}>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 12, color: '#ccc', textAlign: 'center' }}>и</Text>
                    </Div>
                    <Div style={{ width: '5.5%', paddingBottom: 0 }}>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 12, color: '#ccc' }}>г+п</Text>
                    </Div>
                </Div>
            );
        } else if (statFilter === 'fouls') {
            return (
                <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 0 }}>
                    <Div style={{ width: '85%', paddingBottom: 0 }}>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 12, color: '#ccc' }}></Text>
                    </Div>
                    <Div style={{ width: '5%', paddingBottom: 0 }}>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 12, color: '#ccc' }}>и</Text>
                    </Div>
                    <Div style={{ width: '5%', paddingBottom: 0 }}>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 12, color: '#ccc' }}>жк</Text>
                    </Div>
                    <Div style={{ width: '5%', paddingBottom: 0 }}>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 12, color: '#ccc' }}>кк</Text>
                    </Div>
                </Div>
            );
        } else if (statFilter === 'gk') {
            return (
                <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 0 }}>
                    <Div style={{ width: '90%', paddingBottom: 0 }}>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 12, color: '#ccc' }}></Text>
                    </Div>
                    <Div style={{ width: '5%', paddingBottom: 0 }}>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 12, color: '#ccc' }}>и</Text>
                    </Div>
                    <Div style={{ width: '5%', paddingBottom: 0 }}>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 12, color: '#ccc' }}>п</Text>
                    </Div>
                </Div>
            );
        } else if (statFilter === 'team') {
            return (
                <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 0 }}>
                    <Div style={{ width: '85%', paddingBottom: 0 }}>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 12, color: '#ccc' }}></Text>
                    </Div>
                    <Div style={{ width: '5%', paddingBottom: 0 }}>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 12, color: '#ccc' }}>и</Text>
                    </Div>
                    <Div style={{ width: '5%', paddingBottom: 0 }}>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 12, color: '#ccc' }}>мз</Text>
                    </Div>
                    <Div style={{ width: '5%', paddingBottom: 0 }}>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 12, color: '#ccc' }}>мп</Text>
                    </Div>
                </Div>
            );
        }
    }

    return (
        <Div style={{ 
            // paddingTop: props.tabPadding + 20 
            }} id='filterScrollHrz'>
            <HorizontalScroll showArrows getScrollToLeft={i => i - 120} getScrollToRight={i => i + 120}>
                <div style={{ display: 'flex' }}>
                    <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} className={statFilter === 'goals' ? 'StatButtonBorderLightGraySelected' : 'StatButtonBorderLightGrayNotSelected'} onClick={() => { setStatFilter('goals') }}>
                        {/* <img className='MatchSquadTeamButtonLogo' src={data.match.team1.logo ? `https://st.joinsport.io/team/${data.match.team1.team_id}/logo/${data.match.team1.logo}` : 'https://nflperm.ru/assets/f36506f5/football_logo_100x100.png'}/> */}
                        <Text style={{ paddingLeft: 5, paddingRight: 5, color: statFilter === 'goals' ? '#6699ff' : '', fontFamily: 'robo-r' }}>Голы</Text>
                    </Div>
                    <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} className={statFilter === 'assists' ? 'StatButtonBorderLightGraySelected' : 'StatButtonBorderLightGrayNotSelected'} onClick={() => { setStatFilter('assists') }}>
                        {/* <img className='MatchSquadTeamButtonLogo' src={data.match.team2.logo ? `https://st.joinsport.io/team/${data.match.team2.team_id}/logo/${data.match.team2.logo}` : 'https://nflperm.ru/assets/f36506f5/football_logo_100x100.png'}/> */}
                        <Text style={{ paddingLeft: 5, paddingRight: 5, color: statFilter === 'assists' ? '#6699ff' : '', fontFamily: 'robo-r' }}>Пасы</Text>
                    </Div>
                    <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} className={statFilter === 'points' ? 'StatButtonBorderLightGraySelected' : 'StatButtonBorderLightGrayNotSelected'} onClick={() => { setStatFilter('points') }}>
                        {/* <img className='MatchSquadTeamButtonLogo' src={data.match.team2.logo ? `https://st.joinsport.io/team/${data.match.team2.team_id}/logo/${data.match.team2.logo}` : 'https://nflperm.ru/assets/f36506f5/football_logo_100x100.png'}/> */}
                        <Text style={{ paddingLeft: 5, paddingRight: 5, color: statFilter === 'points' ? '#6699ff' : '', fontFamily: 'robo-r' }}>Гол + пас</Text>
                    </Div>
                    <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} className={statFilter === 'fouls' ? 'StatButtonBorderLightGraySelected' : 'StatButtonBorderLightGrayNotSelected'} onClick={() => { setStatFilter('fouls') }}>
                        {/* <img className='MatchSquadTeamButtonLogo' src={data.match.team2.logo ? `https://st.joinsport.io/team/${data.match.team2.team_id}/logo/${data.match.team2.logo}` : 'https://nflperm.ru/assets/f36506f5/football_logo_100x100.png'}/> */}
                        <Text style={{ paddingLeft: 5, paddingRight: 5, color: statFilter === 'fouls' ? '#6699ff' : '', fontFamily: 'robo-r' }}>Карточки</Text>
                    </Div>
                    <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} className={statFilter === 'gk' ? 'StatButtonBorderLightGraySelected' : 'StatButtonBorderLightGrayNotSelected'} onClick={() => { setStatFilter('gk') }}>
                        {/* <img className='MatchSquadTeamButtonLogo' src={data.match.team2.logo ? `https://st.joinsport.io/team/${data.match.team2.team_id}/logo/${data.match.team2.logo}` : 'https://nflperm.ru/assets/f36506f5/football_logo_100x100.png'}/> */}
                        <Text style={{ paddingLeft: 5, paddingRight: 5, color: statFilter === 'gk' ? '#6699ff' : '', fontFamily: 'robo-r' }}>Вратари</Text>
                    </Div>
                    <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} className={statFilter === 'team' ? 'StatButtonBorderLightGraySelected' : 'StatButtonBorderLightGrayNotSelected'} onClick={() => { setStatFilter('team') }}>
                        {/* <img className='MatchSquadTeamButtonLogo' src={data.match.team2.logo ? `https://st.joinsport.io/team/${data.match.team2.team_id}/logo/${data.match.team2.logo}` : 'https://nflperm.ru/assets/f36506f5/football_logo_100x100.png'}/> */}
                        <Text style={{ paddingLeft: 5, paddingRight: 5, color: statFilter === 'team' ? '#6699ff' : '', fontFamily: 'robo-r' }}>Команды</Text>
                    </Div>
                </div>
            </HorizontalScroll>
            {getDataBasedOnFilter() == null || getDataBasedOnFilter().length === 0 ? (<Text style={ emptyMatchListMessage }>нет данных</Text>) : (
                getColumnsBasedOnFilter()
            )}
            {getDataBasedOnFilter().map((item, key) => {
                return (
                    <SinglePlayerStatItem key={key} place={key + 1} item={item} filter={statFilter} />
                );
            })}
        </Div>
    );
};

const emptyMatchListMessage = {
    padding: 20, 
    paddingLeft: 10, 
    paddingRight: 10, 
    // width: 200,
    color: '#999', 
    fontFamily: 'robo-r',
    textAlign: 'center'
}

export default TournamentStats;