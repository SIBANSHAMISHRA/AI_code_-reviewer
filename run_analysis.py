# # from ast_engine.analyzer import analyze_code

# # with open("test_code.py") as f:
# #     code = f.read()


# # result = analyze_code(code)
# # print(analyze_code(code))

# from ast_engine.analyzer import analyze_code
# from gpt_engine.prompt_builder import build_gpt_prompt

# with open("test_code.py") as f:
#     code = f.read()

# analysis_result = analyze_code(code)

# prompt = build_gpt_prompt(code, analysis_result)

# print(prompt)




from ast_engine.analyzer import analyze_code
from gpt_engine.prompt_builder import build_gpt_prompt
from gpt_engine.reviewer import get_gpt_review

with open("test_code.py") as f:
    code = f.read()

analysis_result = analyze_code(code)

prompt = build_gpt_prompt(code, analysis_result)

gpt_feedback = get_gpt_review(prompt)

print("===== GPT CODE REVIEW =====\n")
print(gpt_feedback)



# import os
# from dotenv import load_dotenv

# load_dotenv()
# print(os.getenv("OPENAI_API_KEY"))
