import { Div, Text, View } from '@vkontakte/vkui';
import React from 'react';
import TeamsListItem from './TeamsListItem';

const TournamentTeams = props => {

    // const leftArray = props.tournament.applications.subArray(0, (props.tournament.applications.length % 2 === 0 ? props.tournament.applications.length / 2 : props.tournament.applications.length / 2 - 0.5));
    // const rightArray = props.tournament.applications.subArray((props.tournament.applications.length % 2 === 0 ? props.tournament.applications.length / 2 + 1 : props.tournament.applications.length / 2 + 0.5));

    const twoColumnArray = [];
    if (props.tournament && props.tournament.applications) {
        for (let i = 0; i < props.tournament.applications.length; i++) {
            twoColumnArray.push(
                <Div style={{ display: 'flex', flexDirection: 'row' }}>
                    <View onClick={props.teamInfoHandler} data-to="teamInfo" data-teamid={props.tournament.applications[i].team.team_id} data-tournamentid={props.tournament.tournament_id}>
                        <TeamsListItem team={props.tournament.applications[i].team} />
                    </View>
                    {i + 1 < props.tournament.applications.length ? 
                    (<View onClick={props.teamInfoHandler} data-to="teamInfo" data-teamid={props.tournament.applications[i + 1].team.team_id} data-tournamentid={props.tournament.tournament_id}>
                        <TeamsListItem team={props.tournament.applications[i + 1].team} />
                    </View>) : 
                    (<Text></Text>)}
                </Div>
            )
            i += 1;
        }
    }

    return (
        <Div style={{ 
            // paddingTop: 280, 
            paddingLeft: 0, paddingRight: 0 
            }}>
            {twoColumnArray}
            {/* {props.tournament.applications.map((item, key) => {
                return (<TeamsListItem key={key} team={item.team} />);
            })} */}
        </Div>
    );
};

export default TournamentTeams;