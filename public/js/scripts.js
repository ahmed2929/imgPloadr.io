
$(function(){

    
    ///comment 
    $('#post-comment').hide();
    $('#btncomment').on('click', function(event) {
    
    event.preventDefault();
    $('#post-comment').show();
    });


    //like
    $('#btn-like').on('click', function(event) {
        event.preventDefault();
        var imgId = $(this).data('id');
        $.post('/img/' + imgId + '/like').done(function(data) {
          
        $('.likes-count').text(data.likes);
        });
        });

            //delete
        $('#btn-delete').on('click', function(event) {
            event.preventDefault();
            var $this = $(this);
           
            
            var imgId = $(this).data('id');
            $.ajax({
            url: '/img/' + imgId,
            type: 'DELETE'
            }).done(function(result) {
            if (result) {
              window.location.replace("http://localhost:3000/");
               

            }
            });
          
            });



})