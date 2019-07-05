import React, { useState } from 'react';

import { Sider, Menu, MenuItem, Icon } from '../../components/lib';
import { Logo } from '../../components/ui';

const items = [
	{ id: '1', name: 'Create: New category and prices' },
	{ id: '2', name: 'Update: Category' },
	{ id: '3', name: 'Remove: User' },
	{ id: '4', name: 'Notify: New Price' },
	{ id: '5', name: 'Update: Prices' },
];

const Sidebar = () => {

	const [collapsed, setCollapsed] = useState(false);

	const menuItems = items.map(item => (
		<MenuItem key={item.id}>
			<Icon type="file" />
			<span>{item.name}</span>
		</MenuItem>
	));

	return (
		<Sider
			collapsible
			width={300}
			collapsed={collapsed}
			onCollapse={() => setCollapsed(!collapsed)}
		>
			<Logo collapsed={collapsed} />
			<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
				<MenuItem key="0">
					<Icon type="plus" />
					<span>Create new event</span>
				</MenuItem>
				{menuItems}
			</Menu>
		</Sider>
	);
};

export default Sidebar;
