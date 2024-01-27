export const getClueCountByLevel = (size: number, level: number) => {
    const total = size ** 2;

    if (level < 1 || level > 5) {
        return total;
    }

    // TODO: adjust the difficulty
    return total - level;
};
