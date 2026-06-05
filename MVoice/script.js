document.addEventListener("DOMContentLoaded", () => {

    const regenerateBtn = document.querySelector(".bg-purple-500");
    const refinedScript = document.getElementById("refined-script");

    if (!regenerateBtn || !refinedScript) {
        console.log("Elements not found");
        return;
    }

    regenerateBtn.addEventListener("click", () => {

        const text = refinedScript.value.trim();

        if (!text) {
            alert("စာသားထည့်ပါ");
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);

        utterance.lang = "my-MM";
        utterance.rate = 1;
        utterance.pitch = 1;

        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);

    });

});
