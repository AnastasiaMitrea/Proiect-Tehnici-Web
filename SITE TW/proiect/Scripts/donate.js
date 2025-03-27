document.addEventListener('DOMContentLoaded', function () {
    function getRandomHeartColor() {
        const redShades = ['#D4006F', '#FF3366', '#FF0055', '#E4006D', '#FF5E5B',  '#e600ac', '#ff0000',];
        const randomColor = redShades[Math.floor(Math.random() * redShades.length)];
        return randomColor;
    }
    function changeHeartColor() {
        const randomColor = getRandomHeartColor();
        document.documentElement.style.setProperty('--heart-color', randomColor);
    }
    setInterval(changeHeartColor, 1000);
});
