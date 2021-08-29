import React from 'react';
import { Panel, PanelHeader, PanelHeaderBack, ScreenSpinner, View, Div, Epic, TabbarItem, Tabbar } from '@vkontakte/vkui';
import PropTypes from 'prop-types';

import { gql } from 'apollo-boost';

import moment from 'moment';
import * as queries from '../constants/queries';
import { useQuery, useLazyQuery, useApolloClient } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import HeaderTitleFixedLenght from '../components/HeaderTitleFixedLenght';
import SeasonTeamList from '../components/SeasonTeamList';
import EmptyTabBarElementSpace from '../components/EmptyTabBarElementSpace';

const apolloClient = new ApolloClient({
	uri: 'https://api.joinsport.io/graphql'
});

const TeamsScreen = props => {

    let currentSeason = '';
    const actualDate = moment(new Date());

    const { loading, error, data } = useQuery(queries.SEASONS(), {
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
                    <ScreenSpinner />
                </Div>
            </Panel>
        )
    }

    if (data) {
        currentSeason = data.seasons.filter(s => actualDate.isAfter(moment(s.start_dt)) && actualDate.isBefore(moment(s.end_dt)))
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

    // console.log(dataM);
    var obj = document.body;
    console.log(props.showMatchId);

    return (
    <Panel id={props.id}>
		<PanelHeader
			// left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
		>
			<HeaderTitleFixedLenght>ТТЛФ Рязань</HeaderTitleFixedLenght>
		</PanelHeader>
        <Div>
            <SeasonTeamList season={currentSeason} go={props.go} />
        </Div>
        <EmptyTabBarElementSpace/>
	</Panel>
)};

TeamsScreen.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default TeamsScreen;