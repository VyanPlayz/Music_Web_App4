song  = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;

function setup(){
    canvas = createCanvas(600 , 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on("pose" , gotPoses);
}

function draw(){
    image(video , 0 , 0 , 600 , 500);

    fill("#00ff00");
    stroke("#ff0000");

    song_name = song1.isPlaying();
    console.log(song_name);

    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        song2.stop();
        if(song_name == false){
            song1.play();
        }
        else{
            console.log("Song Name: Believer Song");
            document.getElementById("song_name").innerHTML = "Song Name: Believer Song";
        }
    }
}

function preload(){
    song1 = loadSound("Believer---Imagine-Dragons-(PagalWorld).mp3");
    song2 = loadSound("Let Me Down Slowly_192(PagalWorld.com.se).mp3");
}

function modelLoaded(){
    console.log("Model is Loaded Successfully");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("Left Wrist X = " + leftWristX + " Left Wrist Y = " + leftWristY);
        console.log("Right Wrist X = " + rightWristX + " Right Wrist Y = " + rightWristY);
    }
}