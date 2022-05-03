import React from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Spacer,
} from '@chakra-ui/react';

function DeleteRecord(props: any) {
    return (
        <AlertDialog
            motionPreset="slideInBottom"
            isOpen={props.open}
            onClose={props.close}
            leastDestructiveRef={undefined}
            isCentered
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Webpage
                    </AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Are you sure you want to delete the following webpage?
                        <Spacer />
                        <br />
                        Webpage:
                        {' '}
                        {props.webPage}
                        <br />
                        Website:
                        {' '}
                        {props.website}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={undefined} onClick={props.onCancel}>
                            Cancel
                        </Button>
                        <Button colorScheme="red" onClick={props.onDelete} ml={3}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
}

export default DeleteRecord;
