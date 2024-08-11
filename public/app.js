document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connect-button');
    const createPollForm = document.getElementById('create-poll-form');
    const pollsContainer = document.getElementById('polls');
    
    let accounts = [];
    let polls = [];

    connectButton.addEventListener('click', async () => {
        if (window.ethereum) {
            try {
                accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                console.log(accounts)
                localStorage.setItem("clientAddress", accounts)
                connectButton.textContent = 'Connected';
                connectButton.disabled = true;
                displayPolls();
            } catch (error) {
                console.error(error);
            }
        } else {
            alert('MetaMask not detected. Please install MetaMask to use this feature.');
        }
    });

    createPollForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pollQuestion = document.getElementById('poll-question').value;
        const pollId = polls.length;
        polls.push({ pollId, pollQuestion, votes: 0 });
        displayPolls();
        createPollForm.reset();
    });

    function displayPolls() {
        pollsContainer.innerHTML = '';
        polls.forEach(poll => {
            const pollElement = document.createElement('div');
            pollElement.className = 'poll';
            pollElement.innerHTML = `
                <p>${poll.pollQuestion}</p>
                <button class="neon-button" onclick="vote(${poll.pollId})">Vote</button>
                <p>Votes: ${poll.votes}</p>
            `;
            pollsContainer.appendChild(pollElement);
        });
    }

    window.vote = function (pollId) {
        const poll = polls.find(p => p.pollId === pollId);
        if (poll) {
            poll.votes++;
            displayPolls();
        }
    }
});
