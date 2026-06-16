<template>
  <div>
    <!-- Navigation Header -->
    <header class="glass">
      <div class="container">
        <nav>
          <div class="logo">Kết</div>
          <ul class="nav-links">
            <li><a href="#home" class="active">TRANG CHỦ</a></li>
            <li><a href="#about">GIỚI THIỆU</a></li>
            <li><a href="#service">DỊCH VỤ</a></li>
            <li><a href="#projects">DỰ ÁN</a></li>
            <li><a href="#skills">KỸ NĂNG</a></li>
            <li><a href="#contact">LIÊN HỆ</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <div class="container">
      <!-- Hero Section -->
      <section id="home">
        <div class="hero-grid">
          <!-- Hero Left Column -->
          <div class="hero-left">
            <span class="welcome-tag">Chào mừng bạn ghé thăm</span>
            <h1 class="hero-title">
              Xin chào mọi người, tôi là <span class="highlight">Kết</span>
            </h1>
            <p class="hero-desc">
              Tôi là một nhà phát triển web chuyên xây dựng các trang web hiện đại, tương thích tốt và tối ưu hiệu năng tốt nhất. Với thế mạnh chuyên sâu về HTML, CSS và JavaScript.
            </p>

            <!-- Statistics Grid -->
            <div class="stats-grid">
              <div class="stat-card glass" v-for="stat in stats" :key="stat.label">
                <div class="stat-number">{{ stat.number }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            </div>

            <!-- CTA Action Buttons -->
            <div class="cta-group">
              <button class="btn btn-primary" @click="scrollSection('#contact')">
                Liên hệ tôi <i class="fas fa-arrow-right"></i>
              </button>
              <button 
                class="btn btn-secondary btn-download-container" 
                :disabled="isDownloading"
                @click="downloadCV"
              >
                <!-- Loading Progress Bar Background -->
                <div 
                  class="btn-download-bar" 
                  :style="{ width: downloadProgress + '%' }"
                ></div>
                <span class="btn-download-text">
                  {{ isDownloading ? `Đang tải: ${downloadProgress}%` : 'Tải xuống CV' }}
                </span>
              </button>
            </div>

            <!-- Social Media Handles -->
            <div class="social-group">
              <a 
                v-for="social in socials" 
                :key="social.icon" 
                :href="social.href" 
                target="_blank" 
                class="social-btn"
              >
                <i :class="social.icon"></i>
              </a>
            </div>
          </div>

          <!-- Hero Right Column (Smartphone Mockup with Video) -->
          <div class="hero-right-wrapper">
            <!-- Vertical Navigation Arrows -->
            <div class="nav-scroll-controls">
              <div class="scroll-arrow" @click="scrollSection('#home')">
                <i class="fas fa-chevron-up"></i>
              </div>
              <div class="scroll-arrow" @click="scrollSection('#projects')">
                <i class="fas fa-chevron-down"></i>
              </div>
            </div>

            <!-- Widescreen Video Card Container -->
            <div class="video-card-frame">

              <div class="phone-screen">
                <video 
                  ref="phoneVideo"
                  class="phone-video"
                  src="/anime.mp4"
                  autoplay
                  loop
                  muted
                  playsinline
                ></video>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section id="about">
        <div class="about-grid">
          <!-- About Left Column (Anime Card with Experience Badge) -->
          <div class="about-left">
            <div class="about-card-frame">
              <!-- Floating Badge -->
              <div class="about-badge">
                <div class="about-badge-num">1+</div>
                <div class="about-badge-text">Năm kinh nghiệm</div>
              </div>
              <div class="about-card-screen">
                <video 
                  class="about-card-video"
                  src="/anime.mp4"
                  autoplay
                  loop
                  muted
                  playsinline
                ></video>
              </div>
            </div>
          </div>

          <!-- About Right Column (Information & Location/Phone) -->
          <div class="about-right">
            <h2 class="about-title">Giới thiệu về <span>tôi</span></h2>
            <p class="about-desc">
              Xin chào, tôi tên là Kết. Tôi là một nhà phát triển web và nhà thiết kế sáng tạo có niềm đam mê mạnh mẽ trong việc tạo dựng các trải nghiệm kỹ thuật số không chỉ đầy đủ chức năng mà còn mang tính thẩm mỹ cao. Tôi tin rằng những sản phẩm tuyệt vời luôn được tạo ra từ sự kết hợp giữa logic chính xác và khả năng sáng tạo không giới hạn. Hành trình làm web của tôi bắt đầu từ sự tò mò sâu sắc về cách các trang web tương tác và vận hành động. Giờ đây, tôi tập trung vào việc hỗ trợ khách hàng và các dự án chuyển đổi những ý tưởng phức tạp thành các giải pháp đơn giản và tinh tế. Đối với tôi, những chi tiết nhỏ nhất chính là sự khác biệt giữa kết quả 'tốt' và kết quả 'phi thường'.
            </p>

            <!-- Info Boxes -->
            <div class="about-info-boxes">
              <div class="about-info-card glass">
                <i class="fas fa-map-marker-alt about-icon"></i>
                <div class="about-info-content">
                  <h3>Địa chỉ của tôi</h3>
                  <p>Hà Nội, Việt Nam</p>
                </div>
              </div>

              <div class="about-info-card glass red-card-border">
                <i class="fas fa-phone-alt about-icon"></i>
                <div class="about-info-content">
                  <h3>Số điện thoại</h3>
                  <p>+84 123 456 789</p>
                </div>
              </div>
            </div>

            <!-- CTA Download CV -->
            <button 
              class="btn btn-secondary about-cv-btn btn-download-container" 
              :disabled="isDownloading"
              @click="downloadCV"
            >
              <!-- Loading Progress Bar Background -->
              <div 
                class="btn-download-bar" 
                :style="{ width: downloadProgress + '%' }"
              ></div>
              <span class="btn-download-text">
                {{ isDownloading ? `Đang tải: ${downloadProgress}%` : 'Tải xuống CV' }}
              </span>
            </button>
          </div>
        </div>
      </section>


      <!-- Services Section -->
      <section id="service">
        <div class="section-header">
          <h2>Dịch vụ của <span>tôi</span></h2>
          <p class="section-subtitle">Những giải pháp tôi có thể hỗ trợ để biến ý tưởng của bạn thành sản phẩm hoàn chỉnh.</p>
        </div>

        <div class="services-grid">
          <div class="service-card glass" v-for="service in services" :key="service.title">
            <div class="service-icon">
              <i :class="service.icon"></i>
            </div>
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
            <div class="service-tags">
              <span v-for="tag in service.tags" :key="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </section>      <!-- Projects Section -->
      <section id="projects">
        <div class="section-header">
          <h2>Dự án tiêu biểu của <span>tôi</span></h2>
        </div>

        <div class="projects-grid">
          <a
            class="project-card glass project-link-card"
            v-for="project in projects"
            :key="project.title"
            :href="project.link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div class="project-img-wrapper">
              <img :src="project.img" :alt="project.title" class="project-img" />
            </div>
            <div class="project-body">
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
              <span class="project-github-link">Xem project trên GitHub <i class="fas fa-arrow-up-right-from-square"></i></span>
            </div>
          </a>
        </div>
      </section>

      <!-- Contact Section -->
      <section id="contact">
        <div class="section-header">
          <h2>Liên hệ với <span>tôi</span></h2>
          <p class="section-subtitle">Hãy kết nối với tôi qua các kênh dưới đây để trao đổi công việc, hợp tác hoặc đơn giản là chào hỏi.</p>
        </div>

        <div class="contact-grid">
          <a
            v-for="contact in contacts"
            :key="contact.label"
            :href="contact.href"
            :target="contact.target"
            rel="noopener noreferrer"
            class="contact-card glass"
            :style="{ '--contact-color': contact.color }"
          >
            <div class="contact-icon">
              <i :class="contact.icon"></i>
            </div>
            <div class="contact-info">
              <h3>{{ contact.label }}</h3>
              <p>{{ contact.value }}</p>
            </div>
            <i class="fas fa-arrow-up-right-from-square contact-arrow"></i>
          </a>
        </div>
      </section>
    </div>

    <!-- Footer -->
    <footer>
      <div class="container">
        <p>&copy; 2026 Được thiết kế bởi <strong>Kết.</strong> Bảo lưu mọi quyền.</p>
      </div>
    </footer>
    <!-- Background Music Player Component -->
    <MusicPlayer />
  </div>
</template>

<script>
import MusicPlayer from './components/MusicPlayer.vue';

export default {
  name: 'App',
  components: {
    MusicPlayer
  },
  data() {
    return {
      isDownloading: false,
      downloadProgress: 0,
      isVideoPlaying: true,
      stats: [
        { number: '40+', label: 'Dự án hoàn thành' },
        { number: '1+', label: 'Năm kinh nghiệm' },
        { number: '0+', label: 'Khách hàng hài lòng' }
      ],
      socials: [
        { href: 'https://www.facebook.com/ket.nguyenvan.587268/', icon: 'fab fa-facebook-f' },
        { href: 'https://github.com/', icon: 'fab fa-github' },
        { href: 'https://linkedin.com/', icon: 'fab fa-linkedin-in' },
        { href: 'https://tiktok.com/', icon: 'fab fa-tiktok' }
      ],
      services: [
        {
          title: 'Web Development',
          description: 'Xây dựng website responsive, hiệu năng cao, chuẩn SEO và phù hợp với mục tiêu kinh doanh của bạn.',
          icon: 'fas fa-code',
          tags: ['HTML', 'CSS', 'JavaScript', 'Vue']
        },
        {
          title: 'UI/UX Designer',
          description: 'Thiết kế giao diện trực quan, hiện đại và tối ưu trải nghiệm người dùng cho web hoặc ứng dụng.',
          icon: 'fas fa-pen-nib',
          tags: ['Figma', 'Canva', 'Prototype']
        },
        {
          title: 'IT Support & Hardware',
          description: 'Hỗ trợ kỹ thuật, xử lý sự cố phần mềm/phần cứng, cài đặt hệ thống và tư vấn cấu hình máy tính.',
          icon: 'fas fa-laptop',
          tags: ['PC Build', 'Windows', 'Troubleshoot']
        },
        {
          title: 'Mobile App Design',
          description: 'Thiết kế giao diện app mobile hiện đại, dễ sử dụng, tối ưu trải nghiệm người dùng trên Android và iOS.',
          icon: 'fas fa-mobile-screen-button',
          tags: ['Mobile UI', 'App UX', 'Android']
        }
      ],
      projects: [
        {
          title: 'gametetris',
          description: 'Dự án game Tetris được xây dựng bằng C++, mô phỏng trò chơi xếp gạch cổ điển với giao diện đơn giản và dễ chơi.',
          img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80',
          link: 'https://github.com/Ket-rufa/game-tetris'
        },
        {
          title: 'Profile',
          description: 'Website profile cá nhân giới thiệu thông tin, kỹ năng, dự án và cách liên hệ theo phong cách hiện đại.',
          img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
          link: 'https://github.com/Ket-rufa/Profile'
        },
        {
          title: 'cham_soc_cay_trong',
          description: 'Ứng dụng chăm sóc cây trồng phát triển bằng Dart, hỗ trợ quản lý và theo dõi quá trình chăm sóc cây.',
          img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80',
          link: 'https://github.com/Ket-rufa/cham_soc_cay_trong'
        }
      ],
      contacts: [
        {
          label: 'Facebook',
          value: 'ket.nguyenvan.587268',
          icon: 'fab fa-facebook-f',
          href: 'https://www.facebook.com/ket.nguyenvan.587268/',
          target: '_blank',
          color: '#1877F2'
        },
        {
          label: 'Zalo',
          value: '0348644630',
          icon: 'fas fa-comment-dots',
          href: 'https://zalo.me/0348644630',
          target: '_blank',
          color: '#0068FF'
        },
        {
          label: 'Telegram',
          value: '@ketrufa',
          icon: 'fab fa-telegram-plane',
          href: 'https://t.me/ketrufa',
          target: '_blank',
          color: '#229ED9'
        },
        {
          label: 'Instagram',
          value: '@v.k3t_',
          icon: 'fab fa-instagram',
          href: 'https://www.instagram.com/v.k3t_/',
          target: '_blank',
          color: '#E1306C'
        },
        {
          label: 'Gmail',
          value: 'nket865@gmail.com',
          icon: 'fas fa-envelope',
          href: 'mailto:nket865@gmail.com',
          target: '_self',
          color: '#EA4335'
        }
      ]
    };
  },
  methods: {
    scrollSection(selector) {
      const el = document.querySelector(selector);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    downloadCV() {
      if (this.isDownloading) return;
      this.isDownloading = true;
      this.downloadProgress = 0;
      
      const interval = setInterval(() => {
        this.downloadProgress += 2;
        if (this.downloadProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            alert("Tải xuống hồ sơ năng lực (CV) của Kết thành công!");
            this.isDownloading = false;
            this.downloadProgress = 0;
          }, 300);
        }
      }, 40);
    },
    toggleVideoPlay() {
      const video = this.$refs.phoneVideo;
      if (!video) return;
      
      if (this.isVideoPlaying) {
        video.pause();
        this.isVideoPlaying = false;
      } else {
        video.play();
        this.isVideoPlaying = true;
      }
    }
  }
};
</script>

<style>
/* Global resets or variables can be kept here if needed */
.project-link-card {
  display: block;
  text-decoration: none;
  color: inherit;
}

.project-github-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  font-weight: 600;
}
</style>








