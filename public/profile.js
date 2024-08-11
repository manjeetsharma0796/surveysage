document.addEventListener("DOMContentLoaded", function () {
  const interactionCountElement = document.getElementById("interaction-count");
  const iceDisplay = document.getElementById("interaction-count-panel");
  const withdrawButton = document.getElementById("withdraw-button");
  const claimAmt = localStorage.getItem("claimableAmt") * 2;
  const cmAm = document.getElementById("claimable-amount");
  cmAm.innerText =`${claimAmt.toPrecision(4)}MCT`;
  // Retrieve interaction count from localStorage
  let interactionCount = localStorage.getItem("interactionCount");
  interactionCountElement.innerText = interactionCount;
  iceDisplay.innerText = `Interaction:${interactionCount}`;
  // Retrieve wallet address from localStorage
  const clientAddress = localStorage.getItem("clientAddress") || "Unknown";
  console.log(clientAddress, ",========");
  document.getElementById("user-wallet").innerText = clientAddress;

  // Withdraw button click event listener
  withdrawButton.addEventListener("click", () => {
    // Placeholder for API call to withdraw funds
    console.log("Withdraw button clicked. Initiating API call...");

    // Simulate API call (replace with actual API endpoint and request)
    setTimeout(() => {
      // Assuming the API call is successful
      const withdrawInfo = { clientAddress, claimAmt };
      fetch("/withdraw", {
        method: "POST", // Specify the request method
        headers: {
          "Content-Type": "application/json", // Set the request headers
        },
        body: JSON.stringify(withdrawInfo), // Convert the data object to a JSON string
      })
        .then((response) => response.json()) // Parse the JSON response
        .then((data) => {
          console.log("Success:", data); // Handle the response data
        })
        .catch((error) => {
          console.error("Error:", error); // Handle errors
        });

      console.log(
        "Withdrawal successful. Resetting claimed interactions to 0."
      );

      // Reset claimed interactions to 0
      localStorage.setItem("claimableAmt", 0);
      cmAm.innerText = "0 MCT"
    }, 1000); // Simulated delay of 1 second (1000 ms)
  });
});
