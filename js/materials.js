// Mock Data
const courses = [
    { id: 1, name: "CS101: Intro to Programming", dept: "Computer Science", enrolled: true },
    { id: 2, name: "MATH202: Calculus II", dept: "Mathematics", enrolled: false },
    { id: 3, name: "ENG105: Academic Writing", dept: "English", enrolled: true }
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

// Initial Load
renderCourses();