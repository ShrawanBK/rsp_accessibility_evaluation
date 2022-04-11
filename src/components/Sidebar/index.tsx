import React from 'react';

import { NavLink } from 'react-router-dom';
import {
    Container,
    Heading,
    VStack,
} from '@chakra-ui/react';

import './styles.css';

export interface SidebarMenu {
    path: string;
    title: string;
}

const sidebarMenus: SidebarMenu[] = [
    {
        path: '/',
        title: 'Scan Website',
    },
    {
        path: '/saved_scans',
        title: 'Saved Scans',
    },
];

function Sidebar() {
    return (
        <Container bg="whiteAlpha.100">
            <VStack>
                <Heading as="h6" size="md">
                    Accessibility Tools
                </Heading>
                {
                    sidebarMenus.map((menu) => (
                        <NavLink
                            key={menu.title}
                            to={menu.path}
                            className={({ isActive }) => (isActive ? 'nav-link-active' : 'nav-link')}
                        >
                            {menu.title}
                        </NavLink>
                    ))
                }
            </VStack>
        </Container>
    );
}

export default Sidebar;
