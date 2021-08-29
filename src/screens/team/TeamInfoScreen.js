import { Div, Text, Panel, PanelHeader, PanelHeaderBack, ScreenSpinner, View, Separator } from '@vkontakte/vkui';
import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';

import { useQuery, useLazyQuery, useApolloClient, rewriteURIForGET, useMutation } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';

import sprite from '../../assets/img/icons.svg'
import subscribeOn from '../../assets/img/buttons/subscribeOn.svg';
import subscribeOff from '../../assets/img/buttons/subscribeOff.svg';

import * as queries from '../../constants/queries';
import HeaderTitleFixedLenght from '../../components/HeaderTitleFixedLenght';
import MatchList from '../../components/team/MatchList';
import SquadList from '../../components/team/SquadList';
import EmptyTabBarElementSpace from '../../components/EmptyTabBarElementSpace';
import { Icon24Globe } from '@vkontakte/icons';

const apolloClient = new ApolloClient({
	uri: 'https://api.joinsport.io/graphql'
});

const TeamInfoScreen = props => {

    const [teamInfoTabFilter, setTeamInfoTabFilter] = useState('matches');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const teamId = props.teamId;

    const urlParams = window.location.search.slice(1);

    const { loading, error, data, refetch } = useQuery(queries.TEAMINFO(teamId), {
        context: {
            uri: 'https://api.joinsport.io/graphql',
            headers: {
                'Api-Key': `zznXBNAxsJCKA2Tt9yB3YLcLdR44XpBgxqhR6xyaNjDZPN6C6xh3tM7azUFKuh34`
            },
        },
        client: apolloClient
    });

    const { loading: loadingSubI, error: errorSubI, data: dataSubI, refetch: refetchSubI } = useQuery(queries.SUBINFO(teamId, urlParams), {
        context: {
            uri: 'https://api.joinsport.io/graphql',
            headers: {
                'Api-Key': `zznXBNAxsJCKA2Tt9yB3YLcLdR44XpBgxqhR6xyaNjDZPN6C6xh3tM7azUFKuh34`
            },
        },
        client: apolloClient
    });

    const SUBSCRIBETEAM = gql`
    mutation vkCreateTeamSubscription($team_id: Int!, $session: String!) {
        vkCreateTeamSubscription(team_id: $team_id, session: $session)
    }
    `;
    const [useSubscribeTeam, {data: dataSub}] = useMutation(SUBSCRIBETEAM
        , {
            context: {
                uri: 'https://api.joinsport.io/graphql',
                headers: {
                    'Api-Key': `zznXBNAxsJCKA2Tt9yB3YLcLdR44XpBgxqhR6xyaNjDZPN6C6xh3tM7azUFKuh34`
                },
            },
            client: apolloClient
        }
    );
    const UNSUBSCRIBETEAM = gql`
    mutation vkCancelTeamSubscription($team_id: Int!, $session: String!) {
        vkCancelTeamSubscription(team_id: $team_id, session: $session)
    }
    `;
    const [useUnsubscribeTeam, {data: dataUnsub}] = useMutation(UNSUBSCRIBETEAM
        , {
            context: {
                uri: 'https://api.joinsport.io/graphql',
                headers: {
                    'Api-Key': `zznXBNAxsJCKA2Tt9yB3YLcLdR44XpBgxqhR6xyaNjDZPN6C6xh3tM7azUFKuh34`
                },
            },
            client: apolloClient
        }
    );

    const teamSubscribtionHandler = () => {
        console.log('click');
        let groupId = null;
        const params = window.location.search.slice(1);
        const values = params.split('&');
        for (let key in values) {
            if (values[key].includes('vk_group_id')) {
                groupId = values[key].replace('vk_group_id=', '');
            }
        }
        // 10056971 group_id from vk
        bridge.send("VKWebAppAllowMessagesFromGroup", {"group_id": parseInt(10056971)}).then(result => {
            useSubscribeTeam({variables: {
                team_id: parseInt(teamId),
                session: window.location.search.slice(1)
            }}).then(result => {
                if (result) {
                    setIsSubscribed(true);
                    refetchSubI();
                }
            })
        });
    }

    const teamUnsubscribtionHandler = () => {
        useUnsubscribeTeam({variables: {
            team_id: parseInt(teamId),
            session: window.location.search.slice(1)
        }}).then(result => {
            console.log("r2", result);
            if (result) {
                setIsSubscribed(false);
                refetchSubI();
            }
        })
    }

    const updateIsSubVar = () => {
        if (dataSubI) {
            setIsSubscribed(dataSubI.vkCheckTeamSubscription);
        }
    }

    useEffect(() => {
        updateIsSubVar();
    }, [dataSubI])

    if (loading && loadingSubI) {
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

    const changeTeamInfoTabFilter = (filter) => {
        setTeamInfoTabFilter(filter);
    }

    const tabContentResolver = () => {
        if (teamInfoTabFilter === 'matches') {
            return (<MatchList teamId={teamId} go={props.go} />);
        } else if (teamInfoTabFilter === 'squad') {
            return (<SquadList players={data.team.players.filter(p => p.application.status === 'accepted')} />);
        }
    }

    return (
        <Panel id={props.id}>
            <PanelHeader style={{ backgroundColor: 'white' }}
                left={<PanelHeaderBack onClick={props.go} data-to={props.tournamentId ? 'tournamentInfo' : props.matchId ? 'matchInfo' : 'teams'} data-tournamentid={props.tournamentId} data-id={props.matchId}/>}
            >
                <HeaderTitleFixedLenght>ТТЛФ Рязань</HeaderTitleFixedLenght>
            </PanelHeader>
            {data && data.team ? (
                <div>
                    <Div style={{ backgroundColor: '#f8f8f8' }}>
                        <Div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 0 }}>
                            <a style={{ textDecoration: 'none', color: '#6699ff' }} href={`https://ttlf.ru/team/${teamId}`} >
                            <Text className="ButtonBorderLightGrayHeader" style={{ display: 'flex', fontFamily: 'robo-r', fontSize: 12, paddingRight: 5, paddingLeft: 5, color: '#999', fontStyle: 'italic' }}>
                                Cайт команды
                                <Icon24Globe style={{ paddingLeft: 5 }} width='18' height='18' fill='#6699ff'/>
                            </Text></a>
                            <Text onClick={() => {
                                    isSubscribed ? teamUnsubscribtionHandler() : teamSubscribtionHandler()
                                }} className="ButtonBorderLightGrayHeader" style={{ fontFamily: 'robo-r', fontSize: 12, paddingRight: 5, paddingLeft: 7, color: '#999', fontStyle: 'italic' }}>
                                {isSubscribed ? 'Отписаться' : 'Подписаться'}
                                {isSubscribed
                                // ? <svg className="star" width="18" height="18" fill='#6699ff' style={{ marginBottom: -3, paddingLeft: 5 }}><use href={sprite + "#star"}></use></svg>
                                // : <svg className="star-empty" width="18" height="18" fill='#6699ff' style={{ marginBottom: -3, paddingLeft: 5 }}><use href={sprite + "#star-empty"}></use></svg>
                                ? <img src={subscribeOn} width="18" height="18" style={{ marginBottom: -3, paddingLeft: 5 }}/>
                                : <img src={subscribeOff} width="18" height="18" style={{ marginBottom: -3, paddingLeft: 5 }}/>
                            }
                                
                            </Text>
                            
                            {/* <svg className="star-empty" width="14" height="14" fill='#6699ff'><use href={sprite + "#star-empty"}></use></svg> */}
                        </Div>
                        <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <View className='TeamInfoItemLogoCircle'>
                                <img className='TeamInfoItemLogo' src={data.team.logo ? `https://st.joinsport.io/team/${data.team.team_id}/logo/${data.team.logo}` : 'https://ttlf.ru/assets/53f437de/football_logo_100x100.png'}/>
                            </View>
                            <Text style={{ paddingLeft: 10, fontFamily: 'robo-b', fontSize: 16 }}>{data.team.full_name.toUpperCase()}</Text>
                        </Div>
                        <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingTop: 10, paddingBottom: 10 }}>
                            <Text style={teamInfoTabFilter === 'matches' ? udnderlinedStyle : nonUdnderlinedStyle} onClick={() => { changeTeamInfoTabFilter('matches'); }}>Матчи</Text>
                            <Text style={teamInfoTabFilter === 'squad' ? udnderlinedStyle : nonUdnderlinedStyle} onClick={() => { changeTeamInfoTabFilter('squad'); }}>Состав</Text>
                        </Div>
                    </Div>
                    <Separator/>
                    <Div style={{ padding: 0 }}>
                        {tabContentResolver()}
                    </Div>
                </div>
            ) : (<div></div>)}
            <EmptyTabBarElementSpace />
        </Panel>
    );
};

const nonUdnderlinedStyle = {
    // padding: 5, 
    paddingLeft: 10, 
    paddingRight: 10, 
    // width: 200,
    color: '#999', 
    fontFamily: 'robo-r',
    fontSize: 16
}
const udnderlinedStyle = {
    // padding: 5, 
    paddingLeft: 10, 
    paddingRight: 10, 
    // width: 200, 
    textDecoration: 'underline', 
    textDecorationThickness: 3,
    textUnderlineOffset: 5,
    textDecorationColor: '#6699ff',
    color: '#6699ff',
    fontFamily: 'robo-r',
    fontSize: 16
}

export default TeamInfoScreen;