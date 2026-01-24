from flask import Flask, request, jsonify
from ast_engine.analyzer import analyze_code
from gpt_engine.prompt_builder import build_gpt_prompt
from ai_engine.local_reviewer import get_local_ai_review
from ai_engine.explainer import generate_code_explanation
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


#***********************************************************
@app.route("/")
def home():
    return render_template("index.html")


@app.route("/review", methods=["POST"])
def review_code():
    code = request.form.get("code")
    analysis = analyze_code(code)
    ai_feedback = get_local_ai_review(code)


# 1️⃣ AST analysis
    # analysis = analyze_code(code)
    # code = build_gpt_prompt(code, analysis)

# 2️⃣ Local AI model review (CodeBERT)
    # ai_feedback = get_local_ai_review(code)

    explanation = generate_code_explanation(code)

    return jsonify({
        "analysis": analysis,
        "ai_review": ai_feedback,
        "code_explanation": explanation
    })
1
# @app.route("/", methods=["GET"])
# def home():
#     return { "AI Code Reviewer API is running"}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

