import React, { useState, useEffect } from 'react';
import { Panel, PanelHeader, PanelHeaderBack, ScreenSpinner, View, Div, Epic, TabbarItem, Tabbar, Button } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';

import { gql } from 'apollo-boost';

import moment from 'moment';
import * as queries from '../constants/queries';
import { useQuery, useLazyQuery, useApolloClient, useMutation } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import HeaderTitleFixedLenght from '../components/HeaderTitleFixedLenght';
import SeasonTeamList from '../components/SeasonTeamList';
import EmptyTabBarElementSpace from '../components/EmptyTabBarElementSpace';
import SeasonTournamentsList from '../components/SeasonsTournamentsList';

const apolloClient = new ApolloClient({
	uri: 'https://api.joinsport.io/graphql'
});

const TournamentsScreen = props => {

    const [isAdmin, setIsAdmin] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isIntegrationProgress, setIsIntegrationProgress] = useState(true);
    const [integrationResult, setIntegrationResult] = useState('В процессе...');
    const [isClosed, setIsClosed] = useState(false);
    const [email, setEmail] = useState('');
    const [sign, setSign] = useState('');

    const VKAUTH = gql`
    mutation vkAuth($user_id: Int!, $email: String!, $sign: String!) {
        vkAuth(user_id: $user_id, email: $email, sign: $sign) {
            token
            user{
                id
                email
                role
            }
        }
    }
    `;
    const VKTOKENSAVE = gql`
    mutation vkSaveGroupToken($token: String!) {
        vkSaveGroupToken(token: $token)
    }
    `;
    const [useVkAuth, {data: dataAuth}] = useMutation(VKAUTH, {
        context: {
            uri: 'https://api.joinsport.io/graphql',
            headers: {
                'Api-Key': `zznXBNAxsJCKA2Tt9yB3YLcLdR44XpBgxqhR6xyaNjDZPN6C6xh3tM7azUFKuh34`
            },
        },
        client: apolloClient
    });

    const [useVkTokenSave, {data: dataSave}] = useMutation(VKTOKENSAVE
        , {
    //     context: {
    //         uri: 'https://api.joinsport.io/graphql',
    //         headers: {
    //             'Api-Key': `zznXBNAxsJCKA2Tt9yB3YLcLdR44XpBgxqhR6xyaNjDZPN6C6xh3tM7azUFKuh34`
    //         },
    //     },
        client: apolloClient
    }
    );

    const tokenGenerationHandler = () => {
        bridge.send("VKWebAppGetEmail", {}).then(result => {
            const params = window.location.search.slice(1);
            const values = params.split('&');
            let userId = null;
            for (let key in values) {
                if (values[key].includes('vk_user_id')) {
                    userId = values[key].replace('vk_user_id=', '');
                }
            }
            console.log('values', values);
            console.log('userId', userId)
            console.log('email', result.email)
            console.log('sign', result.sign)
            // setEmail(result.email);
            // setSign(result.sign);
            useVkAuth({variables: {
                user_id: parseInt(userId),
                email: result.email,
                sign: result.sign
            }}).then(result => {
                console.log('res print token', result.data.vkAuth.token);
                if (result.data.vkAuth.token) {
                    const accToken = result.data.vkAuth.token;
                    bridge.send("VKWebAppStorageSet", {"key": "apitoken", "value": result.data.vkAuth.token}).then(approve => {
                        bridge.send("VKWebAppStorageGetKeys", {"count": 20, "offset": 0}).then(result => {
                            console.log('keyvalues', result);
                        });
                    });
                    bridge.send("VKWebAppGetCommunityToken", {"app_id": 7880037, "group_id": 10056971, "scope": "app_widget,messages"}).then(result => {
                        // atoken = result.access_token;
                        console.log(result.access_token)
                        if (result.access_token) {
                            useVkTokenSave({variables: {
                                token: result.access_token
                            },
                            context: {
                                uri: 'https://api.joinsport.io/graphql',
                                headers: {
                                    'Api-Key': `zznXBNAxsJCKA2Tt9yB3YLcLdR44XpBgxqhR6xyaNjDZPN6C6xh3tM7azUFKuh34`,
                                    'Authorization': `Bearer ${accToken}`
                                },
                            }}).then(result => {
                                console.log('save token', result);
                                result.data.vkSaveGroupToken ? setIsSuccess(true) : setIsSuccess(false);
                                result.data.vkSaveGroupToken ? setIntegrationResult('Интеграция прошла успешно') : setIntegrationResult('Ошибка интеграции');
                            }).catch(error => {
                                console.log('save token', error);
                                setIntegrationResult('Сервер вернул ошибку 0x04');
                            })
                        }
                        setIsIntegrationProgress(false);
                        // console.log(atoken)
                    }).catch(e => {
                        console.log(e);
                        setIsSuccess(false);
                        setIsIntegrationProgress(false);
                        setIntegrationResult('Сервер вернул ошибку 0x03');
                    });
                }
            }).catch(e => {
                console.log(e);
                setIsSuccess(false);
                setIsIntegrationProgress(false);
                setIntegrationResult('Сервер вернул ошибку 0x02');
            });
            console.log(dataAuth);
        }).catch(e => {
            console.log(e);
            setIsSuccess(false);
            setIsIntegrationProgress(false);
            setIntegrationResult('Сервер вернул ошибку 0x01');
        });
    }

    const params = window.location.search.slice(1);
    const values = params.split('&');
    console.log('this.props3', window.location.search.slice(1));
    console.log('contains', params.includes('vk_viewer_group_role=admin'));
    console.log('values', values);

    useEffect(() => {
        if (params.includes('vk_viewer_group_role=admin')) {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [])

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
    console.log('curSeason', currentSeason);

    return (
    <Panel id={props.id}>
		<PanelHeader
			// left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
		>
			<HeaderTitleFixedLenght>ТТЛФ Рязань</HeaderTitleFixedLenght>
		</PanelHeader>
        {isAdmin ? (
            <Div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Button onClick={tokenGenerationHandler}>Интеграция с Join Sport</Button>
                {/* {!isIntegrationProgress ? (isSuccess ? 'Интеграция прошла успешно' : 'Ошибка интеграции') : ''} */}
                {!isIntegrationProgress ? integrationResult : ''}
            </Div>) : ''
        }
        <Div>
            <SeasonTournamentsList season={currentSeason} go={props.go} />
        </Div>
        <EmptyTabBarElementSpace/>
	</Panel>
)};

TournamentsScreen.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default TournamentsScreen;