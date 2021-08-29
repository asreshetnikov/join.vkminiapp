import { Text, Div, ScreenSpinner, View } from '@vkontakte/vkui';
import React from 'react';
import TableSingleRow from './TableSingleRow';

import * as queries from '../../constants/queries';
import { useQuery, useLazyQuery, useApolloClient, rewriteURIForGET } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

const apolloClient = new ApolloClient({
	uri: 'https://api.joinsport.io/graphql'
});

const SingleRoundTable = props => {

    const { loading, error, data, refetch } = useQuery(queries.ROUNDINFO(props.roundId), {
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
            <Div>
                <ScreenSpinner />
            </Div>
        )
    }

    console.log(props.roundId);
    return (
        <Div style={{ padding: 0, paddingBottom: 30 }}>
            {/* <Text>{data.round.name}</Text> */}
            {data.round.type_id && data.round.type_id.includes('ROBIN') ? (
                <Div style={{ padding: 0 }}>
                    <Div style={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
                        {/* <Div style={{ width: '7%', textAlign: 'center' }}>
                            <Text style={tableHeader}>М</Text>
                        </Div> */}
                        <Div style={{ width: '65%', paddingLeft: 0, paddingRight: 0 }}>
                            <Text style={{...tableHeader, fontSize: 14 }}>{data.round.name}</Text>
                        </Div>
                        <Div style={{ width: '7%', textAlign: 'center', paddingLeft: 0, paddingRight: 0 }}>
                            <Text style={tableHeader}>И</Text>
                        </Div>
                        <Div style={{ width: '7%', textAlign: 'center', paddingLeft: 0, paddingRight: 0 }}>
                            <Text style={tableHeader}>В</Text>
                        </Div>
                        <Div style={{ width: '7%', textAlign: 'center', paddingLeft: 0, paddingRight: 0 }}>
                            <Text style={tableHeader}>Н</Text>
                        </Div>
                        <Div style={{ width: '7%', textAlign: 'center', paddingLeft: 0, paddingRight: 0 }}>
                            <Text style={tableHeader}>П</Text>
                        </Div>
                        <Div style={{ width: '7%', textAlign: 'center', paddingLeft: 0, paddingRight: 0 }}>
                            <Text style={tableHeader}>О</Text>
                        </Div>
                    </Div>
                    {data.round.tableRows.sort((a, b) => a.place - b.place).map((item, key) => {
                        return (
                            <View key={key} onClick={props.teamInfoHandler} data-to="teamInfo" data-teamid={item.team.team_id} data-tournamentid={props.tournamentId}>
                                <TableSingleRow place={item.place} team={item.team} games={item.games} 
                                    wins={item.wins} draws={item.draws} losses={item.losses} points={item.points} />
                            </View>);
                    })}
                </Div>
            ) : (<Text></Text>)}
        </Div>
    );
};

const tableHeader = {
    fontFamily: 'robo-r',
    fontSize: 10,
    color: '#999'
}

export default SingleRoundTable;