document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectTitle = e.target.parentElement.querySelector('.project-title').textContent;
        alert(`Проект: ${projectTitle}\nСкоро ще добавим повече детайли!`);
    });
});