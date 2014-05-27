var roegfest = {
    clientID: '0d3ab0f612d1463ba64e094d7f0f5b46',
    tag: 'roegfest2014',
    instagramAPI: 'https://api.instagram.com/v1/',

    init: function() {
        this.update();
        window.setInterval(function() {
            roegfest.update();
        }, 5000);
    },

    update: function() {
        NProgress.start();
        var url = this.instagramAPI + 'tags/' + this.tag
            + '/media/recent?client_id=' + this.clientID;

        var onSuccess = function(resp) {
            console.log(resp);
            var newestURL = resp.data[0].images.standard_resolution.url;
            $('#image').css('background-image', 'url(' + newestURL + ')');
            NProgress.done();
        };

        var onFail = function(resp) {
            console.log('Failed to load data');
            NProgress.done();
        };

        $.ajax({
            type: 'GET',
            dataType: 'jsonp',
            cache: false,
            url: url,
            success: onSuccess
        });
    }
};
