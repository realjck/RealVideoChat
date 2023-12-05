/**
 * VIEW
 * WITH JQUERY
 */

let _toastTimer;
const View = {};

/**
 * Toast alert of 3.2s
 * @param {string} message 
 */
View.toast = (message, color) => {
    if (color){
        $(".toast").addClass("toast-colored");
        $(".toast-colored").css("background-color", color);
    } else {
        $(".toast").removeClass("toast-colored");
    }
    $(".toast").html(message);
    $(".toast").show();
    clearTimeout(_toastTimer);
    _toastTimer = setInterval(() => {
        $(".toast").hide();
    }, 3200);
}

export {View};