document.addEventListener('DOMContentLoaded', function () {
    const createPollForm = document.getElementById('create-poll-form');
    const pollOptionsContainer = document.getElementById('poll-options-container');
    const addOptionButton = document.getElementById('add-option-button');
    const successMessage = document.getElementById('success-message');

    addOptionButton.addEventListener('click', () => {
        const optionInput = document.createElement('input');
        optionInput.type = 'text';
        optionInput.className = 'poll-option-input';
        optionInput.placeholder = 'Poll Option';
        optionInput.required = true;
        pollOptionsContainer.appendChild(optionInput);
    });

    createPollForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // Collect poll data
        const pollQuestion = document.getElementById('poll-question').value;
        const pollOptions = Array.from(document.querySelectorAll('.poll-option-input')).map(input => input.value);

        // Create poll (example logic, replace with your own backend call)
        console.log('Poll Question:', pollQuestion);
        console.log('Poll Options:', pollOptions);

        // Show success message
        successMessage.classList.add('show');
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 3000);

        // Reset form
        createPollForm.reset();
        pollOptionsContainer.innerHTML = '';
        const initialOptionInput = document.createElement('input');
        initialOptionInput.type = 'text';
        initialOptionInput.className = 'poll-option-input';
        initialOptionInput.placeholder = 'Poll Option';
        initialOptionInput.required = true;
        pollOptionsContainer.appendChild(initialOptionInput);
    });
});
