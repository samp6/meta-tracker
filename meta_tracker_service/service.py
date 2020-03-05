from models import MetaModel

class Entry:
    def __init__(self, arch, id, date):
        self.arch = arch
        self.id = id
        self.date = date

class MetaService:
    def __init__(self):
        self.model = MetaModel()

    def createDeckEntry(self, arch):
        self.model.addEntry(arch)

    def removeDeckEntry(self, id):
        self.model.removeEntry(id)

    def getAllEntries(self):
        results = self.model.getAllEntries()
        entries = loadResults(results)
        return entries

    def getAllEntriesPastDate(self, date):
        results = self.model.getAllEntriesPastDate(date)
        entries = loadResults(results)
        return entries

    def loadResults(self, results):
        entries = {}
        for result in results:
            entry = Entry(result[0], result[1], result[2])
            if arch in entries:
                entries[arch].push(entry)
            else:
                entries[arch] = [entry]
        return entries