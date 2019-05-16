# Detecting resource relationships

If the Resource decorator `relationshipsDecorator` if not used the JSON API normalizer tries to guess the available
relationships and cardinality of these relationships.

*Note: You can/should correct these guesses if they are incorrect when persisting a resource.*

The following assumptions are made:
- All relations in the resource relationships property are added as relations, even if they are
  empty. 
- A relation is assumed to have a cardinality of `many-to-one` if the data value is an object.
- A relation is assumed to have a cardinality of `one-to-many` if the data value is as array.
