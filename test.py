
from flask import Flask, jsonify, render_template
import subprocess

app = Flask(__name__)

timeplan_path="/home/im/mp-bilder/timeplan.jpg"

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/timeplan", methods=["POST"])
def timeplan():
        subprocess.run (["pkill", "feh"], stderr=subprocess.DEVNULL)
        subprocess.Popen(["feh", "-F", timeplan_path])
        return jsonify({"status": "ok"})


if __name__=="__main__":
        app.run(host="0.0.0.0", port=5000)


