import { Box, Divider, Flex, Heading, Spacer, VStack } from "@chakra-ui/react";
import React from "react";
import { useCallback } from "react";
import SearchScans from "../../components/forms/SearchScans";
import SavedScansItem from "../../components/SavedScanItem";
import Sort from "../../components/Sort";

function SavedScan() {
  const columns = [
    {
      description: "Webpage",
      accessor: "webPage",
    },
    {
      description: "URL",
      accessor: "url",
    },
    {
      description: "Website",
      accessor: "website",
    },
    {
      description: "Scanned Date",
      accessor: "scannedDate",
    },
    {
      description: "Actions",
      accessor: "actions",
    },
  ];

  const data = [
    {
      id:1,
      webpage: "Facebook Profile Page",
      url: "https://facebook.com",
      website: "Facebook",
      scannedDate: "1:31 22 April 2022",
    },
    {
      id:2,
      webpage: "Facebook Profile Page",
      url: "https://facebook.com",
      website: "Facebook",
      scannedDate: "1:31 22 April 2022",
    },
    {
      id:3,
      webpage: "Facebook Profile Page",
      url: "https://facebook.com",
      website: "Facebook",
      scannedDate: "1:31 22 April 2022",
    },
    {
      id:4,
      webpage: "Facebook Profile Page",
      url: "https://facebook.com",
      website: "Facebook",
      scannedDate: "1:31 22 April 2022",
    },
  ];
  const onSearch = useCallback(
    (url: string) => {
      console.log("on processing url - ", url);
    },
    [null]
  );
  return (
    <VStack align="stretch" spacing={8} p={4}>
      <Flex>
        <Heading as="h5" size="lg">
          Saved Scans
          <Divider />
        </Heading>
      </Flex>
      <Box width="100%" marginTop="1vh">
        <Flex>
          <Box width="60%">
            <SearchScans onSearch={onSearch}></SearchScans>
          </Box>
          <Spacer />
          <Box width="20%">
            <Sort></Sort>
          </Box>
        </Flex>
      </Box>
      <Box background="white" p={8} borderWidth="1px" borderRadius="md">
        <SavedScansItem
          columns={columns}
          data={data}
          numberOfRecords={data.length}
        ></SavedScansItem>
      </Box>
    </VStack>
  );
}

export default SavedScan;
