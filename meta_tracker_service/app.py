from flask import Flask, jsonify
from flask_cors import CORS
from models import Schema
from service import MetaService

app = Flask(__name__)
CORS(app)

@app.route("/meta", methods=["GET"])
def getMeta():
    return jsonify(MetaService().getAllEntries())

@app.route("/meta/<date>", methods=["GET"])
def getMetaPostDate(meta):
    return jsonify(MetaService().getAllEntriesAfterDate(meta))

@app.route("/meta/<arch>", methods=["POST"])
def createEntry(arch):
    return jsonify(MetaService().createDeckEntry(arch))

@app.route("/meta/<id>", methods=["POST"]) 
def removeEntry(id):
    return jsonify(MetaService().removeDeckEntry(id))

if __name__ == "__main__":
    Schema()
    app.run(debug=True)