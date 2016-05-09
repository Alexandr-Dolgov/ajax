window.onload = function () {

    var page = '';

    func('first');

    document.getElementById('first').onclick = function() { func('first'); };
    document.getElementById('second').onclick = function() { func('second'); };
    document.getElementById('third').onclick = function() { func('third'); };

    window.addEventListener("hashchange", hashChangeHandler, false);

    function hashChangeHandler() {
        if ('#' + page != window.location.hash) {
            page = window.location.hash;
            page = page.substring(1, page.length);
        }

        var contentElement = document.getElementById('content');

        var parsedJson = getJson(page);

        var res = '';
        if (typeof(parsedJson) === 'string') {
            res = parsedJson;
        } else if (parsedJson instanceof Array) {
            res = '<ul>';
            var i;
            for (i = 0; i < parsedJson.length; i++) {
                res += '<li>' + parsedJson[i] + '</li>';
            }
            res += '</ul>';
        } else if (parsedJson instanceof Object) {
            if (parsedJson.err) {
                res = parsedJson.err;
            } else if (parsedJson.html) {
                res = parsedJson.html;
            } else {
                res = 'error';
            }
        }

        contentElement.innerHTML = res;
    }

    function func(name) {
        window.location.hash = name;
        page = name;
        return false;
    }

    function getJson(name) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'json/' + name + '.json', false);
        xhr.send();

        var resp;
        if (xhr.status != 200) {
            return {'err': xhr.status + ': ' + xhr.statusText};
        }

        resp = xhr.responseText;
        return JSON.parse(resp);
    }
};