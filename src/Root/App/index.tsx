import React from 'react';
import { Route, Routes } from 'react-router-dom';

import {
    Box,
    ChakraProvider,
    Flex,
} from '@chakra-ui/react';

import './styles.css';

import Sidebar from '../../components/Sidebar';
import Wip from '../../components/Wip';
import ScanWebsite from '../../views/ScanWebsite';

function App() {
    return (
        <ChakraProvider>
            <Flex minHeight="100vh" minWidth="100vw">
                <Box borderRightWidth="1px" width="14vw" paddingTop={8}>
                    <Sidebar />
                </Box>
                <Box p={8} flex={1} background="#fbfcfd">
                    <Routes>
                        <Route path="/" element={<ScanWebsite />} />
                        <Route path="/saved_scans" element={<Wip />} />
                    </Routes>
                </Box>
            </Flex>
        </ChakraProvider>
    );
}

export default App;
