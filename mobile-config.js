// Mobile Performance Configuration
(function() {
    'use strict';
    
    // Mobile device detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)|Android(?=.*\bMobile\b)/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    
    // Add mobile classes to body
    if (isMobile) {
        document.body.classList.add('mobile-device');
    }
    if (isTablet) {
        document.body.classList.add('tablet-device');
    }
    if (isIOS) {
        document.body.classList.add('ios-device');
    }
    if (isAndroid) {
        document.body.classList.add('android-device');
    }
    
    // Viewport height fix for mobile browsers
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Set initial viewport height
    setViewportHeight();
    
    // Update on resize and orientation change
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', function() {
        setTimeout(setViewportHeight, 100);
    });
    
    // Prevent zoom on double tap for iOS
    if (isIOS) {
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(event) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
    
    // Optimize scrolling performance
    if (isMobile) {
        document.addEventListener('touchstart', function() {}, { passive: true });
        document.addEventListener('touchmove', function() {}, { passive: true });
    }
    
    // Preload critical resources for mobile
    function preloadCriticalResources() {
        const criticalImages = [
            '/static/media/logo.png',
            '/static/media/hero_image.png'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
    
    // Load critical resources when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', preloadCriticalResources);
    } else {
        preloadCriticalResources();
    }
    
    // Mobile-specific performance optimizations
    if (isMobile) {
        // Reduce animation duration for better performance
        const style = document.createElement('style');
        style.textContent = `
            @media screen and (max-width: 768px) {
                *, *::before, *::after {
                    animation-duration: 0.3s !important;
                    transition-duration: 0.3s !important;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Optimize images for mobile
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
            img.decoding = 'async';
        });
    }
    
    // Handle network status
    function handleNetworkChange() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            const effectiveType = connection.effectiveType;
            
            if (effectiveType === 'slow-2g' || effectiveType === '2g') {
                document.body.classList.add('slow-connection');
            } else {
                document.body.classList.remove('slow-connection');
            }
        }
    }
    
    // Monitor network changes
    if ('connection' in navigator) {
        navigator.connection.addEventListener('change', handleNetworkChange);
        handleNetworkChange();
    }
    
    // Mobile touch feedback
    function addTouchFeedback() {
        const touchElements = document.querySelectorAll('button, a, [role="button"]');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            }, { passive: true });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 150);
            }, { passive: true });
        });
    }
    
    // Add touch feedback when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addTouchFeedback);
    } else {
        addTouchFeedback();
    }
    
    // Mobile keyboard handling
    if (isMobile) {
        let initialViewportHeight = window.innerHeight;
        
        window.addEventListener('resize', function() {
            const currentHeight = window.innerHeight;
            const heightDifference = initialViewportHeight - currentHeight;
            
            if (heightDifference > 150) {
                document.body.classList.add('keyboard-open');
            } else {
                document.body.classList.remove('keyboard-open');
            }
        });
    }
    
    // Performance monitoring
    if ('performance' in window && 'PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
                if (entry.entryType === 'largest-contentful-paint') {
                    console.log('LCP:', entry.startTime);
                }
                if (entry.entryType === 'first-input') {
                    console.log('FID:', entry.processingStart - entry.startTime);
                }
                if (entry.entryType === 'layout-shift') {
                    console.log('CLS:', entry.value);
                }
            });
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    }
    
    // Mobile-specific error handling
    window.addEventListener('error', function(event) {
        if (isMobile) {
            console.error('Mobile Error:', event.error);
            // You can send this to your analytics service
        }
    });
    
    // Service Worker registration for mobile caching
    if ('serviceWorker' in navigator && isMobile) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('SW registered for mobile: ', registration);
                })
                .catch(function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
    
})();