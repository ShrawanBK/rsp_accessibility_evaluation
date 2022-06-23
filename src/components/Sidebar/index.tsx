import React, { ReactElement, useContext } from 'react';

import { NavLink } from 'react-router-dom';
import {
    Container,
    Flex,
    Image,
    Text,
    VStack,
} from '@chakra-ui/react';

import ScanIcon from '../icons/Scan';
import BookmarkIcon from '../icons/Bookmark';
import logoPath from '../../resources/logo.png';

import { SideBarContext } from '../../contexts/SideBarContext';

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
    const {
        sideBarNegativeTabIndex,
    } = useContext(SideBarContext);
    return (
        <VStack
            p={2}
            spacing={4}
            role="complementary"
        >
            <NavLink
                to="/"
                aria-label="Home Page"
                tabIndex={sideBarNegativeTabIndex ? -1 : undefined}
            >
                <Image
                    src={logoPath}
                    alt="logo"
                    role="img"
                />
            </NavLink>

            <span
                role="heading"
                aria-level={1}
                style={{ fontSize: 20, fontWeight: 'bold' }}
            >
                Accessibility Tools
            </span>
            {sidebarMenus.map((menu) => (
                <Container
                    key={menu.title}
                    role="navigation"
                    width="100%"
                    display="flex"
                    id={menu.ariaLabel}
                    aria-label={menu.ariaLabel}
                    tabIndex={sideBarNegativeTabIndex ? -1 : undefined}
                >
                    <NavLink
                        to={menu.path}
                        className={({ isActive }) => (isActive ? 'nav-link-active' : 'nav-link')}
                        aria-labelledby={menu.ariaLabel}
                        tabIndex={sideBarNegativeTabIndex ? -1 : undefined}
                    >
                        <Flex
                            justifyContent="space-around"
                            tabIndex={sideBarNegativeTabIndex ? -1 : undefined}
                        >
                            {menu.icon}
                            <Text width="70%">
                                {menu.title}
                            </Text>
                        </Flex>
                    </NavLink>
                </Container>
            ))}
        </VStack>
    );
}

export default Sidebar;
