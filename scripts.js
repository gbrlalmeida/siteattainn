let slideIndex = 0;
let slides = document.querySelectorAll('.timeline-item')
let slideWidth = slides[0].offsetWidth;

function moveSlide(n) {
    slideIndex += n;
    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    } else if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    document.querySelector('.timeline-slide').style.transform = `translateX(${slideIndex * -slideWidth}px)`;
}

// Inicialize a linha do tempo
moveSlide(0);

function aceitarCookies() {
    // Exemplo: armazenar no localStorage que os cookies foram aceitos
    localStorage.setItem('cookiesAceitos', 'true');
    // Ocultar o banner de consentimento
    document.getElementById('cookieConsent').style.display = 'none';
}

// Verificar se os cookies já foram aceitos anteriormente
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('cookiesAceitos') === 'true') {
        document.getElementById('cookieConsent').style.display = 'none';
    }
});


document.getElementById("denunciaForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var formData = new FormData(this);

    fetch("enviar_denuncia.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        var statusMessage = document.getElementById("statusMessage");
        statusMessage.textContent = data;
        if (data.includes("Erro")) {
            statusMessage.classList.add("error");
        } else {
            statusMessage.classList.remove("error");
            document.getElementById("denunciaForm").reset();
        }
    })
    .catch(error => {
        var statusMessage = document.getElementById("statusMessage");
        statusMessage.textContent = "Erro ao enviar a denúncia. Por favor, tente novamente.";
        statusMessage.classList.add("error");
    });
});