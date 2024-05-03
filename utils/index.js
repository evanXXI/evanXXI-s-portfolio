$(document).ready(function() {
    // Chargement des données depuis le fichier JSON
    $.ajax({
        url: "utils/myprojects.json",
        dataType: "json",
        success: function(data) {
            // Parcours de chaque projet dans le tableau
            $.each(data, function(index, project) {
            // Construction du contenu HTML pour chaque projet
            let projectHTML = '<div class="col-lg-4 col-md-6 portfolio-item filter-' + project.category.toLowerCase() + '">';
            projectHTML += '<div class="portfolio-wrap">';
            projectHTML += '<img src="' + project.images[0] + '" class="img-fluid" alt="' + project.title + '">';
            projectHTML += '<div class="portfolio-info">';
            projectHTML += '<h4>' + project.title + '</h4>';
            projectHTML += '<p>' + project.category + ' - ' + project.date + '</p>';
            projectHTML += '<div class="portfolio-links">';
            projectHTML += '<a href="' + project.images[0] + '" data-gallery="portfolioGallery" class="portfolio-lightbox" title="' + project.title + '"><i class="bx bx-plus"></i></a>';
            projectHTML += '<a href="portfolio-details.html?project=' + (index + 1) + '" data-gallery="portfolioDetailsGallery" data-glightbox="type: external" class="portfolio-details-lightbox" title="Portfolio Details"><i class="bx bx-link"></i></a>';
            projectHTML += '</div></div></div></div>';

            // Ajout de style à la liste de projets
            $("#projectList").attr("style", "position: relative; height: auto;");
            
            // Ajout du projet à la liste des projets
            $('#projectList').append(projectHTML);
        });
    },
        error: function(xhr, status, error) {
            console.error("Erreur lors du chargement des données:", status, error);
        }
    });
});