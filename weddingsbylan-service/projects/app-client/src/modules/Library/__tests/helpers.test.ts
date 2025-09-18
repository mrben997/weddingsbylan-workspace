import { AreObjectsEqual, FormatFileSize, MergeObjects } from '../Helpers/utilities'

describe('Helper - MergeObjects', () => {
  test('should return valid for empty', () => {
    expect(MergeObjects<any>({}, {})).toStrictEqual({})
    expect(MergeObjects<any>({})).toStrictEqual({})
    expect(MergeObjects<any>({}, undefined)).toStrictEqual({})
  })

  test('should return valid for multiple object', () => {
    expect(MergeObjects<any>({ a: 'a', c: 'c' }, { a: 'new-a', b: 'b' })).toStrictEqual({ a: 'new-a', b: 'b', c: 'c' })
    expect(
      MergeObjects<any>(
        { a: 'a', b: { b1: 'b1', b2: 'b2' } },
        {
          b: { b1: 'new-b1', b2: undefined, b3: 'b3' }
        }
      )
    ).toStrictEqual({ a: 'a', b: { b1: 'new-b1', b2: undefined, b3: 'b3' } })
    expect(
      MergeObjects<any>(
        {
          a: 'a',
          b: { b1: 'b1', b2: 'b2' },
          c: { c: { c1: { c2: 'c2', c3: undefined, c5: 'c5' } } }
        },
        {
          b: { b1: 'new-b1', b2: undefined, b3: 'b3' },
          c: { c: { c1: { c2: 'new-c2', c3: 'c3', c4: 'c4' } } }
        }
      )
    ).toStrictEqual({
      a: 'a',
      b: { b1: 'new-b1', b2: undefined, b3: 'b3' },
      c: { c: { c1: { c2: 'new-c2', c3: 'c3', c4: 'c4', c5: 'c5' } } }
    })
  })
})

describe('Helper - AreObjectsEqual', () => {
  test('should return true for two empty objects', () => {
    expect(AreObjectsEqual({}, {})).toBe(true)
  })

  test('should return true for objects with same keys and values', () => {
    const obj1 = { a: 1, b: 'string', c: true }
    const obj2 = { a: 1, b: 'string', c: true }
    expect(AreObjectsEqual(obj1, obj2)).toBe(true)
  })

  test('should return false for objects with different keys', () => {
    const obj1 = { a: 1, b: 'string', c: true }
    const obj2 = { a: 1, b: 'string' } // Thiếu key 'c'
    expect(AreObjectsEqual(obj1, obj2)).toBe(false)
  })

  test('should return false for objects with same keys but different values', () => {
    const obj1 = { a: 1, b: 'string', c: true }
    const obj2 = { a: 2, b: 'string', c: true } // Giá trị khác ở key 'a'
    expect(AreObjectsEqual(obj1, obj2)).toBe(false)
  })

  test('should return false if one object has extra keys', () => {
    const obj1 = { a: 1, b: 'string' }
    const obj2 = { a: 1, b: 'string', c: false } // Có thêm key 'c'
    expect(AreObjectsEqual(obj1, obj2)).toBe(false)
  })

  test('should return false when comparing object to null or undefined', () => {
    const obj1 = { a: 1 }
    expect(AreObjectsEqual(obj1, null)).toBe(false)
    expect(AreObjectsEqual(obj1, undefined)).toBe(false)
  })

  test('should return false when comparing object to primitive values', () => {
    const obj1 = { a: 1 }
    expect(AreObjectsEqual(obj1, 1)).toBe(false)
    expect(AreObjectsEqual(obj1, 'string')).toBe(false)
    expect(AreObjectsEqual(obj1, true)).toBe(false)
  })

  test('should return false when comparing two different objects with same keys but complex values', () => {
    const obj1 = { a: { x: 1 }, b: [1, 2, 3] }
    const obj2 = { a: { x: 1 }, b: [1, 2, 3] } // Các giá trị complex object
    expect(AreObjectsEqual(obj1, obj2)).toBe(false) // Hàm này không hỗ trợ deep comparison
  })
})

describe('Hepler - FormatFileSize', () => {
  test('should format size in Kb correctly', () => {
    expect(FormatFileSize(500)).toBe('500.00 Kb')
    expect(FormatFileSize(1023.99)).toBe('1023.99 Kb')
  })

  test('should format size in Mb correctly', () => {
    expect(FormatFileSize(1024)).toBe('1.00 Mb') // Exactly 1 Mb
    expect(FormatFileSize(5000)).toBe('4.88 Mb')
    expect(FormatFileSize(1_048_575)).toBe('1024.00 Mb') // Just under 1 Gb
  })

  test('should format size in Gb correctly', () => {
    expect(FormatFileSize(1_048_576)).toBe('1.00 Gb') // Exactly 1 Gb
    expect(FormatFileSize(5_000_000)).toBe('4.77 Gb')
    expect(FormatFileSize(1_073_741_823)).toBe('1024.00 Gb') // Just under 1 Tb
  })

  test('should format size in Tb correctly', () => {
    expect(FormatFileSize(1_073_741_824)).toBe('1.00 Tb') // Exactly 1 Tb
    expect(FormatFileSize(5_000_000_000)).toBe('4.66 Tb')
  })

  test('should handle edge cases', () => {
    expect(FormatFileSize(0)).toBe('0.00 Kb')
    expect(FormatFileSize(1024 * 1024 * 1024 * 2)).toBe('2.00 Tb') // 2 Tb
  })
})
