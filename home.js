const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const cd = $('.cd');
const playbtn = $('.btn-toggle-play');
const heading = $('header h2');
const cdthumb = $('.cd-thumb');
const audio = $('#audio');
const player = $('.player');
const seek = $('.progress');
const btnNextSong = $('.btn-next');
const btnPrevSong = $('.btn-prev');

const app = {
    currentIndexSong: 0,
    isPlaySong: false,

    songs: [
        {
            name: 'Nevada',
            singer: 'Vicetone',
            path: './assets/Music/Nevada.mp4',
            image: './assets/Image/Nevada.jpg'
        },
        {
            name: 'Monody',
            singer: 'TheFatRat',
            path: './assets/Music/TheFatRat.mp4',
            image: './assets/Image/TheFatRat.jpg'
        },
        {
            name: 'DJ DESA REMIX',
            singer: 'Lemon Tree',
            path: './assets/Music/DJDesaRemix.mp4',
            image: './assets/Image/DJDesaRemix.jpg'
        },
        {
            name: 'Sugar',
            singer: 'Maroon 5',
            path: './assets/Music/Sugar.mp4',
            image: './assets/Image/Sugar.jpg'
        },
        {
            name: 'Summertime',
            singer: 'K-391',
            path: './assets/Music/Summertime.mp4',
            image: './assets/Image/Summertime.jpg'
        },
        {
            name: 'Attention',
            singer: 'Charlie Puth',
            path: './assets/Music/CharliePuth.mp4',
            image: './assets/Image/CharliePuth.png'
        },
        {
            name: 'Katie Sky',
            singer: 'Monsters',
            path: './assets/Music/KatieSky.mp4',
            image: './assets/Image/KatieSky.jpg'
        },
        {
            name: 'My Love',
            singer: 'Westlife',
            path: './assets/Music/MyLove.mp4',
            image: './assets/Image/MyLove.jpg'
        }
    ],

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndexSong]
            }
        })
    },

    render: function () {
        const htmlSongs = this.songs.map(song => {
            return `
            <div class="song">
                <div class="thumb"
                    style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        });
        $('.playlist').innerHTML = htmlSongs.join('');
    },

    handleEvents: function () {
        const _this = this;
        const cdWidth = cd.offsetWidth;

        // Xử lý CD quay/ dừng
        const CDThumbAnimate = cdthumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000, // quay 1 vòng hết 10s
            iterations: Infinity
        })
        CDThumbAnimate.pause();
        
        // Xử lý CD khi scroll
        document.onscroll = function () {
            const cdScrollY = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - cdScrollY;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        // Click Play/ Pause
        playbtn.onclick = function () {
            if (_this.isPlaySong) {
                audio.pause();
            } else {
                audio.play();
            }
        }

        // Khi Song được play
        audio.onplay = function () {
            _this.isPlaySong = true;
            player.classList.add('playing');
            CDThumbAnimate.play();
        }

        // Khi Song bị pause
        audio.onpause = function () {
            _this.isPlaySong = false;
            player.classList.remove('playing');
            CDThumbAnimate.pause();
        }

        // Khi tiến độ Song thay đổi
        audio.ontimeupdate = function () {
            if(audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
            }
        }

        // Khi tua Song
        progress.onchange = function () {
            const changeProgressPosition = progress.value * audio.duration / 100;
            audio.currentTime = changeProgressPosition;
        }

        // Khi next Song
        btnNextSong.onclick = function () {
            _this.nextSong();
            audio.play();
        }

        // Khi prev Song
        btnPrevSong.onclick = function () {
            _this.prevSong();
            audio.play();
        }

    },

    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdthumb.style.backgroundImage = `url(${this.currentSong.image})`;
        audio.src = this.currentSong.path;
    },

    nextSong: function () {
        this.currentIndexSong++;
        if(this.currentIndexSong >= this.songs.length) {
            this.currentIndexSong = 0;
        }
        this.loadCurrentSong();
    },

    prevSong: function () {
        this.currentIndexSong--;
        if(this.currentIndexSong < 0) {
            this.currentIndexSong = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },

    start: function() {
        // Định nghĩa các thuộc tính cho obj
        this.defineProperties();

        // Xử lý event
        this.handleEvents();

        // Load Song hiện tại lên Ui
        this.loadCurrentSong()

        // Hiển thị danh sách Songs
        this.render();
    }
}

app.start();