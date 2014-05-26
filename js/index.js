var roegfest = {
    clientID: '0d3ab0f612d1463ba64e094d7f0f5b46',
    tag: 'roegfest2014',
    instagramAPI: 'https://api.instagram.com/v1/',

    init: function() {
        var timeoutID = window.setTimeout(this.update(), 5000);
    },

    update: function() {
        var url = this.instagramAPI + 'tags/' + this.tag
            + '/media/recent?client_id=' + this.clientID;

        var onSuccess = function(resp) {
            console.log(resp);
            var newestURL = resp.data[0].images.standard_resolution.url;
            $('body').css('background-image', 'url(' + newestURL + ')');
        };

        var onFail = function(resp) {
            console.log('Failed to load data');
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
