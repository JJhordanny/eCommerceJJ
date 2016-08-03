$(function() {

  $('#search').keyup(function() {
    var search_term = $(this).val();

    $.ajax({
      method: 'POST',
      url: '/api/search',
      data: {
        search_term
      },
      dataType: 'json',
      success: function(json) {
        var data = json.hits.hits.map(function(hit) {
          return hit;
        });

        $('#searchResults').empty();
        for (var i = 0; i < data.length; i++) {
          var html = "";
          html += '<div class="col-md-4">';
          html += '<a href="/product/' + data[i]._source._id + '">';
          html += '<div class="thumbnail">';
          html += '<img src="' + data[i]._source.image + '"/>';
          html += '<div class="caption">';
          html += '<h3><span style="font-weight: bold">' + data[i]._source.name + '</span></h3>';
          html += '<h3>' + data[i]._source.category.name + '</h3>';
          html += '<h3>$' + data[i]._source.price + '</h3>';
          html += '</div></div></a></div>';

          $('#searchResults').append(html);
        }
      },

      error: function(error) {
        console.log(err);
      }
    });
  });




});
