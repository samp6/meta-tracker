from flask import Flask, jsonify
from flask_cors import CORS
from models import Schema
from service import MetaService, EntryEncoder
from json import JSONEncoder
import json

app = Flask(__name__)
CORS(app)

def jsonifyEachEntry(data):
    jsonEntries = {}
    for arch in data:
        for entry in data[arch]:
            jsonEntry = EntryEncoder().encode(entry)
            if arch in jsonEntries:
                jsonEntries[arch].append(str(jsonEntry))
            else:
                jsonEntries[arch] = [str(jsonEntry)]
    return jsonEntries

@app.route("/meta", methods=["GET"])
def getMeta():
    data = MetaService().getAllEntries()
    jsonData = jsonifyEachEntry(data) 
    response = jsonify(jsonData)
    return response

@app.route("/meta/<date>", methods=["GET"])
def getMetaPostDate(date):
    data = MetaService().getAllEntriesPastDate(date)
    jsonData = jsonifyEachEntry(data)
    response = jsonify(jsonData)
    return response


@app.route("/meta/<arch>", methods=["POST"])
def createEntry(arch):
    return jsonify(MetaService().createDeckEntry(arch))

@app.route("/meta/<id>", methods=["POST"]) 
def removeEntry(id):
    return jsonify(MetaService().removeDeckEntry(id))

if __name__ == "__main__":
    Schema()
    app.run(debug=True)