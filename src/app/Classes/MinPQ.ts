export class MinPQ {
  compare;
  pq;
  N;

  constructor(compare?) {
    this.compare = compare;
    this.pq = [];
    this.N = 0;
  }

  isEmpty() {
    return this.N === 0;
  }

  insert(key) {
    this.pq[++this.N] = key;
    this.swim(this.N);
  }

  delMin() {
    if (!this.isEmpty()) {
      this.exch(1, this.N);
      const min = this.pq[this.N--];
      this.sink(1);
      this.pq[this.N + 1] = null;
      return min;
    }
  }

  greater(i, j) {
    return this.pq[i].compareTo(this.pq[j]) > 0;
  }

  exch(i, j) {
    const t = this.pq[i];
    this.pq[i] = this.pq[j];
    this.pq[j] = t;
  }

  swim(k) {
    while (k > 1 && this.greater(Math.floor(k / 2), k)) {
      this.exch(k, Math.floor(k / 2));
      k = Math.floor(k / 2);
    }
  }

  sink(k) {
    while (2 * k <= this.N) {
      let j = 2 * k;
      if (j < this.N && this.greater(j, j + 1))
        j++;
      if (!this.greater(k, j)) break;
      this.exch(k, j);
      k = j;
    }
  }
}
