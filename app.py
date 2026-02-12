import os
from dotenv import load_dotenv
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from ast_engine.analyzer import analyze_code
from ai_engine.openai_reviewer import get_openai_review

# ---------------- LOAD ENV ----------------
load_dotenv()

# ---------------- APP INIT ----------------
app = Flask(__name__)
CORS(app)

# ---------------- DATABASE CONFIG ----------------
database_url = os.getenv("DATABASE_URL")

if not database_url:
    raise ValueError("DATABASE_URL is not set in environment variables")

app.config["SQLALCHEMY_DATABASE_URI"] = database_url
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# ---------------- DATABASE MODEL ----------------
class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.Text, nullable=False)
    analysis = db.Column(db.JSON)
    ai_review = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "code": self.code,
            "analysis": self.analysis,
            "ai_review": self.ai_review,
            "created_at": self.created_at.isoformat()
        }

# ---------------- AUTO CREATE TABLE ----------------
with app.app_context():
    db.create_all()

# ---------------- HOME ----------------
@app.route("/")
def home():
    return render_template("index.html")

# ---------------- REVIEW API ----------------
@app.route("/review", methods=["POST"])
def review():
    try:
        data = request.get_json()

        if not data or "code" not in data:
            return jsonify({"error": "No code provided"}), 400

        code = data["code"]

        # 1️⃣ AST Analysis
        analysis = analyze_code(code)

        # 2️⃣ GPT Review
        ai_review = get_openai_review(code)

        # 3️⃣ Save to PostgreSQL (Neon)
        new_review = Review(
            code=code,
            analysis=analysis,
            ai_review=ai_review
        )

        db.session.add(new_review)
        db.session.commit()

        return jsonify({
            "analysis": analysis,
            "ai_review": ai_review
        })

    except Exception as e:
        return jsonify({
            "error": "Internal server error",
            "details": str(e)
        }), 500


# ---------------- GET ALL REVIEWS ----------------
@app.route("/reviews", methods=["GET"])
def get_reviews():
    try:
        reviews = Review.query.order_by(Review.created_at.desc()).all()
        return jsonify([r.to_dict() for r in reviews])
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------- HEALTH CHECK (GOOD FOR DEPLOYMENT) ----------------
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "running"})


# ---------------- RUN ----------------
if __name__ == "__main__":
    app.run(debug=True)
