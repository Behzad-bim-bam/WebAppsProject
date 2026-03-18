// Mock Data
const courses = [
    { id: 1, name: "CMP120: Intro to Programming", dept: "Computer Science", enrolled: true },
    { id: 2, name: "MTH104: Calculus II", dept: "Mathematics", enrolled: false },
    { id: 3, name: "ENG204: Academic Writing", dept: "English", enrolled: true },
    { id: 4, name: "CMP257: Web Application Programming", dept: "Computer Science", enrolled: true}
];

const cardContainer = document.getElementById('course-card-container');
const detailSection = document.getElementById('course-detail-section');
const gridSection = document.getElementById('course-grid-section');

// Function to Render Courses
function renderCourses(filter = 'all', search = '') {
    cardContainer.innerHTML = '';
    const filtered = courses.filter(c => {
        const matchesFilter = filter === 'all' || (filter === 'my' && c.enrolled);
        const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    filtered.forEach(course => {
        const card = document.createElement('div');
        card.className = 'col-md-6 col-lg-4';
        card.innerHTML = `
            <div class="course-card-ui" onclick="showCourse('${course.name}')">
                <span class="badge bg-light text-muted mb-2">${course.dept}</span>
                <h5 class="fw-bold">${course.name}</h5>
                <p class="small text-muted mb-0">Click to view materials & AI Quizzes</p>
            </div>
        `;
        cardContainer.appendChild(card);
    });
}

// Navigation Logic
function showCourse(name) {
    gridSection.classList.add('d-none');
    detailSection.classList.remove('d-none');
    document.getElementById('selected-course-title').innerText = name;
}

document.getElementById('back-to-list').addEventListener('click', () => {
    detailSection.classList.add('d-none');
    gridSection.classList.remove('d-none');
});

// Search Logic
document.getElementById('courseSearch').addEventListener('input', (e) => {
    renderCourses('all', e.target.value);
});

// Filter Buttons Logic
document.getElementById('all-courses-btn').addEventListener('click', () => {
    document.getElementById('all-courses-btn').classList.add('active');
    document.getElementById('my-courses-btn').classList.remove('active');
    renderCourses('all', document.getElementById('courseSearch').value);
});

document.getElementById('my-courses-btn').addEventListener('click', () => {
    document.getElementById('my-courses-btn').classList.add('active');
    document.getElementById('all-courses-btn').classList.remove('active');
    renderCourses('my', document.getElementById('courseSearch').value);
});

// Initial Load
renderCourses();

// Add this at the very bottom of your materials.js

window.addEventListener('DOMContentLoaded', () => {
    // 1. Get the course name from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const courseToOpen = urlParams.get('course');

    if (courseToOpen) {
        // 2. Use your existing showCourse function to reveal the detail section
        showCourse(courseToOpen);
        
        // 3. Optional: If you want to ensure the course exists in your mock data
        // You can add a check here, but showCourse(courseToOpen) will work 
        // as long as the name matches what you passed in the URL.
    }
});