document.addEventListener('DOMContentLoaded', function() {
    // 메인 검색 기능
    const searchBtn = document.querySelector('.search-btn');
    const mainSearchInput = document.querySelector('.main-search-input') || document.querySelector('input[type="text"]');
    
    function performMainSearch() {
        const searchTerm = mainSearchInput.value.trim();
        if (searchTerm) {
            showToast(`"${searchTerm}" 검색 결과를 표시합니다.`);
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
            const category = this.textContent.trim();
            showToast(`${category} 카테고리로 필터링합니다.`);
            filterByCategory(category);
        });
    });
    
    // 가격 슬라이더 기능 (현재 HTML에 없으므로 제거)
    
    // 브랜드 필터 기능
    const brandCheckboxes = document.querySelectorAll('.brand-list input[type="checkbox"]');
    brandCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const selectedBrands = Array.from(brandCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.nextElementSibling.textContent.trim());
            showToast(`선택된 브랜드: ${selectedBrands.join(', ')}`);
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
    
    function updateCartBadge() {
        if (mobileCartBadge) {
            mobileCartBadge.textContent = cartItems;
            mobileCartBadge.style.display = cartItems > 0 ? 'block' : 'none';
        }
    }
    
    // 모바일 상품 장바구니 추가 버튼
    const addCartBtns = document.querySelectorAll('.add-cart-btn');
    addCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            cartItems++;
            updateCartBadge();
            
            // 버튼 애니메이션
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // 토스트 메시지 표시
            showToast('상품이 장바구니에 추가되었습니다!');
        });
    });
    
    // 모바일 상품 아이템 클릭
    const mobileProductItems = document.querySelectorAll('.mobile-product-item');
    mobileProductItems.forEach(item => {
        item.addEventListener('click', function() {
            showToast('상품 상세 페이지로 이동합니다.');
        });
    });
    
    // 모바일 장바구니 아이콘 클릭 (요소가 존재할 때만)
    if (mobileCartIcon) {
        mobileCartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            if (cartItems > 0) {
                showToast('장바구니 페이지로 이동합니다.');
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
            left: 50%;
            transform: translateX(-50%);
            background: #333;
            color: white;
            padding: 12px 24px;
            border-radius: 6px;
            z-index: 1000;
            font-size: 14px;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        // 애니메이션
        setTimeout(() => {
            toast.style.opacity = '1';
        }, 100);
        
        setTimeout(() => {
            toast.style.opacity = '0';
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
            if (this.textContent === '로그인') {
                this.textContent = '로그아웃';
                showToast('로그인되었습니다.');
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
        
        if (scrollTop > lastScrollTop) {
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
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // 키보드 접근성
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // ESC 키로 모달이나 드롭다운 닫기
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
    
    // 이미지 로딩 에러 처리
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
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
        
        // 초기 애니메이션 실행
        const initialElements = document.querySelectorAll('.mobile-product-item');
        initialElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
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
            if (window.innerWidth <= 768) {
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
    const dots = document.querySelectorAll('.banner-dot');
    const totalSlides = slides.length;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? '1' : '0';
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
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
        dot.addEventListener('click', function() {
            currentSlide = index;
            showSlide(currentSlide);
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
    
    // 모든 상품 캐러셀에 PC와 모바일 통일된 스크롤 기능 적용
    function initCarouselScroll(carouselWrapper) {
        if (!carouselWrapper) return;
        
        // PC와 모바일 통일된 기본 스크롤 동작 설정
        carouselWrapper.style.overflowX = 'auto';
        carouselWrapper.style.webkitOverflowScrolling = 'touch';
        carouselWrapper.style.scrollBehavior = 'smooth';
        
        // 스크롤바 숨기기 (모든 환경에서 동일)
        carouselWrapper.style.scrollbarWidth = 'none'; // Firefox
        carouselWrapper.style.msOverflowStyle = 'none'; // IE and Edge
        
        // 웹킷 스크롤바 숨기기
        const style = document.createElement('style');
        style.textContent = `
            .carousel-wrapper::-webkit-scrollbar {
                display: none;
            }
        `;
        document.head.appendChild(style);
        
        // 터치 최적화 설정 (모든 환경에서 동일)
        carouselWrapper.style.touchAction = 'pan-x';
        carouselWrapper.style.userSelect = 'none';
        carouselWrapper.style.webkitUserSelect = 'none';
        carouselWrapper.style.webkitTouchCallout = 'none';
        
        // 우측 이동 시 마지막 상품 정보를 끝으로 설정
        function updateMaxScroll() {
            const slides = carouselWrapper.querySelectorAll('.carousel-slide');
            if (slides.length > 0) {
                const slideWidth = slides[0].offsetWidth;
                const slideMargin = parseInt(getComputedStyle(slides[0]).marginRight) || 0;
                const totalSlidesWidth = slides.length * (slideWidth + slideMargin);
                const containerWidth = carouselWrapper.clientWidth;
                
                // 마지막 상품이 완전히 보이도록 계산
                const maxScrollLeft = Math.max(0, totalSlidesWidth - containerWidth);
                carouselWrapper.setAttribute('data-max-scroll', maxScrollLeft);
            }
        }
        
        // 초기 최대 스크롤 범위 설정
        updateMaxScroll();
        
        // 윈도우 리사이즈 시 최대 스크롤 범위 업데이트
        window.addEventListener('resize', updateMaxScroll);
        
        // 스크롤 이벤트로 범위 제한
        carouselWrapper.addEventListener('scroll', function() {
            const maxScrollLeft = parseFloat(carouselWrapper.getAttribute('data-max-scroll')) || 0;
            if (carouselWrapper.scrollLeft > maxScrollLeft) {
                carouselWrapper.scrollLeft = maxScrollLeft;
            }
        });
        
        // 드래그 중 커서 변경 (PC 환경)
        carouselWrapper.addEventListener('mousedown', function() {
            carouselWrapper.style.cursor = 'grabbing';
        });
        
        carouselWrapper.addEventListener('mouseup', function() {
            carouselWrapper.style.cursor = 'grab';
        });
        
        carouselWrapper.addEventListener('mouseleave', function() {
            carouselWrapper.style.cursor = 'grab';
        });
        
        // 기본 커서 설정
        carouselWrapper.style.cursor = 'grab';
    }
    
    // 모든 캐러셀에 퀵메뉴와 동일한 스크롤 기능 적용
    const allCarouselWrappers = document.querySelectorAll('.carousel-wrapper');
    allCarouselWrappers.forEach(initCarouselScroll);
    
    // 가격 필터 버튼 기능 초기화
    initPriceButtons();
});

// 가격 필터 버튼 기능
function initPriceButtons() {
    const priceButtons = document.querySelectorAll('.price-btn');
    priceButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // 모든 버튼에서 active 클래스 제거
            priceButtons.forEach(b => b.classList.remove('active'));
            
            // 클릭된 버튼에 active 클래스 추가
            this.classList.add('active');
            
            // 가격 필터링 로직 (실제 구현에서는 상품 데이터를 필터링)
            const priceRange = this.textContent.trim();
            console.log(`가격 필터 적용: ${priceRange}`);
        });
    });
}
