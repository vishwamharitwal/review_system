document.addEventListener("DOMContentLoaded", () => {
    // GSAP Intro Animation with Welcome Screen
    const tl = gsap.timeline();

    // 1. Animate Welcome Screen
    tl.to(".welcome-logo", {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.5)"
    })
    .to(".welcome-text", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
    }, "-=0.4")
    // 2. Hold for a moment, then fade out the whole welcome screen
    .to(".welcome-screen", {
        opacity: 0,
        duration: 0.6,
        delay: 1.2,
        ease: "power2.inOut",
        onComplete: () => {
            document.getElementById('welcome-screen').style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling if needed
        }
    })
    // 3. Animate Main Card In
    .to(".card", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.2")
    // 4. Animate Stars
    .from(".stars i", {
        opacity: 0,
        scale: 0.5,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)"
    }, "-=0.4");

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
        star.addEventListener('mouseover', function () {
            const val = parseInt(this.getAttribute('data-value'));
            highlightStars(val);
        });

        star.addEventListener('mouseout', function () {
            highlightStars(currentRating);
        });

        star.addEventListener('click', function () {
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

    // Carousel Logic
    const carouselCard = document.getElementById('carousel-card');
    const carouselText = document.getElementById('carousel-text');
    const carouselControls = document.getElementById('carousel-controls');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const carouselDots = document.getElementById('carousel-dots');
    
    let currentMessageIndex = 0;
    let currentChipsList = [];
    let selectedMessage = "";

    const commentsData = {
        5: [
            "Fixa Menswear Kalwar Puliya mein bahut acha experience raha. Suit stitching perfect thi bahut khush hoon 😊",
            "Jaipur mein achha tailor dhoondh raha tha, Kalwar Puliya mein Fixa Menswear mil gaya aur quality dekh ke impress ho gaya.",
            "Readymade collection dekh ke impress ho gaya, quality top class hai. Kalwar Road se paas mein itna acha showroom hai pata hi nahi tha 👍",
            "Wedding ke liye suit dhoondh rahe the, dost ne Fixa Menswear ka naam bataya Kalwar Puliya mein. Bahut acha decision raha wahan jaana.",
            "Jhotwara se Kalwar Puliya jaana easy raha aur fabric quality dekh ke maza aa gaya. Staff bhi bahut acha tha.",
            "Office wear ke liye Kalwar Puliya mein Fixa Menswear se best mila. Staff bahut helpful aur professional the ❤️",
            "Fabric range dekh ke bahut khush hua, itni variety expect nahi ki thi. Fixa Menswear ko highly recommend karunga."
        ],
        4: [
            "Drive karte waqt Kalwar Puliya mein ye showroom dikha toh andar ruk gaya. Suit stitch karwaya, quality achhi thi.",
            "Jaipur mein formal shirt stitch karwani thi, Kalwar Puliya mein Fixa Menswear se karwayi aur fitting achhi aayi 👍",
            "Readymade shirts liye the yahan se, quality achhi lagi aur Kalwar Road se aana bhi easy tha.",
            "Kalwar Puliya mein naya showroom khula hai, try kiya toh achha laga. Jhotwara wale dosto ko bhi bata diya 😊",
            "Office ke liye kapde silwane the, Kalwar Puliya wale Fixa Menswear se kaam badhiya hua aur price bhi reasonable laga.",
            "Fixa Menswear mein gaya tha, staff ka behavior bahut achha tha. Kalwar Puliya mein easily mil jaata hai.",
            "Fabric achha dikhaya gaya aur stitching bhi neat thi. Jhotwara se paas mein Kalwar Puliya ke is showroom se achha option nahi milega."
        ],
        3: [
            "Fixa Menswear gaya tha Kalwar Puliya mein theek laga overall. Suit stitch karwaya tha kaam ho gaya time pe.",
            "Kapde dekhne gaya tha yahan collection normal hai. Kalwar Road se paas hi hai toh nearby wale try kar sakte hain.",
            "Formal shirt stitch karwayi thi kaam sahi tha. Jhotwara se Kalwar Puliya aana easy raha.",
            "Bhai ne bataya tha naya menswear shop khula hai Kalwar Puliya mein gaya toh dekhne. Theek laga overall.",
            "Jaipur mein fabric dikhwane gaya tha Kalwar Puliya wale Fixa Menswear mein. Kaam ho gaya jo chahiye tha.",
            "Readymade section dekha tha average collection hai. Kalwar Puliya mein hi mil jaata hai jo chahiye tha.",
            "Fixa Menswear mein gaya tha office wear ke liye sahi raha. Jhotwara se location easily accessible hai."
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

    function updateCarousel() {
        if (currentChipsList.length === 0) return;
        
        carouselText.textContent = currentChipsList[currentMessageIndex];
        selectedMessage = currentChipsList[currentMessageIndex];
        
        // Update dots
        const dots = carouselDots.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentMessageIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Update buttons state
        prevBtn.disabled = currentMessageIndex === 0;
        nextBtn.disabled = currentMessageIndex === currentChipsList.length - 1;

        checkSubmitState();
    }

    prevBtn.addEventListener('click', () => {
        if (currentMessageIndex > 0) {
            currentMessageIndex--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentMessageIndex < currentChipsList.length - 1) {
            currentMessageIndex++;
            updateCarousel();
        }
    });

    function renderChips(rating) {
        currentMessageIndex = 0;
        selectedMessage = "";
        checkSubmitState();

        if (rating === 0) {
            carouselText.textContent = "Please select a star rating first";
            carouselControls.style.display = "none";
            return;
        }

        currentChipsList = commentsData[rating] || [];
        
        if (currentChipsList.length > 0) {
            carouselControls.style.display = "flex";
            
            // Create dots
            carouselDots.innerHTML = '';
            currentChipsList.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.className = 'dot';
                if (index === 0) dot.classList.add('active');
                carouselDots.appendChild(dot);
            });

            updateCarousel();
        } else {
            carouselControls.style.display = "none";
            carouselText.textContent = "No messages available";
        }
    }

    // Submit Logic
    const submitBtn = document.getElementById('submit-btn');

    // Exact Google Review link provided by user
    const GOOGLE_REVIEW_URL = "https://g.page/r/CRsA8u_KlJDIEBM/review";

    const WHATSAPP_NUMBER = "917340021807";

    function checkSubmitState() {
        if (currentRating > 0 && selectedMessage !== "") {
            submitBtn.removeAttribute('disabled');
            if (currentRating <= 2) {
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

        if (currentRating <= 2) {
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
