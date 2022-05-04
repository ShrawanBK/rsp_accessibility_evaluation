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
import { SavedScanItem } from '../../views/SavedScans/data';

interface Props {
    open: boolean;
    onCancelDelete: () => void;
    onDelete: () => void;
    deletableItem: SavedScanItem | undefined;
}

function DeleteRecordDialog(props: Props) {
    const {
        open,
        onCancelDelete,
        onDelete,
        deletableItem,
    } = props;
    return (
        <AlertDialog
            motionPreset="slideInBottom"
            isOpen={open}
            onClose={onCancelDelete}
            leastDestructiveRef={undefined}
            isCentered
            preserveScrollBarGap
            id={deletableItem?.id}
        >
            <AlertDialogOverlay />
            <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete webpage
                </AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                    Are you sure you want to delete the following webpage?
                    <Spacer />
                    <br />
                    webpage:
                    {' '}
                    {deletableItem?.webpage}
                    <br />
                    Website:
                    {' '}
                    {deletableItem?.website}
                </AlertDialogBody>

                <AlertDialogFooter>
                    <Button
                        variant="outline"
                        ref={undefined}
                        onClick={onCancelDelete}
                    >
                        Cancel
                    </Button>
                    <Button
                        colorScheme="red"
                        onClick={onDelete}
                        ml={3}
                        background="red.700"
                    >
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default DeleteRecordDialog;
