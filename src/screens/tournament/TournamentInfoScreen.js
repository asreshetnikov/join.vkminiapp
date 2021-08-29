import { Div, Text, Panel, PanelHeader, PanelHeaderBack, Separator, HorizontalScroll, Group } from '@vkontakte/vkui';
import React, { useState } from 'react';

import { useQuery, useLazyQuery, useApolloClient, rewriteURIForGET } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import moment from 'moment';

import { Icon24Globe } from '@vkontakte/icons';
import sprite from '../../assets/img/icons.svg'
import * as queries from '../../constants/queries';
import HeaderTitleFixedLenght from '../../components/HeaderTitleFixedLenght';
import EmptyTabBarElementSpace from '../../components/EmptyTabBarElementSpace';
import TournamentCalendar from '../../components/tournament/TournamentCalendar';
import TournamentTable from '../../components/tournament/TournamentTable';
import TournamentTeams from '../../components/tournament/TournamentTeams';
import TournamentStats from '../../components/tournament/TournamentStats';

const apolloClient = new ApolloClient({
	uri: 'https://api.joinsport.io/graphql'
});

const TournamentInfoScreen = props => {

    const [tournamentInfoTabFilter, setTournamentInfoTabFilter] = useState('matches');
    console.log('tId', props.tournamentId);
    console.log('mId', props.matchId);

    const { loading, error, data, refetch } = useQuery(queries.TOURNAMENTINFO(props.tournamentId), {
        context: {
            uri: 'https://api.joinsport.io/graphql',
            headers: {
                'Api-Key': `zznXBNAxsJCKA2Tt9yB3YLcLdR44XpBgxqhR6xyaNjDZPN6C6xh3tM7azUFKuh34`
            },
        },
        client: apolloClient
    });

    if (loading) {
        return (
            <Panel id={props.id}>
                <PanelHeader
                    // left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
                >
                    <HeaderTitleFixedLenght>ТТЛФ Рязань</HeaderTitleFixedLenght>
                </PanelHeader>
                <Div>
                    Идет загрузка данных
                </Div>
            </Panel>
        )
    }

    console.log(data);

    const changeTournamentInfoTabFilter = (filter) => {
        setTournamentInfoTabFilter(filter);
    }

    const tabContentResolver = () => {
        if (tournamentInfoTabFilter === 'matches') {
            return (<TournamentCalendar tournamentId={props.tournamentId} tournament={data.tournament} matchInfoHandler={props.go}/>);
        } else if (tournamentInfoTabFilter === 'table') {
            return (<TournamentTable tournamentId={props.tournamentId} tournament={data.tournament} teamInfoHandler={props.go}/>);
        } else if (tournamentInfoTabFilter === 'stats') {
            getElementPosition();
            return (<TournamentStats tournamentId={props.tournamentId} tournament={data.tournament} tabPadding={getElementPosition()}/>);
        } else if (tournamentInfoTabFilter === 'teams') {
            return (<TournamentTeams tournamentId={props.tournamentId} tournament={data.tournament} teamInfoHandler={props.go}/>);
        }
    }

    const horScrollElements = [];
    horScrollElements.push(<Text style={tournamentInfoTabFilter === 'matches' ? udnderlinedStyle : nonUdnderlinedStyle} onClick={() => { changeTournamentInfoTabFilter('matches'); }}>Матчи</Text>);
    horScrollElements.push(<Text style={tournamentInfoTabFilter === 'table' ? udnderlinedStyle : nonUdnderlinedStyle} onClick={() => { changeTournamentInfoTabFilter('table'); }}>Таблица</Text>);
    horScrollElements.push(<Text style={tournamentInfoTabFilter === 'stats' ? udnderlinedStyle : nonUdnderlinedStyle} onClick={() => { changeTournamentInfoTabFilter('stats'); }}>Статистикаsdfasdgfdsg</Text>);
    horScrollElements.push(<Text style={tournamentInfoTabFilter === 'teams' ? udnderlinedStyle : nonUdnderlinedStyle} onClick={() => { changeTournamentInfoTabFilter('teams'); }}>Команды</Text>);

    const getElementPosition = () => {
        let upper = document.getElementById('tInfoUpper');
        let lower = document.getElementById('tInfoLower');
        console.log('uTop', upper.offsetTop);
        console.log('uHight', upper.offsetHeight);
        console.log('lTop', lower.offsetTop);
        console.log('lHight', lower.offsetHeight);
        return lower.offsetTop + lower.offsetHeight;
    } 

    return (
        <Panel id={props.id}>
            {/* <div id="verticalMatchInfoScrollDiv" style={{ position: 'fixed', zIndex: 99 }}> */}
            <div id="verticalMatchInfoScrollDiv" style={{  }}>
                <PanelHeader style={{ backgroundColor: 'white' }}
                    left={<PanelHeaderBack onClick={props.go} data-to={props.isBackToTab ? 'tournaments' : props.matchId == undefined || props.matchId == -1 ? 'matchCenter' : 'matchInfo'} data-id={props.matchId}/>}
                >
                    <HeaderTitleFixedLenght>ТТЛФ Рязань</HeaderTitleFixedLenght>
                </PanelHeader>
            {/* <Div>
                <Text>this is tournament info screen {props.tournamentId}</Text>
            </Div> */}
            {data && data.tournament ? (
                // <div>
                <Div style={{ padding: 0 }} id='tInfoUpper'>
                    <Div style={{ backgroundColor: '#f8f8f8', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'robo-r', fontSize: 12, color: '#999' }}>{moment(data.tournament.start_dt).format('DD.MM.yyyy')} - {moment(data.tournament.end_dt).format('DD.MM.yyyy')}</Text>
                        <a style={{ textDecoration: 'none', color: '#6699ff' }} href={`https://ttlf.ru/tournament/${props.tournamentId}/tables`} >
                        <Text className="ButtonBorderLightGrayHeader" style={{ display: 'flex', fontFamily: 'robo-r', fontSize: 12, paddingRight: 5, paddingLeft: 5, color: '#999', fontStyle: 'italic' }}>
                            Cайт турнира
                            <Icon24Globe style={{ paddingLeft: 5 }} width='18' height='18' fill='#6699ff'/>
                        </Text></a>
                        {/* <svg className="star" width="14" height="14" fill='#ffc107' style={{ marginBottom: 3 }}><use href={sprite + "#star"}></use></svg> */}
                        {/* <svg className="star-empty" width="14" height="14" fill='#6699ff'><use href={sprite + "#star-empty"}></use></svg> */}
                        
                    </Div>
                    <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8f8f8' }}>
                        <img style={{ height: 70, borderRadius: 5 }} src={data && data.tournament && data.tournament.cover ? `https://st.joinsport.io/tournament/${props.tournamentId}/cover/${data.tournament.cover}` : 'https://ttlf.ru/assets/53f437de/football_cover_cover.jpg'}/>
                        <Text style={{ paddingLeft: 10, fontFamily: 'robo-b', fontSize: 16 }}>{data.tournament.full_name.toUpperCase()}</Text>
                    </Div>
                </Div>
                // </div>
            ) : (<Div><Text></Text></Div>)}
            {/* <HorizontalScroll showArrows getScrollToLeft={i => i - 120} getScrollToRight={i => i + 120} style={{ width: window.innerWidth * 0.95, paddingLeft: 10, paddingRight: 10, backgroundColor: '#f8f8f8' }}> */}
                {/* <div style={{ display: 'flex' }}> */}
                <Div id='tInfoLower' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingTop: 10, paddingBottom: 20, paddingRight: 0, paddingLeft: 0, backgroundColor: '#f8f8f8', width: window.innerWidth }}>
                    <Text style={tournamentInfoTabFilter === 'matches' ? udnderlinedStyle : nonUdnderlinedStyle} onClick={() => { changeTournamentInfoTabFilter('matches'); }}>Матчи</Text>
                    <Text style={tournamentInfoTabFilter === 'table' ? udnderlinedStyle : nonUdnderlinedStyle} onClick={() => { changeTournamentInfoTabFilter('table'); }}>Таблица</Text>
                    <Text style={tournamentInfoTabFilter === 'stats' ? udnderlinedStyle : nonUdnderlinedStyle} onClick={() => { changeTournamentInfoTabFilter('stats'); }}>Статистика</Text>
                    <Text style={tournamentInfoTabFilter === 'teams' ? udnderlinedStyle : nonUdnderlinedStyle} onClick={() => { changeTournamentInfoTabFilter('teams'); }}>Команды</Text>
                </Div>
                {/* </div> */}
            {/* </HorizontalScroll> */}
            <Separator/>
            </div>
            {tabContentResolver()}
            <EmptyTabBarElementSpace/>
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

export default TournamentInfoScreen;