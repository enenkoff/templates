let burger = function() {
    let burger = document.getElementById('burger'),
        header = document.getElementById('header');
    burger.onclick = function () {
        header.classList.toggle('open');
    };
};

module.exports = burger;
