
from flask import Flask, render_template, request, jsonify


app = Flask(__name__)


state = {"show": None}


@app.route('/touch')
def touch():
        return render_template('touch.html')


@app.route('/skjerm')
def skjerm():
        return render_template('skjerm.html')

@app.route('/ipad')
def skjerm():
        return render_template('ipad.html')

@app.get('/api/skjerm')
def api_get():
        return jsonify(state)


@app.post('/api/skjerm')
def api_post():
        data = request.json
        state["show"] = data.get("show")
        return jsonify({"status":"ok"})


if __name__ == '__main__':
        app.run(host='0.0.0.0', port=5000)