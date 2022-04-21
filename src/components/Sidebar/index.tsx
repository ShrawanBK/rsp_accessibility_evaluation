import React, { ReactElement } from 'react';

import { NavLink } from 'react-router-dom';
import {
    Container,
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
    ariaLabel: string;
}

const sidebarMenus: SidebarMenu[] = [
    {
        path: '/',
        title: 'Scan Website',
        icon: <ScanIcon />,
        ariaLabel: 'scan-website',
    },
    {
        path: '/saved_scans',
        title: 'Saved Scans',
        icon: <BookmarkIcon />,
        ariaLabel: 'saved-scans',
    },
];

function Sidebar() {
    return (
        <VStack
            p={2}
            spacing={4}
        >
            <Image
                src={logoPath}
                alt="logo"
                title="logo"
                role="img"
            />
            <Heading
                as="h6"
                size="md"
                id="accessibility-tools-title"
                role="heading"
            >
                Accessibility Tools
            </Heading>
            <React.Fragment aria-labelledby="accessibility-tools-title">
                {
                    sidebarMenus.map((menu) => (
                        <Container
                            key={menu.title}
                            role="navigation"
                            width="100%"
                            display="flex"
                            id={menu.ariaLabel}
                            aria-label={menu.ariaLabel}
                        >
                            <NavLink
                                to={menu.path}
                                className={({ isActive }) => (isActive ? 'nav-link-active' : 'nav-link')}
                                aria-labelledby={menu.ariaLabel}
                            >
                                <Flex justifyContent="space-around">
                                    {menu.icon}
                                    <Text width="70%">
                                        {menu.title}
                                    </Text>
                                </Flex>
                            </NavLink>
                        </Container>
                    ))
                }
            </React.Fragment>
        </VStack>
    );
}

export default Sidebar;
