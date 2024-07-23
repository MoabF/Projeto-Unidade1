
document.addEventListener('DOMContentLoaded', () => {

    const courses = document.querySelectorAll('.card');
    

    let cart = JSON.parse(localStorage.getItem('cart')) || [];


    courses.forEach(course => {
        course.querySelector('.add-to-cart').addEventListener('click', () => {

            const courseId = course.getAttribute('data-id');
            const courseName = course.getAttribute('data-name');
            const coursePrice = parseFloat(course.getAttribute('data-price'));

            addToCart(courseId, courseName, coursePrice);
        });
    });


    function addToCart(id, name, price) {

        const existingCourse = cart.find(item => item.id === id);
        if (existingCourse) {

            existingCourse.quantity++;
        } else {

            cart.push({ id, name, price, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Curso adicionado ao carrinho');
    }
});
