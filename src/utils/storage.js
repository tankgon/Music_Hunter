//Tạo local storage
// Hàm tạo
const createStorage = (LOCAL_STORAGE_KEY) => {
    const storage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? {}

    return {
        get(key) {      
            return storage[key]
        },
        set(key, value) {
            storage[key] = value;
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storage));
        },
        remove(key) {
            delete storage[key];
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storage));
        }
    }
}

const storage = createStorage("zingmp3")
const LIBRARY_SONG = 'librarySong';
const HISTORY_SONG = 'historySong';
const LIBRARY_PLAYLIST = 'libraryPlaylist';
const VALUE_VOLUME = 'valueVolume';
const IS_LOOP = 'isLoop';
const IS_RANDOM = 'isRanDom';
const CURRENT_SONG = 'currentSong';

const zingStorage = {
    setLibrarySong: (data) => storage.set(LIBRARY_SONG, data),
    getLibrarySong: () => storage.get(LIBRARY_SONG),

    setHistorySong: (data) => storage.set(HISTORY_SONG, data),
    getHistorySong: () => storage.get(HISTORY_SONG),

    setLibraryPlaylist: (data) => storage.set(LIBRARY_PLAYLIST, data),
    getLibraryPlaylist: () => storage.get(LIBRARY_PLAYLIST),

    setCurrentSong: (data) => storage.set(CURRENT_SONG, data) || null,
    getCurrentSong: () => storage.get(CURRENT_SONG),

    setAddValueVolume: (data) => storage.set(VALUE_VOLUME, data),
    getAddValueVolume: () => storage.get(VALUE_VOLUME),

    setIsRandom: (data) => storage.set(IS_RANDOM, data),
    getIsRandom: () => storage.get(IS_RANDOM),

    setIsLoop: (data) => storage.set(IS_LOOP, data),
    getIsLoop: () => storage.get(IS_LOOP),
} 

export default zingStorage;