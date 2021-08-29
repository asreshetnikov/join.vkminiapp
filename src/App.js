import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import './css/style.css';
import sprite from './assets/img/icons.svg';

import Home from './panels/Home';
import Persik from './panels/Persik';

import matchcenterOn from './assets/img/buttons/matchcenterOn.svg';
import matchcenterOff from './assets/img/buttons/matchcenterOff.svg';
import teamsOn from './assets/img/buttons/teamsOn.svg';
import teamsOff from './assets/img/buttons/teamsOff.svg';
import tournamentsOn from './assets/img/buttons/tournamentsOn.svg';
import tournamentsOff from './assets/img/buttons/tournamentsOff.svg';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import MatchCenterScreen from './screens/MatchCenterScreen';
import TeamsScreen from './screens/TeamsScreen';
import TournamentsScreen from './screens/TournamentsScreen';

import MatchInfoScreen from './screens/match/MatchInfoScreen';
import TournamentInfoScreen from './screens/tournament/TournamentInfoScreen';
import { Div, Epic, FixedLayout, Panel, PanelHeader, Tabbar, TabbarItem, Tabs, TabsItem } from '@vkontakte/vkui';

import { Icon28BasketballBallOutline, Icon28Users3Outline, Icon28SneakerOutline } from '@vkontakte/icons';
import { Icon24CupOutline } from '@vkontakte/icons';
import { Icon24UsersOutline } from '@vkontakte/icons';
import { Icon24BallOutline } from '@vkontakte/icons';

import moment from 'moment';
import 'moment/locale/ru';
import TeamInfoScreen from './screens/team/TeamInfoScreen';

const apolloClient = new ApolloClient({
	uri: 'https://api.joinsport.io/graphql'
});

const fetchFonts = () => {
	return Font.loadAsync({
	  'robo-r': require('./assets/fonts/Roboto-Regular.ttf'),
	  'robo-m': require('./assets/fonts/Roboto-Medium.ttf'),
	  'robo-b': require('./assets/fonts/Roboto-Bold.ttf')
	})
};

const App = () => {

	moment.updateLocale('ru', {
		months : [
			"января", "февраля", "марта", "апреля", "мая", "июня", "июля",
			"августа", "сентября", "октября", "ноября", "декабря"
		],
		monthsShort : [
			"янв", "фев", "мар", "апр", "мая", "июн", "июл",
			"авг", "сен", "окт", "нояб", "дек"
		],
		weekdaysMin : ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"],
		week: {
			dow: 1, // First day of week is Monday
			//doy: 4  // First week of year must contain 4 January (7 + 1 - 4)
		  }
	});
	moment.locale('ru');
	
	const [activePanel, setActivePanel] = useState(window.location.hash && window.location.hash.includes('matchId') ? 'matchInfo' : 'matchCenter');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [matchId, setMatchId] = useState(window.location.hash && window.location.hash.includes('matchId') ? window.location.hash.replace('#matchId:', '') : null);
	const [teamId, setTeamId] = useState();
	const [tournamentId, setTournamentId] = useState();
	const [backToTournament, setBackToTournament] = useState();
	const [backToTeam, setBackToTeam] = useState();
	const [backToTab, setBackToTab] = useState();

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		// async function fetchData() {
		// 	const user = await bridge.send('VKWebAppGetUserInfo');
		// 	setUser(user);
		// 	setPopout(null);
		// }
		// fetchData();
	}, []);

	const go = e => {
		console.log(e.currentTarget.dataset)
		setActivePanel(e.currentTarget.dataset.to);
		setMatchId(e.currentTarget.dataset.id);
		setTournamentId(e.currentTarget.dataset.tournamentid);
		setTeamId(e.currentTarget.dataset.teamid);
		setBackToTournament(e.currentTarget.dataset.backtournament);
		setBackToTeam(e.currentTarget.dataset.backteam);
		setBackToTab(e.currentTarget.dataset.backtab);

	};

	const idHandler = () => {
		return matchId;
	}

	const tournamentIdHandler = () => {
		return tournamentId;
	}

	const teamIdHandler = () => {
		return teamId;
	} 

	const backTargetHandler = () => {
		return backToTournament;
	}

	const backTeamHandler = () => {
		return backToTeam;
	}

	const backTabHandler = () => {
		return backToTab;
	}

	// if(e) {
	// 	console.log(e.currentTarget.dataset)
	// }

	const eventSpriteHandler = (item) => {
        if (item === 'matchCenter') {
			if (activePanel === 'matchCenter') {
				return (
					<img src={matchcenterOn} width="24" height="24"/>
				);
			} else {
				return (
					<img src={matchcenterOff} width="24" height="24"/>
				);
			}
        } else if (item === 'teams') {
            if (activePanel === 'teams' || activePanel === 'teamInfo') {
				return (
					<img src={teamsOn} width="24" height="24"/>
				);
			} else {
				return (
					<img src={teamsOff} width="24" height="24"/>
				);
			}
        } else if (item === 'tournaments') {
            if (activePanel === 'tournaments' || activePanel === 'matchInfo') {
				return (
					<img src={tournamentsOn} width="24" height="24"/>
				);
			} else {
				return (
					<img src={tournamentsOff} width="24" height="24"/>
				);
			}
        }
    }

	return (
		// <ApolloProvider client={apolloClient}>
		<View>
			<View activePanel={activePanel}>
				{/* <Home id='home' go={go} />
				<Persik id='persik' go={go} /> */}
				<MatchCenterScreen id='matchCenter' go={go} />
				<TeamsScreen id='teams' go={go} />
				<TournamentsScreen id='tournaments' go={go} />

				{/* Match information section */}
				<MatchInfoScreen id='matchInfo' go={go} matchId={idHandler()} isBackToTourney={backTargetHandler()} isBackToTeam={backTeamHandler()} teamId={teamIdHandler()} />
				<TournamentInfoScreen id='tournamentInfo' go={go} tournamentId={tournamentIdHandler()} matchId={idHandler()} isBackToTab={backTabHandler()} />
				<TeamInfoScreen id='teamInfo' go={go} teamId={teamIdHandler()}  tournamentId={tournamentIdHandler()} matchId={idHandler()}/>
			</View>
			<Tabbar shadow={1 == 1}>
				<TabbarItem text="Матч-центр" onClick={() => setActivePanel('matchCenter')}>
					{/* <Icon24BallOutline fill={activePanel === 'matchCenter' ? '#6699ff' : ''}/> */}
					<Div style={{ padding: 0, background: 'white', height: 25 }}>
						{eventSpriteHandler('matchCenter')}
					</Div>
				</TabbarItem>
				<TabbarItem text="Команды" onClick={() => setActivePanel('teams')}>
					{/* <Icon24UsersOutline fill={activePanel === 'teams' ? '#6699ff' : ''}/> */}
					<Div style={{ padding: 0, background: 'white', height: 25 }}>
						{eventSpriteHandler('teams')}
					</Div>
				</TabbarItem>
				<TabbarItem text="Турниры" onClick={() => setActivePanel('tournaments')}>
					{/* <Icon24CupOutline fill={activePanel === 'tournaments' ? '#6699ff' : ''}/> */}
					<Div style={{ padding: 0, background: 'white', height: 25 }}>
						{eventSpriteHandler('tournaments')}
					</Div>
				</TabbarItem>
			</Tabbar>
			
		</View>
		// </ApolloProvider>
	);
}

export default App;

