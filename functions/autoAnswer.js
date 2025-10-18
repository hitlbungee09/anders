const baseSelectors = [
    `[data-testid="choice-icon__library-choice-icon"]`,
    `[data-testid="exercise-check-answer"]`, 
    `[data-testid="exercise-next-question"]`, 
    `._1udzurba`,
    `._awve9b`
];

let khanwareDominates = true;

(async () => { 
    sendToast("🤖 Voy a responder de forma automatica, si lo haces tu en instantaneo van a sospechar, cuidado con el descaro :v", 7000);

    while (khanwareDominates) {
        if (features.autoAnswer && features.questionSpoof) {
            
            const selectorsToCheck = [...baseSelectors];
            if (features.nextRecomendation) selectorsToCheck.push("._hxicrxf");
            if (features.repeatQuestion) selectorsToCheck.push("._ypgawqo");

            for (const q of selectorsToCheck) {
                findAndClickBySelector(q);
                if (document.querySelector(q + "> div") && document.querySelector(q + "> div").innerText === "Mostrar como lo hice entre muchas comillas") {
                    sendToast("🎉 Ya termine", 3000);
                    playAudio("https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/4x5g14gj.wav");
                }
            }
        }
        
        const minDelay = 30000;
        const maxDelay = 60000; 

        const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
        
        await delay(randomDelay);
    }
})();
