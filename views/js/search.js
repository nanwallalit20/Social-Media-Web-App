// In your JavaScript file or script tag
$('#search-form').submit(function (e) {
    e.preventDefault();
    const searchQuery = $('#search-input').val();
    $.get(`/friendship/search?q=${searchQuery}`, function (data) {
        const popUpContent = data.map(result => {
            return `<div><a href="/users/profile/${result._id}">${result.name}</a></div>`;
        }).join('');
        $('#search-popup').html(popUpContent).show();
    });
});



