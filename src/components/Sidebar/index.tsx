import React, { ReactElement } from 'react';

import { NavLink } from 'react-router-dom';
import {
    Flex,
    Heading,
    Image,
    Text,
    VStack,
} from '@chakra-ui/react';

import ScanIcon from '../icons/Scan';
import BookmarkIcon from '../icons/Bookmark';
import logoPath from '../../resources/logo.png';

import './styles.css';

export interface SidebarMenu {
    path: string;
    title: string;
    icon: ReactElement;
}

const sidebarMenus: SidebarMenu[] = [
    {
        path: '/',
        title: 'Scan Website',
        icon: <ScanIcon />,
    },
    {
        path: '/saved_scans',
        title: 'Saved Scans',
        icon: <BookmarkIcon />,
    },
];

function Sidebar() {
    return (
        <VStack p={2} spacing={4}>
            <Image src={logoPath} alt="logo" />
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
                        <Flex justifyContent="space-around">
                            {menu.icon}
                            <Text width="70%">
                                {menu.title}
                            </Text>
                        </Flex>
                    </NavLink>
                ))
            }
        </VStack>
    );
}

export default Sidebar;
