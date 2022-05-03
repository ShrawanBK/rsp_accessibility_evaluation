import "./styles.css";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ChakraProvider,
  Box,
  Flex,
  Spacer,
  Heading,
} from "@chakra-ui/react";
import DeleteRecord from "../DeleteRecord";
import { useState } from "react";

interface Columns {
  description: string;
  accessor: string;
}

interface Data {
  id: number;
  webpage: string;
  url: string;
  website: string;
  scannedDate: string;
}

interface Props {
  columns: Columns[];
  data: Data[];
  numberOfRecords: number;
}

function SavedScansItem(props: Props) {
  const [openDelete, setOpenDelete] = useState(false);
  const { columns, data, numberOfRecords } = props;
  const [selectedId, setSelectedId] = useState(-1);

  const deleteRecordModal = () => {
    setOpenDelete(true);
  };

  const onClose = () => setOpenDelete(false);
  return (
    <ChakraProvider>
      <Box>
        <Heading as="h6" size="md">
          {numberOfRecords + " Result(s)"}
        </Heading>
        <br />
        <Box background="white" p={8} borderWidth="1px" borderRadius="md">
          <Table>
            <Thead>
              {columns.map((col: any) => (
                <Th>{col.description}</Th>
              ))}
            </Thead>
            <Tbody>
              {data.map((data: any) => (
                <Tr>
                  <Td>{data.webpage}</Td>
                  <Td>{data.url}</Td>
                  <Td>{data.website}</Td>
                  <Td>{data.scannedDate}</Td>
                  <Td>
                    <Flex>
                      <button
                        className="viewButton"
                        onClick={() => handleViewButtonClickEvent(data.id)}
                      >
                        View
                      </button>
                      <Spacer />
                      <button
                        className="deleteButton"
                        onClick={() => handleDeleteButtonClickEvent(data.id)}
                      >
                        Delete
                      </button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      <DeleteRecord
        open={openDelete}
        close={onClose}
        // webPage={data.filter((x) => x.id === selectedId)[0].webpage}
        // website={data.filter((x) => x.id === selectedId)[0].website}
      ></DeleteRecord>
    </ChakraProvider>
  );

  function handleViewButtonClickEvent(id: number) {
    const selectedObject = data.filter((x) => x.id === id)[0];
    console.log(selectedObject.id);
  }

  function handleDeleteButtonClickEvent(id: number) {
    setSelectedId(id);
    deleteRecordModal();
  }
}
export default SavedScansItem;
