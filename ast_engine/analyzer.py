import ast                       # AST parsing

def analyze_code(code):
   try:
       tree = ast.parse(code)
       return "AST parsing successful"
   except SyntaxError as e:
       return f"Syntax Error: {e}"
   

# ---------- Function Length Analyzer ----------

import ast                   

class FunctionLengthAnalyzer(ast.NodeVisitor):
    def __init__(self):
        self.long_functions = []

    def visit_FunctionDef(self, node):
        if len(node.body) > 15:   # threshold
            self.long_functions.append({
                "function_name": node.name,
                "line_no": node.lineno,
                "length": len(node.body)
            })
        self.generic_visit(node)



def analyze_code(code):
    try:
        tree = ast.parse(code)

        analyzer = FunctionLengthAnalyzer()
        analyzer.visit(tree)

        return {
            "status": "success",
            "long_functions": analyzer.long_functions
        }

    except SyntaxError as e:
        return {
            "status": "error",
            "message": str(e)
        }




 # ---------- Nested Loop Analyzer ---------               

import ast                                 

class NestedLoopAnalyzer(ast.NodeVisitor):
    def __init__(self):
        self.nested_loops = []

    def visit_For(self, node):
        self._check_nested(node, loop_type="for")
        self.generic_visit(node)

    def visit_While(self, node):
        self._check_nested(node, loop_type="while")
        self.generic_visit(node)

    def _check_nested(self, node, loop_type):
        for child in ast.walk(node):
            if child is not node and isinstance(child, (ast.For, ast.While)):
                self.nested_loops.append({
                    "outer_loop": loop_type,
                    "inner_loop": type(child).__name__,
                    "line_no": node.lineno
                })



# ---------- Unused Variable Analyzer  --------- 
class UnusedVariableAnalyzer(ast.NodeVisitor):
    def __init__(self):
        self.assigned = set()
        self.used = set()

    def visit_Assign(self, node):
        for target in node.targets:
            if isinstance(target, ast.Name):
                self.assigned.add(target.id)
        self.generic_visit(node)

    def visit_Name(self, node):
        if isinstance(node.ctx, ast.Load):
            self.used.add(node.id)


#---------------Complexity Analyzer Class----------------
class ComplexityAnalyzer(ast.NodeVisitor):
    def __init__(self):
        self.complexity = 1  # base complexity

    def visit_If(self, node):
        self.complexity += 1
        self.generic_visit(node)

    def visit_For(self, node):
        self.complexity += 1
        self.generic_visit(node)

    def visit_While(self, node):
        self.complexity += 1
        self.generic_visit(node)

    def visit_Try(self, node):
        self.complexity += 1
        self.generic_visit(node)

    def visit_ExceptHandler(self, node):
        self.complexity += 1
        self.generic_visit(node)

    def visit_BoolOp(self, node):
        # and / or conditions
        self.complexity += len(node.values) - 1
        self.generic_visit(node)



# ---------- Main Analyze Function ----------
def analyze_code(code):
    try:
        tree = ast.parse(code)

        func_analyzer = FunctionLengthAnalyzer()
        loop_analyzer = NestedLoopAnalyzer()
        unused_analyzer = UnusedVariableAnalyzer()
        complexity_analyzer = ComplexityAnalyzer()

        func_analyzer.visit(tree)
        loop_analyzer.visit(tree)
        unused_analyzer.visit(tree)
        complexity_analyzer.visit(tree)

        unused_vars = list(unused_analyzer.assigned - unused_analyzer.used)

        return {
            "status": "success",
            "long_functions": func_analyzer.long_functions,
            "nested_loops": loop_analyzer.nested_loops,
            "unused_variables": unused_vars,
            "complexity_score": complexity_analyzer.complexity
        }

    except SyntaxError as e:
        return {
            "status": "error",
            "message": str(e)
        }




