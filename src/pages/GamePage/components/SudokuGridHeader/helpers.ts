export const getFormattedTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds / 60) - hours * 60;
    seconds %= 60;

    if (hours === 0) {
        return `${minutes}:${String(seconds).padStart(2, '0')}`;
    }

    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};
