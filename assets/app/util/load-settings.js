/**
 * Load settings file values into window object,
 * then launch callback
 * @param {string} filepath
 * @param {function} callback
 */
const loadSettings = (filepath, callback) => {
    fetch(filepath)
        .then(response => response.text())
        .then(data => {
            const envVariables = data.split('\n');
            envVariables.forEach(variable => {
                let [name, value] = variable.split('=');
                if (name && value) {
                    value = value.trim();
                    if (value.toLowerCase() === 'true'){
                        value = true;
                    }  else if (value.toLowerCase() === 'false'){
                        value = false;
                    }
                    window[name.trim()] = value;
                }
            });
            callback();
        })
        .catch(error => console.error('Error loading settings file:', error));
}
export {loadSettings};
