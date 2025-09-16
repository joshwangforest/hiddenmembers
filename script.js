// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    
    // 좌측 검색 기능
    const mainSearchInput = document.querySelector('.main-search');
    const searchBtn = document.querySelector('.search-btn');
    
    function performMainSearch() {
        const searchTerm = mainSearchInput.value.trim();
        if (searchTerm) {
            alert(`"${searchTerm}" 검색 결과를 보여드리겠습니다.`);
            // 실제 구현에서는 검색 결과를 필터링하여 표시
            filterProducts(searchTerm);
        }
    }
    
    searchBtn.addEventListener('click', performMainSearch);
    mainSearchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performMainSearch();
        }
    });
    
    // 카테고리 필터 기능
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 활성 상태 변경
            categoryItems.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.textContent;
            alert(`${category} 카테고리로 필터링합니다.`);
            filterByCategory(category);
        });
    });
    
    // 가격 슬라이더 기능
    const priceSlider = document.querySelector('.price-slider');
    const minPriceSpan = document.querySelector('.min-price');
    const maxPriceSpan = document.querySelector('.max-price');
    
    if (priceSlider) {
        priceSlider.addEventListener('input', function() {
            const value = parseInt(this.value);
            maxPriceSpan.textContent = value.toLocaleString() + '원';
            filterByPrice(value);
        });
    }
    
    // 브랜드 필터 기능
    const brandCheckboxes = document.querySelectorAll('.brand-list input[type="checkbox"]');
    brandCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const selectedBrands = Array.from(brandCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.parentElement.textContent.trim());
            
            filterByBrand(selectedBrands);
        });
    });
    
    // 브랜드 검색 기능
    const brandSearchInput = document.querySelector('.brand-search-input');
    if (brandSearchInput) {
        brandSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const brandItems = document.querySelectorAll('.brand-list li');
            
            brandItems.forEach(item => {
                const brandName = item.textContent.toLowerCase();
                if (brandName.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // 모바일 쇼핑몰 장바구니 기능
    const mobileCartBadge = document.querySelector('.cart-badge');
    const mobileCartIcon = document.querySelector('.mobile-cart');
    let cartItems = 0;
    
    function updateMobileCartCount() {
        if (mobileCartBadge) {
            mobileCartBadge.textContent = cartItems;
            mobileCartBadge.style.display = cartItems > 0 ? 'flex' : 'none';
        }
    }
    
    // 모바일 상품 장바구니 추가 버튼
    const addCartBtns = document.querySelectorAll('.add-cart-btn');
    addCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            cartItems++;
            updateMobileCartCount();
            
            // 버튼 애니메이션
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // 토스트 메시지 표시
            showToast('상품이 장바구니에 추가되었습니다!');
        });
    });
    
    // 모바일 상품 아이템 클릭
    const mobileProductItems = document.querySelectorAll('.mobile-product-item');
    mobileProductItems.forEach(item => {
        item.addEventListener('click', function() {
            const productName = this.querySelector('h4').textContent;
            alert(`${productName} 상품 상세 페이지로 이동합니다.`);
        });
    });
    
    // 모바일 장바구니 아이콘 클릭 (요소가 존재할 때만)
    if (mobileCartIcon) {
        mobileCartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            if (cartItems > 0) {
                alert(`장바구니에 ${cartItems}개의 상품이 있습니다.`);
            } else {
                alert('장바구니가 비어있습니다.');
            }
        });
    }
    
    // 모바일 퀵 메뉴 아이템 클릭
    const mobileQuickItems = document.querySelectorAll('.mobile-quick-item');
    mobileQuickItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const menuName = this.querySelector('span').textContent;
            showToast(`${menuName} 메뉴로 이동합니다.`);
        });
    });
    
    // 필터링 함수들
    function filterProducts(searchTerm) {
        const productItems = document.querySelectorAll('.mobile-product-item');
        productItems.forEach(item => {
            const productName = item.querySelector('h4').textContent.toLowerCase();
            if (productName.includes(searchTerm.toLowerCase())) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    function filterByCategory(category) {
        const productItems = document.querySelectorAll('.mobile-product-item');
        productItems.forEach(item => {
            // 실제 구현에서는 상품 데이터에서 카테고리 정보를 확인
            item.style.display = 'flex';
        });
    }
    
    function filterByPrice(maxPrice) {
        const productItems = document.querySelectorAll('.mobile-product-item');
        productItems.forEach(item => {
            // 실제 구현에서는 상품 가격 정보를 확인
            item.style.display = 'flex';
        });
    }
    
    function filterByBrand(brands) {
        const productItems = document.querySelectorAll('.mobile-product-item');
        productItems.forEach(item => {
            // 실제 구현에서는 상품 브랜드 정보를 확인
            item.style.display = 'flex';
        });
    }
    
    // 토스트 메시지 함수
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
    
    // 로그인 버튼 기능
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const isLoggedIn = Math.random() > 0.5; // 임시 로직
            
            if (isLoggedIn) {
                this.textContent = '로그아웃';
                showToast('로그인되었습니다!');
            } else {
                this.textContent = '로그인';
                showToast('로그아웃되었습니다.');
            }
        });
    }
    
    // 네비게이션 메뉴 스크롤 효과
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 스크롤 다운
            header.style.transform = 'translateY(-100%)';
        } else {
            // 스크롤 업
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // 스크롤 애니메이션
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 애니메이션 대상 요소들 관찰
    const animatedElements = document.querySelectorAll('.mobile-product-item, .section-title');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // 키보드 접근성
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // ESC 키로 모달이나 드롭다운 닫기
            const dropdowns = document.querySelectorAll('.dropdown-menu');
            dropdowns.forEach(dropdown => {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
            });
        }
    });
    
    // 이미지 로딩 에러 처리
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'memberslogo.png';
            this.alt = '이미지를 불러올 수 없습니다';
        });
    });
    
    // 터치 디바이스에서 호버 효과 개선
    if ('ontouchstart' in window) {
        mobileProductItems.forEach(item => {
            item.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            item.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 300);
            });
        });
    }
    
    // 페이지 로딩 완료 후 초기화
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // 초기 장바구니 상태 업데이트
        updateMobileCartCount();
        
        // 성능 모니터링
        if ('performance' in window) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`페이지 로딩 시간: ${loadTime}ms`);
        }
    });
    
    // CSS 애니메이션 키프레임 추가
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .touch-active {
            transform: scale(0.98) !important;
        }
        
        .loaded {
            opacity: 1;
        }
        
        body {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    // 반응형 디자인을 위한 리사이즈 이벤트
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // 화면 크기 변경 시 필요한 작업들
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile) {
                // 모바일 환경에서의 특별한 처리
                document.body.classList.add('mobile');
            } else {
                document.body.classList.remove('mobile');
            }
        }, 250);
    });
    
    // 초기 화면 크기 체크
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        document.body.classList.add('mobile');
    }
    
    // 롤링 배너 기능
    let currentSlide = 0;
    let slideInterval;
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;
    
    function showSlide(index) {
        // 모든 슬라이드 비활성화
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // 현재 슬라이드 활성화
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 3000);
    }
    
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }
    
    // 자동 롤링 시작
    startAutoSlide();
    
    // 도트 클릭 이벤트 (addEventListener 방식)
    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const slideIndex = parseInt(dot.getAttribute('data-slide'));
            currentSlide = slideIndex;
            showSlide(currentSlide);
            
            // 자동 롤링 재시작
            stopAutoSlide();
            startAutoSlide();
        });
    });
    
    // 터치 스와이프 기능 (모바일)
    let startX = 0;
    let endX = 0;
    const bannerContainer = document.querySelector('.banner-container');
    
    if (bannerContainer) {
        bannerContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        bannerContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const threshold = 50;
            const diff = startX - endX;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                
                // 자동 롤링 재시작
                stopAutoSlide();
                startAutoSlide();
            }
        }
    }
    
    // 전역 함수로 이전/다음 슬라이드 함수 등록 (필요시 사용)
    window.nextSlide = function() {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    };
    
    window.prevSlide = function() {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    };
    
    
    // 퀵 메뉴 스크롤 기능
    let quickMenuScrollPosition = 0;
    const scrollAmount = 200; // 스크롤할 픽셀 수
    
    window.scrollQuickMenu = function(direction) {
        const quickItems = document.querySelector('.quick-items');
        const quickItemsWrapper = document.querySelector('.quick-items-wrapper');
        
        if (!quickItems || !quickItemsWrapper) {
            return;
        }
        
        const maxScroll = quickItems.scrollWidth - quickItemsWrapper.clientWidth;
        
        if (direction === 'left') {
            quickMenuScrollPosition = Math.max(0, quickMenuScrollPosition - scrollAmount);
        } else if (direction === 'right') {
            quickMenuScrollPosition = Math.min(maxScroll, quickMenuScrollPosition + scrollAmount);
        }
        
        quickItems.style.transform = `translateX(-${quickMenuScrollPosition}px)`;
        
        // 버튼 상태 업데이트
        updateScrollButtons();
    };
    
    function updateScrollButtons() {
        const quickItems = document.querySelector('.quick-items');
        const quickItemsWrapper = document.querySelector('.quick-items-wrapper');
        const prevBtn = document.querySelector('.scroll-btn.prev-btn');
        const nextBtn = document.querySelector('.scroll-btn.next-btn');
        
        if (!quickItems || !quickItemsWrapper) return;
        
        const maxScroll = quickItems.scrollWidth - quickItemsWrapper.clientWidth;
        
        if (prevBtn) {
            prevBtn.style.opacity = quickMenuScrollPosition > 0 ? '1' : '0.3';
            prevBtn.style.pointerEvents = quickMenuScrollPosition > 0 ? 'auto' : 'none';
        }
        
        if (nextBtn) {
            nextBtn.style.opacity = quickMenuScrollPosition < maxScroll ? '1' : '0.3';
            nextBtn.style.pointerEvents = quickMenuScrollPosition < maxScroll ? 'auto' : 'none';
        }
    }
    
    // 초기 버튼 상태 설정
    setTimeout(updateScrollButtons, 100);
    
    
    // 모든 상품 캐러셀에 초정밀 스와이프 기능 적용
    function initCarouselSwipe(carouselWrapper) {
        if (!carouselWrapper) return;
        
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        let velocity = 0;
        let lastTime = 0;
        let lastX = 0;
        let animationId = null;
        let velocityHistory = [];
        
        // 고성능 부드러운 스크롤 함수
        function smoothScrollTo(target, duration = 200) {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            
            const start = carouselWrapper.scrollLeft;
            const distance = target - start;
            const startTime = performance.now();
            
            function animateScroll(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // 더 부드러운 easeOutQuart 함수
                const easeProgress = 1 - Math.pow(1 - progress, 4);
                
                carouselWrapper.scrollLeft = start + (distance * easeProgress);
                
                if (progress < 1) {
                    animationId = requestAnimationFrame(animateScroll);
                } else {
                    animationId = null;
                }
            }
            
            animationId = requestAnimationFrame(animateScroll);
        }
        
        // 속도 계산 개선
        function calculateVelocity(currentX, currentTime) {
            velocityHistory.push({ x: currentX, time: currentTime });
            
            // 최근 5개 포인트만 유지
            if (velocityHistory.length > 5) {
                velocityHistory.shift();
            }
            
            if (velocityHistory.length >= 2) {
                const recent = velocityHistory[velocityHistory.length - 1];
                const previous = velocityHistory[velocityHistory.length - 2];
                const deltaX = recent.x - previous.x;
                const deltaTime = recent.time - previous.time;
                
                if (deltaTime > 0) {
                    return deltaX / deltaTime;
                }
            }
            return 0;
        }
        
        // 터치 시작 - 최적화
        carouselWrapper.addEventListener('touchstart', function(e) {
            startX = e.touches[0].pageX;
            currentX = carouselWrapper.scrollLeft;
            isDragging = true;
            velocity = 0;
            lastTime = performance.now();
            lastX = startX;
            velocityHistory = [];
            
            // 기존 애니메이션 중단
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        }, { passive: true });
        
        // 터치 이동 - 초정밀 스와이프
        carouselWrapper.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            e.preventDefault();
            
            const currentTime = performance.now();
            const currentTouchX = e.touches[0].pageX;
            
            // 실시간 속도 계산
            velocity = calculateVelocity(currentTouchX, currentTime);
            
            // 즉시 스크롤 적용 (지연 없음)
            const moveX = currentTouchX - startX;
            carouselWrapper.scrollLeft = currentX - moveX;
            
            lastTime = currentTime;
            lastX = currentTouchX;
        }, { passive: false });
        
        // 터치 종료 - 고성능 관성 스크롤
        carouselWrapper.addEventListener('touchend', function() {
            if (!isDragging) return;
            isDragging = false;
            
            // 강화된 관성 스크롤
            if (Math.abs(velocity) > 0.05) {
                const inertia = velocity * 300; // 관성 강도 증가
                const targetScroll = carouselWrapper.scrollLeft - inertia;
                smoothScrollTo(targetScroll, 150); // 더 빠른 애니메이션
            }
        }, { passive: true });
        
        // 마우스 드래그 - 초정밀 안정화 버전
        carouselWrapper.addEventListener('mousedown', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            startX = e.pageX;
            currentX = carouselWrapper.scrollLeft;
            isDragging = true;
            
            // 스타일 즉시 적용
            carouselWrapper.style.cursor = 'grabbing';
            carouselWrapper.style.userSelect = 'none';
            carouselWrapper.style.pointerEvents = 'none';
            carouselWrapper.style.touchAction = 'none';
            
            let mouseVelocity = 0;
            let lastMouseTime = performance.now();
            let lastMouseX = e.pageX;
            velocityHistory = [];
            
            // 기존 애니메이션 즉시 중단
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
            
            // 마우스 이동 이벤트 - 초정밀 버전
            function handleMouseMove(e) {
                if (!isDragging) return;
                e.preventDefault();
                e.stopPropagation();
                
                const currentTime = performance.now();
                const currentMouseX = e.pageX;
                
                // 실시간 속도 계산
                mouseVelocity = calculateVelocity(currentMouseX, currentTime);
                
                // 즉시 스크롤 적용 (지연 없음)
                const moveX = currentMouseX - startX;
                carouselWrapper.scrollLeft = currentX - moveX;
                
                lastMouseTime = currentTime;
                lastMouseX = currentMouseX;
            }
            
            // 마우스 업 이벤트 - 고성능 관성 적용
            function handleMouseUp(e) {
                if (!isDragging) return;
                e.preventDefault();
                e.stopPropagation();
                
                isDragging = false;
                
                // 스타일 복원
                carouselWrapper.style.cursor = 'grab';
                carouselWrapper.style.userSelect = 'auto';
                carouselWrapper.style.pointerEvents = 'auto';
                carouselWrapper.style.touchAction = 'auto';
                
                // 강화된 관성 스크롤 적용
                if (Math.abs(mouseVelocity) > 0.05) {
                    const inertia = mouseVelocity * 250;
                    const targetScroll = carouselWrapper.scrollLeft - inertia;
                    smoothScrollTo(targetScroll, 120);
                }
                
                // 이벤트 리스너 제거
                document.removeEventListener('mousemove', handleMouseMove, { passive: false });
                document.removeEventListener('mouseup', handleMouseUp, { passive: false });
                document.removeEventListener('mouseleave', handleMouseUp, { passive: false });
            }
            
            // 마우스가 창 밖으로 나갔을 때 처리
            function handleMouseLeave() {
                handleMouseUp({ preventDefault: () => {}, stopPropagation: () => {} });
            }
            
            // 이벤트 리스너 추가 (passive: false로 설정)
            document.addEventListener('mousemove', handleMouseMove, { passive: false });
            document.addEventListener('mouseup', handleMouseUp, { passive: false });
            document.addEventListener('mouseleave', handleMouseLeave, { passive: false });
        });
        
        // 커서 스타일 설정
        carouselWrapper.style.cursor = 'grab';
        
        // 마우스 휠 스크롤 - 고성능 버전
        carouselWrapper.addEventListener('wheel', function(e) {
            e.preventDefault();
            const delta = e.deltaY;
            const currentScroll = carouselWrapper.scrollLeft;
            const targetScroll = currentScroll + delta * 1.2; // 스크롤 속도 증가
            
            smoothScrollTo(targetScroll, 100); // 더 빠른 애니메이션
        }, { passive: false });
        
        // 드래그 중 텍스트 선택 방지
        carouselWrapper.addEventListener('selectstart', function(e) {
            if (isDragging) {
                e.preventDefault();
            }
        });
        
        // 드래그 중 컨텍스트 메뉴 방지
        carouselWrapper.addEventListener('contextmenu', function(e) {
            if (isDragging) {
                e.preventDefault();
            }
        });
    }
    
    // 모든 캐러셀에 스와이프 기능 적용
    const allCarouselWrappers = document.querySelectorAll('.carousel-wrapper');
    allCarouselWrappers.forEach(initCarouselSwipe);
    
    // 가격 필터 버튼 기능 초기화
    initPriceButtons();
});

// 가격 필터 버튼 기능
function initPriceButtons() {
    const priceButtons = document.querySelectorAll('.price-btn');
    
    priceButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 모든 버튼에서 active 클래스 제거
            priceButtons.forEach(btn => btn.classList.remove('active'));
            
            // 클릭한 버튼에 active 클래스 추가
            this.classList.add('active');
            
            // 선택된 가격 값 가져오기
            const selectedPrice = this.dataset.price;
            console.log('선택된 가격:', selectedPrice + '원');
            
            // 여기에 실제 필터링 로직을 추가할 수 있습니다
            // 예: filterProductsByPrice(selectedPrice);
        });
        
        // 키보드 접근성 추가
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}
