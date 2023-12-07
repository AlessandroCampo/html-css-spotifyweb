let track_progress = document.getElementById("song-slider")
let playIcon = document.getElementById("play-pause")
let song_player = document.getElementById("song-player")
let song_duration_text = document.getElementById("song-duration")
let song_played_text = document.getElementById("song-played")
let song_cards = document.querySelectorAll(".song-card figure")
let playlist_cards = document.querySelectorAll(".playlist-card")
let song_thumbnail = document.getElementById("song-thumbnail")
let song_title = document.getElementById("song-title")
let song_author = document.getElementById("song-author")
let volume_slider = document.getElementById("volume-slider")
let volume_icon = document.getElementById("volume-icon")
let refresh_icon = document.getElementById("refresh-icon")
let forward_icon = document.getElementById("forward-icon")
let back_icon = document.getElementById("back-icon")
let shuffle_icon = document.getElementById("shuffle-icon")

// SONGS DATABASE

let chemical = {
    title: "Chemical",
    author: "Post Malone",
    thumbnail: "assets/img/chemical.jpg"
}

let wildfire = {
    title: "Wildfire",
    author: "Seafret",
    thumbnail: "assets/img/seafret_album.jpg"
}

let bloody_valentine = {
    title: "bloody valentine - Acoustic",
    author: "Machine Gun Kelly, Travis Barker",
    thumbnail: "assets/img/bloody_valentine.jpg"
}

let dont_look_back_in_anger = {
    title: "Don't Look Back In Anger",
    author: "Oasis",
    thumbnail: "assets/img/dont_look_back.jpg"
}

let lucid_dreams = {
    title: "Lucid Dreams",
    author: "Juice WRLD",
    thumbnail: "assets/img/lucid_dreams.jpg"
}

let youre_somebody_else = {
    title: "You're Somebody Else",
    author: "flora cash",
    thumbnail: "assets/img/somebody_else.jpg"
}

let strangers = {
    title: "sTraNgeRs",
    author: "Bring Me The Horizon",
    thumbnail: "assets/img/bringr.jpg"
}

let niente_canzoni_damore = {
    title: "Niente Canonzi D'amore",
    author: "Marracash",
    thumbnail: "assets/img/niente_canzoni_damore.jpg"
}

let someone_like_you = {
    title: "Someone Like You",
    author: "Adele",
    thumbnail: "assets/img/someone_like_you.jpg"
}

let lacrime_di_piombo = {
    title: "Lacrime Di Piombo",
    author: "Blanco",
    thumbnail: "assets/img/lacrime_di_piombo.jpg"
}

let afterlife = {
    title: "Afterlife",
    author: "Avenged Sevenfold",
    thumbnail: "assets/img/afterlife.jpg"
}

let snuff = {
    title: "Snuff",
    author: "Slipknot",
    thumbnail: "assets/img/snuff.jpg"
}

let animal_i_have_become = {
    title: "Animal I Have Become",
    author: "Three Days Grace",
    thumbnail: "assets/img/animal_i_have_become.jpg"
}

let ferma_a_guardare = {
    title: "Ferma a Guardare",
    author: "Ernia ft. Pinguini Tattici Nucleari",
    thumbnail: "assets/img/ferma_a_guardare.jpg"
}

let let_you_down = {
    title: "Let You Down",
    author: "NF",
    thumbnail: "assets/img/let_you_down.jpg"
}

let when_im_gone = {
    title: "When I'm Gone",
    author: "Eminem",
    thumbnail: "assets/img/when_im_gone.jpg"
}

let rubami_la_notte = {
    title: "Rubami la notte",
    author: "Pinguini Tattici Nucleari",
    thumbnail: "assets/img/rubami_la_notte.jpg"
}

let sleep_on_the_floor = {
    title: "Sleep On The Floor",
    author: "The Lumineers",
    thumbnail: "assets/img/sleep_on_the_floor.jpg"
}


let playlist_position = 0;
let starting_playlist = [chemical, wildfire, bloody_valentine, dont_look_back_in_anger, lucid_dreams, youre_somebody_else, strangers]
let depressed_playlist = [niente_canzoni_damore, youre_somebody_else, someone_like_you, lacrime_di_piombo]
let metal_playlist = [strangers, animal_i_have_become, afterlife, snuff]
let rap_playlist = [ferma_a_guardare, let_you_down, when_im_gone, lucid_dreams]
let indie_playlist = [rubami_la_notte, wildfire, sleep_on_the_floor, chemical]
let base_playlist = starting_playlist;







song_cards.forEach((song) => {
    song.addEventListener("click", setSong)
})

playlist_cards.forEach((playlist) => {
    playlist.addEventListener("click", setPlaylist)
})

playIcon.addEventListener("click", playPause)
forward_icon.addEventListener("click", skip)
back_icon.addEventListener("click", back)
shuffle_icon.addEventListener("click", playRandom)


song_player.onloadedmetadata = function () {
    track_progress.max = song_player.duration;
    track_progress.value = song_player.currentTime;
    console.log(song_player.duration)
    let left_minutes = song_player.duration / 60;
    let left_rminutes = Math.floor(left_minutes);
    let left_seconds = (left_minutes - left_rminutes) * 60;
    let left_rseconds = Math.floor(left_seconds)
    song_player.volume = 0.5;
    song_duration_text.innerText = left_rminutes + ":" + left_rseconds
}

function playPause() {
    if (playIcon.classList.contains("fa-circle-play")) {
        playIcon.classList.remove("fa-circle-play")
        playIcon.classList.add("fa-circle-pause")
        song_player.play()
        console.log(song_player.volume)

    }

    else {
        playIcon.classList.add("fa-circle-play")
        playIcon.classList.remove("fa-circle-pause")
        song_player.pause()
    }
}

volume_slider.oninput = function () {
    song_player.volume = volume_slider.value / 10
    if (volume_slider.value == 0) {
        volume_icon.classList.remove("fa-volume-high")
        volume_icon.classList.add("fa-volume-xmark")
    }

    if (volume_slider.value > 0 && volume_slider.value < 5) {
        volume_icon.classList.add("fa-volume-low")
        volume_icon.classList.remove("fa-volume-high")
        volume_icon.classList.remove("fa-volume-xmark")
    }

    else if (volume_slider.value > 0 && volume_slider.value > 5) {
        volume_icon.classList.remove("fa-volume-low")
        volume_icon.classList.add("fa-volume-high")
        volume_icon.classList.remove("fa-volume-xmark")
    }



}

refresh_icon.onclick = function () {
    track_progress.value = 0;
    song_player.currentTime = 0;
}



function skip() {
    playlist_position++;
    if (playlist_position < base_playlist.length) {
        console.log(playlist_position)
        console.log(base_playlist.length)
        console.log(base_playlist[playlist_position]);
        song_thumbnail.setAttribute("src", base_playlist[playlist_position].thumbnail)
        song_title.innerText = base_playlist[playlist_position].title
        song_author.innerText = base_playlist[playlist_position].author
        song_player.setAttribute("src", "assets/songs/" + base_playlist[playlist_position].title + ".mp3")
        song_player.play()
        playIcon.classList.remove("fa-circle-play")
        playIcon.classList.add("fa-circle-pause")
    }

}

function back() {
    if (playlist_position > 0) {
        playlist_position--;
        console.log(base_playlist[playlist_position]);
        song_thumbnail.setAttribute("src", base_playlist[playlist_position].thumbnail)
        song_title.innerText = base_playlist[playlist_position].title
        song_author.innerText = base_playlist[playlist_position].author
        song_player.setAttribute("src", "assets/songs/" + base_playlist[playlist_position].title + ".mp3")
        song_player.play()
        playIcon.classList.remove("fa-circle-play")
        playIcon.classList.add("fa-circle-pause")
    }

}

function playRandom() {
    playlist_position = Math.floor(Math.random() * base_playlist.length)
    console.log(base_playlist[playlist_position]);
    song_thumbnail.setAttribute("src", base_playlist[playlist_position].thumbnail)
    song_title.innerText = base_playlist[playlist_position].title
    song_author.innerText = base_playlist[playlist_position].author
    song_player.setAttribute("src", "assets/songs/" + base_playlist[playlist_position].title + ".mp3")
    song_player.play()
    playIcon.classList.remove("fa-circle-play")
    playIcon.classList.add("fa-circle-pause")
}


function setSong() {
    let target_title = event.target.getAttribute("data-song-name")
    let target_author = event.target.getAttribute("data-song-author")
    song_thumbnail.setAttribute("src", event.target.src)
    song_title.innerText = target_title;
    song_author.innerText = target_author;
    song_player.setAttribute("src", "assets/songs/" + target_title + ".mp3")
    song_player.play()
    playIcon.classList.remove("fa-circle-play")
    playIcon.classList.add("fa-circle-pause")
}

function setPlaylist() {
    let playListName = event.target.getAttribute("data-playlist-name");
    playlist_position = 0;
    if (playListName == "depressed-playlist") {
        base_playlist = depressed_playlist;
    }

    else if (playListName == "rap-playlist") {
        base_playlist = rap_playlist;
    }

    else if (playListName == "indie-playlist") {
        base_playlist = indie_playlist;
    }

    else if (playListName == "metal-playlist") {
        base_playlist = metal_playlist;
    }
    console.log(base_playlist)
    song_thumbnail.setAttribute("src", base_playlist[playlist_position].thumbnail)
    song_title.innerText = base_playlist[playlist_position].title
    song_author.innerText = base_playlist[playlist_position].author
    song_player.setAttribute("src", "assets/songs/" + base_playlist[playlist_position].title + ".mp3")
    song_player.play()
    playIcon.classList.remove("fa-circle-play")
    playIcon.classList.add("fa-circle-pause")
}





if (song_player.play()) {
    // playIcon.classList.remove("fa-circle-play")
    // playIcon.classList.add("fa-circle-pause")
    setInterval(() => {
        let minutes = song_player.currentTime / 60;
        let rminutes = Math.floor(minutes);
        let seconds = (minutes - rminutes) * 60;
        let rseconds = Math.floor(seconds)
        let left_minutes = (song_player.duration - song_player.currentTime) / 60
        let left_rminutes = Math.floor(left_minutes);
        let left_seconds = (left_minutes - left_rminutes) * 60;
        let left_rseconds = Math.floor(left_seconds)
        track_progress.value = song_player.currentTime
        song_played_text.innerText = rminutes + ":" + rseconds
        song_duration_text.innerText = left_rminutes + ":" + left_rseconds
        if (song_player.currentTime == song_player.duration) {
            skip()
        }
    }, 500)
}

track_progress.onchange = function () {
    song_player.currentTime = track_progress.value
}