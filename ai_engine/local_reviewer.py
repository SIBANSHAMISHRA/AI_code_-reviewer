from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

tokenizer = AutoTokenizer.from_pretrained("microsoft/codebert-base")
model = AutoModelForSequenceClassification.from_pretrained(
    "microsoft/codebert-base", num_labels=2
)

def get_local_ai_review(code):
    inputs = tokenizer(code, return_tensors="pt", truncation=True, max_length=512)
    outputs = model(**inputs)

    score = torch.softmax(outputs.logits, dim=1).tolist()[0]

    return {
        "ai_model": "CodeBERT",
        "quality_score": round(score[1] * 100, 2),
        "feedback": "Local AI-based code quality estimation"
    }
