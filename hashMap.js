import KeyValuePair from "./keyValuePair.js";

function HashMap() {
  let _loadFactor = 0.75;
  let _capacity = 0;
  let _size = 16;
  let _buckets = Array.from({ length: _size }, () => Array.from({ length: 0 }));

  return {
    set: (key, value) => {
      if (addToBuckets(_buckets, key, value)) {
        _capacity++;
      }

      if (_capacity > _size * _loadFactor) {
        _buckets = doubleBuckets(_buckets);
        _size = _buckets.length;
      }
    },
    get: (key) => {
      let hashCode = hash(key, _size);

      checkIndex(hashCode, _buckets);

      let bucket = _buckets[hashCode];

      for (let index = 0; index < bucket.length; index++) {
        if (bucket[index].key === key) {
          return bucket[index].value;
        }
      }

      return null;
    },
    has: (key) => {
      let hashCode = hash(key, _size);

      checkIndex(hashCode, _buckets);

      let bucket = _buckets[hashCode];

      for (let index = 0; index < bucket.length; index++) {
        if (bucket[index].key === key) {
          return true;
        }
      }

      return false;
    },
    remove: (key) => {
      let hashCode = hash(key, _size);

      checkIndex(hashCode, _buckets);

      let bucket = _buckets[hashCode];

      for (let index = bucket.length - 1; index >= 0; index--) {
        if (bucket[index].key === key) {
          bucket.splice(index, 1);
          _capacity--;
          return true;
        }
      }

      return false;
    },
    length: () => {
      return _capacity;
    },
    clear: () => {
      _capacity = 0;
      _size = 16;
      _buckets = Array(_size).fill([]);
    },
    keys: () => {
      return _buckets.reduce((total, bucket) => {
        return total.concat(
          bucket.reduce((keys, pair) => {
            keys.push(pair.key);
            return keys;
          }, [])
        );
      }, []);
    },
    values: () => {
      return _buckets.reduce((total, bucket) => {
        return total.concat(
          bucket.reduce((values, pair) => {
            values.push(pair.value);
            return values;
          }, [])
        );
      }, []);
    },
    entries: () => {
      return _buckets.reduce((total, bucket) => {
        total = total.concat(
          bucket.reduce((items, pair) => {
            items.push([pair.key, pair.value]);
            return items;
          }, [])
        );
        return total;
      }, []);
    },
  };
}

function hash(key, size) {
  let hashCode = 0;

  const primeNumber = 31;
  for (let i = 0; i < key.length; i++) {
    hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % size;
  }

  return hashCode;
}

function checkIndex(index, buckets) {
  if (index < 0 || index >= buckets.length) {
    throw new Error("Trying to access index out of bounds");
  }
}

function doubleBuckets(buckets) {
  let size = buckets.length * 2;
  let newBuckets = Array.from({ length: size }, () =>
    Array.from({ length: 0 })
  );

  for (let index = 0; index < buckets.length; index++) {
    let bucket = buckets[index];

    for (let index2 = 0; index2 < bucket.length; index2++) {
      let pair = bucket[index2];
      addToBuckets(newBuckets, pair.key, pair.value);
    }
  }

  return newBuckets;
}

function addToBuckets(buckets, key, value) {
  let hashCode = hash(key, buckets.length);

  checkIndex(hashCode, buckets);

  let bucket = buckets[hashCode];
  let index = 0;

  while (index < bucket.length) {
    let pair = bucket[index];

    if (pair.key === key) {
      pair.value = value;
      return false;
    } else {
      index++;
    }
  }

  bucket.push(KeyValuePair(key, value));
  return true;
}

export default HashMap;
