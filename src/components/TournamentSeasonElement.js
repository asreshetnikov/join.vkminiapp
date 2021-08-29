import { Div, Separator, Text } from '@vkontakte/vkui';
import React from 'react';

import moment from 'moment';
import TournamentsTeamCounter from './tournament/TournamentsTeamCounter';

const TournamentSeasonElement = props => {
    return (
        <Div>
            <Div style={{ display: 'flex', flexDirection: 'row', padding: 0, alignItems: 'center' }}>
            <img style={{ height: 50, borderRadius: 5 }} src={props.tournament && props.tournament.cover ? `https://st.joinsport.io/tournament/${props.tournament.tournament_id}/cover/${props.tournament.cover}` : 'https://ttlf.ru/assets/53f437de/football_cover_cover.jpg'}/>
                <Div>
                    <Text style={{ fontFamily: 'robo-r', fontSize: 14, color: '#999' }}>{moment(props.tournament.start_dt).format('DD.MM.yyyy')} - {moment(props.tournament.end_dt).format('DD.MM.yyyy')}</Text>
                    <TournamentsTeamCounter tId={props.tournament.tournament_id}/>
                </Div>
            </Div>
            <Text style={{ fontFamily: 'robo-b', fontSize: 14, paddingBottom: 20 }}>{props.tournament.full_name}</Text>
            <Separator />
        </Div>
    );
};

export default TournamentSeasonElement;