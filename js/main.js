console.log("hello from main.js")

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        // document ready

        console.log("ok ready -")
    }
};