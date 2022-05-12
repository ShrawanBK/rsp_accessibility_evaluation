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
    Heading,
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
        <div aria-hidden="true">
            <AlertDialog
                motionPreset="slideInBottom"
                isOpen={open}
                onClose={onCancelDelete}
                leastDestructiveRef={undefined}
                isCentered
                preserveScrollBarGap
                id={deletableItemId}
                aria-label="alert-modal"
                aria-describedby="alert modal"
            >
                <AlertDialogOverlay
                    role="alertdialog"
                />
                <AlertDialogContent
                    role="main"
                    tabIndex={-1}
                    py={2}
                >
                    <AlertDialogHeader>
                        <Heading
                            as="h1"
                            size="md"
                        >
                            {header}
                        </Heading>
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
                            tabIndex={-1}
                        >
                            Cancel
                        </Button>
                        <Button
                            colorScheme="red"
                            onClick={onDelete}
                            ml={3}
                            background="red.700"
                            tabIndex={-1}
                        >
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default DeleteConfirmationDialog;
