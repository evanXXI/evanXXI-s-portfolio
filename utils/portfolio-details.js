$(document).ready(function() {
    // Function to get URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        let results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    // Get the project ID from the URL
    let projectId = parseInt(getUrlParameter('project')); // Parse as integer

    // Load project data based on the project ID
    $.ajax({
        url: "utils/myprojects.json", // Adjust the path to your JSON file
        dataType: "json",
        success: function(data) {
            // Find the project with the matching ID
            let project = data[projectId - 1]; // Adjust index since IDs start from 1
            
            // -------------------Start Debug
            console.log("Project Data:", data);
            console.log("Selected Project:", project); 
            console.log("Git Repository:", project.git_repo);
            console.log("Description:", project.description);
            // ---------------------End debug

            // Set project title
            $('.portfolio-title').text(project.title);

            // Set project images in slider
            let sliderHtml = '';
            project.images.forEach(function(imageUrl) {
                sliderHtml += '<div class="swiper-slide"><img class=\"project-img\" src="' + imageUrl + '" alt=""></div>';
            });
            $('.swiper-wrapper').html(sliderHtml); // Insert generated HTML inside swiper-wrapper

            // Initialize Swiper
            let swiper = new Swiper('.portfolio-details-slider', {
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                loop: true,
            });

            // Set project information
            $('.portfolio-info').html(`
            <h3>Project Information</h3>
            <ul>
                <li><strong>Category</strong>: ${project.category}</li>
                <li><strong>Client</strong>: ${project.client}</li>
                <li><strong>Date</strong>: ${project.date}</li>
                <li><strong>URL</strong>: <a href="${project.url}">${project.url}</a></li>
                <li><strong>Git Repository</strong>: <a href="${project.git_repo}">My Link</a></li>
                <li>
                    ${project.stack}
                </li>
                    <p>${project.description}</p>
                </li>
            </ul>
            `);
        },
        error: function(xhr, status, error) {
            console.error("Error loading project data:", status, error);
        }
    });
});