export const includeCDNs = (...jsFilePath) => {
    for (let i = 0; i < jsFilePath.length; i++) {

        var js = document.createElement("script");

        js.type = "text/javascript";
        js.src = jsFilePath[i];

        return (document.body.appendChild(js));

    }
}



export const TabTitle = (newTitle) => {
    return (document.title = newTitle)
}