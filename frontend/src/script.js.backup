// --------------------------------------------------
// Load Roadmap
// --------------------------------------------------

async function loadRoadmap() {

    const container =
        document.getElementById(
            "roadmap-container"
        );


    try {

        const response =
            await fetch("/api/roadmap");


        if (!response.ok) {

            throw new Error(
                "Unable to load roadmap"
            );

        }


        const roadmap =
            await response.json();


        container.innerHTML = "";


        roadmap.forEach(
            (item, index) => {


                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "roadmap-card";


                const number =
                    String(index + 1)
                        .padStart(2, "0");


                card.innerHTML = `

                    <div class="roadmap-number">
                        ${number}
                    </div>

                    <div class="card-header">

                        <div class="icon">
                            ${item.icon}
                        </div>

                        <h3>
                            ${item.title}
                        </h3>

                    </div>


                    <p>
                        ${item.description}
                    </p>


                    <div class="topics">

                        ${item.topics
                            .map(
                                topic =>
                                    `<span class="topic">
                                        ${topic}
                                    </span>`
                            )
                            .join("")
                        }

                    </div>

                `;


                container.appendChild(card);

            }
        );


    } catch (error) {

        console.error(error);


        container.innerHTML = `

            <div class="loading">

                Unable to load roadmap.
                Please refresh the page.

            </div>

        `;

    }

}



// --------------------------------------------------
// Admission Form
// --------------------------------------------------

const inquiryForm =
    document.getElementById(
        "inquiry-form"
    );


const formMessage =
    document.getElementById(
        "form-message"
    );



if (inquiryForm) {


    inquiryForm.addEventListener(
        "submit",
        async function (event) {


            event.preventDefault();


            const submitButton =
                inquiryForm.querySelector(
                    ".submit-button"
                );


            submitButton.disabled =
                true;


            submitButton.textContent =
                "Submitting...";


            formMessage.className =
                "";

            formMessage.textContent =
                "";


            const formData = {

                name:
                    document.getElementById(
                        "name"
                    ).value.trim(),

                email:
                    document.getElementById(
                        "email"
                    ).value.trim(),

                phone:
                    document.getElementById(
                        "phone"
                    ).value.trim(),

                course:
                    document.getElementById(
                        "course"
                    ).value,

                qualification:
                    document.getElementById(
                        "qualification"
                    ).value.trim(),

                experience:
                    document.getElementById(
                        "experience"
                    ).value,

                message:
                    document.getElementById(
                        "message"
                    ).value.trim()

            };


            try {


                const response =
                    await fetch(
                        "/api/inquiries",
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    formData
                                )

                        }
                    );


                const result =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        result.message ||
                        "Unable to submit inquiry"
                    );

                }


                formMessage.className =
                    "success-message";


                formMessage.textContent =
                    result.message;


                inquiryForm.reset();


            } catch (error) {


                console.error(error);


                formMessage.className =
                    "error-message";


                formMessage.textContent =
                    error.message ||
                    "Something went wrong. Please try again.";


            } finally {


                submitButton.disabled =
                    false;


                submitButton.textContent =
                    "Submit Inquiry →";

            }

        }
    );

}



// --------------------------------------------------
// Initialize
// --------------------------------------------------

loadRoadmap();
