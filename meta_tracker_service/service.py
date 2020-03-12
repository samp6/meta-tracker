from models import MetaModel
from json import JSONEncoder
import json

class Entry:
    def __init__(self, id, date, arch):
        self.arch = arch
        self.id = id
        self.date = date

class EntryEncoder(JSONEncoder):
    def default(self, object):
        if isinstance(object, Entry):
            return object.__dict__
        else:
            return json.JSONEncoder.default(self, object)


class MetaService:
    def __init__(self):
        self.model = MetaModel()

    def createDeckEntry(self, arch):
        self.model.addEntry(arch)

    def removeDeckEntry(self, id):
        self.model.removeEntry(id)

    def editDeckEntry(self, id, new_text):
        self.model.editEntry(id, new_text)

    def loadResults(self, results):
        entries = {}
        for result in results:
            entry = Entry(result[0], result[1], result[2])
            if entry.arch in entries:
                entries[entry.arch].append(entry)
            else:
                entries[entry.arch] = [entry]
        return entries

    def getAllEntries(self):
        results = self.model.getAllEntries()
        entries = self.loadResults(results)
        return entries

    def getAllEntriesPastDate(self, date):
        results = self.model.getAllEntriesPastDate(date)        
        entries = self.loadResults(results)
        return entries