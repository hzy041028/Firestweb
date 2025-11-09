// hero-script.js

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化搜索功能
    initSearch();
    
    // 初始化导航交互
    initNavigation();
    
    // 初始化英雄项目交互
    initHeroItems();
    
    // 添加页面滚动效果
    addScrollEffects();
});

/**
 * 初始化搜索功能
 */
function initSearch() {
    const searchForm = document.querySelector('.search-box');
    const searchInput = searchForm.querySelector('input');
    const searchButton = searchForm.querySelector('button');
    
    // 搜索按钮点击事件
    searchButton.addEventListener('click', function() {
        performSearch();
    });
    
    // 输入框回车事件
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // 执行搜索的函数
    function performSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            // 实际应用中这里会发送请求到服务器
            alert(`正在搜索英雄人物: "${searchTerm}"\n在实际应用中，这里会显示搜索结果`);
            
            // 高亮显示搜索结果
            highlightSearchResults(searchTerm);
        } else {
            alert('请输入搜索关键词');
        }
    }
}

/**
 * 高亮显示搜索结果
 */
function highlightSearchResults(term) {
    const heroItems = document.querySelectorAll('.discovery-item');
    const lowerTerm = term.toLowerCase();
    let found = false;
    
    heroItems.forEach(item => {
        const textContent = item.textContent.toLowerCase();
        const title = item.querySelector('h2');
        
        // 移除之前的高亮
        item.style.border = '1px solid var(--light-red)';
        if (title) {
            title.innerHTML = title.textContent;
        }
        
        // 如果包含搜索词则高亮显示
        if (textContent.includes(lowerTerm)) {
            found = true;
            item.style.border = '2px solid var(--primary-red)';
            
            // 滚动到找到的第一个结果
            if (found) {
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
            
            // 高亮标题中的匹配文本
            if (title) {
                const titleText = title.textContent;
                const index = titleText.toLowerCase().indexOf(lowerTerm);
                if (index !== -1) {
                    const highlighted = titleText.substring(0, index) +
                                      '<span style="background-color: #FFEB3B; color: var(--text-red);">' +
                                      titleText.substring(index, index + term.length) +
                                      '</span>' +
                                      titleText.substring(index + term.length);
                    title.innerHTML = highlighted;
                }
            }
        }
    });
    
    if (!found) {
        alert(`没有找到与"${term}"相关的英雄人物`);
    }
}

/**
 * 初始化导航交互
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const mobileMenuToggle = createMobileMenuToggle();
    
    // 导航链接点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 移除所有激活状态
            navLinks.forEach(l => l.classList.remove('active'));
            // 添加当前激活状态
            this.classList.add('active');
            
            // 如果是移动菜单，点击后收起
            if (window.innerWidth <= 900) {
                document.querySelector('.nav-links').classList.remove('show');
            }
        });
    });
}

/**
 * 创建移动菜单切换按钮
 */
function createMobileMenuToggle() {
    const navContainer = document.querySelector('.nav-container');
    const toggleButton = document.createElement('button');
    toggleButton.className = 'mobile-menu-toggle';
    toggleButton.innerHTML = '☰ 菜单';
    toggleButton.style.display = 'none';
    toggleButton.style.backgroundColor = 'var(--dark-red)';
    toggleButton.style.color = 'white';
    toggleButton.style.border = 'none';
    toggleButton.style.padding = '0.5rem 1rem';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.width = '100%';
    
    navContainer.insertBefore(toggleButton, navContainer.firstChild);
    
    // 点击事件切换菜单显示状态
    toggleButton.addEventListener('click', function() {
        document.querySelector('.nav-links').classList.toggle('show');
    });
    
    // 响应式处理
    function checkScreenSize() {
        const navLinks = document.querySelector('.nav-links');
        if (window.innerWidth <= 900) {
            toggleButton.style.display = 'block';
            navLinks.style.display = 'none';
            navLinks.classList.remove('show');
            
            // 显示时的样式
            navLinks.classList.add('mobile-nav');
            document.querySelector('.mobile-nav.show').style.display = 'flex';
        } else {
            toggleButton.style.display = 'none';
            navLinks.style.display = 'flex';
            navLinks.classList.remove('mobile-nav', 'show');
        }
    }
    
    // 初始检查和窗口大小变化时检查
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return toggleButton;
}

/**
 * 初始化英雄项目交互
 */
function initHeroItems() {
    const heroItems = document.querySelectorAll('.discovery-item');
    
    heroItems.forEach(item => {
        // 添加悬停效果
        item.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            this.style.transform = 'translateY(-3px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
            this.style.transform = 'translateY(0)';
        });
        
        // 点击事件 - 可以跳转到详情页
        item.addEventListener('click', function(e) {
            // 如果点击的是链接或按钮，不执行此操作
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
                return;
            }
            
            const heroName = this.querySelector('h2').textContent;
            // 在实际应用中，这里会跳转到英雄详情页
            alert(`您点击了: ${heroName}\n在实际应用中，这里会跳转到该英雄的详情页面`);
        });
    });
}

/**
 * 添加页面滚动效果
 */
function addScrollEffects() {
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 滚动时改变头部样式
        if (scrollTop > 50) {
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        } else {
            header.style.padding = '1rem 0';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // 平滑滚动到顶部按钮
    const scrollToTopBtn = createScrollToTopButton();
    document.body.appendChild(scrollToTopBtn);
}

/**
 * 创建回到顶部按钮
 */
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.className = 'scroll-to-top';
    button.innerHTML = '↑ 回到顶部';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.backgroundColor = 'var(--primary-red)';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.padding = '0.8rem 1rem';
    button.style.cursor = 'pointer';
    button.style.display = 'none';
    button.style.zIndex = '1000';
    button.style.transition = 'opacity 0.3s ease';
    
    // 点击事件回到顶部
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 滚动时显示/隐藏按钮
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
    
    return button;
}

// 添加键盘快捷键支持
document.addEventListener('keydown', function(e) {
    // 按ESC键清空搜索框
    if (e.key === 'Escape') {
        const searchInput = document.querySelector('.search-box input');
        if (searchInput) {
            searchInput.value = '';
            // 移除所有高亮
            const heroItems = document.querySelectorAll('.discovery-item');
            heroItems.forEach(item => {
                item.style.border = '1px solid var(--light-red)';
                const title = item.querySelector('h2');
                if (title) {
                    title.innerHTML = title.textContent;
                }
            });
        }
    }
    
    // 按/键聚焦到搜索框
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-box input');
        if (searchInput) {
            searchInput.focus();
        }
    }
});