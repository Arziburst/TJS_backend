export const getTelegramGroupId = () => {
    const { TELEGRAM_GROUP_ID } = process.env;

    if (!TELEGRAM_GROUP_ID) {
        throw new Error('Environment variable TELEGRAM_GROUP_ID should be specified');
    }

    return TELEGRAM_GROUP_ID;
};
