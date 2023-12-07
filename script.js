let track_progress = document.getElementById("song-slider")
let playIcon = document.getElementById("play-pause")
let song_player = document.getElementById("song-player")
let song_duration_text = document.getElementById("song-duration")
let song_played_text = document.getElementById("song-played")
let song_cards = document.querySelectorAll(".song-card figure")
let song_thumbnail = document.getElementById("song-thumbnail")
let song_title = document.getElementById("song-title")
let song_author = document.getElementById("song-author")



playIcon.addEventListener("click", playPause)
song_cards.forEach((song) => {
    song.addEventListener("click", setSong)
})


song_player.onloadedmetadata = function () {
    track_progress.max = song_player.duration;
    track_progress.value = song_player.currentTime;
    console.log(song_player.duration)
    let left_minutes = song_player.duration / 60;
    let left_rminutes = Math.floor(left_minutes);
    let left_seconds = (left_minutes - left_rminutes) * 60;
    let left_rseconds = Math.floor(left_seconds)

    song_duration_text.innerText = left_rminutes + ":" + left_rseconds
}

function playPause() {
    if (playIcon.classList.contains("fa-circle-play")) {
        playIcon.classList.remove("fa-circle-play")
        playIcon.classList.add("fa-circle-pause")
        song_player.play()

    }

    else {
        playIcon.classList.add("fa-circle-play")
        playIcon.classList.remove("fa-circle-pause")
        song_player.pause()
    }
}

function setSong() {
    let target_title = event.target.getAttribute("data-song-name")
    let target_author = event.target.getAttribute("data-song-author")
    console.log(event.target)
    song_thumbnail.setAttribute("src", event.target.src)
    song_title.innerText = target_title;
    song_author.innerText = target_author;
    console.log(event.target.getAttribute("data-song-name"))
    song_player.setAttribute("src", "assets/songs/" + target_title + ".mp3")
    console.log(song_player.src)
    song_player.play()
    playIcon.classList.remove("fa-circle-play")
    playIcon.classList.add("fa-circle-pause")
}

if (song_player.play()) {
    playIcon.classList.remove("fa-circle-play")
    playIcon.classList.add("fa-circle-pause")
    setInterval(() => {
        let minutes = song_player.currentTime / 60;
        let rminutes = Math.floor(minutes);
        let seconds = (minutes - rminutes) * 60;
        let rseconds = Math.floor(seconds)
        let left_minutes = song_player.duration / 60;
        let left_rminutes = Math.floor(left_minutes);
        let left_seconds = (left_minutes - left_rminutes) * 60;
        let left_rseconds = Math.floor(left_seconds)
        track_progress.value = song_player.currentTime
        song_played_text.innerText = rminutes + ":" + rseconds
        song_duration_text.innerText = (left_rminutes - rminutes) + ":" + ((rseconds - left_rseconds) * -1)
    }, 500)
}

track_progress.onchange = function () {
    // song_player.play()
    // playIcon.classList.remove("fa-circle-play")
    // playIcon.classList.add("fa-circle-pause")
    song_player.currentTime = track_progress.value
}