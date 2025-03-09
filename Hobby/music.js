let isPlaying = false;
const audio = document.getElementById('audio-player');
const ctrlIcon = document.getElementById('ctrlIcon');
const progress = document.getElementById('progress');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const songList = document.getElementById('song-list').getElementsByTagName('li');

const songs = [
    {
        title: 'back 2 me! x edm (Slowed)',
        artist: 'Angst!',
        src: '/Images/back 2 me! x edm (Slowed).mp3'
    },
    {
        title: 'Keep up',
        artist: 'Odetari',
        src: 'Images/ODETARI - KEEP UP.mp3 '
    },
    {
        title: 'Chicago',
        artist: 'Michael Jackson',
        src: 'Images/Michael Jackson - Chicago.mp3'
    },
    {
        title: 'Music sounds better with you',
        artist: 'Stardust',
        src: 'Images/Music sounds better with you - stardust.mp3'
    }
];

let currentSongIndex = 0;

function playPause() {
    if (isPlaying) {
        audio.pause();
        ctrlIcon.classList.remove('fa-pause');
        ctrlIcon.classList.add('fa-play');
    } else {
        audio.play();
        ctrlIcon.classList.remove('fa-play');
        ctrlIcon.classList.add('fa-pause');
    }
    isPlaying = !isPlaying;
}

function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    highlightSong(index);
}

function highlightSong(index) {
    for (let i = 0; i < songList.length; i++) {
        songList[i].classList.remove('active');
    }
    songList[index].classList.add('active');
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playPause();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playPause();
}

function selectSong(index) {
    currentSongIndex = index;
    loadSong(index);
    playPause();
}

audio.onplay = () => {
    isPlaying = true;
    ctrlIcon.classList.remove('fa-play');
    ctrlIcon.classList.add('fa-pause');
};

audio.onpause = () => {
    isPlaying = false;
    ctrlIcon.classList.remove('fa-pause');
    ctrlIcon.classList.add('fa-play');
};

// Update the slider as the audio plays
audio.ontimeupdate = () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent;
};

// Seek through the audio when the slider is changed
progress.addEventListener('input', () => {
    const seekTime = (progress.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// Load the first song initially
loadSong(currentSongIndex);