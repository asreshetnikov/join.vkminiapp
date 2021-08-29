import { Div, View, Text } from '@vkontakte/vkui';
import React from 'react';
import MatchStatSingleElement from './MatchStatSingleElement';

const MatchStatsView = props => {
    console.log('hola')

    let isStatValid = false;

    if ((props.stat1.goals_first_half == 0 || props.stat1.goals_first_half) &&
        (props.stat1.shoots_first_half == 0 || props.stat1.shoots_first_half) &&
        (props.stat1.shoots_overall == 0 || props.stat1.shoots_overall) &&
        (props.stat1.shoots_target_first_half == 0 || props.stat1.shoots_target_first_half) &&
        (props.stat1.shoots_target_overall == 0 || props.stat1.shoots_target_overall) &&
        (props.stat1.corners_first_half == 0 || props.stat1.corners_first_half) &&
        (props.stat1.corners_overall == 0 || props.stat1.corners_overall) &&
        (props.stat1.postbar_first_half == 0 || props.stat1.postbar_first_half) &&
        (props.stat1.postbar_overall == 0 || props.stat1.postbar_overall) &&
        (props.stat1.fouls_first_half == 0 || props.stat1.fouls_first_half) &&
        (props.stat1.fouls_overall == 0 || props.stat1.fouls_overall) &&
        (props.stat1.offsides_overall == 0 || props.stat1.offsides_overall) &&
        (props.stat1.referee_mark == 0 || props.stat1.referee_mark) &&
        (props.stat1.discipline_mark == 0 || props.stat1.discipline_mark) &&
        (props.stat1.attendance == 0 || props.stat1.attendance)) {
            isStatValid = true;
        }

    return (
        <View>
            {isStatValid ? <Text></Text> : <Text style={ emptyMatchListMessage }>статистики нет</Text>}
            {/* <MatchStatSingleElement team1={props.stat1.shoots_overall} team2={props.stat2.shoots_overall}>Ударов всего</MatchStatSingleElement> */}
            <MatchStatSingleElement team1={props.stat1.goals_first_half} team2={props.stat2.goals_first_half}>Голы в первом тайме</MatchStatSingleElement>
            <MatchStatSingleElement team1={props.stat1.shoots_first_half} team2={props.stat2.shoots_first_half}>Удары по воротам в первом тайме</MatchStatSingleElement>
            <MatchStatSingleElement team1={props.stat1.shoots_overall} team2={props.stat2.shoots_overall}>Удары по воротам в всего</MatchStatSingleElement>
            <MatchStatSingleElement team1={props.stat1.shoots_target_first_half} team2={props.stat2.shoots_target_first_half}>Удары в створ ворот в первом тайме</MatchStatSingleElement>
            <MatchStatSingleElement team1={props.stat1.shoots_target_overall} team2={props.stat2.shoots_target_overall}>Удары в створ ворот всего</MatchStatSingleElement>
            <MatchStatSingleElement team1={props.stat1.corners_first_half} team2={props.stat2.corners_first_half}>Угловые удары в первом тайме</MatchStatSingleElement>
            <MatchStatSingleElement team1={props.stat1.corners_overall} team2={props.stat2.corners_overall}>Угловые удары всего</MatchStatSingleElement>
            <MatchStatSingleElement team1={props.stat1.postbar_first_half} team2={props.stat2.postbar_first_half}>Штанга/перекладина в первом тайме</MatchStatSingleElement>
            <MatchStatSingleElement team1={props.stat1.postbar_overall} team2={props.stat2.postbar_overall}>Штанга/перекладина всего</MatchStatSingleElement>
            <MatchStatSingleElement team1={props.stat1.fouls_first_half} team2={props.stat2.fouls_first_half}>Фолы в первом тайме</MatchStatSingleElement>
            <MatchStatSingleElement team1={props.stat1.fouls_overall} team2={props.stat2.fouls_overall}>Фолы всего</MatchStatSingleElement>
            <MatchStatSingleElement team1={props.stat1.offsides_overall} team2={props.stat2.offsides_overall}>Оффсайды всего</MatchStatSingleElement>
            <MatchStatSingleElement team1={props.stat1.referee_mark} team2={props.stat2.referee_mark}>Оценка работы судейской бригады</MatchStatSingleElement>
            <MatchStatSingleElement team1={props.stat1.discipline_mark} team2={props.stat2.discipline_mark}>Оценка судьей дисциплины обеих команд</MatchStatSingleElement>
            <MatchStatSingleElement team1={props.stat1.attendance} team2={props.stat2.attendance}>Количество болельщиков</MatchStatSingleElement>
        </View>
    );
};

const emptyMatchListMessage = {
    padding: 20, 
    paddingLeft: 10, 
    paddingRight: 10, 
    // width: 200,
    color: '#999', 
    fontFamily: 'robo-r',
    textAlign: 'center'
}

export default MatchStatsView;