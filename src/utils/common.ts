/* eslint-disable import/prefer-default-export */
export const formatDateTime = (dateValue: string) => {
    const date = new Date(dateValue);

    const formattedDate = date.toLocaleDateString(
        'en-us',
        {
            month: 'short',
            year: 'numeric',
            day: 'numeric',
        },
    );
    const formattedTime = date.toLocaleTimeString();
    return `${formattedTime} ${formattedDate}`;
};
