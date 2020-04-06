export const getTelegramApiUrl = () => {
    const { TELEGRAM_API_URL } = process.env;

    if (!TELEGRAM_API_URL) {
        throw new Error('Environment variable TELEGRAM_API_URL should be specified');
    }

    return TELEGRAM_API_URL;
};
