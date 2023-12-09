/**
 * Load settings file values into window object,
 * then launch callback
 * @param {function} callback
 */
const loadSettings = (callback) => {
    fetch('settings')
        .then(response => response.text())
        .then(data => {
            const envVariables = data.split('\n');
            envVariables.forEach(variable => {
                let [name, value] = variable.split('=');
                value = value.trim();
                if (name && value) {
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