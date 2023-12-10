$(document).ready(() => {
    let isResizing = false;
    let lastDownX = 0;
    $('.divider').mousedown((e) => {
        isResizing = true;
        lastDownX = e.clientX;
    });
    $(document).mousemove(function(e) {
        if (isResizing) {
            let offset = e.clientX - lastDownX;
            let leftPanelWidth = $(".left-panel").width();
            let rightPanelWidth = $(".right-panel").width();
            $(".left-panel").width(leftPanelWidth + offset);
            $(".right-panel").width(rightPanelWidth - offset);
            lastDownX = e.clientX;
        }
    }).mouseup(() => {
        isResizing = false;
    });
});