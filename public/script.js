$(function(){
    console.log('document loaded');

    var urlText = $('#url');

    urlText.on('focus',function(){
        if(urlText.val() == '') {
            urlText.val('http://');
        }
    });

    urlText.on('paste',function(e) {
        // e.preventDefault();
        urlText.val('').val(e.target.value);
    });

    urlText.on('blur',function(){
        if(urlText.val() === 'http://') {
            urlText.val('');
        }
    })

});