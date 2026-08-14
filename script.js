let player;

function onYouTubeIframeAPIReady(){
    console.log("hello")

    player = new YT.Player("oplayer",{
        height: "0",
        width: "0",
        playerVars: {
            listType: "playlist",
            list: "PLafSq5UblCNWzrBiEOwBeIdoU8AFXfTqp",
            autoplay: 1,
            loop: 1,
            controls: 0,
            origin: window.location.origin
        },
        events: {
            onReady: onPlayerReady,
            onError: onPlayerError,
            onStateChange: (event) => {
                if (event.data === YT.PlayerState.PLAYING) {
                setTitle();
                setAuthor();
                setThumbnail();
                }
            }
             
        }      
        
    });   

}

const play = document.querySelector("#play-pause");
var state = "paused";

    play.addEventListener("click", () => {
        if(state === "paused"){
            player.playVideo();
            play.innerHTML = `<i class="fa-solid fa-circle-pause"></i>`;
            state="playing";
        }
        else if(state === "playing"){
            player.pauseVideo();
            play.innerHTML = `<i class="fa-solid fa-circle-play">`;
            state="paused";
        }
    });

    let navDirection = "next";
    const next = document.querySelector("#next");

    next.addEventListener("click", () => {
       navDirection = "next"; 
       play.innerHTML = `<i class="fa-solid fa-circle-pause"></i>`;
       state="playing";
       player.nextVideo();
    });

    const shuffle = document.querySelector("#shuffle");
    let isShuffle = true;

    shuffle.addEventListener("click", () => {
        isShuffle = !isShuffle;

        player.setShuffle(isShuffle);

        shuffle.classList.toggle("active");
    });

    
    const previous = document.querySelector("#prev");

    previous.addEventListener("click", () => {
       navDirection = "prev"; 
       play.innerHTML = `<i class="fa-solid fa-circle-pause"></i>`;
       state="playing";
       player.previousVideo();
    });

const progressText = document.querySelector("#progress");

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

setInterval(() => {
            const current = player.getCurrentTime();
            const duration = player.getDuration();

            progressText.textContent =
                `${formatTime(current)} / ${formatTime(duration)}`;
            }, 1000);

const progress = document.getElementById("slider");

progress.addEventListener("input", () => {
    progress.style.setProperty(
        "--progress",
        progress.value + "%"
    );
});

const slider = document.querySelector("#slider");

const interval = setInterval(() => {
  const currentTime = player.getCurrentTime();
  const duration = player.getDuration();
  
  if (duration > 0) {
    const percentage = (currentTime / duration) * 100;
    slider.value = percentage;

    progress.style.setProperty(
        "--progress",
        percentage + "%"
    );
  }
}, 1000);

slider.addEventListener("input", () => {
  const duration = player.getDuration();
  const time = (slider.value / 100) * duration;

  player.seekTo(time, true);
});

    
function setTitle(){
    const title = document.querySelector("#title");
    const video = player.getVideoData();
    title.textContent = video.title;
}

function setAuthor(){
    const author = document.querySelector("#author");
    const video = player.getVideoData();
    author.textContent = video.author || "No Author";

    
}

function setThumbnail() {
    const video = player.getVideoData();
    const videoId = video.video_id;

    const thumbnail = document.querySelector("#thumbnail");

    thumbnail.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}


     function onPlayerReady(event){

       // event.target.playVideo();
        setTitle();
        setAuthor();
        setThumbnail();
        event.target.setShuffle(true);
        setTimeout(() => {
            event.target.playVideo();
        }, 500);

        
     }

     function onPlayerError(event) {
        if ([5, 100, 101, 150].includes(event.data) && navDirection === "next") {
            player.nextVideo();
        } 
        else if ([5, 100, 101, 150].includes(event.data) && navDirection === "prev") {

            player.previousVideo();
        } 
     }

function updateTime() {
    const now = new Date();

    document.getElementById("time").textContent =
        now.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        });
}

updateTime();
setInterval(updateTime, 1000);

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



setInterval(() => {
document.querySelector(".live-data").textContent = `${getRandomInRange(25,32)} labourers on site`;

}, 300000);



  