document.addEventListener("DOMContentLoaded", () => {
    // GSAP Intro Animation
    gsap.to(".card", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    });

    gsap.from(".stars i", {
        opacity: 0,
        scale: 0.5,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.3,
        ease: "back.out(1.7)"
    });

    // Removing chip GSAP animation to fix visibility issues
    gsap.set(".chip", { opacity: 1, y: 0 });

    // Rating Logic
    const stars = document.querySelectorAll('.stars i');
    const ratingText = document.getElementById('rating-text');
    let currentRating = 0; // Starts empty

    const ratingDescriptions = {
        1: "Poor",
        2: "Fair",
        3: "Good",
        4: "Very Good",
        5: "Excellent"
    };

    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            const val = parseInt(this.getAttribute('data-value'));
            highlightStars(val);
        });

        star.addEventListener('mouseout', function() {
            highlightStars(currentRating);
        });

        star.addEventListener('click', function() {
            currentRating = parseInt(this.getAttribute('data-value'));
            highlightStars(currentRating);
            ratingText.textContent = ratingDescriptions[currentRating];
            checkSubmitState();
        });
    });

    function highlightStars(val) {
        stars.forEach(star => {
            const starVal = parseInt(star.getAttribute('data-value'));
            if (starVal <= val) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    // Message Chip Logic
    const chips = document.querySelectorAll('.chip');
    let selectedMessage = "";

    chips.forEach(chip => {
        chip.addEventListener('click', function() {
            // Deselect all
            chips.forEach(c => c.classList.remove('selected'));
            
            // Select this one
            this.classList.add('selected');
            selectedMessage = this.textContent;
            
            checkSubmitState();
        });
    });

    // Submit Logic
    const submitBtn = document.getElementById('submit-btn');
    
    // Exact Google Review link provided by user
    const GOOGLE_REVIEW_URL = "https://www.google.com/search?sca_esv=de6c12fe2c86afe8&sxsrf=APpeQnt9T-Yu8JDuZXwV7QpJOcaxNFCsig:1787560048309&q=fixa-+kalwar+puliya+jaipur+reviews&uds=AJ5uw18mrVji5vJxoJIxXjPjg611vZNUV9JhToE5Bk8iYAQKAiX4fMjNOdKVK-bhHdMPIIS3YRdmOww005C5j7NjfcF7_fbn8Jy--eaoOwE6bS8IJhKNtNDoOAHMdW6hpKyLmI-7yI3o_CGtweSU1HWrPUloqSi4MVGHL0tCN3v-xXFTXkBrkjzswfj7vzqXhXM5ttevnw2vJrlSsNXFVrdhr0yK1iCH3jeDLnIpKUuE_CjYHYv2uA8O2pTtpbxBc5ckFv_wBD3HBSxiuJW1kioD1cu5MNmKt7ooCJFj_ebp2-1Mq31bk9BQxOiCyTmhnLRPb4i_tTFhJAANPx9eJCzS-VPscrEU8l_g0nHbOJCVA5YdY_JtIGE&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_yr6hhi5Kcf0EzoYCVljG8C7EwQS9HLktSThgM7gWmI5yCftrht2MbeLlcymcDpb53wbKiZZTMMaAMWLKPKoWubfU3II9dRqdVphjStIU6Fa3OX1Gw%3D%3D&sa=X&ved=2ahUKEwi9oMaN7LiWAxXQwjgGHT3BNsUQk8gLegQIGRAB&ictx=1&stq=1&cs=1&lei=cACMar2oEtCF4-EPvYLbqQw#ebo=2";

    function checkSubmitState() {
        if (currentRating > 0 && selectedMessage !== "") {
            submitBtn.removeAttribute('disabled');
        } else {
            submitBtn.setAttribute('disabled', 'true');
        }
    }

    submitBtn.addEventListener('click', () => {
        if (submitBtn.disabled) return;
        
        // Copy to clipboard
        navigator.clipboard.writeText(selectedMessage).then(() => {
            // Button animation feedback
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = `<span>Copied! Redirecting...</span> <i class="fa-solid fa-check"></i>`;
            submitBtn.style.backgroundColor = "#10B981"; // Success green
            
            gsap.fromTo(submitBtn, 
                { scale: 0.95 }, 
                { scale: 1, duration: 0.3, ease: "back.out(2)" }
            );

            // Redirect after short delay
            setTimeout(() => {
                window.open(GOOGLE_REVIEW_URL, '_blank');
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.style.backgroundColor = "";
            }, 1500);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            alert("Could not copy message. Please try again.");
        });
    });
});
