from flask import Flask, render_template, request, jsonify

from ast_engine.analyzer import analyze_code
from ai_engine.explainer import generate_code_explanation
from ai_engine.openai_reviewer import get_openai_review

app = Flask(__name__)

# ---------------- HOME ----------------
@app.route("/", methods=["GET"])
def home():
    return render_template("index.html")


# ---------------- REVIEW API ----------------
@app.route("/review", methods=["POST"])
def review_code():
    data = request.get_json()

    if not data or "code" not in data:
        return jsonify({"error": "No code provided"}), 400

    code = data["code"]

    if not isinstance(code, str):
        return jsonify({"error": "Code must be a string"}), 400

    # AST analysis
    analysis = analyze_code(code)

    #  Local AI review (CodeBERT / fallback)
    ai_feedback = get_openai_review(code)

    # Code explanation
    explanation = generate_code_explanation(code)

    return jsonify({
        "analysis": analysis,
        "ai_review": ai_feedback,
        "code_explanation": explanation
    })


if __name__ == "__main__":
    app.run(debug=True)
