const lessons = {
    'index': [
        {
            id: "1",
            title: "Introduction to Blockchain",
            description: "Fundamentals of blockchain technology",
            price: 0.02,
            contentType: "text",
            unlocked: false
        },
        {
            id: "2",
            title: "Solana Basics",
            description: "Solana network architecture",
            price: 0.03,
            contentType: "video",
            unlocked: true
        },
        {
            id: "3",
            title: "Smart Contracts with Rust",
            description: "Creating smart contracts",
            price: 0.05,
            contentType: "pdf",
            unlocked: false
        },
        {
            id: "4",
            title: "x402 Protocol",
            description: "Micro-payment protocol",
            price: 0.01,
            contentType: "text",
            unlocked: false
        }
    ],
    
    'lesson': {
        '1': {
            id: "1",
            title: "Introduction to Blockchain",
            description: "Fundamentals of blockchain technology",
            price: 0.02,
            contentType: "text",
            content: "<h3>Lesson Content</h3><p>Lesson content will appear here.</p>",
            unlocked: false
        },
        '2': {
            id: "2",
            title: "Solana Basics",
            description: "Solana network architecture",
            price: 0.03,
            contentType: "video",
            content: "<div class='video-container'><p>Video content</p></div>",
            unlocked: true
        },
        '3': {
            id: "3",
            title: "Smart Contracts with Rust",
            description: "Creating smart contracts",
            price: 0.05,
            contentType: "pdf",
            content: "<div class='pdf-container'><p>PDF document</p></div>",
            unlocked: false
        },
        '4': {
            id: "4",
            title: "x402 Protocol",
            description: "Micro-payment protocol",
            price: 0.01,
            contentType: "text",
            content: "<h3>Lesson Content</h3><p>Lesson content will appear here.</p>",
            unlocked: false
        }
    }
};

let currentLesson = null;

function getContentTypeIcon(type) {
    switch(type) {
        case 'text': return 'fas fa-file-alt';
        case 'video': return 'fas fa-video';
        case 'pdf': return 'fas fa-file-pdf';
        case 'external_url': return 'fas fa-external-link-alt';
        default: return 'fas fa-file';
    }
}

function getContentTypeName(type) {
    switch(type) {
        case 'text': return 'Text';
        case 'video': return 'Video';
        case 'pdf': return 'PDF';
        case 'external_url': return 'External Link';
        default: return 'Unknown';
    }
}

function initIndexPage() {
    const lessonsList = document.getElementById('lessons-list');
    const showCreateFormBtn = document.getElementById('show-create-form');
    const hideCreateFormBtn = document.getElementById('hide-create-form');
    const createSection = document.getElementById('create-section');
    const saveLessonBtn = document.getElementById('save-lesson');
    const paymentModal = document.getElementById('payment-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const connectPhantomBtn = document.getElementById('connect-phantom');
    const paymentStatus = document.getElementById('payment-status');
    const contentTypeSelect = document.getElementById('content-type');
    const contentHelp = document.getElementById('content-help');
    
    if (!lessonsList) return false;
    
    function loadLessons() {
        lessonsList.innerHTML = '';
        
        lessons.index.forEach(lesson => {
            const lessonCard = document.createElement('div');
            lessonCard.className = 'lesson-card';
            lessonCard.innerHTML = `
                <div class="lesson-header">
                    <h3>${lesson.title}</h3>
                    <span class="lesson-price">${lesson.price.toFixed(2)} USDC</span>
                </div>
                <p class="lesson-description">${lesson.description}</p>
                <div class="lesson-footer">
                    <span class="lesson-type">
                        <i class="${getContentTypeIcon(lesson.contentType)}"></i>
                        ${getContentTypeName(lesson.contentType)}
                    </span>
                    <button class="btn-open" data-id="${lesson.id}">
                        ${lesson.unlocked ? '<i class="fas fa-external-link-alt"></i> Open' : '<i class="fas fa-lock-open"></i> Unlock'}
                    </button>
                </div>
            `;
            lessonsList.appendChild(lessonCard);
        });
        
        document.querySelectorAll('.btn-open').forEach(button => {
            button.addEventListener('click', function() {
                const lessonId = this.getAttribute('data-id');
                const lesson = lessons.index.find(l => l.id === lessonId);
                
                if (lesson.unlocked) {
                    window.location.href = `lesson.html?id=${lessonId}`;
                } else {
                    currentLesson = lesson;
                    showPaymentModal(lesson);
                }
            });
        });
        
        const lessonCountElement = document.getElementById('lesson-count');
        if (lessonCountElement) {
            lessonCountElement.textContent = lessons.index.length;
        }
    }
    
    function showPaymentModal(lesson) {
        const paymentLessonTitle = document.getElementById('payment-lesson-title');
        const paymentPrice = document.getElementById('payment-price');
        
        if (paymentLessonTitle) paymentLessonTitle.textContent = lesson.title;
        if (paymentPrice) paymentPrice.textContent = `${lesson.price.toFixed(2)} USDC`;
        
        if (paymentModal) {
            paymentModal.style.display = 'flex';
            if (paymentStatus) paymentStatus.style.display = 'none';
        }
    }
    
    if (contentTypeSelect) {
        contentTypeSelect.addEventListener('change', function() {
            const type = this.value;
            const contentDataTextarea = document.getElementById('content-data');
            
            if (!contentDataTextarea || !contentHelp) return;
            
            switch(type) {
                case 'text':
                    contentDataTextarea.placeholder = "Enter lesson text";
                    contentHelp.textContent = "Enter lesson text";
                    break;
                case 'video':
                    contentDataTextarea.placeholder = "Paste video URL";
                    contentHelp.textContent = "For video, paste YouTube or Vimeo URL";
                    break;
                case 'pdf':
                    contentDataTextarea.placeholder = "Paste PDF file URL";
                    contentHelp.textContent = "PDF file via direct link";
                    break;
                case 'external_url':
                    contentDataTextarea.placeholder = "Paste external resource URL";
                    contentHelp.textContent = "Users will be redirected";
                    break;
            }
        });
    }
    
    if (showCreateFormBtn) {
        showCreateFormBtn.addEventListener('click', () => {
            if (createSection) {
                createSection.style.display = 'block';
                window.scrollTo(0, document.querySelector('.create-section').offsetTop);
            }
        });
    }
    
    if (hideCreateFormBtn) {
        hideCreateFormBtn.addEventListener('click', () => {
            if (createSection) createSection.style.display = 'none';
        });
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            if (paymentModal) paymentModal.style.display = 'none';
        });
    }
    
    if (connectPhantomBtn) {
        connectPhantomBtn.addEventListener('click', () => {
            connectPhantomBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Waiting...';
            connectPhantomBtn.disabled = true;
            
            setTimeout(() => {
                if (paymentStatus) {
                    paymentStatus.style.display = 'block';
                    connectPhantomBtn.style.display = 'none';
                }
                
                setTimeout(() => {
                    if (paymentModal) paymentModal.style.display = 'none';
                    
                    if (currentLesson) {
                        const lessonIndex = lessons.index.findIndex(l => l.id === currentLesson.id);
                        if (lessonIndex !== -1) {
                            lessons.index[lessonIndex].unlocked = true;
                            loadLessons();
                        }
                        alert('Payment successful!');
                    }
                    
                    if (connectPhantomBtn) {
                        connectPhantomBtn.innerHTML = '<i class="fas fa-wallet"></i> Connect Phantom';
                        connectPhantomBtn.disabled = false;
                        connectPhantomBtn.style.display = 'block';
                    }
                }, 2000);
            }, 1500);
        });
    }
    
    if (saveLessonBtn) {
        saveLessonBtn.addEventListener('click', () => {
            const titleInput = document.getElementById('lesson-title');
            const descriptionInput = document.getElementById('lesson-description');
            const priceInput = document.getElementById('lesson-price');
            const contentTypeInput = document.getElementById('content-type');
            const contentDataInput = document.getElementById('content-data');
            
            if (!titleInput || !descriptionInput || !priceInput || !contentTypeInput || !contentDataInput) return;
            
            const title = titleInput.value.trim();
            const description = descriptionInput.value.trim();
            const price = priceInput.value;
            const contentType = contentTypeInput.value;
            const contentData = contentDataInput.value.trim();
            
            if (!title || !description || !contentData) {
                alert('Please fill all fields');
                return;
            }
            
            const newLesson = {
                id: Date.now().toString(),
                title,
                description,
                price: parseFloat(price),
                contentType,
                unlocked: false
            };
            
            lessons.index.push(newLesson);
            
            lessons.lesson[newLesson.id] = {
                ...newLesson,
                content: `<h3>${title}</h3><p>${contentData}</p>`
            };
            
            loadLessons();
            
            titleInput.value = '';
            descriptionInput.value = '';
            contentDataInput.value = '';
            
            if (createSection) createSection.style.display = 'none';
            
            alert('Lesson created!');
        });
    }
    
    window.addEventListener('click', (event) => {
        if (paymentModal && event.target === paymentModal) {
            paymentModal.style.display = 'none';
        }
    });
    
    loadLessons();
    return true;
}

function initLessonPage() {
    const unlockLessonBtn = document.getElementById('unlock-lesson');
    const lockedContent = document.getElementById('locked-content');
    const unlockedContent = document.getElementById('unlocked-content');
    const lessonContent = document.getElementById('lesson-content');
    const paymentModal = document.getElementById('payment-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const connectPhantomBtn = document.getElementById('connect-phantom');
    const paymentStatus = document.getElementById('payment-status');
    
    if (!unlockLessonBtn) return false;
    
    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = urlParams.get('id') || '1';
    
    function loadLesson() {
        const lesson = lessons.lesson[lessonId] || lessons.lesson['1'];
        currentLesson = lesson;
        
        if (!lesson) {
            document.body.innerHTML = '<div class="container"><h1>Lesson not found</h1><p><a href="index.html">Back to main</a></p></div>';
            return;
        }
        
        const lessonTitle = document.getElementById('lesson-title');
        const lessonDescription = document.getElementById('lesson-description');
        const lessonPrice = document.getElementById('lesson-price');
        const lessonType = document.getElementById('lesson-type');
        
        if (lessonTitle) lessonTitle.textContent = lesson.title;
        if (lessonDescription) lessonDescription.textContent = lesson.description;
        if (lessonPrice) lessonPrice.textContent = `${lesson.price.toFixed(2)} USDC`;
        
        if (lessonType) {
            const typeName = getContentTypeName(lesson.contentType);
            const typeIcon = getContentTypeIcon(lesson.contentType);
            lessonType.innerHTML = `<i class="${typeIcon}"></i> ${typeName}`;
        }
        
        if (lessonContent) lessonContent.innerHTML = lesson.content;
        
        const paymentLessonTitle = document.getElementById('payment-lesson-title');
        const paymentPrice = document.getElementById('payment-price');
        
        if (paymentLessonTitle) paymentLessonTitle.textContent = lesson.title;
        if (paymentPrice) paymentPrice.textContent = `${lesson.price.toFixed(2)} USDC`;
        
        if (lockedContent && unlockedContent) {
            if (lesson.unlocked) {
                lockedContent.style.display = 'none';
                unlockedContent.style.display = 'block';
            } else {
                lockedContent.style.display = 'block';
                unlockedContent.style.display = 'none';
            }
        }
    }
    
    if (unlockLessonBtn) {
        unlockLessonBtn.addEventListener('click', () => {
            if (paymentModal) {
                paymentModal.style.display = 'flex';
                if (paymentStatus) paymentStatus.style.display = 'none';
            }
        });
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            if (paymentModal) paymentModal.style.display = 'none';
        });
    }
    
    if (connectPhantomBtn) {
        connectPhantomBtn.addEventListener('click', () => {
            connectPhantomBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Waiting...';
            connectPhantomBtn.disabled = true;
            
            setTimeout(() => {
                if (paymentStatus) {
                    paymentStatus.style.display = 'block';
                    connectPhantomBtn.style.display = 'none';
                }
                
                setTimeout(() => {
                    if (paymentModal) paymentModal.style.display = 'none';
                    
                    if (lockedContent && unlockedContent && currentLesson) {
                        lockedContent.style.display = 'none';
                        unlockedContent.style.display = 'block';
                        
                        if (lessons.lesson[currentLesson.id]) {
                            lessons.lesson[currentLesson.id].unlocked = true;
                        }
                        
                        const lessonIndex = lessons.index.findIndex(l => l.id === currentLesson.id);
                        if (lessonIndex !== -1) {
                            lessons.index[lessonIndex].unlocked = true;
                        }
                    }
                    
                    if (connectPhantomBtn) {
                        connectPhantomBtn.innerHTML = '<i class="fas fa-wallet"></i> Connect Phantom';
                        connectPhantomBtn.disabled = false;
                        connectPhantomBtn.style.display = 'block';
                    }
                }, 2000);
            }, 1500);
        });
    }
    
    window.addEventListener('click', (event) => {
        if (paymentModal && event.target === paymentModal) {
            paymentModal.style.display = 'none';
        }
    });
    
    loadLesson();
    return true;
}

function initApp() {
    const isIndexPage = initIndexPage();
    const isLessonPage = initLessonPage();
    
    if (!isIndexPage && !isLessonPage) {
        console.log('Unknown page');
    }
}

document.addEventListener('DOMContentLoaded', initApp);

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        lessons,
        getContentTypeIcon,
        getContentTypeName,
        initApp
    };
}