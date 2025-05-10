document.addEventListener('DOMContentLoaded', function() {
    // Course data array (modified with completed status)
    const courses = [
        { code: "CSE 110", name: "Programming Building Blocks", credits: 3, department: "CSE", completed: true },
        { code: "WDD 130", name: "Web Fundamentals", credits: 3, department: "WDD", completed: true },
        { code: "CSE 111", name: "Programming With Functions", credits: 3, department: "CSE", completed: false },
        { code: "CSE 210", name: "Programming with Classes", credits: 3, department: "CSE", completed: false },
        { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 3, department: "WDD", completed: false },
        { code: "WDD 231", name: "Frontend Development", credits: 3, department: "WDD", completed: false }
    ];
    
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const allTab = document.getElementById('all');
    const creditsDisplay = document.createElement('p');
    creditsDisplay.className = 'credits-total';
    allTab.appendChild(creditsDisplay);
    
    // Initial display of all courses
    displayCourses(courses, allTab);
    updateCreditsTotal(courses);
    
    // Tab switching functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.innerHTML = ''; // Clear existing content
            });
            
            // Show selected tab content
            const tabId = this.getAttribute('data-tab');
            const activeTab = document.getElementById(tabId);
            activeTab.classList.add('active');
            
            // Filter courses based on selected tab
            let filteredCourses = courses;
            if (tabId !== 'all') {
                filteredCourses = courses.filter(course => course.department === tabId.toUpperCase());
            }
            
            // Display filtered courses
            displayCourses(filteredCourses, activeTab);
            updateCreditsTotal(filteredCourses);
        });
    });
    
    function displayCourses(coursesToDisplay, container) {
        const ul = document.createElement('ul');
        ul.className = 'course-list';
        
        coursesToDisplay.forEach(course => {
            const li = document.createElement('li');
            li.className = course.completed ? 'course completed' : 'course';
            
            const codeSpan = document.createElement('span');
            codeSpan.className = 'course-code';
            codeSpan.textContent = course.code;
            
            const nameSpan = document.createElement('span');
            nameSpan.className = 'course-name';
            nameSpan.textContent = course.name;
            
            const creditsSpan = document.createElement('span');
            creditsSpan.className = 'course-credits';
            creditsSpan.textContent = `${course.credits} credits`;
            
            li.appendChild(codeSpan);
            li.appendChild(nameSpan);
            li.appendChild(creditsSpan);
            ul.appendChild(li);
        });
        
        container.appendChild(ul);
    }
    
    function updateCreditsTotal(coursesToCount) {
        const totalCredits = coursesToCount.reduce((sum, course) => sum + course.credits, 0);
        creditsDisplay.textContent = `Total Credits: ${totalCredits}`;
    }
});