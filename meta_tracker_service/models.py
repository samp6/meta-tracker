import sqlite3

class Schema:
    def __init__(self):
        self.conn = sqlite3.connect('meta.db')
        self.create_table()

    def create_table(self):
        query = """
            CREATE TABLE IF NOT EXISTS "meta" (
                id INTEGER PRIMARY KEY,
                date INTEGER DEFAULT (strftime('%s', 'now')),
                arch TEXT
            );
            """
        self.conn.execute(query)

class MetaModel:
    def __init__(self):
        self.conn = sqlite3.connect('meta.db', check_same_thread=False)

    def addEntry(self, arch):
        query = "INSERT INTO meta(arch) VALUES('" + str(arch) + "')"
        self.conn.execute(query)
        return self.conn.commit()

    def removeEntry(self, id):
        query = "DELETE FROM meta WHERE id = " + id
        print(query)
        self.conn.execute(query)
        return self.conn.commit()

    def editEntry(self, id, new_text):
        query = "UPDATE meta SET arch = '" + str(new_text) + "' WHERE id = '" + str(id) + "'"
        self.conn.execute(query)
        return self.conn.commit()

    def getAllEntries(self):
        query = "SELECT * FROM meta"
        results = self.conn.execute(query).fetchall()
        return results

    def getAllEntriesPastDate(self, date):
        query = "SELECT * FROM meta WHERE date > " + str(date)
        results = self.conn.execute(query).fetchall()
        return results