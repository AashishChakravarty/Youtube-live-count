$(function () {
    $("form").on("submit", function (e) {
        e.preventDefault();
        // prepare the request
        var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "channel",
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+")
        });
        // execute the request
        request.execute(function (response) {
            //    console.log(response );
            var count = response.items[0].id.channelId
            console.log(response);
            $("#subs").html(response.items[0].snippet.title);
            $("#thumb").attr("src", response.items[0].snippet.thumbnails.default.url);

            count_subs(count);
        });

        function count_subs(res) {
            setInterval(function () {

                var url = 'https://www.googleapis.com/youtube/v3/channels?part=statistics&id=' + res + '&fields=items/statistics/subscriberCount&key=AIzaSyAEes8YIF075P-2fR4ONPuLIr2FGMIfeqs';

                $.getJSON(url)
                    .done(function (data) {
                        var count = data.items[0].statistics.subscriberCount
                        $("#odometer").html(count)
                        console.log(count);
                    })
            }, 2000);
        }
    });

});
function init() {
    gapi.client.setApiKey("YOUR_API_KEY");
    gapi.client.load("youtube", "v3", function () {
    });
}