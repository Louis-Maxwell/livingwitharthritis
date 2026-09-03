from pathlib import Path
p = Path(__file__).resolve().parent
code = "".join((p / f).read_text() for f in ["g1.py", "g2.py", "g3.py", "g4.py", "g5.py"])
exec(compile(code, str(p / "generate.py"), "exec"), {"__name__": "__main__"})
