leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
song1  = "";
song2 = "";
ScoreLeftWrist = 0;
ScoreRightWrist = 0;
StatusOfSong_1 = "";
StatusOfSong_2 = "";

function preload()
{
    song1 = loadSound(" Christmas.mp3");
    song2 = loadSound("Harry Potter.mp3");
}

function setup() {
canvas = createCanvas(600,500);
canvas.center();


video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}

function modelLoaded() {
console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
 if(results.length >0)
 {
    console.log(results);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    ScoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("leftWristX = " + leftWristX + "leftWristY" + leftWristY);
    

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    ScoreRightWrist = results[0].pose.keypoints[10].score;
    console.log("rightWristX = " + rightWristX + "rightWristY" + rightWristY);
    }
}
function draw() {
    image(video, 0,0,600, 500);
   
    

    fill("#FF000");
    stroke("#FF000");

    StatusOfSong_1 = song1.isPlaying();
    console.log(song1);

    Status_ofSong2 = song2.isPlaying();
    console.log(song2);


   if(ScoreLeftWrist > 0.2)
    {
       circle(leftWristX,leftWristY,20);
       song2.stop();
       if(StatusOfSong_1== false)
        {
            song1.play();
            document.getElementById("song_id").innerHTML = "Song Name: Christmas Music";
            
        }
        
    }

    if(ScoreRightWrist > 0.2)
    {
       circle(rightWristX,rightWristY,20);
       song1.stop();
       if(StatusOfSong_2== false)
        {
            song2.play();
            document.getElementById("song_id").innerHTML = "Song Name: Harry Potter";
        }
       
        
    }
    
}



