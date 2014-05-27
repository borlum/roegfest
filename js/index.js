var roegfest = {
    clientID: '0d3ab0f612d1463ba64e094d7f0f5b46',
    tag: 'maxsus100',
    instagramAPI: 'https://api.instagram.com/v1/',
    imageContainer: $('#image'),

    data: [],

    index: 0,

    init: function() {
        this.update(roegfest.slide);

        window.setInterval(function() {
            roegfest.update(roegfest.slide);
        }, 5000);
    },

    update: function(callback) {
        NProgress.start();
        var url = this.instagramAPI + 'tags/' + this.tag
            + '/media/recent?client_id=' + this.clientID;

        var onSuccess = function(resp) {
            roegfest.data = resp.data;
            NProgress.done();
            if (typeof callback === 'function') {
                callback.apply(roegfest);
            }
        };

        var onFail = function(resp) {
            console.log('Failed to load data');
            NProgress.done();
            if (typeof callback === 'function') {
                callback.apply(roegfest);
            }
        };

        $.ajax({
            type: 'GET',
            dataType: 'jsonp',
            cache: false,
            url: url,
            success: onSuccess
        });
    },

    slide: function() {
        this.imageContainer.hide();
        var currentURL = this.data[this.index].images.standard_resolution.url;
        this.imageContainer.css('background-image', 'url(' + currentURL + ')');
        if (this.index == this.data.length-1 || this.index == 4) {
            this.index = 0;
        } else {
            this.index++;
        }
        this.imageContainer.show();
    }
};
