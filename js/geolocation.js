// console.log('aaa');

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error)
} else {
    error('Your browser not supported');
}

function error(msg) {
    $('#status').text(msg);
}

function success(position) {
    $('#status').text('found~');
    $('#object').html(JSON.stringify(position, null, 2));

    // google
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var myOptions = {
        zoom: 15,
        center: latlng,
        mapTypeControl: false,
        navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var google_map = new google.maps.Map(document.getElementById("google"), myOptions);

    var google_marker = new google.maps.Marker({
        position: latlng,
        map: google_map,
        title:"You are here! (at least within a "+position.coords.accuracy+" meter radius)"
    });

    // sogou
    var sogou_Latlng = new sogou.maps.LatLng(position.coords.latitude,position.coords.longitude);
    var sogou_map = new sogou.maps.Map(document.getElementById("sogou"), {
        zoom: 16,
        center: sogou_Latlng
    });

    var sogou_marker = new sogou.maps.Marker({
        position: sogou_Latlng,
        map: sogou_map,
        title: 'You are here..',
        visible: true,
        label: {
            visible: true
        }
    });
}

