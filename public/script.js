document.addEventListener('DOMContentLoaded', function () {
    const songs = [
        { name: 'You Look Lonely', src: 'assets/song1.mp3', image: 'assets/first.jpg' },
        { name: 'Step Back', src: 'assets/song2.mp3', image: 'assets/second.jpg' },
        { name: 'Fight Back', src: 'assets/song3.mp3', image: 'assets/third.jpg' },
        { name: 'Starboy', src: 'assets/song4.mp3', image: 'assets/fourth.jpg' },
        { name: 'Gangsta Paradise', src: 'assets/song5.mp3', image: 'assets/fifth.jpg' },
        { name: 'Tourner Dans Le Vide', src: 'assets/song6.mp3', image: 'assets/sixth.jpg' },
        { name: 'Rockstar', src: 'assets/song7.mp3', image: 'assets/seventh.jpg' },
        { name: 'Tokyo Drift', src: 'assets/song8.mp3', image: 'assets/eighth.jpg' },
        { name: 'Darkside', src: 'assets/song9.mp3', image: 'assets/ninth.jpg' },
        { name: 'Fairytale', src: 'assets/song10.mp3', image: 'assets/tenth.jpg' },
        { name: 'Mockingbird', src: 'assets/song11.mp3', image: 'assets/eleventh.jpg' },
        { name: 'Without Me', src: 'assets/song12.mp3', image: 'assets/twelfth.jpg' },
        { name: 'Gasolina', src: 'assets/song13.mp3', image: 'assets/thirteenth.jpg' },
        { name: 'Mi Genete', src: 'assets/song14.mp3', image: 'assets/fourteenth.jpg' },
        { name: 'The Perfect Girl', src: 'assets/song15.mp3', image: 'assets/fifteenth.jpg' },
    ];

    let currentSongIndex = 0;
    const audio = document.getElementById('audio');
    const songName = document.getElementById('songName');
    const seekBar = document.getElementById('seekBar');
    const playBtn = document.getElementById('play');
    const pauseBtn = document.getElementById('pause');
    const previousBtn = document.getElementById('previous');
    const nextBtn = document.getElementById('next');
    const albumArt = document.getElementById('albumArt');
    const currentTimeDisplay = document.getElementById('currentTime');
    const durationDisplay = document.getElementById('duration');

    function loadSong(index) {
        const currentSong = songs[index];
        audio.src = currentSong.src;
        albumArt.src = currentSong.image;
        songName.innerText = currentSong.name;

        audio.addEventListener('loadedmetadata', function () {
            const durationMinutes = Math.floor(audio.duration / 60);
            const durationSeconds = Math.floor(audio.duration % 60);
            durationDisplay.innerText = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;

            seekBar.max = audio.duration;
        });
    }

    function playPause() {
        if (audio.paused) {
            audio.play();
            playBtn.style.display = 'none';
            pauseBtn.style.display = 'block';
        } else {
            audio.pause();
            playBtn.style.display = 'block';
            pauseBtn.style.display = 'none';
        }
    }

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
        playPause();
    }

    function previousSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
        playPause();
    }

    function updateSeekBar() {
        seekBar.value = audio.currentTime;

        const currentTimeMinutes = Math.floor(audio.currentTime / 60);
        const currentTimeSeconds = Math.floor(audio.currentTime % 60);
        currentTimeDisplay.innerText = `${currentTimeMinutes}:${currentTimeSeconds < 10 ? '0' : ''}${currentTimeSeconds}`;
    }

    function seekTo(time) {
        audio.currentTime = time;
    }

    function playNextSong() {
        if (currentSongIndex < songs.length - 1) {
            currentSongIndex++;
            loadSong(currentSongIndex);
            playPause();
        } else {
            audio.pause();
            playBtn.style.display = 'block';
            pauseBtn.style.display = 'none';
        }
    }

    audio.addEventListener('timeupdate', updateSeekBar);
    seekBar.addEventListener('input', () => seekTo(seekBar.value));

    audio.addEventListener('ended', playNextSong);

    playBtn.addEventListener('click', playPause);
    pauseBtn.addEventListener('click', playPause);
    nextBtn.addEventListener('click', nextSong);
    previousBtn.addEventListener('click', previousSong);

    loadSong(currentSongIndex);
});
