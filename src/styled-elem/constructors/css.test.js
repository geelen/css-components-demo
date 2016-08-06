import expect from 'expect'
import css from './css'
import concat from './concat'
import rule from './rule'

describe('css', () => {
  describe('simple inputs', () => {
    it('should be ok with nonce inputs', () => {
      expect(css``.rules).toEqual([])
      expect(css`this aint css`.rules).toEqual([])
      expect(css`🔥🔥😎`.rules).toEqual([])
    })

    it('should handle a single simple rule', () => {
      const expected = concat(
        rule('background', 'red')
      );
      expect(css`background:red;`).toEqual(expected)
      expect(css`background: red;`).toEqual(expected);
    })

    it('should handle dashed rules', () => {
      const expected = concat(
        rule('flexGrow', '1')
      );
      expect(css`flex-grow: 1;`).toEqual(expected)
      expect(css`flexGrow: 1;`).toEqual(expected);
    })

    it('should handle multiple lines', () => {
      const expected = concat(
        rule('flexGrow', '1'),
        rule('flexShrink', '0')
      );
      expect(css`flex-grow: 1;\nflex-shrink: 0;`).toEqual(expected)
    })

    it('should pass through duplicates', () => {
      const expected = concat(
        rule('flexGrow', '1'),
        rule('flexShrink', '0'),
        rule('flexGrow', '0')
      );
      expect(css`flex-grow: 1;\nflex-shrink: 0;\nflex-grow: 0;`).toEqual(expected)
    })
  })
})
