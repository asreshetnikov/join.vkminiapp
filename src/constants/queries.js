import { gql } from 'apollo-boost';

export const CALENDARPERIOD = (from, to, seasonId) => {
    return gql`
    {
        calendar(first: 500, filters: {start_date_range: {from: "${from}", to: "${to}"}, season_id: ${seasonId}}){
            data{
                tournament_id
                tournament{
                    short_name
                }
                stadium{
                    name
                }
                referee{
                    last_name
                    first_name
                }
                match_id
                gf
                ga
                technical
                gfp
                gap
                team1{
                    team_id
                    logo
                    full_name
                }
                team2{
                    team_id
                    logo
                    full_name
                }
                start_dt
            }
        }
    }
`};

export const TOURNAMENTCALENDAR = (tournamentId) => {
    return gql`
    {
        calendar(first: 500, filters: {tournament_id: ${tournamentId}}){
            data{
                round_id
                tournament_id
                tournament{
                    short_name
                }
                stadium{
                    name
                }
                referee{
                    last_name
                    first_name
                }
                match_id
                gf
                ga
                technical
                gfp
                gap
                team1{
                    team_id
                    logo
                    full_name
                }
                team2{
                    team_id
                    logo
                    full_name
                }
                start_dt
            }
        }
    }
`};

export const MATCHINFO = (matchId) => {
    return gql`
    {
        match(match_id: "${matchId}"){
            match_id
            team1{
                team_id
                full_name
                logo
            }
            team2{
                team_id
                full_name
                logo
            }
            start_dt
            gf
            ga
            gfp
            gap
            technical
            tournament_id
            tournament{
                tournament_id
                short_name
            }
            stadium{
                name
            }
            referee{
                last_name
                first_name
            }
            goals{
                team_id
                player_id
                assistant_id
                minute
                second
                situation
                player{
                    last_name
                }
                assistant{
                    last_name
                }
            }
            yellowCards{
                team_id
                player_id
                minute
                second
                reason
                player{
                    last_name
                }
            }
            redCards{
                team_id
                player_id
                minute
                second
                second_yellow
                reason
                player{
                    last_name
                }
            }
            substitutions{
                team_id
                minute
                second
                player_in
                player_in_number
                player_out
                player_out_number
                playerIn{
                    player_id
                    last_name
                    first_name
                }
                playerOut{
                    player_id
                    last_name
                    first_name
                }
            }
            players{
                team_id
                player_id
                number
                status
                goalkeeper
                captain
                player{
                    last_name
                    first_name
                    position_id
                }
            }
            stats1{
                team_id
                goals_first_half
                shoots_first_half
                shoots_overall
                shoots_target_first_half
                shoots_target_overall
                corners_first_half
                corners_overall
                postbar_first_half
                postbar_overall
                fouls_first_half
                fouls_overall
                offsides_overall
                referee_mark
                discipline_mark
                attendance
            }
            stats2{
                team_id
                goals_first_half
                shoots_first_half
                shoots_overall
                shoots_target_first_half
                shoots_target_overall
                corners_first_half
                corners_overall
                postbar_first_half
                postbar_overall
                fouls_first_half
                fouls_overall
                offsides_overall
                referee_mark
                discipline_mark
                attendance
            }
        }
    }
`};

export const TOURNAMENTINFO = (tournamentId) => {
    return gql`
    {
        tournament(tournament_id: "${tournamentId}"){
            start_dt
            end_dt
            tournament_id
            season_id
            cover
            full_name
            short_name
            rounds{
                round_id
                name
                order
            }
            applications{
                team{
                  team_id
                  full_name
                  logo
                }
            }
        }
    }
`};

export const ROUNDINFO = (roundId) => {
    return gql`
    {
        round(round_id: "${roundId}"){
            has_table
            type_id
            name
            tableRows {
                place
                team{
                    team_id
                    full_name
                    logo
                }
                games
                wins
                draws
                losses
                points
            place
            points
            }
            calendar{
                match_id
                team1{
                    full_name
                    logo
                }
                team2{
                    full_name
                    logo
                }
                gf
                ga
                start_dt
            }
        }
    }
`};

export const TOURNAMENTSTATS = (tourneyId, sorters) => {
    console.log('sorters', sorters);
    return gql`
    {
        stats(filters: {tournament_id: ${tourneyId}},
        sorters: ${sorters}){
            data{
                goals
                assists
                points
                games
                gk_games
                missed_goals
                player{
                    player_id
                    first_name
                    last_name
                    photo
                }
                team{
                    full_name
                }
                yellow_cards
                red_cards
                discipline
            }
        }
    }
`};

export const TOURNAMENTTEAMSTATS = (tourneyId) => {
    return gql`
    {
        teamsStats(
            filters: {tournament_id: ${tourneyId}}, 
            groupers: [TEAM], 
            aggregates: [GAMES, GF, GA],
            sorters: [{column: GF, order: DESC}, {column: GA, order: ASC}]
        ) {
            data {
                tournament_id
                team {
                    team_id
                    full_name
                    logo
                }
                games
                gf
                ga
            }
        }
    }
`};

export const TEAMINFO = (teamId) => {
    return gql`
    {
        team(team_id: "${teamId}"){
            team_id
            full_name
            logo
            players{
                player_id
                first_name
                middle_name
                last_name
                birthday
                photo
                position_id
                application{
                    status
                }
            }
        }
    }
`};

export const SUBINFO = (teamId, session) => {
    return gql`
    {
        vkCheckTeamSubscription(session: "${session}", team_id: ${teamId})
    }
`};

export const SEASONS = () => {
    return gql`
    {
        seasons{
            season_id
            start_dt
            end_dt
            title
        }
    }
`};

export const CALENDARPERIODFORTEAM = (from, to, teamId, seasonId) => {
    return gql`
    {
        calendar(first: 500, filters: {start_date_range: {from: "${from}", to: "${to}"}, team_id: ${teamId}, season_id: ${seasonId}}){
            data{
                tournament_id
                tournament{
                    short_name
                }
                stadium{
                    name
                }
                referee{
                    last_name
                    first_name
                }
                match_id
                gf
                ga
                technical
                gfp
                gap
                team1{
                    team_id
                    logo
                    full_name
                }
                team2{
                    team_id
                    logo
                    full_name
                }
                start_dt
            }
        }
    }
`};

export const TEAMSFORSEASON = (seasonId) => {
    return gql`
    {
        teams(first: 500, filters: {season_id: ${seasonId}, orderBy: {column: "full_name", order: ASC}}){
            data{
                team_id
                full_name
                logo
            }
        }
    }
`};

export const TOURNAMENTSFORSEASON = (seasonId) => {
    return gql`
    {
        tournaments(first: 500, filters: {season_id: ${seasonId}}, sorters:{column: ORDER, order:ASC}){
            data{
                tournament_id
                cover
                full_name
                order
                start_dt
                end_dt
                is_published
            }
        }
    }
`};