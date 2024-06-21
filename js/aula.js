document.addEventListener("DOMContentLoaded", function() {
    const videoPlayer = document.getElementById("videoPlayer");
    const videoSource = document.getElementById("videoSource");
    const videoListItems = document.querySelectorAll(".video-list li");
    const moduleHeaders = document.querySelectorAll(".module h2");

    videoListItems.forEach(function(item) {
        item.addEventListener("click", function() {
            const videoSrc = this.getAttribute("data-video-src");
            videoSource.src = videoSrc;
            videoPlayer.load();
            videoPlayer.play();

            videoListItems.forEach(function(item) {
                item.querySelector('.watched')?.classList.remove('watched');
                item.querySelector('.not-watched')?.classList.add('not-watched');
            });
            this.querySelector('.not-watched').classList.remove('not-watched');
            this.querySelector('.watched').classList.add('watched');
        });
    });

    moduleHeaders.forEach(function(header) {
        header.addEventListener("click", function() {
            const videoList = this.nextElementSibling;
            if (videoList.style.display === "none" || videoList.style.display === "") {
                videoList.style.display = "block";
            } else {
                videoList.style.display = "none";
            }
        });
    });

     // Seleciona todos os links das tabs
     var tabLinks = document.querySelectorAll('#myTab a');

     // Itera sobre cada link
     tabLinks.forEach(function(tabLink) {
         // Adiciona um evento de clique a cada link
         tabLink.addEventListener('click', function(e) {
             e.preventDefault(); // Previne o comportamento padrão de navegação
 
             // Remove a classe 'active' de todos os links das tabs
             tabLinks.forEach(function(link) {
                 link.classList.remove('active');
             });
 
             // Adiciona a classe 'active' ao link clicado
             this.classList.add('active');
 
             // Obtém o ID da tab-pane associada ao link
             var tabId = this.getAttribute('href').substr(1);
 
             // Remove a classe 'active' de todas as tab-panes
             document.querySelectorAll('.tab-pane').forEach(function(tabPane) {
                 tabPane.classList.remove('active');
             });
 
             // Adiciona a classe 'active' à tab-pane correspondente
             document.getElementById(tabId).classList.add('active');
         });
     });
});