/*
* Basic leaf node of a style tree
* */

export default class Rule {
  constructor(property, value) {
    this.property = property
    this.value = value
  }
}
