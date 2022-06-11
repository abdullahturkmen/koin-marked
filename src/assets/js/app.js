function includeJs(...jsFilePath) {
    for (let i = 0; i < jsFilePath.length; i++) {

        var js = document.createElement("script");

        js.type = "text/javascript";
        js.src = jsFilePath[i];

        document.body.appendChild(js);

    }
}

includeJs("https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js");
