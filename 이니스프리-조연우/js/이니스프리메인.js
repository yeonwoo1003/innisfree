document.addEventListener('DOMContentLoaded', () => {

    // 1. Swiper 초기화 (메인 배너)
    const swiper = new Swiper('.main-swiper', {
        // ... (Swiper 설정은 그대로 유지)
        loop: true, 
        speed: 800, 
        autoplay: {
            delay: 2500, 
            disableOnInteraction: false, 
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });


    // 2. 스크롤 애니메이션 (Scroll-Reveal Effect)
    // ... (스크롤 애니메이션 로직은 그대로 유지)
    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                el.classList.add('animated');
            }
        });
    };
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation();
    
    
    // 3. 네비게이션 서브메뉴 개별 활성화 로직 ⭐⭐⭐
    const gnb = document.querySelector('.gnb');
    const mainMenuItems = document.querySelectorAll('.main-menu > li');
    const subMenuWrap = document.querySelector('.sub-menu-wrap');
    const subMenuContents = document.querySelectorAll('.sub-menu-content');

    // 주메뉴에 마우스를 올렸을 때
    mainMenuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // 모든 서브메뉴 숨기기
            subMenuContents.forEach(content => {
                content.classList.remove('active');
            });

            // 해당 메뉴의 data-menu 값 가져오기
            const targetMenu = item.getAttribute('data-menu');
            
            // 해당하는 서브메뉴만 찾아서 활성화
            const activeContent = document.querySelector(`.sub-menu-content[data-target="${targetMenu}"]`);
            if (activeContent) {
                activeContent.classList.add('active');
            }

            // 서브메뉴 랩퍼 전체 보이기
            subMenuWrap.classList.add('active');
        });
    });

    // GNB 영역을 벗어났을 때 서브메뉴 전체 숨기기
    gnb.addEventListener('mouseleave', () => {
        subMenuWrap.classList.remove('active');
        
        // 추가: 서브메뉴 내용을 다시 숨겨 다음 호버에 대비
        subMenuContents.forEach(content => {
            content.classList.remove('active');
        });
    });
});