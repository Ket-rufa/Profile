// ============================================================
// === Legacy Code (only runs if Vue.js is NOT on the page) ===
// ============================================================
if (typeof Vue === 'undefined') {

    // === Digital Clock ===
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        document.getElementById('clock').innerText = `${hours}:${minutes}`;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // === Sakura Animation ===
    const canvas = document.getElementById('sakura-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let petals = [];
    const numPetals = 50;

    class Petal {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 15 + 5;
            this.speed = Math.random() * 2 + 1;
            this.angle = Math.random() * 360;
            this.spin = Math.random() < 0.5 ? -1 : 1;
            this.color = `rgba(255, 183, 178, ${Math.random() * 0.5 + 0.3})`;
        }

        update() {
            this.y += this.speed;
            this.x += Math.sin(this.angle * Math.PI / 180) * 1;
            this.angle += this.spin;
            if (this.y > canvas.height) {
                this.y = -20;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle * Math.PI / 180);
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size, 0, 0, this.size);
            ctx.bezierCurveTo(-this.size, 0, -this.size / 2, -this.size / 2, 0, 0);
            ctx.fill();
            ctx.restore();
        }
    }

    function initPetals() {
        for (let i = 0; i < numPetals; i++) {
            petals.push(new Petal());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        petals.forEach(petal => {
            petal.update();
            petal.draw();
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    initPetals();
    animate();

    // === Music Player Logic (YouTube API) ===
    var player;
    var isPlaying = false;
    var currentTrackIndex = 0;
    var updateTimer;

    const playlist = [
        { title: "List Nhạc Của Tôi", videoId: "Thf6-faRGI4" },
        { title: "At My Worst - Pink Sweat$", videoId: "hjYOanJelUs" }
    ];

    const musicBtn = document.querySelector('.music-control');
    const musicIcon = document.getElementById('music-icon');
    const playlistPopup = document.querySelector('.music-playlist');
    const closePlaylistBtn = document.querySelector('.close-playlist');
    const trackNameEl = document.getElementById('track-name');
    const progressBar = document.getElementById('progress-bar');
    const prevBtn = document.getElementById('prev-btn');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const nextBtn = document.getElementById('next-btn');
    const playlistItems = document.querySelectorAll('.playlist-items li');

    function onYouTubeIframeAPIReady() {
        console.log("YouTube API Ready");
        player = new YT.Player('youtube-player', {
            height: '1',
            width: '1',
            videoId: playlist[currentTrackIndex].videoId,
            playerVars: {
                'autoplay': 0,
                'controls': 0,
                'loop': 0,
                'origin': window.location.origin
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange,
                'onError': onPlayerError
            }
        });
    }

    function onPlayerReady(event) {
        console.log("Player Ready");
        player.setVolume(50);
        updateTrackInfo();

        musicBtn.onclick = () => { playlistPopup.classList.toggle('show'); };
        closePlaylistBtn.onclick = () => { playlistPopup.classList.remove('show'); };
        playPauseBtn.onclick = toggleMusic;

        prevBtn.onclick = () => {
            currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
            loadTrack(currentTrackIndex);
        };
        nextBtn.onclick = () => {
            currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
            loadTrack(currentTrackIndex);
        };
        playlistItems.forEach((item, index) => {
            item.onclick = () => { currentTrackIndex = index; loadTrack(currentTrackIndex); };
        });
        progressBar.oninput = () => {
            const duration = player.getDuration();
            const seekTo = (progressBar.value / 100) * duration;
            player.seekTo(seekTo, true);
        };
    }

    function loadTrack(index) {
        currentTrackIndex = index;
        player.loadVideoById(playlist[index].videoId);
        updateTrackInfo();
        playlistItems.forEach(item => item.classList.remove('active'));
        playlistItems[index].classList.add('active');
    }

    function updateTrackInfo() {
        trackNameEl.innerText = playlist[currentTrackIndex].title;
    }

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING) {
            isPlaying = true;
            musicIcon.className = 'fas fa-compact-disc fa-spin';
            playPauseBtn.className = 'fas fa-pause';
            musicBtn.classList.add('playing');
            updateTimer = setInterval(updateProgress, 1000);
        } else {
            isPlaying = false;
            musicIcon.className = 'fas fa-music';
            playPauseBtn.className = 'fas fa-play';
            musicBtn.classList.remove('playing');
            clearInterval(updateTimer);
            if (event.data == YT.PlayerState.ENDED) { nextBtn.click(); }
        }
    }

    function updateProgress() {
        if (!player || !isPlaying) return;
        const currentTime = player.getCurrentTime();
        const duration = player.getDuration();
        if (duration > 0) {
            progressBar.value = (currentTime / duration) * 100;
        }
    }

    function onPlayerError(event) {
        console.error("YouTube Player Error:", event.data);
        if (event.data === 150 || event.data === 101) {
            alert("Video này không cho phép phát. Đang chuyển bài tiếp theo...");
            nextBtn.click();
        }
    }

    function toggleMusic() {
        if (!player) return;
        const state = player.getPlayerState();
        if (state === YT.PlayerState.PLAYING) { player.pauseVideo(); }
        else { player.playVideo(); }
    }

    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

} // end if (typeof Vue === 'undefined')


// ============================================================
// === 3D Model Viewer — Three.js r128 (luôn chạy)         ===
// ============================================================
window.addEventListener('load', function () {

    // --- Kiểm tra dependencies ---
    if (typeof THREE === 'undefined') {
        console.error('[3D] THREE.js chưa được tải. Kiểm tra CDN:');
        console.error('     https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
        showFallback3D();
        return;
    }

    if (typeof THREE.GLTFLoader === 'undefined') {
        console.error('[3D] GLTFLoader chưa được tải. Kiểm tra CDN:');
        console.error('     https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js');
        showFallback3D();
        return;
    }

    function showFallback3D() {
        var fb = document.querySelector('.three-fallback');
        if (fb) fb.style.display = 'block';
    }

    // --- Tìm canvas và container ---
    var canvas3d = document.getElementById('profile3d');
    if (!canvas3d) {
        console.error('[3D] Không tìm thấy <canvas id="profile3d">. Kiểm tra index.html.');
        return;
    }

    var container3d = canvas3d.parentElement;
    if (!container3d) {
        console.error('[3D] Không tìm thấy container .hero-3d-box');
        return;
    }

    var W = container3d.clientWidth  || 400;
    var H = container3d.clientHeight || 500;

    // --- Scene ---
    var scene = new THREE.Scene();

    // --- Camera ---
    var camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100);
    camera.position.set(0, 0, 4);

    // --- Renderer (transparent background) ---
    var renderer = new THREE.WebGLRenderer({ canvas: canvas3d, alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    try { renderer.outputEncoding = THREE.sRGBEncoding; } catch (e) { /* r149+ uses outputColorSpace */ }

    // --- Ánh sáng ---
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));

    var blueLight = new THREE.DirectionalLight(0x38bdf8, 1.5); // xanh dương accent
    blueLight.position.set(3, 5, 5);
    scene.add(blueLight);

    var pinkLight = new THREE.PointLight(0xf43f5e, 1.0, 15);  // hồng accent
    pinkLight.position.set(-4, 2, 3);
    scene.add(pinkLight);

    var fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
    fillLight.position.set(0, -5, 3);
    scene.add(fillLight);

    // --- Theo dõi chuột ---
    var mouseX = 0, mouseY = 0;
    var targetRotX = 0, targetRotY = 0;

    container3d.addEventListener('mousemove', function (e) {
        var rect = container3d.getBoundingClientRect();
        mouseX =  ((e.clientX - rect.left)  / rect.width  - 0.5) * 2;
        mouseY = -((e.clientY - rect.top)   / rect.height - 0.5) * 2;
    });

    container3d.addEventListener('mouseleave', function () {
        mouseX = 0;
        mouseY = 0;
    });

    // --- Load model ---
    var model3d  = null;
    var autoRotY = 0;

    var loader = new THREE.GLTFLoader();
    console.log('[3D] Bắt đầu tải: Model%203D/faceme.glb');

    loader.load(
        'Model%203D/faceme.glb',

        // onLoad
        function (gltf) {
            console.log('[3D] Model tải thành công!', gltf);
            model3d = gltf.scene;

            // Auto-scale cho vừa khung nhìn
            var box = new THREE.Box3().setFromObject(model3d);
            var size = new THREE.Vector3();
            box.getSize(size);
            var maxDim     = Math.max(size.x, size.y, size.z);
            var scaleFactor = 2.5 / maxDim;
            model3d.scale.setScalar(scaleFactor);

            // Căn giữa model
            var center = new THREE.Vector3();
            box.getCenter(center);
            model3d.position.set(
                -center.x * scaleFactor,
                -center.y * scaleFactor,
                -center.z * scaleFactor
            );

            scene.add(model3d);
            console.log('[3D] Đã thêm vào scene. Scale: ' + scaleFactor.toFixed(4));
        },

        // onProgress
        function (xhr) {
            if (xhr.total > 0) {
                console.log('[3D] Đang tải: ' + (xhr.loaded / xhr.total * 100).toFixed(1) + '%');
            } else {
                console.log('[3D] Đang tải... (' + xhr.loaded + ' bytes)');
            }
        },

        // onError
        function (error) {
            console.error('[3D] Lỗi tải model:', error);
            console.error('[3D] ── Hướng dẫn kiểm tra lỗi 404 ──────────────────────');
            console.error('[3D]  1. Mở DevTools (F12) → tab "Network"');
            console.error('[3D]  2. Reload trang → tìm request "face.glb"');
            console.error('[3D]  3. Nếu Status = 404 → sai đường dẫn');
            console.error('[3D]  4. Đường dẫn đang dùng : Model%203D/faceme.glb');
            console.error('[3D]  5. File phải tồn tại tại: K:\\web profile\\Model 3D\\faceme.glb');
            console.error('[3D]  6. Server phải khởi động từ thư mục: K:\\web profile');
            console.error('[3D] ──────────────────────────────────────────────────────');
            showFallback3D();
        }
    );

    // --- Vòng lặp render ---
    function animate3D() {
        requestAnimationFrame(animate3D);

        autoRotY += 0.005; // tự xoay chậm

        if (model3d) {
            // Làm mịn phản ứng chuột
            targetRotX += (mouseY * 0.30 - targetRotX) * 0.05;
            targetRotY += (mouseX * 0.30 - targetRotY) * 0.05;

            model3d.rotation.x = targetRotX;
            model3d.rotation.y = autoRotY + targetRotY;
        }

        renderer.render(scene, camera);
    }
    animate3D();

    // --- Cập nhật khi resize cửa sổ ---
    window.addEventListener('resize', function () {
        var w = container3d.clientWidth;
        var h = container3d.clientHeight;
        if (w > 0 && h > 0) {
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        }
    });

    console.log('[3D] Three.js r128 — scene khởi tạo thành công');
});
