export class IndexedDBWrapper {
  private databaseName: string;
  private version: number;
  private db: IDBDatabase | null;

  constructor(databaseName: string, version: number) {
    this.databaseName = databaseName;
    this.version = version;
    this.db = null;
  }

  openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.databaseName, this.version);

      request.onupgradeneeded = (event:any) => {
        this.db = event.target.result as IDBDatabase;
        // Create object store and indexes here if needed
      };

      request.onsuccess = (event:any) => {
        this.db = event.target.result as IDBDatabase;
        resolve(this.db);
      };

      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  }

  get<T>(objectStoreName: string, key: string | number): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      const transaction = this.db?.transaction(objectStoreName, 'readonly');
      if (!transaction) {
        reject(new Error('Database not opened'));
        return;
      }

      const objectStore = transaction.objectStore(objectStoreName);
      const request = objectStore.get(key);

      request.onsuccess = (event) => {
        resolve(request.result);
      };

      request.onerror = (event) => {
        reject((event.target as IDBRequest).error);
      };
    });
  }

  put<T>(objectStoreName: string, data: T): Promise<T> {
    return new Promise((resolve, reject) => {
      const transaction = this.db?.transaction(objectStoreName, 'readwrite');
      if (!transaction) {
        reject(new Error('Database not opened'));
        return;
      }

      const objectStore = transaction.objectStore(objectStoreName);
      const request = objectStore.put(data);

      transaction.oncomplete = (event) => {
        resolve(data);
      };

      transaction.onerror = (event) => {
        reject((event.target as IDBTransaction).error);
      };
    });
  }

  delete(objectStoreName: string, key: string | number): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db?.transaction(objectStoreName, 'readwrite');
      if (!transaction) {
        reject(new Error('Database not opened'));
        return;
      }

      const objectStore = transaction.objectStore(objectStoreName);
      const request = objectStore.delete(key);

      transaction.oncomplete = (event) => {
        resolve();
      };

      transaction.onerror = (event) => {
        reject((event.target as IDBTransaction).error);
      };
    });
  }

  closeDatabase() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}

// Example usage:
const dbWrapper = new IndexedDBWrapper('myDatabase', 1);
dbWrapper.openDatabase().then((db) => {
  // Database opened successfully, perform your operations here
}).catch((error) => {
  console.error('Error opening database:', error);
});
