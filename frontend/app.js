document.getElementById("analyzeBtn").addEventListener("click", analyze);

async function analyze() {

    const code = document.getElementById("codeInput").value;

    document.getElementById("result").innerText = "Analyzing...";

    try {
        const response = await fetch("http://127.0.0.1:5000/review", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ code: code })
        });

        const data = await response.json();

        document.getElementById("result").innerText =
            JSON.stringify(data, null, 2);

    } catch (error) {
        document.getElementById("result").innerText =
            "Error connecting to backend.";
        console.error(error);
    }
}
