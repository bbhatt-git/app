// --- 1. Content Data (Simulated Backend) ---
const CLUB_DATA = {
    // Admin Credentials for step 3
    ADMIN_USERNAME: 'admin@bbhatt.com.np',
    ADMIN_PASSWORD: '$key.bbhatt.com.np',
    
    // Team Members with consistent icons
    teamMembers: [
        // Using the generic fas fa-user-circle icon as requested
        { name: "Bhupesh Raj Bhatt", role: "President", icon: "fas fa-user-circle", desc: "Oversees all club activities and sets the strategic direction." },
        { name: "Mohit Singh Saud", role: "Vice President", icon: "fas fa-user-circle", desc: "Assists the President and manages internal affairs." },
        { name: "Pusp Raj Bhatt", role: "Secretary", icon: "fas fa-user-circle", desc: "Maintains records, communication, and meeting minutes." },
        { name: "Vacant Post", role: "Vice Secretary", icon: "fas fa-user-circle", desc: "Assists the Secretary with records and communication." },
        { name: "Gayatri Joshi", role: "Treasurer", icon: "fas fa-user-circle", desc: "Manages the club's finances and budget." },
        { name: "Bhupendra Madai", role: "Member", icon: "fas fa-user-circle", desc: "Plans and executes all club events, workshops, and competitions." },
        { name: "Bhuwaneshwari Lawad", role: "Member", icon: "fas fa-user-circle", desc: "Manages social media, outreach, and external communications." },
        { name: "Reshmi Khatri", role: "Member", icon: "fas fa-user-circle", desc: "Leads technical projects and provides guidance on technology stacks." },
        { name: "Sanchita Chand", role: "Member", icon: "fas fa-user-circle", desc: "Responsible for all visual branding and design assets." }
    ],
    
    // Announcement body updated to remove design/tech mentions
    announcements: [
        { 
            id: 1, 
            title: "Welcome: Platform Deployment", 
            date: "November 11, 2025", 
            icon: "fas fa-file-alt", 
            body: "We have successfully launched the new SARC Academic Club platform! This serves as a central hub for all member information, announcements, and events. Please use the Suggestions form for any feedback regarding the platform.", 
            category: "Platform Update" 
        }
    ],

    // Upcoming events list removed as requested.
};

// --- 2. Dynamic Content Rendering Functions ---

function createTeamCard(member) {
    return `
        <div class="team-member-card glassmorphism">
            <i class="fas fa-user-circle member-icon"></i> 
            <div class="member-details">
                <h3>${member.name}</h3>
                <p class="role">${member.role}</p>
                <p class="description">${member.desc}</p>
            </div>
        </div>
    `;
}

// Updated rendering function: shows full body and removes click handler hint
function createAnnouncementItem(announcement) {
    // The entire card remains clickable, but the text no longer suggests it leads to a detail page
    return `
        <div class="announcement-item glassmorphism" data-id="${announcement.id}">
            <h3>${announcement.title}</h3>
            <p>${announcement.body}</p>
            <div class="announcement-meta">
                <span><i class="fas fa-calendar-alt"></i> ${announcement.date}</span>
                <span><i class="${announcement.icon}"></i> ${announcement.category}</span>
            </div>
        </div>
    `;
}

function renderContent() {
    const teamContainer = document.getElementById('team-members-container');
    if (teamContainer) {
        teamContainer.innerHTML = CLUB_DATA.teamMembers.map(createTeamCard).join('');
    }

    // Full announcements page only shows the single remaining item
    const fullAnnouncementsContainer = document.getElementById('announcements-container-full');
    if (fullAnnouncementsContainer) {
        fullAnnouncementsContainer.innerHTML = CLUB_DATA.announcements.map(createAnnouncementItem).join('');
    }

    // Mini announcements on home page only shows the single remaining item
    const miniAnnouncementsContainer = document.getElementById('announcements-container-mini');
    if (miniAnnouncementsContainer) {
        miniAnnouncementsContainer.innerHTML = CLUB_DATA.announcements.slice(0, 1).map(createAnnouncementItem).join('');
    }

    // Hiding the detail page content as it's no longer necessary
    const announcementDetailPage = document.getElementById('announcement-detail');
    if (announcementDetailPage) {
        announcementDetailPage.classList.add('hidden');
    }
}

// --- 3. Navigation and Page Management ---

function setupNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const sidebarNav = document.querySelector('.sidebar-nav');
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const pages = document.querySelectorAll('.page-section');
    const appContainer = document.querySelector('.app-container');

    const closeSidebar = () => {
        sidebarNav.classList.remove('active');
        appContainer.classList.remove('menu-open'); 
        document.body.style.overflow = 'auto';
    };

    menuToggle.addEventListener('click', () => {
        sidebarNav.classList.add('active');
        appContainer.classList.add('menu-open'); 
        document.body.style.overflow = 'hidden';
    });
    closeMenu.addEventListener('click', closeSidebar);

    const switchPage = (pageId) => {
        pages.forEach(page => {
            // Remove 'active' class from all pages first to reset animations
            page.classList.remove('active'); 
            
            if (page.id === pageId) {
                page.classList.remove('hidden');
                // Re-add 'active' class to trigger CSS animations for the new page
                // The delay is necessary to allow the browser to register the visibility change
                setTimeout(() => page.classList.add('active'), 50); 
            } else {
                page.classList.add('hidden');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-nav');
            // Ensure main navigation links remain active when viewing a detail page
            const mainPageId = (pageId === 'announcement-detail') ? 'announcements' : pageId;
            if (link.getAttribute('data-page') === mainPageId) {
                link.classList.add('active-nav');
            }
        });
        
        closeSidebar();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Handle Clicks on Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            
            // Special handling for Admin page (to show login/dashboard)
            if (pageId === 'admin') {
                const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';

                if (isLoggedIn) {
                    // Use a custom message box instead of alert()
                    const adminDashboardMessage = document.createElement('div');
                    adminDashboardMessage.innerHTML = `<div class="card glassmorphism" style="text-align:center;">
                        <p style="color: #4CAF50; font-weight: 600;">Admin Dashboard (Simulated): You are logged in.</p>
                        <p class="small-text-note">The Admin link now acts as a logout/dashboard toggle.</p>
                    </div>`;
                    
                    document.querySelector('.content').prepend(adminDashboardMessage);
                    setTimeout(() => adminDashboardMessage.remove(), 4000); 

                    closeSidebar();
                    return; 
                }
            }
            // Normal page switch
            if (pageId) {
                switchPage(pageId);
            }
        });
    });

    // Handle Clicks on Buttons with data-page-link attribute (FIXED)
    document.body.addEventListener('click', (e) => {
        // We remove the announcement detail view logic as it's no longer needed.
        // const announcementItem = e.target.closest('.announcement-item');
        // if (announcementItem && announcementItem.hasAttribute('data-id')) {
        //     e.preventDefault();
        //     const id = announcementItem.getAttribute('data-id');
        //     showAnnouncementDetail(id); // This function is now also removed/modified
        //     return;
        // }
        
        // Handle general button/link clicks with data-page-link
        const link = e.target.closest('[data-page-link]');
        if (link) {
            e.preventDefault();
            const pageId = link.getAttribute('data-page-link');
            if (pageId) {
                switchPage(pageId);
            }
        }
    });

    const initialPageId = window.location.hash.substring(1) || 'home';
    switchPage(initialPageId);
}

// --- 4. Announcement Detail Router (Removed/Stubbed) ---

// This function is no longer needed since the announcement body is shown in full.
function showAnnouncementDetail(id) {
    // Left as a stub in case routing is accidentally triggered.
    const detailContent = document.getElementById('detail-content');
    detailContent.innerHTML = '<p class="error-message">This feature has been disabled as announcements now show full content.</p>';
    switchPage('announcement-detail');
}

// --- 5. Form and Interaction Handlers (Now relies on native form submission) ---

function setupFormHandlers() {
    const suggestionForm = document.getElementById('suggestion-form');

    // The form now uses native HTML submission (action="https://formspree.io/...")
    
    suggestionForm.addEventListener('submit', () => {
        // Simple client-side validation check before submission
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const title = document.getElementById('title').value.trim(); 
        const suggestion = document.getElementById('suggestion').value.trim();

        if (!name || !email || !title || !suggestion) {
            // If validation fails, use a custom message box instead of relying on the native submit
            const submissionMessage = document.getElementById('submission-message');
            submissionMessage.innerHTML = `<div class="card glassmorphism error-message" style="margin-bottom:0;">
               <i class="fas fa-exclamation-triangle card-icon"></i>
               <p>Please fill out all required fields.</p>
           </div>`;
           submissionMessage.classList.remove('hidden');
           return;
        }

        // Optional: Provide instant feedback while Formspree handles the redirect/submission
        const submitButton = suggestionForm.querySelector('.btn');
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
    });
}


// --- 6. Admin Login Gatekeeper ---

function setupAdminLogin() {
    const loginBtn = document.getElementById('admin-login-btn');
    const emailInput = document.getElementById('admin-email');
    const passwordInput = document.getElementById('admin-password');
    const errorMsg = document.getElementById('login-error');

    // Update admin link text if already logged in
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        const adminLink = document.querySelector('a[data-page="admin"]');
        if (adminLink) {
            adminLink.innerHTML = '<i class="fas fa-shield-alt"></i> Admin (Logout)';
        }
    }


    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (email === CLUB_DATA.ADMIN_USERNAME && password === CLUB_DATA.ADMIN_PASSWORD) {
            errorMsg.textContent = 'Login Successful! Redirecting...';
            errorMsg.style.backgroundColor = 'rgba(76, 175, 80, 0.2)'; 
            errorMsg.style.borderColor = '#4CAF50';
            errorMsg.classList.remove('hidden');
            
            localStorage.setItem('adminLoggedIn', 'true');
            
            setTimeout(() => {
                // Use custom message box instead of alert()
                const successMessage = document.createElement('div');
                successMessage.innerHTML = `<div class="card glassmorphism" style="text-align:center; background-color: rgba(76, 175, 80, 0.15); border-color: #4CAF50; margin-top:20px;">
                    <p style="color: #4CAF50; font-weight: 600;">Login Successful! Admin Dashboard Access Granted.</p>
                </div>`;
                document.querySelector('.content').prepend(successMessage);
                
                // Hide message and reload
                setTimeout(() => {
                    successMessage.remove();
                    window.location.hash = '#home';
                    window.location.reload(); 
                }, 1000);

            }, 500); 

        } else {
            errorMsg.textContent = 'Invalid credentials. Access denied.';
            errorMsg.style.backgroundColor = 'rgba(255, 77, 79, 0.1)';
            errorMsg.style.borderColor = '#ff4d4f';
            errorMsg.classList.remove('hidden');

            setTimeout(() => {
                errorMsg.classList.add('hidden');
            }, 3000);
        }
    });
}


// --- 7. Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Render all dynamic content first
    renderContent();
    
    // 2. Set up page switching and navigation
    setupNavigation();

    // 3. Set up form interactivity (suggestions)
    setupFormHandlers();
    
    // 4. Set up admin login logic
    setupAdminLogin();
});