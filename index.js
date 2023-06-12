// Script ID for object detection
const scriptID = 'saviJSON'

const jsonObject = [
    {
        role: 'play-pause',
        isLottieNeeded: true,
        toggleWithLoader: true,
        lottie_url: "https://assets3.lottiefiles.com/datafiles/oy40tKMzjbuByYM/data.json",
        animation_start: '0',
        animation_end: '50'
    },
    {
        role: 'mute-unmute',
        isLottieNeeded: true,
        lottie_url: "https://assets8.lottiefiles.com/packages/lf20_tGCilb/mute%20unmute.json",
        animation_start: '0',
        animation_end: '20'
    },
    {
        role: 'loader',
        isLottieNeeded: true
    }
]

window.addEventListener('load', async () => {
    let videoPlayerElements = {}
    for (const [key, value] of Object.entries(videoPlayerAttributes)) {
        // console.log(key, value);
        if (document.querySelector(value.attribute) !== null) {
            videoPlayerAttributes[key].element = document.querySelector(value.attribute)
            videoPlayerElements[key] = videoPlayerAttributes[key]
            // videoPlayerElements[key] = document.querySelector(value)
        }

    }
    videoPlayerLogic({ videoPlayerElements, jsonObject })
})



export function readJsonFromScript() {
    if (document.getElementById('saviJSON')) {
        return JSON.parse(document.getElementById('saviJSON').textContent.trim())
    } else return null
}

export const videoPlayerAttributes = {
    videoPlyrContainer: { attribute: "[custom_video-player]", role: "player", element: null, functionName: "Player" },
    playPauseBtnContainer: { attribute: "[play-pause-btn]", role: "play-pause", element: null, functionName: "PlayPauseBtn" },
    muteUnmuteBtnContainer: { attribute: "[mute-unmute-btn]", role: "mute-unmute", element: null, functionName: "MuteUnmuteBtn" },
    playBtnContainer: { attribute: "[play-btn]", role: "play", element: null, functionName: "PlayBtn" },
    pauseBtnContainer: { attribute: "[pause-btn]", role: "pause", element: null, functionName: "PauseBtn" },
    muteBtnContainer: { attribute: "[mute-btn]", role: "mute", element: null, functionName: "MuteBtn" },
    unmuteBtnContainer: { attribute: "[unmute-btn]", role: "unmute", element: null, functionName: "UnmuteBtn" },
    loaderContainer: { attribute: "[loader]", role: "loader", element: null, functionName: "Loader" },
    currentTime: { attribute: "[current-time]", role: "current-time", element: null, functionName: "CurrentTime" },
    totalTime: { attribute: "[total-time]", role: "total-time", element: null, functionName: "TotalTime" },
    volumeControl: { attribute: "[volume-control]", role: "volume-control", element: null, functionName: "VolumeControl" },
    miniplayer: { attribute: "[miniplayer]", role: "miniplayer", element: null, functionName: "MiniPlayer" },
    fullScreen: { attribute: "[full-screen]", role: "full-screen", element: null, functionName: "FullScreen" },
    theaterMode: { attribute: "[theater-mode]", role: "theater-mode", element: null, functionName: "TheaterMode" },
    skipForward: { attribute: "[skip-forward]", role: "skip-forward", element: null, functionName: "skipForward" },
    skipBackward: { attribute: "[skip-backward]", role: "skip-backward", element: null, functionName: "skipBackward" },
    seekbar: { attribute: "[video-seeker]", role: "video-seeker", element: null, functionName: "handleSeekbar" },
    speedDropDown: { attribute: "[video-speed-dropdown]", role: "video-speed", element: null, functionName: "handlePlayBackRate" }

}

var video
var obj
var container
var loaderElement
var toggleWithLoader
import './styles.css'
export const videoPlayerLogic = (data) => {
    const { videoPlayerElements, jsonObject } = data
    video = videoPlayerElements.videoPlyrContainer.element.querySelector('video')
    container = videoPlayerElements.videoPlyrContainer.element
    obj = videoPlayerElements
    const functions = {
        Player,
        PlayBtn,
        PauseBtn,
        PlayPauseBtn,
        MuteBtn,
        UnmuteBtn,
        MuteUnmuteBtn,
        VolumeControl,
        MiniPlayer,
        FullScreen,
        TheaterMode,
        skipBackward,
        skipForward,
        handlePlayBackRate,
    };

    Object.keys(videoPlayerElements).forEach((key) => {
        const attribute = videoPlayerElements[key];
        const functionName = attribute.functionName;
        if (functionName && functions[functionName]) {
            functions[functionName](attribute, video);
        }
        if (attribute.role === 'loader' && attribute.element !== null) loaderElement = attribute.element
    });

    jsonObject.forEach(ele => {
        console.log(ele)
        Object.keys(videoPlayerElements).forEach((key) => {
            let obj = videoPlayerElements[key]
            if (videoPlayerElements[key].role === ele.role) {
                // console.log(videoPlayerElements[key])
                if (ele.isLottieNeeded) {
                    addLottieAnimation(videoPlayerElements[key], ele) 
                    obj.lottie_url = ele.lottie_url
                    obj.animation_start = ele.animation_start
                    obj.animation_end = ele.animation_end
                    obj.isLottieNeeded = ele.isLottieNeeded
                }
                if (ele.toggleWithLoader) toggleWithLoader = videoPlayerElements[key]
            }
        })
    })
}

const addLottieAnimation = (containerObj, lottieObj) => {
    // console.log(ele)
    containerObj.lottieAnimation = lottie.loadAnimation({
        container: containerObj.element, // the DOM element
        renderer: 'svg', // 'svg', 'canvas', 'html'
        loop: false,
        autoplay: false,
        path: lottieObj.lottie_url // path to the animation JSON
    });
}

const playLottieAnimation = (ele) => {
    // console.log(ele)
    if (ele.animation_end && ele.animation_start)
        ele.lottieAnimation.playSegments([ele.animation_start, ele.animation_end], true);
    else console.log(`animation_start and animation_end missing for ${ele.role}`)
}

const playReverseLottieAnimation = (ele) => {
    // console.log(ele)
    if (ele.animation_end && ele.animation_start)
        ele.lottieAnimation.playSegments([ele.animation_end, ele.animation_start], true);
    else console.log(`animation_start and animation_end missing for ${ele.role}`)
}



const handleVideoEnd = () => {
    // console.log("hereeee")
    video.addEventListener("ended", () => {
        // console.log("Video has ended");
        video.currentTime = 0
        handlePause()
        showControls()

    });
}
let hideTimeOut
let hideTime = 1500
const hideControls = () => {
    hideTimeOut = setTimeout(() => {
        Object.keys(obj).forEach((attribute) => {
            if (obj[attribute].element && attribute !== "videoPlyrContainer") {
                obj[attribute].element.style.display = 'none';
            }
        });
        document.querySelector('[control-panel]').style.display = 'none'
    }, hideTime);
}

const showControls = () => {
    if (hideTimeOut) clearTimeout(hideTimeOut)
    Object.keys(obj).forEach((attribute) => {
        if (obj[attribute].element && attribute !== "videoPlyrContainer") {
            obj[attribute].element.style.display = '';
        }
    });
    document.querySelector('[control-panel]').style.display = ''
}

const handlePlayPauseVideo = (ele) => {

    if (video.getAttribute('is-started')) {
        video.play()
        if (ele.isLottieNeeded && ele.lottieAnimation)
            playLottieAnimation(ele)
        video.muted = true
    } else {
        video.setAttribute('is-started', 'true')
        var cusplayer = dashjs.MediaPlayer().create();
        cusplayer.initialize(
            video,
            video.getAttribute("dashURL"),
            true
        );
        showLoader()
        video.muted = true
        handleCurrentTime(obj.currentTime)
        handleTotalTime(obj.totalTime)
        handleSeekbar(obj.seekbar)
        console.log(ele)
        if (ele.isLottieNeeded && ele.lottieAnimation) {
            playLottieAnimation(ele)
            console.log("first")
        }
    }
    handlePlayerState()
    handleVideoEnd()
    obj["videoPlyrContainer"].element.addEventListener('mouseover', showControls);
    getMouseStatus()
}

const Player = (ele) => {
    // console.log(ele)

}
function PlayBtn(ele) {
    ele.element.addEventListener('click', () => {
        if (video.getAttribute('is-started') && video.paused) {
            video.play()
            handlePlayerState()
        } else if (!video.getAttribute('is-started')) handlePlayPauseVideo(ele)

    })
}

const handlePlayerState = () => {
    video.addEventListener('canplaythrough', () => {
        console.log("here")
        hideLoader();
        // videoElement.play();
    });

    // Network stall handling
    video.addEventListener('stalled', () => {
        console.error('Network issues. Please check your connection.');
        hideLoader();
    });

    // Error handling
    video.addEventListener('error', () => {
        console.error('An error occurred while loading the video.');
        hideLoader();
    });
    // console.log(video.defaultPlaybackRate)
}

const handlePlayBackRate = (ele) => {
    // console.log("playbackrate", ele.element.querySelectorAll('a'))
    const rates = ele.element.querySelectorAll('a')
    if (rates && rates.length > 0) {
        rates.forEach(rate => {
            rate.addEventListener('click', () => {
                const value = rate.getAttribute('playback-rate')
                // console.log('clicked', rate.getAttribute('playback-rate'))
                if (value) {
                    video.playbackRate = value
                    ele.element.classList.remove('w--open')
                    document.querySelector('[playback-rate-dropdown]').classList.remove('w--open')
                    document.querySelector('[playback-rate-dropdown]').setAttribute('aria-expanded', 'false')
                }
                else console.log(`${ele.attribute} not found`)

                // console.log(video.playbackRate)
            })
        })
    }
}

const PauseBtn = (ele) => {
    ele.element.addEventListener('click', () => {
        if (!video.paused)
            handlePause(ele)
    })
}
const PlayPauseBtn = (ele) => {
    ele.element.addEventListener('click', () => {
        if (video.paused) {
            handlePlayPauseVideo(ele)
        } else {
            handlePause(ele)
        }
    })

}
const handlePause = (ele) => {
    video.pause()
    if (ele.animation_end && ele.animation_start)
        playReverseLottieAnimation(ele)
}
const skipBackward = (ele) => {
    ele.element.addEventListener('click', () => {
        video.currentTime = video.currentTime - 10
    })

}
const skipForward = (ele) => {
    ele.element.addEventListener('click', () => {
        video.currentTime = video.currentTime + 10
    })

}
const MuteBtn = (ele) => {
    ele.element.addEventListener('click', () => {
        video.muted = true
        if (ele.isLottieNeeded && ele.lottieAnimation)
            playReverseLottieAnimation(ele)
    })
}
const UnmuteBtn = (ele) => {
    ele.element.addEventListener('click', () => {
        video.muted = false
        if (ele.isLottieNeeded && ele.lottieAnimation)
            playLottieAnimation(ele)
    })

}
const MuteUnmuteBtn = (ele) => {
    ele.element.addEventListener('click', () => {
        console.log(ele.role)
        if (ele.isLottieNeeded && ele.lottieAnimation)
            if (video.muted)
                playLottieAnimation(ele)
            else playReverseLottieAnimation(ele)
        video.muted = !video.muted
    })

}
const handleCurrentTime = (ele) => {
    let currentTime
    video.addEventListener('timeupdate', () => {
        currentTime = video.currentTime
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        const formattedTime = `${minutes.toString().padStart(2, '0')}:${formattedSeconds.toString().padStart(2, '0')}`;
        ele.element.innerText = formattedTime
    });
}
const handleTotalTime = (ele) => {
    let TotalTime
    const interval = setInterval(() => {
        TotalTime = video.duration
        const minutes = Math.floor(TotalTime / 60);
        const seconds = Math.floor(TotalTime % 60);
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        const formattedTime = `${minutes.toString().padStart(2, '0')}:${formattedSeconds.toString().padStart(2, '0')}`;
        ele.element.innerText = formattedTime
        if (TotalTime) clearInterval(interval)
    }, 200);
}
const VolumeControl = (ele) => {
    const rangeSliderContainer = document.querySelector('.range-slider_wrapper.is-volume');
    const rangeSliderThumb = document.querySelector('[volume-slider_thumb]');
    const rangeSliderProgress = document.querySelector('[volume-slider_progress]');
    video.volume = 1;

    let isDragging = false;

    rangeSliderContainer.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isDragging = true;
        updateSliderPosition(e.clientX);
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        updateSliderPosition(e.clientX);
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    rangeSliderThumb.addEventListener('keydown', (e) => {
        const containerBounds = rangeSliderContainer.getBoundingClientRect();
        let position = parseFloat(rangeSliderThumb.style.left);

        if (isNaN(position)) {
            position = 0;
        }
        const increment = containerBounds.width / 100;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
            position -= increment;
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
            position += increment;
        } else {
            return;
        }

        e.preventDefault();
        updateSliderPosition(null, position);
    });

    function updateSliderPosition(clientX, position) {
        const containerBounds = rangeSliderContainer.getBoundingClientRect();
        if (clientX !== null) {
            position = clientX - containerBounds.left;
        }
        position = Math.max(0, Math.min(position, containerBounds.width));
        rangeSliderThumb.style.left = position + 'px';
        rangeSliderProgress.style.width = position + '%';

        const value = Math.round((position / containerBounds.width) * 100);
        rangeSliderContainer.setAttribute('aria-valuenow', 50);
        // Update the video player volume
        if (!isNaN(value))
            video.volume = (value / 100).toFixed(1);
    }

}
const MiniPlayer = (ele) => {
    ele.element.addEventListener('click', () => {
        console.log(ele.role)
    })

}
let previousStyles = {};
let isFullscreen = false;
const FullScreen = (ele) => {
    ele.element.addEventListener('click', () => {
        // console.log(window.getComputedStyle(container))
        // container.classList.toggle('is-fullscreen')
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.mozRequestFullScreen) { /* Firefox */
            container.mozRequestFullScreen();
        } else if (container.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) { /* IE/Edge */
            container.msRequestFullscreen();
        }
        // container.style.display = "flex";
        // container.style.justifyContent = "center";
        // container.style.alignItems = "center";


        container.style.width = "100%";
        container.style.height = "100%";
        video.style.borderRadius = "0"


        // video.style.width = "100vw";
        // video.style.height = "100vh";

        // Add event listener for fullscreen change
        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) {
                // Browser exited fullscreen, adjust container style
                container.style.width = "initial";
                container.style.height = "initial";
                video.style.borderRadius = "initial"
            }
        });
    })

}
const TheaterMode = (ele) => {
    ele.element.addEventListener('click', () => {
        console.log(ele.role)
    })
}
const showLoader = () => {
    console.log(loaderElement, toggleWithLoader)
    loaderElement.classList.remove('is-hidden');
    if (toggleWithLoader) {
        toggleWithLoader.element.classList.add('is-hidden');
    }

}

const hideLoader = () => {
    console.log(loaderElement)
    loaderElement.classList.add('is-hidden');
    if (toggleWithLoader)
        toggleWithLoader.element.classList.remove('is-hidden');
}


const handleSeekbar = (ele) => {
    const rangeSliderContainer = ele.element;
    const rangeSliderThumb = rangeSliderContainer.querySelector('[seeker-slider_thumb]');
    const rangeSliderProgress = rangeSliderContainer.querySelector('[seeker-slider_progress]');
    const rangeSliderBuffer = rangeSliderContainer.querySelector('[seeker-slider_buffer]');
    let isDragging = false;

    rangeSliderContainer.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isDragging = true;
        updateSliderPosition(e.clientX);
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        updateSliderPosition(e.clientX);
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    rangeSliderThumb.addEventListener('keydown', (e) => {
        const containerBounds = rangeSliderContainer.getBoundingClientRect();
        let position = parseFloat(rangeSliderThumb.style.left);

        if (isNaN(position)) {
            position = 0;
        }

        const increment = containerBounds.width / 100;

        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
            position -= increment;
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
            position += increment;
        } else {
            return;
        }

        e.preventDefault();
        updateSliderPosition(null, position);
    });

    video.addEventListener('timeupdate', () => {
        if (isDragging) return;

        const position = (video.currentTime / video.duration) * 100;
        rangeSliderThumb.style.left = position + '%';
        rangeSliderProgress.style.width = position + '%';

        rangeSliderContainer.setAttribute('aria-valuenow', Math.round(position));
    });

    function updateSliderPosition(clientX, position) {
        const containerBounds = rangeSliderContainer.getBoundingClientRect();

        if (clientX !== null) {
            position = clientX - containerBounds.left;
        }

        position = Math.max(0, Math.min(position, containerBounds.width));
        rangeSliderThumb.style.left = position + 'px';

        const value = Math.round((position / containerBounds.width) * 100);
        rangeSliderContainer.setAttribute('aria-valuenow', value);

        video.currentTime = (value / 100) * video.duration;
    }
}

const getMouseStatus = () => {
    class MouseActivityDetector {
        constructor(divElement, mouseMoveHandler, mouseStopHandler, delay = 200) {
            this.timer = null;
            this.mouseMoveHandler = mouseMoveHandler;
            this.mouseStopHandler = mouseStopHandler;
            this.delay = delay;

            divElement.addEventListener('mousemove', this.handleMouseMove.bind(this));
        }

        handleMouseMove() {
            clearTimeout(this.timer);

            if (this.mouseMoveHandler) {
                this.mouseMoveHandler();
            }

            this.timer = setTimeout(() => {
                if (this.mouseStopHandler) {
                    this.mouseStopHandler();
                }
            }, this.delay);
        }
    }
    new MouseActivityDetector(
        obj["videoPlyrContainer"].element,
        () => {
            showControls()
        },
        () => {
            hideControls()
        }
    );
}
