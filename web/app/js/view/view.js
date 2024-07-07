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
View.toast = (message, color = undefined) => {
    if (color) {
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

/**
 * Append Speech Bubble
 * @param {string} name
 * @param {string} color
 * @param {string} message
 * @param {boolean} right (optional)
 */
View.speechBubble = (name, color, message, right) => {
    let html = '<div class="speech-bubble';
    if (right) {
        html += ' right">';
    } else {
        html += '">';
    }
    html += '<div>';
    html += '<div class="speech-bubble-user" style="background-color:' + color + '">';
    html += name;
    html += '</div>';
    html += '<div class="speech-bubble-date">' +
        `${new Date().getHours()}:${(new Date().getMinutes() < 10 ? '0' : '') + new Date().getMinutes()}` +
        '</div>';
    html += '</div>';
    html += message;
    html += '</div>';

    $('.box-container').prepend(html).children().first().hide().show(350);
}

View.updateSpeechBubbleColor = (username, color) => {
    $('.speech-bubble-user').each(function() {
       if ($(this).text().trim() === username) {
           $(this).css('background-color', color);
       }
    });
}

export {View};
