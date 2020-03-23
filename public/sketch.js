function setup(){
    createCanvas(200, 200).parent("#mySketch");
    capture = createCapture(VIDEO);
    capture.hide()
    capture.size(width, height);
    imageMode(CENTER);
    getCurrentPosition(doThisOnLocation)

    pixelDensity(0.5);

    submitButton = select("#submitButton");
    submitButton.mousePressed(handleSubmit);


    
}
function handleSubmit(e){
    let output = {
        location: {},
        image: ''
    }
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(output)
    }
    fetch(`/api`, options).then(result => {
        // updateMyDots()
        console.log('success')
    })
}