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
            const newRating = parseInt(this.getAttribute('data-value'));
            if (currentRating !== newRating) {
                currentRating = newRating;
                highlightStars(currentRating);
                ratingText.textContent = ratingDescriptions[currentRating];
                renderChips(currentRating);
                
                if (currentRating === 5 && typeof confetti === 'function') {
                    confetti({
                        particleCount: 150,
                        spread: 80,
                        origin: { y: 0.6 },
                        colors: ['#FFD700', '#FFA500', '#FF8C00', '#ffffff'] // Golden theme colors
                    });
                }
            }
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
    const chipsContainer = document.getElementById('chips-container');
    let selectedMessage = "";

    const commentsData = {
        5: [
            "Fixa Menswear Kalwar Puliya mein naya khula hai aur experience bahut acha raha. Suit stitching perfect thi. Zaroor try karein.",
            "Readymade collection dekhne gaya tha yahan quality dekh ke khush ho gaya. Kalwar Puliya mein itna acha showroom hai pata hi nahi tha.",
            "Fabric ki range bahut achhi hai Fixa Menswear mein. Staff ne bhi bahut acche se guide kiya. Jaipur mein acha option hai.",
            "Office ke liye formal suit stitch karwaya fitting ekdum perfect aayi. Fixa Menswear Kalwar Puliya se bahut khush hoon.",
            "Naya showroom hai par service established shop jaisi lagi. Fabric quality is price mein bahut achhi hai.",
            "Tailor near me search karke Fixa Menswear tak pahuncha. Stitching quality dekh ke bahut satisfied hoon.",
            "Kalwar Puliya mein Fixa Menswear ek acha addition hai. Readymade aur custom dono options milte hain ek hi jagah."
        ],
        4: [
            "Fixa Menswear mein suit stitch karwaya quality achhi thi. Overall acha experience raha.",
            "Readymade shirts ka collection acha hai Fixa Menswear Kalwar Puliya mein. Satisfied hoon purchase se.",
            "Fabric options achhe the Kalwar Puliya wale Fixa Menswear mein. Staff ne bhi acha guide kiya.",
            "Naya showroom hai try kiya formal wear ke liye. Fitting achhi thi price bhi reasonable laga.",
            "Fixa Menswear mein achha experience raha. Service bhi satisfactory thi overall.",
            "Custom stitching ke liye gaya tha quality achhi mili. Recommend karunga Kalwar Puliya wale Fixa Menswear ko.",
            "Kalwar Puliya mein Fixa Menswear acha option hai. Fabric aur fitting dono theek the overall."
        ],
        3: [
            "Overall experience was okay. I’d like to share a little feedback.",
            "My experience was decent overall. I have a few suggestions to share.",
            "Overall it was a good experience, but there are a few things that could be better.",
            "I had an average experience. I’d like to share some feedback with you.",
            "Overall experience was okay. I’d appreciate it if you could hear my feedback."
        ],
        2: [
            "The experience could have been better. I’d like to share my feedback.",
            "I wasn’t fully satisfied with my experience. May I share my feedback?",
            "I had a few concerns with my experience. I’d like to share them.",
            "I’d like to share some feedback about my experience.",
            "I feel the experience could be improved. I’d appreciate your attention."
        ],
        1: [
            "I wasn’t satisfied with my experience. I’d like to share my feedback.",
            "I had some concerns and would like to share my feedback.",
            "My experience wasn’t as expected. I’d appreciate your attention.",
            "I’d like to share my concerns respectfully.",
            "I hope you’ll kindly hear my feedback."
        ]
    };

    function renderChips(rating) {
        chipsContainer.innerHTML = '';
        selectedMessage = "";
        checkSubmitState();

        if (rating === 0) return;

        let chipsList = commentsData[rating] || [];

        chipsList.forEach(text => {
            const btn = document.createElement('button');
            btn.className = 'chip';
            btn.textContent = text;
            chipsContainer.appendChild(btn);
        });
    }

    // Event delegation for dynamically added chips
    chipsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('chip')) {
            const allChips = chipsContainer.querySelectorAll('.chip');
            allChips.forEach(c => c.classList.remove('selected'));
            
            e.target.classList.add('selected');
            selectedMessage = e.target.textContent;
            
            checkSubmitState();
        }
    });

    // Submit Logic
    const submitBtn = document.getElementById('submit-btn');
    
    // Exact Google Review link provided by user
    const GOOGLE_REVIEW_URL = "https://g.page/r/CRsA8u_KlJDIEBM/review";

    const WHATSAPP_NUMBER = "917340021807";

    function checkSubmitState() {
        if (currentRating > 0 && selectedMessage !== "") {
            submitBtn.removeAttribute('disabled');
            if (currentRating <= 3) {
                submitBtn.innerHTML = '<i class="fa-brands fa-whatsapp"></i> Share Feedback';
            } else {
                submitBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy & Post on Google';
            }
        } else {
            submitBtn.setAttribute('disabled', 'true');
            submitBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy & Post on Google';
        }
    }

    submitBtn.addEventListener('click', () => {
        if (submitBtn.disabled) return;
        
        if (currentRating <= 3) {
            // WhatsApp Redirection
            let message = selectedMessage;
            let whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
            window.location.href = whatsappUrl;
        } else {
            // Copy to clipboard for Google Review
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
                    window.location.href = GOOGLE_REVIEW_URL;
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = "";
                }, 1500);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                alert("Could not copy message. Please try again.");
            });
        }
    });
});
