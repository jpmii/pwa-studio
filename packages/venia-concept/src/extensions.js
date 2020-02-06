/**
 * Assume these extensions are provided as separate npm modules
 * and are enumerated by webpack at build time.
 */
const extensions = ['./sample-extensions/venia-sample-network-activity-logger'];

export const registerTapableHooks = tapableHooks => {
    extensions.map(extension => {
        const { default: registerTapableHooks } = require(`${extension}`);
        registerTapableHooks(tapableHooks);
    });
};

export default extensions;