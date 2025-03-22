function toggleMenu() {
    const navMenu = document.querySelector('nav ul');
    navMenu.classList.toggle('active');
    console.log("Menu toggled"); 

}

// Автоматично затваряне на менюто при избор на линк
document.querySelectorAll('nav ul li a').forEach(link => {
link.addEventListener('click', () => {
    const navMenu = document.querySelector('nav ul');
    const toggleButton = document.querySelector('.nav-toggle');
    navMenu.classList.remove('active');
    toggleButton.classList.remove('active');
    });
});

    const dropdownToggle = document.querySelector('nav ul li a[href="#program"]');
    const dropdownMenu = dropdownToggle.nextElementSibling;

    dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const parentLi = dropdownToggle.parentElement;
        parentLi.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
            const parentLi = dropdownToggle.parentElement;
            parentLi.classList.remove('open');
        }
    });