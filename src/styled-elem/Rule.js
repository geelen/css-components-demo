export default class Rule {
  constructor(property, value) {
    this.property = property
    this.value = value
  }

  toObject() {
    return {[this.property]: this.value}
  }
}
