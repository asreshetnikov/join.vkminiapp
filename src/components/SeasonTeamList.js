import { Div, Text, View, ScreenSpinner } from '@vkontakte/vkui';
import React from 'react';

import * as queries from '../constants/queries';
import { useQuery, useLazyQuery, useApolloClient } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import HeaderTitleFixedLenght from '../components/HeaderTitleFixedLenght';
import TeamsListItem from './tournament/TeamsListItem';

const apolloClient = new ApolloClient({
	uri: 'https://api.joinsport.io/graphql'
});

const SeasonTeamList = props => {

    const { loading, error, data } = useQuery(queries.TEAMSFORSEASON(props.season.season_id), {
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
            // <Panel id={props.id}>
            //     <PanelHeader
            //         // left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
            //     >
            //         <HeaderTitleFixedLenght>НФЛ Перми</HeaderTitleFixedLenght>
            //     </PanelHeader>
                <Div>
                    {/* <ScreenSpinner /> */}
                </Div>
            // </Panel>
        )
    }

    return (
        <Div style={{ padding: 0 }}>
            <Text weight='semibold' style={{ padding: 10, fontFamily: 'robo-r', color: '#999', textAlign: 'center' }}>{props.season.title}</Text>
            {data.teams.data.map((item, key) => {
                return (
                    <View onClick={props.go} data-to="teamInfo" data-teamid={item.team_id} key={key}>
                        <TeamsListItem team={item} />
                    </View>
                );
            })}
        </Div>
    );
};

export default SeasonTeamList;