$(document).ready(() => {

    // PAGE SPIT RESIZER
    // -----------------
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

    // TOGGLE HIGH PANEL
    // -----------------
    let isHighPanelOpen = true;
    $("#toggle-high-panel").on('click', (e) => {
       if (isHighPanelOpen) {
           isHighPanelOpen = false;
           $("#hiding-zone").hide(350);
       } else {
           isHighPanelOpen = true;
           $("#hiding-zone").show(350);
       }
    });
});
