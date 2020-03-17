export const getCloudinaryEnv = () => {
    const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

    if (!CLOUD_NAME) {
        throw new Error('Environment variable TELEGRAM_GROUP_ID should be specified');
    }

    if (!API_KEY) {
        throw new Error('Environment variable TELEGRAM_GROUP_ID should be specified');
    }

    if (!API_SECRET) {
        throw new Error('Environment variable TELEGRAM_GROUP_ID should be specified');
    }

    return {
        CLOUD_NAME,
        API_KEY,
        API_SECRET
    };
};
