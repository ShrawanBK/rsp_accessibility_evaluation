import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Box, ChakraProvider, Flex, extendTheme } from '@chakra-ui/react';

import Sidebar from '../../components/Sidebar';
import ScanWebsite from '../../views/ScanWebsite';
import Fonts from './Fonts';
import SavedScan from '../../views/SavedScans';

const theme = extendTheme({
    colors: {
        brand: {
            100: '#045981',
            200: '#045981',
            300: '#045981',
            400: '#045981',
            500: '#045981',
            600: '#045981',
            700: '#045981',
            800: '#045981',
            900: '#045981',
        },
        danger: '#B00D0D',
    },
    fonts: {
        heading: 'Roboto',
        body: 'Roboto',
    },
});

function App() {
    return (
        <ChakraProvider theme={theme}>
            <Fonts />
            <Flex minHeight="100vh">
                <Box borderRightWidth="1px" width="14vw" paddingTop={8}>
                    <Sidebar />
                </Box>
                <Box p={8} flex={1} background="#fbfcfd">
                    <Routes>
                        <Route path="/" element={<ScanWebsite />} />
                        <Route path="/saved_scans" element={<SavedScan />} />
                    </Routes>
                </Box>
            </Flex>
        </ChakraProvider>
    );
}

export default App;
