let nav=document.querySelector('nav');

window.addEventListener('scroll',()=>{
    nav.classList.toggle('naWinScroll',window,scrollY>0)
});

document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch('http://localhost:5000/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Thank you! Your message has been sent.');
            document.getElementById('contactForm').reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error sending your message. Please try again.');
    }
});