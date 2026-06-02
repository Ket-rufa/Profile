<template>
  <div>
    <!-- Invisible div required for YouTube API player -->
    <div id="youtube-player"></div>

    <!-- Music Control Icon Button (Bottom Right Floating) -->
    <div class="music-control glass" @click="toggleMusicAndPlaylist" :class="{ playing: isPlaying }">
      <i :class="musicIcon"></i>
    </div>

    <!-- Music Playlist Popup -->
    <div class="music-playlist glass" :class="{ show: showPlaylist }">
      <div class="playlist-header">
        <h3>Trình phát nhạc</h3>
        <i class="fas fa-times close-playlist" @click="hidePlaylist"></i>
      </div>
      <div class="current-track">
        <div id="track-name">{{ currentTrack.title }}</div>
        <div class="progress-container">
          <input type="range" id="progress-bar" min="0" max="100" v-model="progress" @input="seek">
        </div>
        <div class="controls">
          <i class="fas fa-step-backward" @click="prevTrack"></i>
          <i :class="playPauseIcon" @click="toggleMusic"></i>
          <i class="fas fa-step-forward" @click="nextTrack"></i>
        </div>
      </div>
      <ul class="playlist-items">
        <li 
          v-for="(track, index) in playlist" 
          :key="track.videoId" 
          :class="{ active: index === currentTrackIndex }" 
          @click="loadTrack(index)"
        >
          <span class="song-title">{{ track.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MusicPlayer',
  data() {
    return {
      showPlaylist: false,
      isPlaying: false,
      currentTrackIndex: 0,
      progress: 0,
      playlist: [
        { title: "Sau Này Em Cưới Ai Rồi Remix", videoId: "yIfne87dhfc" }
      ],
      player: null,
      updateTimer: null
    };
  },
  computed: {
    currentTrack() {
      return this.playlist[this.currentTrackIndex];
    },
    musicIcon() {
      return this.isPlaying ? 'fas fa-compact-disc fa-spin' : 'fas fa-music';
    },
    playPauseIcon() {
      return this.isPlaying ? 'fas fa-pause' : 'fas fa-play';
    }
  },
  mounted() {
    this.loadYouTubeAPI();
  },
  beforeUnmount() {
    if (this.updateTimer) {
      clearInterval(this.updateTimer);
    }
  },
  methods: {
    loadYouTubeAPI() {
      if (window.YT && window.YT.Player) {
        this.onYouTubeIframeAPIReady();
      } else {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady.bind(this);
      }
    },
    onYouTubeIframeAPIReady() {
      if (typeof YT === 'undefined' || !YT.Player) {
        setTimeout(this.onYouTubeIframeAPIReady.bind(this), 100);
        return;
      }
      this.player = new YT.Player('youtube-player', {
        height: '1',
        width: '1',
        videoId: this.currentTrack.videoId,
        playerVars: {
          'autoplay': 0,
          'controls': 0,
          'loop': 0,
          'origin': window.location.origin
        },
        events: {
          'onReady': this.onPlayerReady.bind(this),
          'onStateChange': this.onPlayerStateChange.bind(this),
          'onError': this.onPlayerError.bind(this)
        }
      });
    },
    onPlayerReady() {
      this.player.setVolume(50);
    },
    onPlayerStateChange(event) {
      if (event.data === YT.PlayerState.PLAYING) {
        this.isPlaying = true;
        this.updateTimer = setInterval(this.updateProgress.bind(this), 1000);
      } else {
        this.isPlaying = false;
        clearInterval(this.updateTimer);
        if (event.data === YT.PlayerState.ENDED) {
          this.nextTrack();
        }
      }
    },
    updateProgress() {
      if (!this.player || !this.isPlaying) return;
      try {
        const currentTime = this.player.getCurrentTime();
        const duration = this.player.getDuration();
        if (duration > 0) {
          this.progress = (currentTime / duration) * 100;
        }
      } catch (e) {
        console.error("Error updating progress:", e);
      }
    },
    onPlayerError(event) {
      console.error("YouTube Player Error:", event.data);
      if (event.data === 150 || event.data === 101) {
        alert("Video này không cho phép phát. Đang chuyển bài tiếp theo...");
        this.nextTrack();
      }
    },
    toggleMusicAndPlaylist() {
      if (!this.player || typeof this.player.getPlayerState !== 'function') {
        this.showPlaylist = !this.showPlaylist;
        return;
      }
      const state = this.player.getPlayerState();
      if (state === YT.PlayerState.PLAYING) {
        this.player.pauseVideo();
      } else {
        this.player.playVideo();
      }
      this.showPlaylist = !this.showPlaylist;
    },
    hidePlaylist() {
      this.showPlaylist = false;
    },
    toggleMusic() {
      if (!this.player || typeof this.player.getPlayerState !== 'function') return;
      const state = this.player.getPlayerState();
      if (state === YT.PlayerState.PLAYING) {
        this.player.pauseVideo();
      } else {
        this.player.playVideo();
      }
    },
    prevTrack() {
      this.currentTrackIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
      this.loadTrack(this.currentTrackIndex);
    },
    nextTrack() {
      this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
      this.loadTrack(this.currentTrackIndex);
    },
    loadTrack(index) {
      this.currentTrackIndex = index;
      if (this.player && typeof this.player.loadVideoById === 'function') {
        this.player.loadVideoById(this.playlist[index].videoId);
      }
    },
    seek() {
      if (this.player && typeof this.player.getDuration === 'function') {
        const duration = this.player.getDuration();
        const seekTo = (this.progress / 100) * duration;
        this.player.seekTo(seekTo, true);
      }
    }
  }
};
</script>

<style scoped>
/* Scoped adjustments or imports. Core styles are in style.css but keeping local style tags overrides gracefully */
.music-playlist {
  background: rgba(20, 20, 25, 0.95) !important;
  border: 1px solid rgba(255, 0, 60, 0.2) !important;
}
.music-playlist h3 {
  color: var(--primary) !important;
}
</style>
