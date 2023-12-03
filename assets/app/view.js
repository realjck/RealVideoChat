/**
 * VIEW
 * WITH JQUERY
 */

let _toastTimer;
const View = {};

/**
 * Toast alert of 2.5s
 * @param {string} message 
 */
View.toast = (message) => {
    $(".toast").html(message);
    $(".toast").show();
    clearTimeout(_toastTimer);
    _toastTimer = setInterval(() => {
        $(".toast").hide();
    }, 2500);
}

export {View};