import expect from 'expect'
import Input from 'postcss/lib/input'
import Parser from 'postcss/lib/parser'
import stringify   from 'postcss/lib/stringify';

class PartialParser extends Parser {
  endFile() {
    console.log("hahahaha")
  }
}

describe.only('css', () => {
  it('test', () => {
    const input = new Input('.foo { ')
    const parser = new PartialParser(input);
    parser.tokenize()
    parser.loop()
    console.log(parser)
    console.log(parser.root.toString())
    input.css += "color: red; } .bar { color: blue; }"
    parser.tokenize()
    parser.loop()
    console.log(parser)
    console.log(parser.root.toString())

  })
})
