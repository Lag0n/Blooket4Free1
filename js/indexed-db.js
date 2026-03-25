// IndexedDB helper functions

class PackDB {
    constructor() {
        this.dbName = 'BlooketCustomPacks';
        this.version = 1;
        this.db = null;
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                if (!db.objectStoreNames.contains('customPacks')) {
                    const store = db.createObjectStore('customPacks', { keyPath: 'id', autoIncrement: true });
                    store.createIndex('name', 'name', { unique: false });
                }
            };
        });
    }

    async saveCustomPacks(packs) {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['customPacks'], 'readwrite');
            const store = transaction.objectStore('customPacks');

            const clearRequest = store.clear();
            
            clearRequest.onsuccess = () => {
                let addedCount = 0;
                if (packs.length === 0) {
                    resolve();
                    return;
                }

                packs.forEach((pack, index) => {
                    const addRequest = store.add({ ...pack, id: index + 1 });
                    addRequest.onsuccess = () => {
                        addedCount++;
                        if (addedCount === packs.length) {
                            resolve();
                        }
                    };
                    addRequest.onerror = () => reject(addRequest.error);
                });
            };

            clearRequest.onerror = () => reject(clearRequest.error);
        });
    }

    async loadCustomPacks() {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['customPacks'], 'readonly');
            const store = transaction.objectStore('customPacks');
            const request = store.getAll();

            request.onsuccess = () => {
                const packs = request.result.map(item => {
                    const { id, ...pack } = item;
                    return pack;
                });
                resolve(packs);
            };

            request.onerror = () => reject(request.error);
        });
    }

    async deleteCustomPack(index) {
        if (!this.db) await this.init();

        const packs = await this.loadCustomPacks();
        packs.splice(index, 1);
        await this.saveCustomPacks(packs);
    }

    async addCustomPack(pack) {
        const packs = await this.loadCustomPacks();
        packs.push(pack);
        await this.saveCustomPacks(packs);
    }
}

const packDB = new PackDB();