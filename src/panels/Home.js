import React from 'react';
import PropTypes from 'prop-types';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Header from '@vkontakte/vkui/dist/components/Header/Header';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';

import { FixedLayout, Tabbar, TabbarItem } from '@vkontakte/vkui';

import { Icon28BasketballBallOutline, Icon28Users3Outline, Icon28SneakerOutline } from '@vkontakte/icons';

const Home = ({ id, go, fetchedUser }) => (
	// <FixedLayout style={{ flex: 1 }}>
	<Panel id={id}>
		{/* <PanelHeader>Example</PanelHeader> */}
		{/* {fetchedUser &&
		<Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>
			<Cell
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
			>
				{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
			</Cell>
		</Group>} */}

		<Group header={<Header mode="secondary">Navigation Example</Header>}>
			<Div>
				<Button stretched size="l" mode="secondary" onClick={go} data-to="persik">
					Show me the Persik, please
				</Button>
			</Div>
			<Div>
				<Button stretched size="l" mode="secondary" onClick={go} data-to="matchcenter">
					matchcentre
				</Button>
			</Div>
		</Group>
		<Tabbar>
					<TabbarItem><Icon28SneakerOutline/></TabbarItem>
					<TabbarItem><Icon28Users3Outline/></TabbarItem>
					<TabbarItem><Icon28BasketballBallOutline/></TabbarItem>
				</Tabbar>
	</Panel>
	// </FixedLayout>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
