const pollData = [
  {
    question: "What is your favorite color?",
    id: 1,
    options: [
      { option: "Red", votes: 120 },
      { option: "Blue", votes: 150 },
      { option: "Green", votes: 90 },
      { option: "Yellow", votes: 60 },
    ],
  },
  {
    question: "Which is your preferred mode of transport?",
    id: 2,
    options: [
      { option: "Car", votes: 200 },
      { option: "Bicycle", votes: 80 },
      { option: "Public Transport", votes: 100 },
      { option: "Walking", votes: 50 },
    ],
  },
  {
    question: "What is your favorite type of cuisine?",
    id: 3,
    options: [
      { option: "Italian", votes: 140 },
      { option: "Chinese", votes: 170 },
      { option: "Mexican", votes: 90 },
      { option: "Indian", votes: 60 },
    ],
  },
  {
    question: "Which season do you prefer?",
    id: 4,
    options: [
      { option: "Spring", votes: 110 },
      { option: "Summer", votes: 130 },
      { option: "Fall", votes: 150 },
      { option: "Winter", votes: 80 },
    ],
  },
];

document.addEventListener("DOMContentLoaded", function () {
  const createPollForm = document.getElementById("create-poll-form");
  const pollOptionsContainer = document.getElementById(
    "poll-options-container"
  );
  const addOptionButton = document.getElementById("add-option-button");
  const successMessage = document.getElementById("success-message");
  const pollsContainer = document.getElementById("polls-container");
  const interactionCountElement = document.getElementById("interaction-count");

  // Example poll data from backend
  // const pollData = [
  //     {
  //         "question": "What is your favorite color?",
  //         "id": 1,
  //         "options": [
  //             {"option": "Red", "votes": 120},
  //             {"option": "Blue", "votes": 150},
  //             {"option": "Green", "votes": 90},
  //             {"option": "Yellow", "votes": 60}
  //         ]
  //     },
  //     {
  //         "question": "Which is your preferred mode of transport?",
  //         "id": 2,
  //         "options": [
  //             {"option": "Car", "votes": 200},
  //             {"option": "Bicycle", "votes": 80},
  //             {"option": "Public Transport", "votes": 100},
  //             {"option": "Walking", "votes": 50}
  //         ]
  //     }
  // ];

  // // Retrieve interaction count from localStorage
  let interactionCount =
    parseInt(localStorage.getItem("interactionCount")) || 0;
  interactionCountElement.textContent = `Interactions: ${interactionCount}`;

  // Retrieve votes from localStorage
  const userVotes = JSON.parse(localStorage.getItem("userVotes")) || {};

  // Function to calculate percentage
  function calculatePercentage(votes, totalVotes) {
    return ((votes / totalVotes) * 100).toFixed(1);
  }

  // Function to send vote data to backend
  function sendVoteData(questionId, optionIndex) {
    // Placeholder for backend call
    console.log(
      `Sending data to backend - Question ID: ${questionId}, Option Index: ${optionIndex}`
    );
    // Example AJAX request (using fetch)
    fetch("/api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ questionId, optionIndex }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Backend response:", data))
      .catch((error) => console.log("Error:", error));
  }

  // Function to render polls
  function renderPolls() {
    pollsContainer.innerHTML = "";
    pollData.forEach((poll) => {
      const pollElement = document.createElement("div");
      pollElement.className = "poll";

      const pollQuestion = document.createElement("h3");
      pollQuestion.textContent = poll.question;
      pollElement.appendChild(pollQuestion);

      const totalVotes = poll.options.reduce(
        (acc, option) => acc + option.votes,
        0
      );

      poll.options.forEach((option, optionIndex) => {
        const optionElement = document.createElement("div");
        optionElement.className = "poll-option";

        const optionLabel = document.createElement("label");
        optionLabel.textContent = `${option.option} - ${
          option.votes
        } votes (${calculatePercentage(option.votes, totalVotes)}%)`;

        const optionInput = document.createElement("input");
        optionInput.type = "radio";
        optionInput.name = `poll-${poll.id}`;
        optionInput.value = optionIndex;

        // Disable input if user has already voted for this poll
        if (userVotes[poll.id] !== undefined) {
          optionInput.disabled = true;
          if (userVotes[poll.id] === optionIndex) {
            optionInput.checked = true;
          }
        }

        optionElement.appendChild(optionInput);
        optionElement.appendChild(optionLabel);

        pollElement.appendChild(optionElement);

        optionInput.addEventListener("click", () => {
          if (userVotes[poll.id] === undefined) {
            poll.options[optionIndex].votes++;
            userVotes[poll.id] = optionIndex;
            localStorage.setItem("userVotes", JSON.stringify(userVotes));
            renderPolls();
            interactionCount++;
            localStorage.setItem("interactionCount", interactionCount);
            if(!localStorage.getItem('claimableAmt')) {
                console.log("nhiii tha =============")
                localStorage.setItem("claimableAmt", 0);
            }
            
            let claimableAmt = parseInt(localStorage.getItem("claimableAmt")) || 0;
            console.log(claimableAmt,"=========================");
            localStorage.setItem("claimableAmt", claimableAmt+1);

            interactionCountElement.textContent = `Interactions: ${interactionCount}`;
            sendVoteData(poll.id, optionIndex);
          }
        });
      });

      pollsContainer.appendChild(pollElement);
    });
  }

  // Add option input field dynamically
  // addOptionButton.addEventListener('click', () => {
  //     const optionInput = document.createElement('input');
  //     optionInput.type = 'text';
  //     optionInput.className = 'poll-option-input';
  //     optionInput.placeholder = 'Poll Option';
  //     optionInput.required = true;
  //     pollOptionsContainer.appendChild(optionInput);
  // });

  // // Form submission handler
  // createPollForm.addEventListener('submit', (event) => {
  //     event.preventDefault();
  //     const question = document.getElementById('poll-question').value;
  //     const options = Array.from(document.getElementsByClassName('poll-option-input')).map(input => ({
  //         option: input.value,
  //         votes: 0
  //     }));

  //     pollData.push({ question, options, id: pollData.length + 1 });
  //     renderPolls();

  //     createPollForm.reset();
  //     pollOptionsContainer.innerHTML = '';

  //     successMessage.classList.add('show');
  //     setTimeout(() => successMessage.classList.remove('show'), 2000);
  // });

  renderPolls();
});
