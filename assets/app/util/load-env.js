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
                let [name, value] = variable.split('=');
                value = value.trim();
                if (name && value) {
                    if (value.toLowerCase() == 'true'){
                        value = true;
                    }  else if (value.toLowerCase() == 'false'){
                        value = false;
                    }
                    window[name.trim()] = value;
                }
            });
            callback();
        })
        .catch(error => console.error('Error loading .env file:', error));
}
export {loadEnv};