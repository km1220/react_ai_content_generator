

export const _copy2Clipboard = (text) => window.navigator.clipboard.writeText(text);
// export const _readClipboard = async () => await window.navigator.clipboard.readText();
export const _readClipboard = () => window.navigator.clipboard.readText();