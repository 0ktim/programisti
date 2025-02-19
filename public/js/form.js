document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("fBvRaMRSweAbBm3ig"); // Замени с твоя EmailJS Public Key
            document.getElementById("contactForm").addEventListener("submit", function (event) {
                    event.preventDefault();
        
                    const name = document.getElementById("name").value.trim();
                    const email = document.getElementById("email").value.trim();
                    const subject = document.getElementById("subject").value;
                    const message = document.getElementById("message").value.trim();
                    const submitBtn = document.querySelector(".submit-btn");
                    const dateTime = new Date().toLocaleString("bg-BG");
        
                    if (!validateEmail(email)) {
                        alert("Моля, въведете валиден имейл адрес!");
                        return;
                    }
        
                    if (subject === "") {
                        alert("Моля, изберете тема!");
                        return;
                    }
        
                    if (message.length < 10) {
                        alert("Съобщението трябва да съдържа поне 10 символа!");
                        return;
                    }
        
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = "<i class='fas fa-spinner fa-spin'></i> Изпращане...";
        
                    emailjs.send("service_s7ebvah", "template_zncy4s3", {
                        name: name,
                        email: email,
                        subject: subject,
                        message: message,
                        dateTime: dateTime,
                        school_name: "СУ 'Йордан Йовков' - Сливен",
                        school_address: "Кв. ж.к. Българка, 8800 Сливен",
                        school_phone: "044/ 66 72 44",
                        school_email: "info-2000114@edu.mon.bg",
                        facebook_link: "https://www.facebook.com/SUYordanYovkov",
                        tiktok_link: "https://www.tiktok.com/@x_su_sliven",
                        youtube_link: "https://www.youtube.com/@%D0%A1%D0%A3%D0%99%D0%BE%D1%80%D0%B4%D0%B0%D0%BD%D0%99%D0%BE%D0%B2%D0%BA%D0%BE%D0%B2"
                    }).then(() => {
                        alert("Съобщението беше изпратено успешно!");
                        document.getElementById("contactForm").reset();
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = "<i class='fas fa-paper-plane'></i> Изпрати съобщение";
                    }).catch((error) => {
                        alert("Грешка при изпращането: " + error.text);
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = "<i class='fas fa-paper-plane'></i> Изпрати съобщение";
                    });
                });
        
                function validateEmail(email) {
                    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    return re.test(email);
                }
            });
