$(document).ready(function () {

    // navbar display, hide/show
    $("#menu").hide();
    $(".fa-xmark").hide();
    menuShow = false;
    $("#navbarToggle").click(function () {
        if (!menuShow) {
            $("#menu").show();
            $(".fa-xmark").show();
            $(".fa-bars").hide();
            menuShow = true;
        } else {
            $("#menu").hide();
            $(".fa-xmark").hide();
            $(".fa-bars").show();
            menuShow = false;
        }
    });


    // for services 
    const servicesData = [
        {
            index: "assets/meditation.jpg",
            heading: "Meditation Classes",
            description: "Meditation classes offer a sanctuary for individuals seeking inner peace and mindfulness. Guided by experienced instructors, participants embark on a journey of self-discovery, learning various meditation techniques to calm the mind, reduce stress, and cultivate a deeper connection with themselves. These classes provide a nurturing environment for personal growth and well-being."
        },
        {
            index: "assets/counselling.jpg",
            heading: "Counselling Sessions",
            description: "Counselling sessions provide a safe and confidential space for individuals to explore their thoughts, emotions, and experiences. Led by trained therapists, these sessions offer support, guidance, and validation as clients navigate challenges, gain insight, and develop coping strategies. Empowering individuals for happier, healthier lives. Together, therapist and client work towards healing, growth, and positive change."
        },
        {
            index: "assets/psychservices.jpg",
            heading: "Psychiatric Services",
            description: "Psychiatric sessions are crucial meetings between patients and psychiatric professionals. These sessions involve comprehensive evaluations, diagnosis, and treatment planning for mental health conditions. Through therapy, medication management, and personalized care, patients receive support in managing their symptoms, improving functioning, and enhancing overall well-being."
        }
    ];

    let currentIndex = 0;

    function updateServicesContent() {
        const { index, heading, description } = servicesData[currentIndex];
        $("#servicesImage").attr("src", index);
        $("#servicesHeading").text(heading);
        $("#servicesDescription").text(description);
    }

    $("#servicesLeftClick").click(() => {
        currentIndex = (currentIndex === 0) ? servicesData.length - 1 : currentIndex - 1;
        updateServicesContent();
    });

    $("#servicesRightClick").click(() => {
        currentIndex = (currentIndex === servicesData.length - 1) ? 0 : currentIndex + 1;
        updateServicesContent();
    });
    
    updateServicesContent();


    //quiz
    //allow only one checkbox ti be checked
    $('input:checkbox').on('change', function() {
        $('input[type="checkbox"]').not(this).prop('checked', false);
     });

     const quizData = [
        {
            question: "When faced with a challenge, what is your initial reaction?",
            option1: "I tackle it head-on, ready to overcome any obstacles.",
            option2: "I tend to avoid it or procrastinate before dealing with it.",
            option3: "I seek help or guidance from others before taking action.",
            option4: "I feel overwhelmed and unsure of how to proceed."
        },
        {
            question: "How do you typically handle stress?",
            option1: "I have healthy coping mechanisms, such as exercise or meditation.",
            option2: "I distract myself with activities like watching TV or scrolling through social media.",
            option3: "I talk to a friend or family member about what's bothering me.",
            option4: "I tend to internalize my stress and find it difficult to relax."
        },
        {
            question: "What best describes your sleep patterns?",
            option1: "I consistently get a good night's sleep and wake up feeling refreshed.",
            option2: "I struggle to fall asleep or stay asleep throughout the night.",
            option3: "My sleep varies depending on my stress levels or daily routine.",
            option4: "I often feel tired, regardless of how much sleep I get."
        },
        {
            question: "How do you react to changes in your routine or plans?",
            option1: "I adapt easily and see change as an opportunity for growth.",
            option2: "I feel anxious or upset when things don't go as planned.",
            option3: "I try to find a compromise or alternative solution.",
            option4: "I prefer to stick to my routine and feel uncomfortable with unexpected changes."
        },
        {
            question: "When making decisions, what do you rely on the most?",
            option1: "Logic and reasoning",
            option2: "Intuition or gut feelings",
            option3: "Advice from others",
            option4: "Emotions and personal values"
        },
        {
            question: "How do you express your emotions?",
            option1: "I'm comfortable expressing my feelings openly.",
            option2: "I prefer to keep my emotions to myself.",
            option3: "I express my emotions through creative outlets like writing or art.",
            option4: "I find it challenging to identify and express my emotions."
        },
        {
            question: "What brings you the most joy or fulfillment in life?",
            option1: "Achieving my goals and making progress",
            option2: "Spending time with loved ones",
            option3: "Engaging in hobbies or activities I enjoy",
            option4: "Helping others and making a positive impact"
        },
        {
            question: "How do you typically handle conflicts or disagreements?",
            option1: "I address the issue directly and try to find a resolution.",
            option2: "I avoid confrontation and hope the problem resolves itself.",
            option3: "I seek input from others to mediate the situation.",
            option4: "I become defensive or shut down emotionally."
        },
        {
            question: "What do you do to maintain your mental well-being?",
            option1: "Practice self-care routines regularly",
            option2: "Seek professional help when needed",
            option3: "Engage in mindfulness or relaxation techniques",
            option4: "Connect with supportive friends or community groups"
        },
        {
            question: "How do you view challenges or setbacks in life?",
            option1: "As opportunities for personal growth and learning",
            option2: "As obstacles to overcome with difficulty",
            option3: "As temporary setbacks that can be overcome with perseverance",
            option4: "As overwhelming and discouraging"
        },
     ];

    let currentQuizIndex = 0;
    
     function updateQuizContent() {
        const {question, option1, option2, option3, option4} = quizData[currentQuizIndex];
        $("#question").text(question);
        $("#option1").text(option1);
        $("#option2").text(option2);
        $("#option3").text(option3);   
        $("#option4").text(option4);
     }

     let countA = 0, countB = 0, countC = 0, countD = 0;
    $("#quizSubmit").click(function(){
        
        if(currentQuizIndex < quizData.length-1){
            const option1Checked = $("#selectedOption1").prop("checked");
            const option2Checked = $("#selectedOption2").prop("checked");
            const option3Checked = $("#selectedOption3").prop("checked");
            const option4Checked = $("#selectedOption4").prop("checked");
            if (option1Checked) {
                countA++;
            } else if (option2Checked) {
                countB++;
            } else if (option3Checked) {
                countC++;
            } else if (option4Checked) {
                countD++;
            }
            else{ //to ensure atleast 1 checkbox is selected
                alert("Select an option")
                currentQuizIndex--;
            }
            currentQuizIndex++;
            updateQuizContent();
            if(currentQuizIndex === quizData.length-1){
                $("#quizSubmit").text("Submit");
            }
            $('input[type="checkbox"]').prop('checked', false);
        }
        else{
            $("#question").text("Result");
            $("#question").css({"font-size":"35px", "text-align": "center", "height" : "2rem"});
            $("#optionsList").css({"height" : "5rem"})
            
            if( countA === Math.max(countA, countB, countC, countD) ){
                $("#optionsList").text("Resilient and proactive in facing challenges, with a growth-oriented mindset.")
                
            }else if (countB === Math.max(countA, countB, countC, countD)) {
                $("#optionsList").text("Prone to stress and may benefit from developing healthier coping strategies.")
                
            }
            else if (countC === Math.max(countA, countB, countC, countD)) {
                $("#optionsList").text("Socially connected and open to seeking support from others when needed")
                
            }
            else if (countD === Math.max(countA, countB, countC, countD)) {
                $("#optionsList").text("Struggle with managing emotions and may benefit from improving emotional awareness and regulation techniques.")
                
            }

            $("#quizSubmit").hide();
            $("#quizResultBaseInfo").show();   
        }
    });

    updateQuizContent();


  
    



});