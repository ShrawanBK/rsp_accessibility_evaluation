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

interface Props {
    open: boolean;
    onCancelDelete: () => void;
    onDelete: () => void;
    deletableItemId: string | undefined;
    header?: string;
    areYouSureMsg?: string;
    dialogBody?: React.ReactNode;
}

function DeleteConfirmationDialog(props: Props) {
    const {
        open,
        onCancelDelete,
        onDelete,
        deletableItemId,
        header = 'Delete',
        areYouSureMsg = 'Are you sure?',
        dialogBody,
    } = props;
    return (
        <AlertDialog
            motionPreset="slideInBottom"
            isOpen={open}
            onClose={onCancelDelete}
            leastDestructiveRef={undefined}
            isCentered
            preserveScrollBarGap
            id={deletableItemId}
        >
            <AlertDialogOverlay />
            <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    {header}
                </AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                    {areYouSureMsg}
                    <Spacer />
                    {dialogBody}
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

export default DeleteConfirmationDialog;
