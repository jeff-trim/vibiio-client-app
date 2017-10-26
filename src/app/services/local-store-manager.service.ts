import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LocalStoreManagerService {
    public static readonly DBKEY_USER_DATA = 'user_data';
    private static readonly DBKEY_SYNC_KEYS = 'sync_keys';

    private static syncListenerInitialised = false;
    private syncKeys: string[] = [];
    private _dbEvent = new Subject<string>();

    private reservedKeys: string[] = ['sync_keys', 'addToSyncKeys', 'removeFromSyncKeys',
                                      'getSessionStorage', 'setSessionStorage', 'addToSessionStorage',
                                      'removeFromSessionStorage', 'clearAllSessionsStorage', 'raiseDBEvent'];

    // Todo: Implement EventListeners for the various event operations and a SessionStorageEvent for specific data keys

    public initialiseStorageSyncListener() {
        if (LocalStoreManagerService.syncListenerInitialised === true) {
            return;
        }

        LocalStoreManagerService.syncListenerInitialised = true;
        window.addEventListener('storage', this.sessionStorageTransferHandler, false);
        this.syncSessionStorage();
    }



    public deinitialiseStorageSyncListener() {

        window.removeEventListener('storage', this.sessionStorageTransferHandler, false);

        LocalStoreManagerService.syncListenerInitialised = false;
    }




    private sessionStorageTransferHandler = (event: StorageEvent) => {

        if (!event.newValue) {
            return;
        }

        if (event.key === 'getSessionStorage') {

            if (sessionStorage.length) {
                localStorage.setItem('setSessionStorage', JSON.stringify(sessionStorage));
                localStorage.removeItem('setSessionStorage');
            }
        } else if (event.key === 'setSessionStorage') {

            if (!this.syncKeys.length) {
                this.loadSyncKeys();
            }

            const data = JSON.parse(event.newValue);

            for (const key in data) {

                if (this.syncKeysContains(key)) {
                    sessionStorage.setItem(key, data[key]);
                }
            }

        } else if (event.key === 'addToSessionStorage') {

            const data = JSON.parse(event.newValue);
            this.addToSessionStorageHelper(data['data'], data['key']);
        } else if (event.key === 'removeFromSessionStorage') {

            this.removeFromSessionStorageHelper(event.newValue);
        } else if (event.key === 'clearAllSessionsStorage' && sessionStorage.length) {

            this.clearInstanceSessionStorage();
        } else if (event.key === 'addToSyncKeys') {

            this.addToSyncKeysHelper(event.newValue);
        } else if (event.key === 'removeFromSyncKeys') {

            this.removeFromSyncKeysHelper(event.newValue);
        } else if (event.key === 'raiseDBEvent') {

            this.raiseDBEventHelper(event.newValue);
        }
    }

    private syncSessionStorage() {

        localStorage.setItem('getSessionStorage', '_dummy');
        localStorage.removeItem('getSessionStorage');
    }

    public clearAllStorage() {

        this.clearAllSessionsStorage();
        this.clearLocalStorage();
    }

    public clearAllSessionsStorage() {

        this.clearInstanceSessionStorage();
        localStorage.removeItem(LocalStoreManagerService.DBKEY_SYNC_KEYS);

        localStorage.setItem('clearAllSessionsStorage', '_dummy');
        localStorage.removeItem('clearAllSessionsStorage');
    }

    public clearInstanceSessionStorage() {

        sessionStorage.clear();
        this.syncKeys = [];
    }


    public clearLocalStorage() {
        localStorage.clear();
    }

    private addToSessionStorage(data: string, key: string) {

        this.addToSessionStorageHelper(data, key);
        this.addToSyncKeysBackup(key);

        localStorage.setItem('addToSessionStorage', JSON.stringify({ key: key, data: data }));
        localStorage.removeItem('addToSessionStorage');
    }

    private addToSessionStorageHelper(data: string, key: string) {

        this.addToSyncKeysHelper(key);
        sessionStorage.setItem(key, data);
    }

    private removeFromSessionStorage(keyToRemove: string) {

        this.removeFromSessionStorageHelper(keyToRemove);
        this.removeFromSyncKeysBackup(keyToRemove);

        localStorage.setItem('removeFromSessionStorage', keyToRemove);
        localStorage.removeItem('removeFromSessionStorage');
    }

    private removeFromSessionStorageHelper(keyToRemove: string) {

        sessionStorage.removeItem(keyToRemove);
        this.removeFromSyncKeysHelper(keyToRemove);
    }

    private testForInvalidKeys(key: string) {

        if (!key) {
            throw new Error('key cannot be empty');
        }

        if (this.reservedKeys.some(x => x === key)) {
            throw new Error(`The storage key "${key}" is reserved and cannot be used. Please use a different key`);
        }
    }

    private syncKeysContains(key: string) {

        return this.syncKeys.some(x => x === key);
    }


    private loadSyncKeys() {

        if (this.syncKeys.length) {
            return;
        }

        this.syncKeys = this.getSyncKeysFromStorage();
    }


    private getSyncKeysFromStorage(defaultValue: string[] = []): string[] {

        const data = localStorage.getItem(LocalStoreManagerService.DBKEY_SYNC_KEYS);

        if (data === null) {
            return defaultValue;
        } else {
            return <string[]>JSON.parse(data);
        }
    }

    private addToSyncKeys(key: string) {

        this.addToSyncKeysHelper(key);
        this.addToSyncKeysBackup(key);

        localStorage.setItem('addToSyncKeys', key);
        localStorage.removeItem('addToSyncKeys');
    }

    private addToSyncKeysBackup(key: string) {

        const storedSyncKeys = this.getSyncKeysFromStorage();

        if (!storedSyncKeys.some(x => x === key)) {
            storedSyncKeys.push(key);
            localStorage.setItem(LocalStoreManagerService.DBKEY_SYNC_KEYS, JSON.stringify(storedSyncKeys));
        }
    }

    private removeFromSyncKeysBackup(key: string) {

        const storedSyncKeys = this.getSyncKeysFromStorage();

        const index = storedSyncKeys.indexOf(key);

        if (index > -1) {
            storedSyncKeys.splice(index, 1);
            localStorage.setItem(LocalStoreManagerService.DBKEY_SYNC_KEYS, JSON.stringify(storedSyncKeys));
        }
    }


    private addToSyncKeysHelper(key: string) {

        if (!this.syncKeysContains(key)) {
            this.syncKeys.push(key);
        }
    }



    private removeFromSyncKeys(key: string) {

        this.removeFromSyncKeysHelper(key);
        this.removeFromSyncKeysBackup(key);

        localStorage.setItem('removeFromSyncKeys', key);
        localStorage.removeItem('removeFromSyncKeys');
    }


    private removeFromSyncKeysHelper(key: string) {

        const index = this.syncKeys.indexOf(key);

        if (index > -1) {
            this.syncKeys.splice(index, 1);
        }
    }


    public saveSessionData(data: string, key = LocalStoreManagerService.DBKEY_USER_DATA) {

        this.testForInvalidKeys(key);

        this.removeFromSyncKeys(key);
        localStorage.removeItem(key);
        sessionStorage.setItem(key, data);
    }


    public saveSyncedSessionData(data: string, key = LocalStoreManagerService.DBKEY_USER_DATA) {

        this.testForInvalidKeys(key);

        localStorage.removeItem(key);
        this.addToSessionStorage(data, key);
    }


    public savePermanentData(data: string, key = LocalStoreManagerService.DBKEY_USER_DATA) {

        this.testForInvalidKeys(key);

        this.removeFromSessionStorage(key);
        localStorage.setItem(key, data);
    }



    public moveDataToSessionStorage(key = LocalStoreManagerService.DBKEY_USER_DATA) {

        this.testForInvalidKeys(key);

        const data = this.getData(key);

        if (data == null) {
            return;
        }

        this.saveSessionData(data, key);
    }


    public moveDataToSyncedSessionStorage(key = LocalStoreManagerService.DBKEY_USER_DATA) {

        this.testForInvalidKeys(key);

        const data = this.getData(key);

        if (data == null) {
            return;
        }

        this.saveSyncedSessionData(data, key);
    }


    public moveDataToPermanentStorage(key = LocalStoreManagerService.DBKEY_USER_DATA) {

        this.testForInvalidKeys(key);

        const data = this.getData(key);

        if (data == null) {
            return;
        }

        this.savePermanentData(data, key);
    }


    public getData(key = LocalStoreManagerService.DBKEY_USER_DATA) {

        this.testForInvalidKeys(key);

        let data = sessionStorage.getItem(key);

        if (data === null) {
            data = localStorage.getItem(key);
        }

        return data;
    }


    public getDataObject<T>(key = LocalStoreManagerService.DBKEY_USER_DATA): T {

        const data = this.getData(key);

        if (data != null) {
            return <T>JSON.parse(data);
        } else {
            return null;
        }
    }


    public deleteData(key = LocalStoreManagerService.DBKEY_USER_DATA) {

        this.testForInvalidKeys(key);

        this.removeFromSessionStorage(key);
        localStorage.removeItem(key);
    }



    raiseDBEvent(event: string) {
        this.raiseDBEventHelper(event);

        localStorage.setItem('raiseDBEvent', event);
        localStorage.removeItem('raiseDBEvent');
    }

    private raiseDBEventHelper(event: string) {
        this._dbEvent.next(event);
    }


    getDBEventListener(): Observable<string> {
        return this._dbEvent.asObservable();
    }
}
