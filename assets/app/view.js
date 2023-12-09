/**
 * VIEW
 * WITH JQUERY
 */

let _toastTimer;
const View = {};

/**
 * Toast alert of 4.2s
 * @param {string} message
 * @param {string} color (optionnal)
 */
View.toast = (message, color) => {
    if (color){
        $(".toast").css("background-color", color);
    } else {
        $(".toast").css("background-color", "var(--toast-back-color)");
    }
    $(".toast").html(message);
    $(".toast").show();
    clearTimeout(_toastTimer);
    _toastTimer = setInterval(() => {
        $(".toast").hide();
    }, 4200);
}

export {View};