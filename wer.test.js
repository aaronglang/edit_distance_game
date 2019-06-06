const edit_distance = require('./wer').edit_distance;

test('should return 0', () => {
    expect(edit_distance('abcdef', 'abcdef')).toEqual(0);
});

test('should return 3', () => {
    expect(edit_distance('she sells sea shells by the seashore', 'she shells she shells by the sheshore')).toEqual(3);
});

test('should return 4', () => {
    expect(edit_distance('she sells sea shells', ' ')).toEqual(4);
});

test('should throw TypeError', () => {
    expect(() => edit_distance(true, 'asd')).toThrow(TypeError);
    expect(() => edit_distance(123, 'asd')).toThrow(TypeError);
    expect(() => edit_distance(123, true)).toThrow(TypeError);
});