const text = "Software Engineer | Python Django Developer";
let i = 0;

function typeWriter() {
    if (i < text.length) {
        document.getElementById("typing").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 70);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    typeWriter();
    document.getElementById('current-year').textContent = new Date().getFullYear();
});
