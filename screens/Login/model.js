export function getState() {
    return Math.random().toString().split(".")[1];
}

export function getScopes() {
    return [
        "read:devices-status",
        "read:devices-info",
        "read:brainwaves",
        "read:signal-quality",
        "read:accelerometer",
        // "read:devices-settings",
        // "write:devices-settings",
        // "write:wifi-settings",
        // "write:haptics",
        // "write:brainwave-markers",
        // "write:brainwaves",
        // "read:memories:brainwaves",
        // "read:calm",
        // "read:memories:calm",
        // "read:focus",
        // "read:memories:focus",
        // "read:kinesis",
        // "write:kinesis",
    ];
}
function isMissingEnvVars() {
    return (
        !process.env?.NEUROSITY_OAUTH_CLIENT_ID ||
        !process.env?.NEUROSITY_OAUTH_CLIENT_SECRET ||
        !process.env?.NEUROSITY_OAUTH_CLIENT_REDIRECT_URI
    );
}
