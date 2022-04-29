prediction = ""


Webcam.set
({
    width:300,
    height:350,
    image_format:'png',
    image_quality:90
});

camera = document.getElementById("camera");

Webcam.attach( '#camera' );

function take_snapshot()
{
   Webcam.snap(function(data_uri)
   {
       document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
   });
}

console.log('ml5 version:',ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/R0sn4BKTk/model.json',modelLoaded);

function modelLoaded()
{
    console.log("Model Loaded!");
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data = "The prediction is " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}
function check()
{
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error,results)
{
    if (error) 
    {
        console.error(error);
        
    } else 
    {
        console.log(results);
        document.getElementById("result_gesters_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(results[0].label == "All the best")
        {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if(results[0].label == "That was a marvelous victory")
        {
            document.getElementById("update_emoji").innerHTML = "&#9996";
        }
        if(results[0].label == "This is looking amazing")
        {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
    }
}







