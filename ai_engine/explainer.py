import ast

class CodeExplainer(ast.NodeVisitor):
    def __init__(self):
        self.explanations = []

    def visit_FunctionDef(self, node):
        self.explanations.append(
            f"The code defines a function named '{node.name}'."
        )
        self.generic_visit(node)

    def visit_For(self, node):
        self.explanations.append(
            "The code contains a for-loop used for iteration."
        )
        self.generic_visit(node)

    def visit_While(self, node):
        self.explanations.append(
            "The code uses a while-loop for repeated execution."
        )
        self.generic_visit(node)

    def visit_If(self, node):
        self.explanations.append(
            "The code includes a conditional (if) statement."
        )
        self.generic_visit(node)

def generate_code_explanation(code):
    try:
        tree = ast.parse(code)
        explainer = CodeExplainer()
        explainer.visit(tree)

        if not explainer.explanations:
            return "The code consists of simple statements without control structures."

        return " ".join(explainer.explanations)

    except SyntaxError:
        return "The provided code contains syntax errors and cannot be explained."
