document.addEventListener('DOMContentLoaded', () => {
    
    // --- SYLLABUS EDITOR LOGIC ---
    const addAssessmentBtn = document.getElementById('add-assessment');
    const assessmentTableBody = document.querySelector('#assessment-table tbody');
    const saveBtn = document.getElementById('btn-save');

    // Logic for adding rows to the assessment table
    if (addAssessmentBtn) {
        addAssessmentBtn.addEventListener('click', () => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="text" class="form-control shadow-none" placeholder="New Item..."></td>
                <td><input type="number" class="form-control text-center shadow-none" placeholder="0"></td>
                <td class="text-end pe-3"><button class="btn btn-sm text-danger remove-row">Remove</button></td>
            `;
            assessmentTableBody.appendChild(tr);
            attachRemoveEvents();
        });
    }

    function attachRemoveEvents() {
        document.querySelectorAll('.remove-row').forEach(btn => {
            btn.onclick = function() {
                this.closest('tr').remove();
            };
        });
    }
    
    attachRemoveEvents(); // Initial call for existing rows

    if (saveBtn) {
        saveBtn.onclick = () => alert('Syllabus changes published to students!');
    }


    // --- MATERIALS UPLOAD LOGIC ---
    const materialsGrid = document.getElementById('materials-grid');
    const uploadForm = document.getElementById('instructorUploadForm');

    if (materialsGrid) {
        let materials = [
            { id: 1, title: 'Week 1: Syntax Basics', type: 'Lecture Notes', date: 'Oct 12, 2023' },
            { id: 2, title: '2022 Midterm Exam', type: 'Past Paper', date: 'Oct 15, 2023' }
        ];

        function renderMaterials() {
            materialsGrid.innerHTML = '';
            materials.forEach(item => {
                materialsGrid.innerHTML += `
                    <div class="col-md-6 col-xl-4">
                        <div class="card h-100 p-3 border-0 shadow-sm">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <span class="badge bg-light text-primary">${item.type}</span>
                                <button class="btn btn-sm text-danger border-0 p-0" onclick="alert('Item deleted')">Delete</button>
                            </div>
                            <h6 class="fw-bold mb-1">${item.title}</h6>
                            <p class="text-muted small mb-0">Uploaded: ${item.date}</p>
                        </div>
                    </div>`;
            });
        }

        if (uploadForm) {
            uploadForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const newFile = {
                    id: Date.now(),
                    title: document.getElementById('materialTitle').value,
                    type: document.getElementById('materialType').value,
                    date: new Date().toLocaleDateString()
                };
                materials.unshift(newFile);
                renderMaterials();
                bootstrap.Modal.getInstance(document.getElementById('uploadMaterialModal')).hide();
                uploadForm.reset();
            });
        }
        renderMaterials();
    }
});