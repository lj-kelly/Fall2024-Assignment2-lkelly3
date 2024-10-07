// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
//Write a function that changes the background image of your site on a click of your search engine name
var bkgd = false;
var first = true;
$(document).ready(function () {
    $('#searchButton').on('click', function () {
        console.log('Search Button clicked');
        apiSearch();
        colorChange1();
    });
    $("#searchButton").keyup(function (e) {
        const ENTER_KEY_CODE = 13;
        if (e.keyCode == ENTER_KEY_CODE) {
            apiSearch();
        }
    });
    $('#getTime').on('click', function () {
        findTime();
        colorChange2();
    });
    $('#amLucky').on('click', function () {
        colorChange3();
    });
    $('#amLucky').on('click', function () {
        luckySearch();
        colorChange3();
    });
    $('#whatBird').on('click', function () {
        birdID();
        colorChange4();
    });
    $('#titleBox').on('click', function () {
        swapBack();
    });
    //$('#bodyBox').on('click', function () {
    //    swapBack2();
    //});

});
function apiSearch() {
    var params = {
        'q': $('#query').val(),
        'count': 5,
        'offset': 0,
        'mkt': 'en-us'
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': '0218cec11c4945fb81968668b0ac958a'
        }
    })
        .done(function (data) {
            var len = data.webPages.value.length;
            var results = '';
            for (i = 0; i < len; i++) {
                results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
            }
            $('#searchResults').css('visibility', 'visible');
            $('#searchResults').html(results);
            $('#searchResults').dialog();
        })
        .fail(function () {
            alert('error');
        });
}

function luckySearch() {
    var params = {
        'q': $('#query').val(),
        'count': 1,
        'offset': 0,
        'mkt': 'en-us'
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': '0218cec11c4945fb81968668b0ac958a'
        }
    })
        .done(function (data) {
            var len = data.webPages.value.length;
            window.location.href = data.webPages.value[0].url;
        })
        .fail(function () {
            alert('error');
        });
}

function findTime() {
    $.ajax({
        url: 'https://timeapi.io/api/Time/current/zone?timeZone=America/Chicago', // Change timeZone as needed
        type: 'GET',
        success: function (data) {
            var theTime = String(data.time); // Convert the API's datetime to a Date object

            $('#time').css('visibility', 'visible');
            $('#time').text('Current CDT time: ' + theTime);
            $('#time').dialog();
        },
        error: function (xhr, status, error) {
            console.error('Error fetching time:', error);
            alert('Unable to retrieve the time.');
        }
    });
}
function colorChange1() {
    $('#searchButton').css('background-color', getRandomColor());
}
function colorChange2() {
    $('#getTime').css('background-color', getRandomColor());
}
function colorChange3() {
    $('#amLucky').css('background-color', getRandomColor());
}
function colorChange4() {
    $('#whatBird').css('background-color', getRandomColor());
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function swapBack() {
    //var bkgd;
    if (bkgd == true) {
        $('#bodyBox').css('background-image', 'url("redfoot2.jpg")');
        $('#bodyBox').css('text-align', 'left');
        $('#titleBox').css('color', 'white');
        bkgd = false;
        first = false;
    }
    else {
        $('#bodyBox').css('background-image', 'url("bluefoot.jpg")');
        $('#bodyBox').css('text-align', 'center');
        $('#titleBox').css('color', 'black');
        bkgd = true;
    }
}
function birdID() {
    if (first == true) {
        $('#birdType').text('Blue-footed booby');
        $('#birdType').dialog(); 
        return;
    }
    if (bkgd == true) {
        //bluefoot
        $('#birdType').text('Blue-footed booby'); 
        $('#birdType').dialog(); 
    }
    else {
        //redfoot
        $('#birdType').text('Red-footed booby'); 
        $('#birdType').dialog(); 
    }
}
//function swapBack2() {
//    //var bkgd;
//    if (bkgd == true) {
//        $('#bodyBox').css('background-image', 'url("falcon.jpeg")');
//        bkgd = false;
//    }
//    else {
//        $('#bodyBox').css('background-image', 'url("osprey.jpeg")');
//        bkgd = true;
//    }
//}