// Music Player Application
class MusicPlayer {
    constructor() {
        // DOM Elements
        this.audio = document.getElementById('audioPlayer');
        this.playBtn = document.getElementById('playBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.repeatBtn = document.getElementById('repeatBtn');
        this.shuffleBtn = document.getElementById('shuffleBtn');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.progressSlider = document.getElementById('progressSlider');
        this.progressBar = document.getElementById('progress');
        this.currentTimeEl = document.getElementById('currentTime');
        this.durationEl = document.getElementById('duration');
        this.songTitle = document.getElementById('songTitle');
        this.artistName = document.getElementById('artistName');
        this.albumArt = document.getElementById('albumArt');
        this.playlistContainer = document.getElementById('playlistContainer');
        this.playlistToggle = document.getElementById('playlistToggle');
        this.closePlaylist = document.getElementById('closePlaylist');
        this.playlistEl = document.getElementById('playlist');
        this.volumeValue = document.getElementById('volumeValue');

        // State
        this.isPlaying = false;
        this.currentIndex = 0;
        this.repeatMode = 0; // 0: no repeat, 1: repeat all, 2: repeat one
        this.isShuffle = false;
        this.songs = [
            {
                title: 'Summer Vibes',
                artist: 'The Melodies',
                duration: 245,
                image: 'https://via.placeholder.com/300?text=Summer+Vibes'
            },
            {
                title: 'Midnight Dreams',
                artist: 'Luna Echo',
                duration: 198,
                image: 'https://via.placeholder.com/300?text=Midnight+Dreams'
            },
            {
                title: 'Electric Pulse',
                artist: 'Neon Lights',
                duration: 220,
                image: 'https://via.placeholder.com/300?text=Electric+Pulse'
            },
            {
                title: 'Ocean Waves',
                artist: 'Coastal Sounds',
                duration: 267,
                image: 'https://via.placeholder.com/300?text=Ocean+Waves'
            },
            {
                title: 'Mountain Echo',
                artist: 'Nature Beats',
                duration: 189,
                image: 'https://via.placeholder.com/300?text=Mountain+Echo'
            },
            {
                title: 'City Lights',
                artist: 'Urban Groove',
                duration: 203,
                image: 'https://via.placeholder.com/300?text=City+Lights'
            },
            {
                title: 'Starlight Serenade',
                artist: 'Cosmic Harmony',
                duration: 234,
                image: 'https://via.placeholder.com/300?text=Starlight+Serenade'
            },
            {
                title: 'Forest Rain',
                artist: 'Nature Sounds',
                duration: 210,
                image: 'https://via.placeholder.com/300?text=Forest+Rain'
            }
        ];

        this.init();
    }

    init() {
        this.loadSong(this.currentIndex);
        this.attachEventListeners();
        this.renderPlaylist();
    }

    attachEventListeners() {
        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.prevBtn.addEventListener('click', () => this.prevSong());
        this.nextBtn.addEventListener('click', () => this.nextSong());
        this.repeatBtn.addEventListener('click', () => this.toggleRepeat());
        this.shuffleBtn.addEventListener('click', () => this.toggleShuffle());
        this.volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));
        this.progressSlider.addEventListener('input', (e) => this.seek(e.target.value));
        this.playlistToggle.addEventListener('click', () => this.togglePlaylist());
        this.closePlaylist.addEventListener('click', () => this.closePlaylistPanel());

        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.handleSongEnd());
        this.audio.addEventListener('loadedmetadata', () => this.updateDuration());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    loadSong(index) {
        const song = this.songs[index];
        this.songTitle.textContent = song.title;
        this.artistName.textContent = song.artist;
        this.albumArt.src = song.image;
        
        // Create a simple audio simulation (since we don't have actual audio files)
        // In a real application, you would set this.audio.src = song.url
        this.audio.src = '';
        this.progressSlider.max = song.duration;
        this.durationEl.textContent = this.formatTime(song.duration);
    }

    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        this.isPlaying = true;
        this.playBtn.innerHTML = '<span class="icon">⏸</span>';
        this.playBtn.classList.add('playing');
        // In a real app: this.audio.play();
        this.simulatePlayback();
    }

    pause() {
        this.isPlaying = false;
        this.playBtn.innerHTML = '<span class="icon">▶</span>';
        this.playBtn.classList.remove('playing');
        // In a real app: this.audio.pause();
    }

    nextSong() {
        if (this.isShuffle) {
            this.currentIndex = Math.floor(Math.random() * this.songs.length);
        } else {
            this.currentIndex = (this.currentIndex + 1) % this.songs.length;
        }
        this.loadSong(this.currentIndex);
        this.updatePlaylistHighlight();
        if (this.isPlaying) this.play();
    }

    prevSong() {
        this.currentIndex = (this.currentIndex - 1 + this.songs.length) % this.songs.length;
        this.loadSong(this.currentIndex);
        this.updatePlaylistHighlight();
        if (this.isPlaying) this.play();
    }

    toggleRepeat() {
        this.repeatMode = (this.repeatMode + 1) % 3;
        if (this.repeatMode === 0) {
            this.repeatBtn.classList.remove('active');
            this.repeatBtn.innerHTML = '<span class="icon">🔁</span>';
        } else if (this.repeatMode === 1) {
            this.repeatBtn.classList.add('active');
            this.repeatBtn.innerHTML = '<span class="icon">🔁</span>';
        } else {
            this.repeatBtn.classList.add('active');
            this.repeatBtn.innerHTML = '<span class="icon">🔂</span>';
        }
    }

    toggleShuffle() {
        this.isShuffle = !this.isShuffle;
        this.shuffleBtn.classList.toggle('active');
    }

    setVolume(value) {
        this.audio.volume = value / 100;
        this.volumeValue.textContent = value + '%';
    }

    seek(value) {
        this.audio.currentTime = value;
    }

    updateProgress() {
        const progress = (this.audio.currentTime / this.audio.duration) * 100;
        this.progressBar.style.width = progress + '%';
        this.progressSlider.value = this.audio.currentTime;
        this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
    }

    updateDuration() {
        this.durationEl.textContent = this.formatTime(this.audio.duration);
        this.progressSlider.max = this.audio.duration;
    }

    handleSongEnd() {
        if (this.repeatMode === 2) {
            // Repeat one song
            this.audio.currentTime = 0;
            this.play();
        } else {
            // Play next song
            this.nextSong();
        }
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }

    renderPlaylist() {
        this.playlistEl.innerHTML = '';
        this.songs.forEach((song, index) => {
            const item = document.createElement('div');
            item.className = 'playlist-item';
            if (index === this.currentIndex) item.classList.add('active');
            item.innerHTML = `
                <div class="playlist-item-title">${song.title}</div>
                <div class="playlist-item-artist">${song.artist}</div>
            `;
            item.addEventListener('click', () => this.playSongFromPlaylist(index));
            this.playlistEl.appendChild(item);
        });
    }

    playSongFromPlaylist(index) {
        this.currentIndex = index;
        this.loadSong(index);
        this.updatePlaylistHighlight();
        this.play();
    }

    updatePlaylistHighlight() {
        document.querySelectorAll('.playlist-item').forEach((item, index) => {
            item.classList.toggle('active', index === this.currentIndex);
        });
    }

    togglePlaylist() {
        this.playlistContainer.classList.toggle('active');
    }

    closePlaylistPanel() {
        this.playlistContainer.classList.remove('active');
    }

    handleKeyPress(e) {
        if (e.code === 'Space') {
            e.preventDefault();
            this.togglePlay();
        }
        if (e.code === 'ArrowRight') {
            this.nextSong();
        }
        if (e.code === 'ArrowLeft') {
            this.prevSong();
        }
    }

    simulatePlayback() {
        // Simulate playback since we don't have actual audio files
        let elapsed = 0;
        const song = this.songs[this.currentIndex];
        const duration = song.duration;
        
        const interval = setInterval(() => {
            if (!this.isPlaying) {
                clearInterval(interval);
                return;
            }
            
            elapsed += 0.1;
            this.audio.currentTime = elapsed;
            
            if (elapsed >= duration) {
                clearInterval(interval);
                this.handleSongEnd();
            }
        }, 100);
    }
}

// Initialize Music Player
document.addEventListener('DOMContentLoaded', () => {
    new MusicPlayer();
});
