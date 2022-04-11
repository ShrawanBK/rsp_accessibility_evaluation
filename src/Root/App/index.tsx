import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Box, ChakraProvider, Flex, HStack } from '@chakra-ui/react';

import ScanForm from '../../components/forms/ScanForm';
import Sidebar from '../../components/Sidebar';
import Wip from '../../components/Wip';

import './styles.css';

function App() {
    return (
        <ChakraProvider>
            <Flex minHeight="100vh" minWidth="100vw">
                <Box borderRightWidth="1px">
                    <Sidebar />
                </Box>
                <Box p={8} flex={1}>
                    <Routes>
                        <Route path="/" element={<ScanForm />} />
                        <Route path="/saved_scans" element={<Wip />} />
                    </Routes>
                </Box>
            </Flex>
        </ChakraProvider>
    );
}

export default App;
