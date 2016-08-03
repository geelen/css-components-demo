import nested from './nested'

export default (pseudo, ...rules) =>
  nested(pseudo.split(',').map(p => '&:' + p).join(','), ...rules)
