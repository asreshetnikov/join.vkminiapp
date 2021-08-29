import { Text, Div } from '@vkontakte/vkui';
import React from 'react';
import SingleRoundTable from './SingleRoundTable';

const TournamentTable = props => {

    console.log(props.tournament);
    console.log(props.tournamentId);

    return (
        <Div style={{ 
            // paddingTop: 280 
            }}>
            {props.tournament ? (
                // <Text>rounds and tables</Text>
                props.tournament.rounds.map((item, key) => {
                    console.log(item);
                    return (<SingleRoundTable key={key} roundId={item.round_id} tournamentId={props.tournamentId} teamInfoHandler={props.teamInfoHandler} />);
                })
            ) : ('')}
        </Div>
    );
};

export default TournamentTable;