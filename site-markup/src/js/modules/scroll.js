var scroll = function() {
    $(window).scroll(function() {
        console.log('scrolltop' + $(window).scrollTop());
    });
};

module.exports = scroll;
