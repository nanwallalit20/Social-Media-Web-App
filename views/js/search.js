// In your JavaScript file or script tag
$('#search-form').submit(function (e) {
    e.preventDefault();
    const searchPopup = document.getElementById('search-popup');
    const searchInput=document.getElementById('search-input')
    // if (e.target !== searchPopup && e.target !== searchInput) {
    //     // Click occurred outside the popup and search input, hide the popup
    //     searchPopup.style.display = 'none';
    //   }
    
    const searchQuery = $('#search-input').val();
    $.get(`/friendship/search?q=${searchQuery}`, function (data) {
        const popUpContent = data.map(result => {
            return `<div id='search-user'><a href="/users/profile/${result._id}">${result.name}</a></div>`;
        }).join('');
        $('#search-popup').html(popUpContent).show();
    });
});



