/**
 * Load .env file values into window object,
 * then launch callback
 * @param {function} callback
 */
const loadEnv = (callback) => {
    fetch('.env')
        .then(response => response.text())
        .then(data => {
            const envVariables = data.split('\n');
            envVariables.forEach(variable => {
                const [name, value] = variable.split('=');
                if (name && value) {
                    window[name.trim()] = value.trim();
                }
            });
            callback();
        })
        .catch(error => console.error('Error loading .env file:', error));
}
export {loadEnv};