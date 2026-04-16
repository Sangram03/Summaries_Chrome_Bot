
// Wait for DOM
document.addEventListener("DOMContentLoaded", () => {
  if (typeof restoreBackgroundOnLoad === "function") restoreBackgroundOnLoad();
  
});


// Enhanced star generation with different sizes and animations
const starsContainer = document.getElementById('stars');

// Create variety of stars
function createStars() {
  const starCount = 80; // More stars for richer effect
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    
    // Random star types
    const random = Math.random();
    if (random < 0.5) {
      star.className = 'star small';
    } else if (random < 0.8) {
      star.className = 'star medium';
    } else {
      star.className = 'star large';
    }
    
    // Add pulse effect to some stars
    if (Math.random() > 0.7) {
      star.classList.add('pulse');
    }
    
    // Random position
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    
    // Random animation delay for organic feel
    star.style.animationDelay = Math.random() * 5 + 's';
    
    // Random colors for some stars (purple/blue tints)
    if (Math.random() > 0.85) {
      const colors = [
        'rgba(147, 112, 219, 0.9)', // Purple
        'rgba(135, 206, 250, 0.9)', // Light blue
        'rgba(255, 192, 203, 0.9)'  // Pink
      ];
      star.style.background = colors[Math.floor(Math.random() * colors.length)];
    }
    
    starsContainer.appendChild(star);
  }
}

// Create shooting stars effect
function createShootingStar() {
  const shootingStar = document.createElement('div');
  shootingStar.style.position = 'absolute';
  shootingStar.style.width = '100px';
  shootingStar.style.height = '2px';
  shootingStar.style.background = 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)';
  shootingStar.style.top = Math.random() * 50 + '%';
  shootingStar.style.left = '-100px';
  shootingStar.style.transform = 'rotate(-45deg)';
  shootingStar.style.boxShadow = '0 0 10px rgba(255,255,255,0.8)';
  shootingStar.style.pointerEvents = 'none';
  shootingStar.style.zIndex = '1';
  
  starsContainer.appendChild(shootingStar);
  
  // Animate across screen
  let pos = -100;
  const animation = setInterval(() => {
    pos += 8;
    shootingStar.style.left = pos + 'px';
    
    if (pos > 500) {
      clearInterval(animation);
      shootingStar.remove();
    }
  }, 16);
}

// Initialize stars
createStars();

// Random shooting stars
setInterval(() => {
  if (Math.random() > 0.7) {
    createShootingStar();
  }
}, 3000);


// add new pages
  document.getElementById("articleBtn").onclick = function() {
    window.location.href = "aiarticlesum.html";
  };

  document.getElementById("videoBtn").onclick = function() {
    window.location.href = "aivideosum.html";
  };


// --------------- Background + restore stuff (kept) ---------------
document.getElementById("close-btn").onclick = () => { window.close(); };


document.addEventListener("DOMContentLoaded", () => {
  let currentBackground = "";
  let savedBackground = "";

  // 🧩 Elements
  const body = document.body;
  const bgGradient = document.querySelector(".bg-gradient");
  const notch = document.getElementById("notch");
  const check = document.getElementById("check");

  // 🎨 Theme definitions
  const themes = {
    "white-black": {
      bodyBg: "linear-gradient(-11deg, #121212, #1c1c1cf2 37%, #2c2c2eed 76%, #0a0a0a)",
      gradientBg: "radial-gradient(circle at 50% 120%, #1c1c1c 0%, #0a0a0a 50%, #000 100%)"
    },
    "black-blue": {
      bodyBg: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
      gradientBg: "radial-gradient(circle at 50% 120%, #000022 0%, #000033 50%, #000044 100%)"
    },
    "yellow-green": {
      bodyBg: "linear-gradient(to left, rgb(16, 193, 16), rgb(214, 228, 5))",
      gradientBg: "radial-gradient(circle at 50% 120%, #d4fc79 0%, #96e6a1 50%, #0a0a1f 100%)"
    },
    "red-pink": {
      bodyBg: "linear-gradient(to right, rgb(227, 58, 11), rgb(225, 10, 222))",
      gradientBg: "radial-gradient(circle at 50% 120%, #ff758c 0%, #ff7eb3 50%, #0a0a1f 100%)"
    },
    "black-red": {
      bodyBg: "linear-gradient(-11deg, #9a0f0ff2 40%, #121213ed 62%)",
      gradientBg: "radial-gradient(circle at 50% 120%, #2c0b0e 0%, #0a0a1f 50%, #000 100%)"
    }
  };

  // 🌈 Apply theme
  function applyTheme(themeKey) {
    const theme = themes[themeKey];
    if (!theme) return;
    body.style.background = theme.bodyBg;
    if (bgGradient) bgGradient.style.background = theme.gradientBg;
    currentBackground = themeKey;
  }

  // 🔄 Update icons
  function updateIcons(showNotch, showCheck) {
    if (notch) notch.style.display = showNotch ? "block" : "none";
    if (check) check.style.opacity = showCheck ? "1" : "0";
  }

  // 💾 Save theme
  function saveTheme(themeKey) {
    chrome.storage.local.set({ customBackground: themeKey }, () => {
      if (chrome.runtime.lastError) {
        console.error("Storage error:", chrome.runtime.lastError);
        return;
      }
      savedBackground = themeKey;
      updateIcons(false, true);
    });
  }

  // 🔁 Restore saved theme
  function restoreThemeOnLoad() {
    chrome.storage.local.get("customBackground", (result) => {
      const savedKey = result.customBackground;
      if (savedKey && themes[savedKey]) {
        applyTheme(savedKey);
        savedBackground = savedKey;
        updateIcons(false, true);
      } else {
        const defaultKey = "white-black";
        applyTheme(defaultKey);
        saveTheme(defaultKey);
        savedBackground = defaultKey;
        updateIcons(false, true);
      }
    });
  }

  // 🎨 When theme button is clicked → Apply it, show notch (unsaved)
  Object.keys(themes).forEach(themeKey => {
    const btn = document.getElementById(themeKey);
    if (btn) {
      btn.addEventListener("click", () => {
        applyTheme(themeKey);
        updateIcons(true, false);
      });
    }
  });

  // ✅ Click on check → Save the current background
  if (check) {
    check.addEventListener("click", (e) => {
      e.preventDefault();
      if (currentBackground && currentBackground !== savedBackground) {
        saveTheme(currentBackground);
      }
    });
  }

  // 🚀 Initialize
  restoreThemeOnLoad();
});


// updates popup
document.getElementById("updates-btn").addEventListener("click", () => {
  chrome.windows.create({ url: "updates.html", type: "popup", width: 420, height: 320 });
});
