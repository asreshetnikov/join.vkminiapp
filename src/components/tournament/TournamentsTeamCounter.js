import { Text, Div } from '@vkontakte/vkui';
import React from 'react';

import * as queries from '../../constants/queries';
import { useQuery, useLazyQuery, useApolloClient } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';

const apolloClient = new ApolloClient({
	uri: 'https://api.joinsport.io/graphql'
});

const TournamentsTeamCounter = props => {

    const gqlQ = gql`
    {
        tournament(tournament_id: ${props.tId}){
            tournament_id
            applications{
                name
                status
            }
        }
    }
    `;

    const { loading, error, data } = useQuery(gqlQ, {
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
                </Div>
            // </Panel>
        )
    }

    console.log('data', data)

    return (
        <Text style={{ fontFamily: 'robo-r', fontSize: 14, color: '#999' }}>Команд: {data.tournament.applications.filter(a => a.status === 'approved').length}</Text>
    );
};

export default TournamentsTeamCounter;